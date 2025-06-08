'use client';

import { ethers, type JsonRpcSigner } from "ethers";
import { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Aplikasi Voting Terdesentralisasi</h1>
      <ConnectWalletButton/>
    </main>
  );
}
