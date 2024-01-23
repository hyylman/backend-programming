// TODO 3: Import data students dari folder data/students.js
const students = require('../models/students.js'); // pastikan ekstensi .js

// Import express-validator untuk validasi input
const { body, validationResult } = require('express-validator');

// Membuat Class StudentController
const Student = require("../models/Students");

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.all();
      const data = {
        message: "Menampilkan semua students",
        data: students,
      };
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  async store(req, res) {
    try {
      const { nama, nim, email, jurusan } = req.body;
      const student = { nama, nim, email, jurusan };
      
      const newStudent = await Student.create(student);

      const data = {
        message: "Menambahkan data student",
        data: newStudent,
      };

      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
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
