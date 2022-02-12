import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Meeting = db.define('Meeting', {
    IdMeeting:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Descriere:{
        type: Sequelize.STRING,
        allowNull: false,
        min:{
            args:[3],
            msg:"Descrierea trebuie sa aiba cel putin 3 caractere"
       }
    },
    Url:{
        type: Sequelize.STRING,
        allowNull: true,
        validate:{
            isUrl: true,
            defaultValue:"https://url.default"
       }

    },
    Data:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }   
})

export default Meeting;
