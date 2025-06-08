// frontend/src/app/page.tsx
'use client';

import { ethers, JsonRpcSigner, BrowserProvider, Contract } from "ethers";
import { useState, useEffect, useCallback } from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import AdminPanel from "./AdminPanel";

// Impor ABI dan alamat dari file konstanta
import { contractABI, contractAddress } from "./constants";

// Definisikan tipe untuk kandidat agar lebih mudah dikelola
type Candidate = {
  candidateName: string;
  voteCount: bigint;
};

export default function Home() {
  // State untuk koneksi & kontrak
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  // State untuk data dari blockchain
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ownerAddress, setOwnerAddress] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  // Fungsi untuk mereset state ketika dompet terputus
  const resetWalletState = useCallback(() => {
    setSigner(null);
    setWalletAddress(null);
    setContract(null);
    setOwnerAddress(null);
    setIsOwner(false);
    setCandidates([]);
  }, []);

  // Fungsi untuk menginisialisasi aplikasi setelah mendapat provider
  const initializeApp = useCallback(async (provider: BrowserProvider) => {
    try {
      const newSigner = await provider.getSigner();
      setSigner(newSigner);

      const newAddress = await newSigner.getAddress();
      setWalletAddress(newAddress);
      
      const votingContract = new Contract(contractAddress, contractABI, newSigner);
      setContract(votingContract);

      const owner = await votingContract.getOwnerAddress();
      setOwnerAddress(owner);

    } catch (error) {
        console.error("Gagal inisialisasi aplikasi:", error);
        resetWalletState();
    }
  }, [resetWalletState]);

  // Handler untuk event accountsChanged
  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      // Pengguna memutus koneksi dompet dari MetaMask
      alert("Koneksi dompet terputus. Silakan hubungkan kembali.");
      resetWalletState();
    } else {
      // Pengguna berganti akun
      console.log("Akun diganti ke:", accounts[0]);
      // Re-inisialisasi aplikasi dengan akun baru
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      initializeApp(provider);
    }
  }, [initializeApp, resetWalletState]);
  
  // useEffect untuk memasang dan membersihkan event listener
  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      ethereum.on('accountsChanged', handleAccountsChanged);

      // Cleanup listener saat komponen unmount
      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [handleAccountsChanged]);


  // Fungsi untuk menghubungkan dompet
  const connectWallet = async () => {
    if ((window as any).ethereum == null) {
      alert("MetaMask tidak terinstal. Silakan install MetaMask.");
      return;
    }
    try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        // Meminta pengguna untuk menghubungkan akun mereka
        await provider.send("eth_requestAccounts", []);
        initializeApp(provider);
    } catch (error) {
      console.error("Gagal menghubungkan dompet:", error);
    }
  };

  // useEffect untuk mengecek apakah user yang terhubung adalah owner
  useEffect(() => {
    if (walletAddress && ownerAddress) {
      setIsOwner(walletAddress.toLowerCase() === ownerAddress.toLowerCase());
    } else {
      setIsOwner(false);
    }
  }, [walletAddress, ownerAddress]);

  // useEffect untuk mengambil data kandidat ketika kontrak sudah tersedia
  useEffect(() => {
    if (contract) {
      fetchCandidates();
    }
  }, [contract]);

  // Fungsi untuk mengambil data kandidat dari smart contract
  const fetchCandidates = async () => {
    if (!contract) return;
    setIsLoading(true);
    try {
      const candidatesData = await contract.getAllCandidates();
      const formattedCandidates = candidatesData.map((candidate: any) => ({
        candidateName: candidate.candidateName,
        voteCount: candidate.voteCount
      }));
      setCandidates(formattedCandidates);
    } catch (error) {
      console.error("Gagal mengambil data kandidat:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fungsi untuk memberikan suara
  const handleVote = async (candidateId: number) => {
    if (!contract) {
      alert("Kontrak tidak terinisialisasi.");
      return;
    }
    try {
      const tx = await contract.vote(candidateId);
      alert("Memproses transaksi... Mohon tunggu.");
      await tx.wait(); 
      alert(`Suara Anda untuk kandidat #${candidateId + 1} berhasil!`);
      fetchCandidates(); 
    } catch (error: any) {
      console.error("Gagal memberikan suara:", error);
      alert(`Error: ${error.reason || error.message}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-slate-900 text-white">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Aplikasi Voting Terdesentralisasi
        </h1>
        <p className="text-slate-400 mb-8">Pilih kandidat favorit Anda di blockchain!</p>

        <ConnectWalletButton 
          walletAddress={walletAddress} 
          connectWallet={connectWallet} 
        />
        
        {isOwner && contract && (
          <AdminPanel contract={contract} onAdminAction={fetchCandidates} />
        )}
        
        {walletAddress && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Daftar Kandidat</h2>
              <button onClick={fetchCandidates} disabled={isLoading} className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50">
                {isLoading ? 'Merefresh...' : 'Refresh Data'}
              </button>
            </div>
            {isLoading && candidates.length === 0 ? (
              <p>Memuat data kandidat...</p>
            ) : candidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((candidate, index) => (
                  <div key={index} className="bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col justify-between text-left">
                    <div>
                      <h3 className="text-2xl font-semibold text-purple-300">{candidate.candidateName}</h3>
                      <p className="text-slate-300 mt-2">Jumlah Suara: <span className="font-bold text-xl text-white">{candidate.voteCount.toString()}</span></p>
                    </div>
                    <button 
                      onClick={() => handleVote(index)}
                      className="mt-6 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      Pilih Kandidat Ini
                    </button>
                  </div>
                ))}
              </div>
            ) : (
                <p>Belum ada kandidat yang ditambahkan.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}