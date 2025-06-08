# Aplikasi Voting Terdesentralisasi (Decentralized Voting dApp)

[![React][React-shield]][React-url]
[![Next.js][Next.js-shield]][Next.js-url]
[![Solidity][Solidity-shield]][Solidity-url]
[![MIT License][License-shield]][License-url]

## Suara Anda, Aman dan Transparan di Atas Blockchain

![Screenshot Aplikasi Voting](https://i.imgur.com/rM7gszQ.png)
*(Catatan: Anda bisa mengganti link di atas dengan screenshot aplikasi Anda sendiri setelah berjalan)*

Selamat datang di proyek Aplikasi Voting Terdesentralisasi! Ini adalah sebuah aplikasi web3 (dApp) yang dibangun untuk menunjukkan bagaimana proses pemilihan dapat dilakukan secara aman, transparan, dan tidak dapat diubah (immutable) dengan memanfaatkan teknologi blockchain Ethereum.

Proyek ini adalah hasil dari proses belajar dan eksplorasi dalam membangun dApp dari awal, mulai dari penulisan *smart contract* hingga pengembangan antarmuka (frontend) yang interaktif.

---

## 🚀 Fitur Utama

-   **Koneksi Dompet:** Terintegrasi dengan MetaMask untuk menghubungkan dompet Ethereum pengguna dengan mudah.
-   **Deteksi Perubahan Akun:** Aplikasi secara otomatis mendeteksi jika pengguna mengganti akun di MetaMask dan memperbarui tampilan secara *real-time*.
-   **Daftar Kandidat Dinamis:** Menampilkan daftar kandidat langsung dari data yang tersimpan di *smart contract*.
-   **Proses Voting On-Chain:** Pengguna dapat memberikan suara, dan setiap suara akan dicatat sebagai transaksi di blockchain.
-   **Panel Admin Khusus Owner:**
    -   Hanya pemilik kontrak yang dapat melihat dan mengakses panel admin.
    -   **Tambah Kandidat:** Pemilik dapat menambahkan kandidat baru langsung dari antarmuka.
    -   **Tambah Voter:** Pemilik dapat mendaftarkan alamat dompet yang berhak untuk memilih (whitelist).
-   **Antarmuka Responsif:** Dibangun dengan antarmuka yang modern dan nyaman digunakan di berbagai ukuran layar.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi modern di ekosistem web3 dan web2:

-   **Smart Contract**:
    -   [Solidity][Solidity-url]: Bahasa pemrograman untuk menulis *smart contract*.
-   **Frontend**:
    -   [Next.js][Next.js-url]: Framework React untuk aplikasi web modern.
    -   [React][React-url]: Pustaka JavaScript untuk membangun antarmuka pengguna.
    -   [TypeScript][TypeScript-url]: Menambahkan tipe statis pada JavaScript untuk kode yang lebih solid.
    -   [Ethers.js][Ethers-url]: Pustaka untuk berinteraksi dengan blockchain Ethereum.
    -   [Tailwind CSS][Tailwind-url]: Framework CSS untuk desain yang cepat dan modern.

---

## 🏁 Memulai Proyek Secara Lokal

Untuk menjalankan proyek ini di mesin lokal Anda, ikuti langkah-langkah berikut:

### Prasyarat

-   [Node.js](https://nodejs.org/en/) (v18 atau lebih baru)
-   `npm` atau `yarn`
-   Ekstensi [MetaMask](https://metamask.io/) di browser Anda

### Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone [URL_GITHUB_ANDA]
    cd frontend
    ```

2.  **Install semua dependensi:**
    ```bash
    npm install
    ```

3.  **Deploy Smart Contract:**
    -   Deploy `smart contract` yang ada di direktori `/contract` ke jaringan tes seperti Sepolia, atau jaringan lokal (Hardhat/Anvil).
    -   Setelah deployment berhasil, Anda akan mendapatkan **alamat kontrak**.

4.  **Konfigurasi Frontend:**
    -   Buka file `frontend/src/app/constants/index.ts`.
    -   Ganti placeholder `"PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE"` dengan alamat kontrak yang Anda dapatkan dari langkah sebelumnya.
    ```typescript
    // src/app/constants/index.ts
    export const contractAddress = "0xYourDeployedContractAddressHere";
    ```

5.  **Jalankan Server Pengembangan:**
    ```bash
    npm run dev
    ```

6.  **Buka Aplikasi:**
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda. Pastikan MetaMask Anda terhubung ke jaringan yang sama tempat Anda men-deploy kontrak.

---

## 🙌 Berkontribusi dan Memberi Masukan

Proyek ini adalah sebuah perjalanan belajar. Saya sangat terbuka untuk segala bentuk kontribusi, saran, dan ide untuk peningkatannya. Jika Anda menemukan bug, memiliki ide fitur baru, atau ingin memperbaiki bagian kode, jangan ragu untuk:

1.  **Membuat Issue:** Jelaskan bug atau ide Anda di bagian "Issues" repositori ini.
2.  **Fork dan Buat Pull Request:** Lakukan perubahan yang Anda inginkan dan ajukan *Pull Request*.

Setiap masukan sangat saya hargai!

---

## 📄 Lisensi

Proyek ini berada di bawah Lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

[License-shield]: https://img.shields.io/github/license/leecode83/voting_dapp_2.0?style=for-the-badge
[License-url]: https://github.com/leecode83/voting_dapp_2.0/blob/main/LICENSE
[Next.js-shield]: https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white
[Next.js-url]: https://nextjs.org/
[React-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Solidity-shield]: https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black
[Solidity-url]: https://soliditylang.org/
[TypeScript-url]: https://www.typescriptlang.org/
[Ethers-url]: https://ethers.io/
[Tailwind-url]: https://tailwindcss.com/
