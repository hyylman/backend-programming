const Student = require("../models/Students");
const { body, validationResult } = require('express-validator');

class StudentController {
  async index(req, res) {
    const students = await Student.all();

    let data;

    if (students && students.length > 0) {
      data = {
        message: "Menampilkan semua students",
        data: students,
      };
    } else {
      data = {
        message: "students kosong",
        data: students,
      };
    }

    res.status(200).json(data);
  }

  async store(req, res) {
    const { nama, nim, email, jurusan } = req.body;

    const student = {
      nama,
      nim,
      email,
      jurusan
    };

    if (nama == '' || nim == '' || email == '' || jurusan == '') {
      return res.status(400).json({
        errors: "Cek kembali datanya, jangan sampai ada yang kosong"
      });
    } else {
      const newStudent = await Student.create(student);
      const data = {
        message: "Menambahkan data student",
        data: newStudent,
      };

      res.json(data);
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const studentToUpdate = await Student.find(id);

    if (studentToUpdate) {
      const updatedStudent = await Student.update(id, req.body);
      const data = {
        message: `Mengedit data student`,
        data: updatedStudent,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Student not found`,
      };
      res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    const studentToDelete = await Student.find(id);

    if (studentToDelete) {
      await Student.destroy(id);
      const data = {
        message: `Menghapus data student`,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Student not found`,
      };
      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.find(id);

    if (student) {
      const data = {
        message: `Menampilkan detail students`,
        data: student,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Student not found`,
      };
      res.status(404).json(data);
    }
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;
