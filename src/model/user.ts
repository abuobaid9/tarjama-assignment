import { Sequelize } from 'sequelize';

const userModel = (sequelize:any,DataTypes:any)  => 
sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    last_login:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    }
  });

  export {userModel};