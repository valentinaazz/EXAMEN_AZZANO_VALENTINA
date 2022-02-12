import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';
import db from './dbConfig.js';
import {DB_USERNAME, DB_PASSWORD} from './Const.js';
import Meeting from './entities/Meeting.js';
import Participant from './entities/Participant.js';
import LikeOp from './Operators.js';
import Sequelize from 'sequelize';
import fs from 'fs';

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

let conn;

// mysql.createConnection({
//     user: DB_USERNAME,
//     password: DB_PASSWORD
// })
// .then(connection => {
//     conn = connection;
//     return connection.query("CREATE DATABASE IF NOT EXISTS Conferinta");
// })
// .then(() => {
//     return conn.end();
// })
// .catch((err) => {
//     console.warn(err.stack);
// })

// DEFINIREA RELATIEI DINTRE CELE DOUA ENTITATI
Meeting.hasMany(Participant, {as:"Participanti",foreignKey:"MeetingID"});
Participant.belongsTo(Meeting, {foreignKey:"MeetingID"});

db.sync();

// GET PRIMA ENTITATE----------------------------------------------------------------------

async function getMeeting(){
    return await Meeting.findAll();
}

router.route('/meeting').get(async (req,res)=>{
    return res.json(await getMeeting());
})

async function getMeetingByID(id){
    return await Meeting.findByPk(id);
}

router.route('/meeting/:id').get(async (req,res)=>{
    return res.json(await getMeetingByID(req.params.id));
})

// GET A DOUA ENTITATE CA SUBRESURSA----------------------------------------------------------------------
async function getMeetingP(){
    return await Meeting.findAll({include:["Participanti"]});
}

router.route('/meetingP').get(async (req,res)=>{
    return res.json(await getMeetingP());
})


async function getMeetingByIDP(id){
    return await Meeting.findByPk(id,{include:["Participanti"]});
}

router.route('/meetingP/:id').get(async (req,res)=>{
    return res.json(await getMeetingByIDP(req.params.id));
})

async function getParticipantByID(id){
    return await Participant.findByPk(id);
}

router.route('/participant/:id').get(async (req,res)=>{
    return res.json(await getParticipantByID(req.params.id));
})

// POST PRIMA ENTITATE----------------------------------------------------------------------
async function createMeeting(meeting){
    return await Meeting.create(meeting);

}

router.route('/meeting').post(async (req,res)=>{
    return res.send(201).json(await createMeeting(req.body));
})

// POST A DOUA ENTITATE CA SUBRESURSA----------------------------------------------------------------------

async function createMeetingP(meeting){
    return await Meeting.create(meeting,{include:[{model:Participant,as:"Participanti"}]});

}

router.route('/meetingP').post(async (req,res)=>{
    return res.send(201).json(await createMeetingP(req.body));
})



// PUT PRIMA ENTITATE----------------------------------------------------------------------

async function updateMeeting(id,meeting){
    if (parseInt(id) !== meeting.MeetingID){
        console.log("Id-ul entitatii difera");
        return;
    }

    let updateEntity = await getMeetingByID(id);

    if (!updateEntity){
        console.log("Nu exista meetingul cu id-ul specificat");
        return;
    }

    return await updateEntity.update(meeting);

}


router.route('/meeting/:id').put(async(req,res)=>{
    try{
        return res.json(await updateMeeting(req.params.id, req.body));
  
    }   
    catch(e){
        console.log(e.message);
    }
})

// PUT A DOUA ENTITATE CA SUBRESURSA----------------------------------------------------------------------

async function updateMeetingP(id,meeting){
    if (parseInt(id) !== meeting.MeetingID){
        console.log("Id-ul entitatii difera");
        return;
    }

    let updateEntity = await getMeetingByIDP(id);

    if (!updateEntity){
        console.log("Nu exista meetingul cu id-ul specificat");
        return;
    }

    return await updateEntity.update(meeting,{include:[{model:Participant,as:"Participanti"}]});

}


router.route('/meetingP/:id').put(async(req,res)=>{
    try{
        return res.json(await updateMeetingP(req.params.id, req.body));
  
    }   
    catch(e){
        console.log(e.message);
    }
})


// DELETE PRIMA ENTITATE + A DOUA ENTITATE----------------------------------------------------------------------

async function deleteMeeting(id){
    let deleteEntity = await getMeetingByID(id);

    if (!deleteEntity){
        console.log("Nu exista meetingul cu id-ul specificat");
        return;
    }

    return await deleteEntity.destroy();
}

router.route('/meeting/:id').delete(async(req, res) => {
    try{
        return res.json(await deleteMeeting(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})


async function deleteParticipant(id){
    let deleteEntity = await getParticipantByID(id);

    if (!deleteEntity){
        console.log("Nu exista participantul cu id-ul specificat");
        return;
    }

    return await deleteEntity.destroy();
}

router.route('/participant/:id').delete(async(req, res) => {
    try{
        return res.json(await deleteParticipant(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})

// FILTRARE DUPA DESCRIERE SI URL
async function filterMeetings(filter){
    let whereClause={};
    if(filter.descriere){
        whereClause.Descriere = {[LikeOp]: `%${filter.descriere}%`};
    }
    if(filter.url){
        whereClause.Url = {[LikeOp]: `%${filter.url}%`};
    }

    return await Meeting.findAll({where:whereClause});
}

router.route('/filter').get(async (req, res) => {
    return res.json(await filterMeetings(req.query));
})

//SORTARE ALFABETICA DUPA URL
async function sortMeetings(){
    return await Meeting.findAll({
         order: Sequelize.literal('url ASC')
    });
}
router.route('/sort').get(async (req,res)=>{
    return res.json(await sortMeetings());
})

// PAGINARE
async function pagination(){
    return await Meeting.findAll({limit:2});
}

router.route('/pagination').get(async (req,res)=>{
    return res.json(await pagination());
})

JSON.safeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(
      obj,
      (key, value) =>
        typeof value === "object" && value !== null
          ? cache.includes(value)
            ? undefined 
            : cache.push(value) && value 
          : value,
      indent
    );
    cache = null;
    return retVal;
  };
  

  let exportData=JSON.safeStringify(db);
  fs.writeFileSync('export.json',exportData);

  router.route('/exp').get(async (req,res)=>{
    return res.json(exportData);
})

let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);