const { body , validationResult } = require('express-validator')

const userValidatorRules = () => {
   return [
    body('name').notEmpty().withMessage('يجب ادخال الاسم'),    
    body('email').notEmpty().withMessage('يجب ادخال البريد الالكتروني '),
    body('email').isEmail().withMessage('يجب ادخال بريد الكتروني صحيح'),
    body('password').notEmpty().withMessage('يجب ادخال كلمة المرور  '),
    body('password').isLength({min: 5}).withMessage('كلمةالمرور يجب ان تكون 5 حروف على الاقل')
   ]
}

const validate = (req, res , next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
       
    }

    const extracteError = []
        errors.array().map(err => extracteError.push(
           { [err.path]: err.msg}
        ))
     return res.status(400).json({errors: extracteError})  


}
 module.exports = {
        userValidatorRules,
        validate
    }