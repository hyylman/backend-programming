// import database
const db = require("../config/database");

// membuat class Model Student
class Student {
  /**
   * Membuat method static all.
   */
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from students";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
}

  static find(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM students WHERE id = ?";

        db.query(query, id, (err, results) => {
            if (err) reject(err);

            resolve(results[0]);
        });
    });
}

  /**
   * TODO 1: Buat fungsi untuk insert data.
   * Method menerima parameter data yang akan diinsert.
   * Method mengembalikan data student yang baru diinsert.
   */
    static async create(data) {
        return new Promise((resolve, reject) => {
        // add created_at and updated_at
            data.created_at = new Date();
            data.updated_at = new Date();
            const query = "INSERT INTO students SET ?";

            db.query(query, data, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
        const newStudentId = insertToDatabase.insertId;
        return await Student.find(newStudentId);
    }


static async update(id, data) {
    const updateToDatabase = await new Promise((resolve, reject) => {
        const query = "UPDATE students SET ? WHERE id = ?";
        data.updated_at = new Date();
        db.query(query, [data, id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });

    return await Student.find(id);
}

static async destroy(id) {
    const deleteToDatabase = await new Promise((resolve, reject) => {
        const query = "DELETE FROM students WHERE id = ?";
        db.query(query, id, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });

    return deleteToDatabase;
}
}

// export class Student
module.exports = Student;
