import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Participant=db.define('Participant',{

    ParticipantID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nume:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
           len:[5,50]
        }
        
    },
    MeetingID:{
        type: Sequelize.INTEGER,
        allowNull:false

    }

})

export default Participant;