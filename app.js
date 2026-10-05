console.log("Praktikum Dimulai");

// aktivitas 1 -> DOM Selection: menangkap elemen sebelum memanipulasi HTML
// ambil elemen -> simpan di dalam variabel javascript 

// 1. ambil elemen judul berdasarkan id 
// document.getElementById("......"); -> ambil elemen html spesifik berdasarkan id
const judulUtama = document.getElementById("judul-utama");

// 1.1 querySelector(#........) -> mengambil id berdasrakan atribut id
// tanda (#) yaitu untuk menampilkan id, sedangkan tanda (.) untuk menampilkan class
// ambil elemen sub judul berdasarkan id    
const subJudul = document.querySelector("#sub-judul");

// 4. mengambil elemen pada kartu 2 (fitur catatan dinamis / todolist)
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");
const daftarTugas = document.getElementById("daftar-tugas");
const jumlahTugas = document.getElementById("jumlah-tugas");
const totalStatistik = document.getElementById("total-statistik");
const selesaiStatistik = document.getElementById("selesai-statistik");
const belumStatistik = document.getElementById("belum-statistik");
const pesanKosong = document.getElementById("pesan-kosong");

// aktivitas 3 & 4: membuat catatan dinamis (todolist) dan menghitung jumlah catatan (pada kartu 2)
// di bagian ini kita belajar elemen HTML baru (<li>) secara dinamis menggunakan javascript
// lalu mengisi teksnya, memberi tombol hapus, lalu menempelkannya kedalam layar <ul>

// langkah 1: membuat variabel untuk menampung jumlah catatan
// 'let' digunakan karena nilainya akan berubah-ubah
let totalTugas = 0;

// langkah 2: membuat fungsi untuk menambahkan tugas baru
// fungsi ini adalah kumpulan perintah yang diberi nama. kita bisa memanggilnya kapanpun kita mau
function perbaruiJumlah() {
    // masukkan angka totalTugas ke dalam HTML
    jumlahTugas.innerText = totalTugas;

    // percabangan kondisi: apakah tugasnya 0?
    if (totalTugas === 0) {
        // jika 0, hapus class "hidden" agar pesan "tidak ada tugas" muncul
        pesanKosong.classList.remove("hidden");
    } else {
        // jika tidak 0, tambahkan class "hidden" agar pesan "tidak ada tugas" hilang
        pesanKosong.classList.add("hidden");
    }
}

// langkah 3: membuat fungsi untuk menambahkan tugas baru
function tambahTugas() {
    // 3.1 ambil teks dari input tugas
    // .trim() -> menghapus spasi kosong di awal dan akhir teks
    const isiTeks = inputTugas.value.trim();

    // 3.2 validasi input: jika teks kosong (" "), tampilkan alert dan hentikan fungsi
    if (isiTeks === "") {
        alert("Tugas tidak mungkin kosong, ayo masukkan tugasmu!");
        return; // hentikan fungsi jika input kosong
    }

    // 3.3 createElement("li") -> membuat elemen <li> baru hanya di javascript
    const liBaru = document.createElement("li");
    liBaru.className = "note-list"; // menambahkan class pada elemen <li> baru
    
    // 3.4 mengisi teks catatan baru dengan cara innerHTML mengisi <li> dengan teks dan tombol hapus
    // tanda Backtick (`) digunakan agar bisa menulis teks multi baris dan menyisipkan variabel di dalamnya menggunakan ${variabel}
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 menambahkan event listener pada tombol hapus pada item <li>
    //querySelector(".btn-hapus") -> mengambil tombol hapus pada <li> baru
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function() {
        // menghapus elemen <li> dari daftar catatan
        liBaru.remove(); // mengurangi total catatan
        totalTugas--; // memperbarui jumlah tugas di layar
        perbaruiJumlah();
        console.log('DOM Tugas "${isiTeks}" telah dihapus!');
    })

    //  3.6 .appendChild(liBaru) -> menempelkan elemen <li> baru ke dalam <ul> daftar catatan
    daftarTugas.appendChild(liBaru);

    // 3.7 mengosongkan jumlah tugas dan memperbarui jumlah tugas di layar
    inputTugas.value = ""; // mengosongkan input tugas

    // 3.8 menambahkan total tugas dan memperbarui jumlah tugas di layar
    totalTugas++;
    perbaruiJumlah();

    console.log('DOM Tugas baru ditambahkan : "${isiTeks}"');
}

// langkah 4: menambahkan event listener pada tombol tambah tugas
// ketika tombol tambah diklik, jalankan fungsi tambahTugas()
btnTambah.addEventListener("click", function() {
    tambahTugas();
});

// langkah 5: event listener untuk menambahkan tugas ketika menekan tombol "Enter" pada keyboard
inputTugas.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        tambahTugas();
    }
});

function tambahTugas() {

    // Mengambil isi input
    const isiTeks = inputTugas.value.trim();

    // Mengecek apakah input kosong
    if (isiTeks === "") {
        alert("Tugas tidak mungkin kosong, ayo masukkan tugasmu!");
        return;
    }

    // Membuat elemen <li>
    const liBaru = document.createElement("li");
    liBaru.className = "task-item";


    // ==============================
    // MEMBUAT CHECKBOX
    // ==============================

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-tugas";


    // ==============================
    // MEMBUAT TEKS TUGAS
    // ==============================

    const teksTugas = document.createElement("span");
    teksTugas.textContent = isiTeks;


    // ==============================
    // MEMBUAT TOMBOL HAPUS
    // ==============================

    const btnHapus = document.createElement("button");
    btnHapus.textContent = "Hapus";
    btnHapus.className = "btn-hapus";


    // ==============================
    // MEMBUAT BAGIAN KIRI
    // ==============================

    const bagianKiri = document.createElement("div");
    bagianKiri.className = "task-content";

    bagianKiri.appendChild(checkbox);
    bagianKiri.appendChild(teksTugas);


    // ==============================
    // MEMASUKKAN SEMUA KE <li>
    // ==============================

    liBaru.appendChild(bagianKiri);
    liBaru.appendChild(btnHapus);

    daftarTugas.appendChild(liBaru);


    // ==============================
    // CHECKBOX TUGAS SELESAI
    // ==============================

checkbox.addEventListener("change", function () {

    if (checkbox.checked) {

        liBaru.classList.add("selesai");

    } else {

        liBaru.classList.remove("selesai");

    }

    // Update statistik setelah checkbox berubah
    perbaruiStatistik();

});


    // ==============================
    // TOMBOL HAPUS
    // ==============================

    btnHapus.addEventListener("click", function () {

        liBaru.remove();

        totalTugas--;

        perbaruiJumlah();

    });


    // ==============================
    // RESET INPUT
    // ==============================

    inputTugas.value = "";

    totalTugas++;

    perbaruiJumlah();

    console.log(`Tugas baru ditambahkan: "${isiTeks}"`);
}

function perbaruiStatistik() {

    // Mengambil semua tugas
    const semuaTugas = document.querySelectorAll(".task-item");

    // Menghitung total tugas
    const total = semuaTugas.length;

    // Menghitung tugas yang sudah selesai
    const tugasSelesai = document.querySelectorAll(
        ".task-item.selesai"
    ).length;

    // Menghitung tugas yang belum selesai
    const tugasBelumSelesai = total - tugasSelesai;


    // Menampilkan hasil ke HTML
    totalStatistik.innerText = total;
    selesaiStatistik.innerText = tugasSelesai;
    belumStatistik.innerText = tugasBelumSelesai;
}