// TODO 3: Import data students dari folder data/students.js
const students = require('../data/students.js'); // pastikan ekstensi .js

// Import express-validator untuk validasi input
const { body, validationResult } = require('express-validator');

// Membuat Class StudentController
class StudentController {
  index(req, res) {
    // TODO 4: Tampilkan data students
    const data = {
      message: "Menampilkan semua students",
      data: students,
    };

    res.json(data);
  }

  store(req, res) {
    // Middleware untuk memvalidasi input
    const validateInput = [
      body('nama').notEmpty().withMessage('Nama tidak boleh kosong'),
      // Tambahkan validasi lain jika diperlukan
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Lanjutkan dengan menyimpan data
    const { nama } = req.body;
    students.push(nama);
    
    const data = {
      message: `Menambahkan data student: ${nama}`,
      data: students,
    };

    res.json(data);
  }

  update(req, res) {
    const { id } = req.params;
    const { nama } = req.body;

    // TODO 6: Update data students
    // code here
    students[id] = nama;
    
    const data = {
      message: `Mengedit student id ${id}, nama ${nama}`,
      data: students,
    };

    res.json(data);
  }

  destroy(req, res) {
    const { id } = req.params;

    // TODO 7: Hapus data students
    students.splice(id, 1); // Hapus 1 elemen dimulai dari indeks id

    const data = {
      message: `Menghapus student id ${id}`,
      data: students,
    };

    res.json(data);
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;
