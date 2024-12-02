const jsonwebtoken = require('jsonwebtoken')
const models = require('../models')

const isLogeddin = (req ,res , next ) =>{
    try {
      if(!req.headers.authorization){
        res.status(400).json({message : '  لم يتم توفير رمز التحقق '})
      }

      const token = req.headers.authorization.split(" ")[1];
      const dencoded = jsonwebtoken.verify(token , process.env.JWT_SECRITE);
      req.currentUser = dencoded;
      next()
        
    } catch (e) {
        res.status(500).json(e.message)
        
    }  

}
module.exports = isLogeddin;