const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

//[GET] /user
router.get('/', userController.getAllUsers);

//[POST] /user
router.post('/', userController.createUser);

//[PUT] /user

router.put('/:id', userController.updateUser);

router.post('/login', userController.login);

//[DELETE] /user
router.delete('/:id', userController.deleteUser);

module.exports = router;