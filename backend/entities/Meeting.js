import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Meeting=db.define('Meeting',{

    MeetingID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Descriere:{
        type: Sequelize.STRING,
        allowNull: true,
        validate:{
           len:[3,500]
        },
        
    },
    Url:{
        type: Sequelize.STRING,
        allowNull: true,
        validate:{
            isUrl: true
        }
       
    },
    Date:{
        type:Sequelize.DATE,
        allowNull:true

    }

})

export default Meeting;