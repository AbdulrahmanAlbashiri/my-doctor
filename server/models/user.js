const {Sequelize} = require('sequelize')
const db = require('./database')

const User = db.define('user', {
    name: {
        type: Sequelize.DataTypes.STRING
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        unique:true
    },
    passowwrd: {
        type: Sequelize.DataTypes.STRING
    },
    usertype: {
        type: Sequelize.DataTypes.ENUM('doctor' , 'normal' )
    },
    latitude: {
        type: Sequelize.DataTypes.FLOAT
    },
    longitude: {
        type: Sequelize.DataTypes.FLOAT
    }
})

User.associate = models => {
    User.hasOne(models.Profile)    
}
 
module.exports = User