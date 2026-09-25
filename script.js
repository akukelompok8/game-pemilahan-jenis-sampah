// Data Pertanyaan (Total 10 Soal)
const daftarPertanyaan = [
    {
        tanya: "Sisa sayuran dan kulit buah termasuk jenis sampah apa?",
        opsi: ["Sampah Anorganik", "Sampah Organik", "Sampah B3", "Sampah Plastik"],
        benar: 1 
    },
    {
        tanya: "Botol plastik bekas minuman sebaiknya diolah bagaimana agar bernilai ekonomi?",
        opsi: ["Dibuang ke sungai", "Dibakar di halaman", "Dicuci dan dijual ke Bank Sampah", "Dikubur di tanah"],
        benar: 2 
    },
    {
        tanya: "Minyak jelantah bekas gorengan bisa diolah menjadi apa?",
        opsi: ["Sabun atau Biodiesel", "Pupuk kompos", "Pakan ternak", "Bahan bangunan"],
        benar: 0 
    },
    {
        tanya: "Sampah organik adalah...",
        opsi: ["Plastik", "Kertas", "Kaca", "Besi"],
        benar: 1 
    },
    {
        tanya: "Sampah anorganik contohnya...",
        opsi: ["Daun kering", "Botol plastik", "Kulit buah", "Sisa sayur"],
        benar: 1 
    },
    {
        tanya: "Tujuan memilah sampah adalah...",
        opsi: ["Menambah sampah", "Memudahkan pengolahan", "Mengotori lingkungan", "Membakar sampah"],
        benar: 1 
    },
    {
        tanya: "Tempat membuang sampah yang benar adalah...",
        opsi: ["Sungai", "Kebun", "Tempat sampah", "Jalan"],
        benar: 2 
    },
    {
        tanya: "Membakar sampah sembarangan dapat menyebabkan...",
        opsi: ["Udara bersih", "Polusi udara", "Tanaman subur", "Air jernih"],
        benar: 1 
    },
    {
        tanya: "Siapa yang bertanggung jawab menjaga kebersihan desa?",
        opsi: ["Ketua RT", "Petugas kebersihan", "Semua warga", "Kepala desa"],
        benar: 2 
    },
    {
        tanya: "Gotong-royong dalam membersihkan desa sebaiknya dilakukan...",
        opsi: ["Sekali setahun", "Sekali seumur hidup", "Setiap hari", "Secara berkala/rutin"],
        benar: 3 
    }
];

let indexPertanyaan = 0;
let skor = 0;
let namaPeserta = "";

function mulaiKuis() {
    namaPeserta = document.getElementById("nama").value;
    if (namaPeserta.trim() === "") {
        alert("Harap isi nama terlebih dahulu!");
        return;
    }
    document.getElementById("form-nama").style.display = "none";
    document.getElementById("area-kuis").style.display = "block";
    tampilkanPertanyaan();
}

function tampilkanPertanyaan() {
    const q = daftarPertanyaan[indexPertanyaan];
    document.getElementById("pertanyaan-teks").innerText = (indexPertanyaan + 1) + ". " + q.tanya;
    
    let htmlOpsi = "";
    q.opsi.forEach((opsi, index) => {
        htmlOpsi += `<div class="pilihan" onclick="pilihJawaban(${index})">${opsi}</div>`;
    });
    document.getElementById("pilihan-jawaban").innerHTML = htmlOpsi;
}

function pilihJawaban(indexJawaban) {
    // Cek jawaban
    if (indexJawaban === daftarPertanyaan[indexPertanyaan].benar) {
        skor++;
    }
    pertanyaanSelanjutnya();
}

function pertanyaanSelanjutnya() {
    indexPertanyaan++;
    if (indexPertanyaan < daftarPertanyaan.length) {
        tampilkanPertanyaan();
    } else {
        tampilkanHasil();
    }
}

function tampilkanHasil() {
    document.getElementById("area-kuis").style.display = "none";
    document.getElementById("area-hasil").style.display = "block";
    
    document.getElementById("nama-di-sertifikat").innerText = namaPeserta;
    
    const total = daftarPertanyaan.length;
    const batasLulus = 7; // Minimal harus benar 7 soal (70%) untuk dapat sertifikat

    document.getElementById("teks-skor").innerText = `Skor kamu: ${skor} dari ${total}`;

    // LOGIKA KELULUSAN
    if (skor >= batasLulus) {
        // Jika LULUS
        document.getElementById("sertifikat").style.display = "flex";
        document.getElementById("btn-download").style.display = "block";
        document.getElementById("pesan-status").innerText = " Selamat! Kamu berhak mendapatkan Sertifikat Warga Peduli Sampah.";
        document.getElementById("pesan-status").style.color = "#16a34a"; // Warna hijau
    } else {
        // Jika GAGAL
        document.getElementById("sertifikat").style.display = "none";
        document.getElementById("btn-download").style.display = "none";
        document.getElementById("pesan-status").innerText = "⚠️ Yah, skor kamu belum mencukupi (minimal 7). Yuk pelajari lagi dan coba ulang!";
        document.getElementById("pesan-status").style.color = "#dc2626"; // Warna merah
    }

    // Set tanggal hari ini
    const today = new Date();
    document.getElementById("tanggal-sertifikat").innerText = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function downloadSertifikat() {
    const sertifikatElement = document.getElementById("sertifikat");
    
    html2canvas(sertifikatElement).then(canvas => {
        const link = document.createElement('a');
        link.download = `Sertifikat_${namaPeserta.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}