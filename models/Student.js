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

  /**
   * TODO 1: Buat fungsi untuk insert data.
   * Method menerima parameter data yang akan diinsert.
   * Method mengembalikan data student yang baru diinsert.
   */
  static create(data) {
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
  }
}

// export class Student
module.exports = Student;
