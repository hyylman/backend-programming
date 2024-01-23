/**
 * Fungsi untuk menampilkan hasil download
 * @param {string} result - Nama file yang didownload
 */
const showDownload = async (result) => {
    console.log("Download completed");
    console.log(`Download results: ${result}`);
};

/**
 * Fungsi untuk download file
 * @returns {Promise<string>} - Promise yang menghasilkan nama file yang didownload
 */
const download = async () => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const result = "windows-10.exe";
            resolve(result);
        }, 3000);
    });
};

// Menggunakan async/await untuk menangani hasil download
const handleDownload = async () => {
    try {
        const result = await download();
        showDownload(result);
    } catch (error) {
        console.error("Download failed:", error);
    }
};

// Memanggil fungsi handleDownload
handleDownload();
