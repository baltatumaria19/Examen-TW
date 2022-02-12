import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import {DB_USERNAME, DB_PASSWORD} from './Consts.js';
import db from './dbConfig.js';
import Meeting from './entities/Meeting.js';
import Participant from './entities/Participant.js';
import Sequelize from 'sequelize';
//import {Egal, MaiMicSauEgal} from './Operators.js';

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

let conn;

mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
.then(connection => {
    conn = connection;
    return connection.query("CREATE DATABASE IF NOT EXISTS BDMeeting")
})
.then(() => {
    return conn.end();
})
.catch(err => {
    console.warn(err.stack)
})

Meeting.hasMany(Participant, {as : "Participanti", foreignKey: "IdMeeting"});
Participant.belongsTo(Meeting, {foreignKey: "IdMeeting"});

db.sync();

async function createMeeting(meeting){
    return await Meeting.create(meeting)
}

async function getMeeting(){
    return await Meeting.findAll({include: ["Participanti"]});
}
async function getMeetingById(id){
    return await Meeting.findByPk(id, {include: ["Participanti"]});
}
async function createParticipant(participant){
    let meeting = await getMeetingById(participant.IdMeeting);
    console.log(meeting);
    if(!meeting)
    { 
        console.log("There isn't a meeting with this id");
        return ;
    }
    return await Participant.create(participant)
}
async function getParticipantById(IdMeeting,idParticipant){
    let participant=await Participant.findByPk(idParticipant);
    if(IdMeeting!=participant.IdMeeting)
    {
        console.log("This participant does not belong to this meeting");
        return ;
    }
    return participant;
}

async function updateMeeting(id, meeting){
    if (parseInt(id) !== meeting.IdMeeting){
        console.log(meeting)
        console.log("Entity id diff");
        return;
    }

    let updateEntity = await getMeetingById(id);

    if (!updateEntity){
        console.log("There isn't a meeting with this id");
        return;
    }

    return await updateEntity.update(meeting);
}

async function updateParticipant(idMeeting,idParticipant, participant){
    if (parseInt(idParticipant) !== participant.ParticipantId){
        console.log("Entity id diff");
        return;
    }

    let meeting = await getMeetingById(idMeeting);
    //console.log(playlist);
    if(!meeting)
    {
        console.log("There isn't a meeting with this id");
        return ;
    }
     
    let updateEntity = await getParticipantById(idMeeting,idParticipant);

    if (!updateEntity){
        console.log("There isn't a participant with this id");
        return;
    }
   
    return await updateEntity.update(participant);
}
async function deleteParticipant(idMeeting,idParticipant){
   
    let deleteEntity = await getParticipantById(idMeeting,idParticipant);
    
    if (!deleteEntity){
        console.log("There isn't a participant with this id");
        return;
    }
    if (deleteEntity.IdMeeting!=idMeeting){
        console.log("The participant does not belong to this meeting");
        return;
    }
    return await deleteEntity.destroy();
}
async function deleteMeeting(id){
   
    let deleteEntity = await getMeetingById(id);

    if (!deleteEntity){
        console.log("There isn't a meeting with this id");
        return;
    }
    let deleteParticipanti = deleteEntity.Participanti;
    for(let participant in deleteParticipanti)
       deleteParticipant(participant.ParticipantId);
    return await deleteEntity.destroy();
}
//creare baza de date
router.route('/create').get(async(req, res) => {
    try{
        await db.sync();
        res.status(201).json({message: "created"})
    } catch( err){
        console.warn(err.stack)
        res.status(500).json({message: "Internal server error"})
    }
})
//creare playlist
router.route('/meeting').post(async(req, res) => {
    try{
        return res.json(await createMeeting(req.body));
    }
    catch(e){
        console.log(e.message);
    }
})
//creare song
router.route('/participant').post(async(req, res) => {
    try{
        return res.json(await createParticipant(req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/meeting').get(async(req, res) => {
    try{
        return res.json(await getMeeting({include: ["Participanti"]}));
        
    }
    catch(e){
        console.log(e.message);
    }
})
router.route('/meeting/:id').get(async(req, res) => {
    try{
        return res.json(await getMeetingById(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})
router.route('/meeting/:idMeeting/participant/:idParticipant').get(async(req, res) => {
    try{
        return res.json(await getParticipantById(req.params.idMeeting,req.params.idParticipant));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/meeting/:idMeeting').put(async(req, res) => {
    try{
        return res.json(await updateMeeting(req.params.idMeeting, req.body));
    }
    catch(e){
        console.log(e.message);
    }
})
router.route('/meeting/:idMeeting/participant/:idParticipant').put(async(req, res) => {
    try{
        return res.json(await updateParticipant(req.params.idMeeting,req.params.idParticipant, req.body));
    }
    catch(e){
        console.log(e.message);
    }
})
router.route('/meeting/:idMeeting').delete(async(req, res) => {
    try{
        return res.json(await deleteMeeting(req.params.idMeeting));
    }
    catch(e){
        console.log(e.message);
    }
})
router.route('/meeting/:idMeeting/participant/:idParticipant').delete(async(req, res) => {
    try{
        return res.json(await deleteParticipant(req.params.idMeeting,req.params.idParticipant));
    }
    catch(e){
        console.log(e.message);
    }
})
let port = process.env.PORT || 9000;
app.listen(port);
console.log(`API is running at ${port}`);