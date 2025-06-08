'use client';

// Komponen ini sekarang lebih "dumb", hanya menampilkan UI berdasarkan props
type ConnectWalletButtonProps = {
  walletAddress: string | null;
  connectWallet: () => void;
};

export default function ConnectWalletButton({ walletAddress, connectWallet }: ConnectWalletButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-sm mx-auto my-8">
      {walletAddress ? (
        <div className="text-center w-full p-4 bg-green-900/50 border border-green-700 rounded-md">
          <p className="text-lg font-semibold text-green-300 mb-2">Dompet Terhubung!</p>
          <div className="bg-slate-900 p-2 rounded-md">
            <p className="text-xs text-slate-300 font-mono break-all">
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