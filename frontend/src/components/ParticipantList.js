
import {useState, useEffect} from 'react';
import {get, post, put, remove } from '../Calls';
import {Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer,MenuItem, Grid, TextField, TableHead, IconButton, InputLabel, Select } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';


import {meetingRoute,participantRoute} from '../ApiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
export default function MeetingList(){
    const [participantEdit, setParticipantEdit] = useState
    ({  ParticipantId:"",
        Nume:"",       
        IdMeeting:""
    });
    const [participantAdd, setParticipantAdd] = useState
    ({
        Nume:"",       
        IdMeeting:""
    });
    const [meeting, setMeeting] = useState
    ({
        IdMeeting:"",
        Descriere:"",
        Data:"",
        Url:""
        
    });
    
    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false)
    const navigate = useNavigate();
    const routerParams = useParams();
    const idMeeting = routerParams.id;

    useEffect(async() => {
        let data = await get(meetingRoute+"/"+idMeeting);
        setRows(data.Participanti);
        setMeeting(data);
        //console.log(data);
        participantEdit.IdMeeting=idMeeting;
        participantAdd.IdMeeting=idMeeting;
    }, [needUpdate]);

   
    const deleteParticipant= async(idMeeting,idParticipant, index) => {
        await remove(meetingRoute+"/"+idMeeting+"/participant", idParticipant);
        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
    } 
    const handleChangeAdd = (event) => {
        participantAdd.Nume=event.target.value;
        setNeedUpdate(!needUpdate);
      }
      const handleChangeEdit = (event) => {
        participantEdit.Nume=event.target.value;
        setNeedUpdate(!needUpdate);
      }
    const onChangeParticipantAdd = e => {
        setParticipantAdd({...participantAdd, [e.target.name]: e.target.value});
    }
    const onChangeParticipantEdit = e => {
        setParticipantEdit({...participantEdit, [e.target.name]: e.target.value});
    }
    const saveParticipantEdit = async () => {
            //console.log(songEdit);
            await put(meetingRoute+"/"+idMeeting+"/participant", participantEdit.ParticipantId, participantEdit);
            let data=await get(meetingRoute,idMeeting);
            console.log(data);
            setRows(data.Participanti);
            setNeedUpdate(!needUpdate);
            
       
    }
    const saveParticipantAdd = async () => {
       
            await post(participantRoute, participantAdd);
            let data=await get(meetingRoute,idMeeting);
            console.log(data);
            setRows(data.Participanti);
            setNeedUpdate(!needUpdate);
         
    }
    
    return (
        <div>
           
           
           <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Meeting Id</TableCell>
                            <TableCell align="right">Descriere</TableCell>
                            <TableCell align="right">Data creare</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                                <TableRow >
                                <TableCell component="th" scope ="row">
                                    {meeting.IdMeeting}
                                </TableCell>
                                <TableCell align="right">{meeting.Descriere}</TableCell>
                                <TableCell align="right">{meeting.Data}</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
          
            <Grid container spacing={3}>
                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ParticipantIdEdit"
                        name="ParticipantId"
                        label="ParticipantId"
                        fullWidth
                        inputProps={
                            { readOnly: true, }
                        }
                        InputLabelProps={{ shrink: true }}  
                        value={participantEdit.ParticipantId}
                        onChange={e => onChangeParticipantEdit(e)}
                        />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="NumeEdit"
                        name="Nume"
                        label="Nume"
                        fullWidth
                        value={participantEdit.Nume}
                        onChange={e => onChangeParticipantEdit(e)}
                        />
                </Grid>
        
            </Grid>
            <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                onClick={saveParticipantEdit}
            >
                Update
            </Button>  
            
            <Grid container spacing={3}>
            
                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="NumeAdd"
                        name="Nume"
                        label="Nume"
                        fullWidth
                        value={participantAdd.Nume}
                        onChange={e => onChangeParticipantAdd(e)}
                        />
                </Grid>
            
            </Grid>
             <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                onClick={saveParticipantAdd}
            >
                Add
            </Button>  
            
                   

      


<TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ParticipantId</TableCell>
                            <TableCell align="right">Numele</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {rows.map((row, index) => 
                                
                                <TableRow key={row.ParticipantId}>
                                <TableCell component="th" scope ="row">
                                    {row.ParticipantId}
                                </TableCell>
                                <TableCell align="right">{row.Nume}</TableCell>
                                <TableCell align="right">
                                   <IconButton onClick={() => {
                                       participantEdit.ParticipantId=row.ParticipantId;
                                       participantEdit.Nume=row.Nume;
                                       setNeedUpdate(!needUpdate);
                                   }}>
                                       <EditIcon color="primary"/>
                                   </IconButton>
                                   <IconButton onClick={() => deleteParticipant(row.IdMeeting,row.ParticipantId, index)}>
                                       <DeleteIcon color="secondary" />
                                   </IconButton>
                                   
                                </TableCell>
                                
                            </TableRow>
                           
                               
                            
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
    )

}