const express = require('express');
const userController = require('../controllers/userController')
const { userValidatorRules , validate } = require('../middlewares/validator')
const isLogeddin = require('../middlewares/auth')
const doctorController = require('../controllers/porfileController')

const router = express.Router();

router.get('/' , ( req , res ) => {
    res.json({message : " hillo worled ! " })
})

//user routes
router.post("/account/signup" , userValidatorRules(), validate , userController.regester)
router.post("/account/login" ,  userController.login) 
router.get("/account/me" , isLogeddin, userController.me)
router.get("/account/profile" , isLogeddin, userController.getProfile)
router.put('/account/update-profile', isLogeddin, userController.updateProfile);
router.delete('/account/delete-profile', isLogeddin, userController.deleteProfile);

///Doctor Routes
router.get("/doctors" , doctorController.index)

module.exports = router;