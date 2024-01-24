const StudentController = require('../controllers/StudentController.js');
const express = require('express');
const router = express.Router();

// mendefinisikan route
router.get('/', (req, res) => {
    res.send('Hai Express!');
});

// Routing student
router.get('/students', StudentController.index);
router.post('/students', StudentController.store);
router.put('/students/:id', StudentController.update); // Menambahkan route untuk update
router.delete('/students/:id', StudentController.destroy); // Menambahkan route untuk delete

// export router
module.exports = router;
