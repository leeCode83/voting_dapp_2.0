// frontend/src/app/AdminPanel.tsx
'use client';

import { useState } from 'react';
import { Contract, ethers } from 'ethers';

type AdminPanelProps = {
  contract: Contract;
  onAdminAction: () => void; // Callback untuk merefresh data di halaman utama
};

export default function AdminPanel({ contract, onAdminAction }: AdminPanelProps) {
  // State untuk input form
  const [candidateName, setCandidateName] = useState('');
  const [voterAddress, setVoterAddress] = useState('');
  const [voterName, setVoterName] = useState('');

  // State untuk loading indicator
  const [isAddingCandidate, setIsAddingCandidate] = useState(false);
  const [isAddingVoter, setIsAddingVoter] = useState(false);

  // Handler untuk menambah kandidat
  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName) {
      alert('Nama kandidat tidak boleh kosong.');
      return;
    }
    setIsAddingCandidate(true);
    try {
      const tx = await contract.addCandidate(candidateName);
      await tx.wait();
      alert(`Kandidat "${candidateName}" berhasil ditambahkan!`);
      setCandidateName(''); // Reset input
      onAdminAction(); // Panggil callback untuk refresh data
    } catch (error: any) {
      console.error("Gagal menambah kandidat:", error);
      alert(`Error: ${error.reason || error.message}`);
    } finally {
      setIsAddingCandidate(false);
    }
  };

  // Handler untuk menambah pemilih (voter)
  const handleAddVoter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ethers.isAddress(voterAddress)) {
        alert('Alamat voter tidak valid.');
        return;
    }
    if (!voterName) {
        alert('Nama voter tidak boleh kosong.');
        return;
    }
    setIsAddingVoter(true);
    try {
      const tx = await contract.addVoter(voterAddress, voterName);
      await tx.wait();
      alert(`Voter "${voterName}" dengan alamat ${voterAddress} berhasil ditambahkan!`);
      setVoterAddress(''); // Reset input
      setVoterName(''); // Reset input
      onAdminAction(); // Panggil callback (opsional, jika Anda ingin refresh list voter)
    } catch (error: any) {
      console.error("Gagal menambah voter:", error);
      alert(`Error: ${error.reason || error.message}`);
    } finally {
      setIsAddingVoter(false);
    }
  };

  return (
    <div className="mt-12 p-6 bg-slate-800/50 border border-slate-700 rounded-lg w-full">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">Panel Admin</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Tambah Kandidat */}
        <form onSubmit={handleAddCandidate} className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Tambah Kandidat Baru</h3>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Nama Kandidat"
            className="p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isAddingCandidate}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:bg-slate-500 transition-colors"
          >
            {isAddingCandidate ? 'Menambahkan...' : 'Tambah Kandidat'}
          </button>
        </form>

        {/* Form Tambah Voter */}
        <form onSubmit={handleAddVoter} className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Tambah Voter Baru</h3>
          <input
            type="text"
            value={voterAddress}
            onChange={(e) => setVoterAddress(e.target.value)}
            placeholder="Alamat Voter (0x...)"
            className="p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            value={voterName}
            onChange={(e) => setVoterName(e.target.value)}
            placeholder="Nama Voter"
            className="p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isAddingVoter}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-slate-500 transition-colors"
          >
            {isAddingVoter ? 'Menambahkan...' : 'Tambah Voter'}
          </button>
        </form>
      </div>
    </div>
  );
}