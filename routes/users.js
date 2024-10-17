const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController');



router.post('/insertUser', userController.insertUser)
router.post('/insertPost', userController.insertPost)
router.post('/insertImage', userController.insertImage)
router.post('/insertComment', userController.insertComment)

router.get('/getAll', userController.get)

router.get('/findPostAllData', userController.findPostAllData)
router.get('/findUserPostDataDetails', userController.findUserPostDataDetails)




module.exports = router;
