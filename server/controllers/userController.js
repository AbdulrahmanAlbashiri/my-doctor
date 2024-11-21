const bcrypt = require('bcryptjs')
const models = require('../models');

const jsonwebtoken = require('jsonwebtoken');



exports.regester = async (req , res ) => {
    const { name , email , password , usertype ,location , specialization , address , workingHours , phon } = req.body;

    try { 
        const hashPassword = await bcrypt.hash(password , 10)

        const user = await models.User.create({
            name,
            email,
            passowwrd: hashPassword,
            usertype,
            latitude : location.latitude,
            longitude : location.longitude
        })

        if(usertype === 'doctor'){
            const profile = await models.Profile.create({
                userId: user.id,
                specialization,
                address,
                workingHours,
                phon
            })
        }
        res.status(200).json({ message: ' تم اظافة المستخدم بنجاح'})
        
    } catch (e) {
        res.status(500).json(e)
        
    }
    
}

exports.login = async (req , res) => {
    const { email , password } = req.body

    try {
        const user = await models.User.findOne({where: {email}})

        if(!user) {
           return res.status(401).json({ message : ' البريد الالكتروني او كلمة غير صحيح'})
        }
         
        const authsuccess = await bcrypt.compare( password , user.passowwrd)

        if(!authsuccess) {
           return res.status(401).json({ message : ' البريد الالكتروني او كلمة غير صحيح'})
        }

        const token = jsonwebtoken.sign({ id: user.id , name : user.name , email : user.email} , process.env.JWT_SECRITE)

        res.status(200).json({accessToken: token})
    } catch (e) {
        
    }
}
exports.me = (req ,res ) =>{
    const user = req.currentUser
    res.json(user)

}
 
exports.getProfile = async (req , res ) => {
    try {
        const result = await models.User.findOne({
            where :{id : req.currentUser.id},
            include:[{model: models.Profile , as : "profile"}],
            attributes: {exclude:["password"]}
        })
        res.status(200).json(result)
        
    } catch (e) {
        res.status(500).json(e)
        
    }
}

exports.updateProfile = async (req , res ) => {
    const { name , email , password , usertype ,location , specialization , address , workingHours , phon } = req.body;

    try { 
        const hashPassword = await bcrypt.hash(password , 10)

        const user = await models.User.update({
            name,
            email,
            passowwrd: hashPassword,
            usertype,
            latitude : location.latitude,
            longitude : location.longitude
        },{where : {
            id: req.currentUser.id
          }})
          

        if(usertype === 'doctor'){
            const profile = await models.Profile.update({
                userId: user.id,
                specialization,
                address,
                workingHours,
                phon
            },
            {where: {userId: req.currentUser.id}})  
    }
        res.status(200).json({ message: ' تم تعديل المستخدم بنجاح'})
        
    } catch (e) {
        res.status(500).json(e)
        
    }
    
}

exports.deleteProfile = async (req, res) => {
    try {
      const user = await models.User.destroy({
        where: { id: req.currentUser.id }
      });
  
      res.status(200).json({
        message: "تم حذف الحساب بنجاح"
      });
    } catch (e) {
      res.status(500).json(e);
    }
  };