'use client';

import { ethers, type JsonRpcSigner } from "ethers";
import { useState } from "react";

export default function ConnectWalletButton() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  async function connectWallet() {
    try {
        let provider;

        if ((window as any).ethereum == null) {
          console.log("MetaMask not installed; using read-only defaults")
          provider = ethers.getDefaultProvider()
        } else {
          provider = new ethers.BrowserProvider((window as any).ethereum)
          const newSigner = await provider.getSigner();
          const newAddress = await newSigner.getAddress();
          setWalletAddress(newAddress);
          setSigner(newSigner);
          console.log("Berhasil")
        }
      } catch (error) {
          console.log(error);
      }
    }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-lg shadow-xl w-full max-w-sm mx-auto my-8">
      {walletAddress ? (
        <div className="text-center w-full p-6 bg-green-700 rounded-md">
          <p className="text-xl font-semibold text-white mb-3">Dompet Terhubung!</p>
          <div className="bg-slate-900 p-3 rounded-md shadow-inner">
            <p className="text-sm text-green-400 font-mono break-all">
              {walletAddress}
            </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={connectWallet}
          className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          Hubungkan Dompet MetaMask
        </button>
      )}
    </div>
  );
}
