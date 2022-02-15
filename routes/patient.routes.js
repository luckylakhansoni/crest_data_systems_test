const router = require('express').Router();

const  {addPatient, updatePatient, DeletePatient, listPatient} = require('../controllers/doctores.controller')

const { isAuthenticate} = require('../middleware/auth') // JWT middleware

router.post('/',  isAuthenticate, addPatient);
router.put('/:id',  isAuthenticate, updatePatient);
router.delete('/:id', isAuthenticate, DeletePatient);
router.get('/all-patient', isAuthenticate, listPatient);








module.exports = router;
