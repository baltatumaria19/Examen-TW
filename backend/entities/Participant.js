import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Participant = db.define('Participant', {
    ParticipantId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nume:{
        type: Sequelize.STRING,
        allowNull: false,
        min:{
            args:[5],
            msg:"Numele trebuie sa aiba cel putin 5 caractere"
       }
    },   
    IdMeeting:
    {
        type: Sequelize.INTEGER,      
        allowNull: false
    }
})

export default Participant;
