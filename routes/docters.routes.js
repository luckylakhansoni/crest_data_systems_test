const router = require('express').Router();

const  {register, signin,} = require('../controllers/doctores.controller')

const { isAuthenticate} = require('../middleware/auth') // JWT middleware

router.post('/',  register);
router.post('/login', signin)





module.exports = router;
