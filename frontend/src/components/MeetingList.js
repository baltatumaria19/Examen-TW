import {useState, useEffect} from 'react';
import {get, post, put, remove } from '../Calls';
import {Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, Grid, TextField, TableHead, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import SaveIcon from '@material-ui/icons/Save';
import {meetingRoute,participantRoute} from '../ApiRoutes';
import { useNavigate } from 'react-router-dom';
export default function MeetingList(){
    const [meetingEdit, setMeetingEdit] = useState
    ({
        Descriere:"",
        Url:"",
        Data:""
    });
    const [meetingAdd, setMeetingAdd] = useState
    ({
        Descriere:""
    });
    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false)
    const navigate = useNavigate();

    useEffect(async() => {
        let data = await get(meetingRoute);
        setRows(data);
        console.log(data);
        
    }, [needUpdate]);

    
    const deleteMeeting= async(idMeeting, index) => {
        await remove(meetingRoute,idMeeting);
        meetingEdit.Descriere="";
        meetingEdit.IdMeeting="";
        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
    } 

    const onChangeMeetingAdd = e => {
        setMeetingAdd({...meetingAdd, [e.target.name]: e.target.value});
    }
    const onChangeMeetingEdit = e => {
        setMeetingEdit({...meetingEdit, [e.target.name]: e.target.value});
    }
    const saveMeetingEdit = async () => {
       
            await put(meetingRoute, meetingEdit.IdMeeting, meetingEdit);
            setNeedUpdate(!needUpdate);
            
       
    }
    const saveMeetingAdd = async () => {
       
            await post(meetingRoute, meetingAdd);
            let data=await get(meetingRoute);
            setRows(data);
            setNeedUpdate(!needUpdate);
            console.log(meetingAdd);
         
    }
    return (
        <div>
           
           <Grid container spacing={3}>
                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="IdMeeting"
                        name="IdMeeting"
                        label="Id Meeting"
                        fullWidth
                        inputProps={
                            { readOnly: true, }
                        }
                        InputLabelProps={{ shrink: true }}  
                        value={meetingEdit.IdMeeting}
                        onChange={e => onChangeMeetingEdit(e)}
                        />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="DescriereEdit"
                        name="Descriere"
                        label="Descriere"
                        fullWidth
                        value={meetingEdit.Descriere}
                        onChange={e => onChangeMeetingEdit(e)}
                        />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="UrlEdit"
                        name="Url"
                        label="Url"
                        fullWidth
                        value={meetingEdit.Url}
                        onChange={e => onChangeMeetingEdit(e)}
                        />
                </Grid>
            </Grid>
            <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                onClick={saveMeetingEdit}
            >
                Update
            </Button>  
            
            <Grid container spacing={4}>
                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="DescriereAdd"
                        name="Descriere"
                        label="Descriere"
                        fullWidth
                        value={meetingAdd.Descriere}
                        onChange={e => onChangeMeetingAdd(e)}
                        />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="UrlAdd"
                        name="UrlAdd"
                        label="UrlAdd"
                        fullWidth                     
                        InputLabelProps={{ shrink: true }}  
                        value={meetingAdd.Url}
                        onChange={e => onChangeMeetingAdd(e)}
                        />
                </Grid>
                
                
                
            </Grid>
             <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                onClick={saveMeetingAdd}
            >
                Add
            </Button>  
           

            <br/>
            <Grid container spacing={3}>
            <Grid item xs={8} sm={8}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Meeting Id</TableCell>
                            <TableCell align="right">Descriere</TableCell>
                            <TableCell align="right">Data creare</TableCell>
                            <TableCell align="right">Url</TableCell>
                            <TableCell align="right">EditareMeeting</TableCell>
                            <TableCell align="right">Participanti</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => 
                                
                                <TableRow key={row.IdMeeting}>
                                <TableCell component="th" scope ="row">
                                    {row.IdMeeting}
                                </TableCell>
                                <TableCell align="right">{row.Descriere}</TableCell>
                                <TableCell align="right">{row.Data}</TableCell>
                                <TableCell align="right">{row.Url}</TableCell>
                                <TableCell align="right">
                                   <IconButton onClick={() => {meetingEdit.IdMeeting=row.IdMeeting; 
                                   meetingEdit.Data=row.Data;  
                                   meetingEdit.Descriere=row.Descriere;
                                   setNeedUpdate(!needUpdate);
                                   
                                }}>
                                       <EditIcon color="primary"/>
                                   </IconButton>
                                   <IconButton onClick={() => deleteMeeting(row.IdMeeting, index)}>
                                       <DeleteIcon color="secondary" />
                                   </IconButton>
                                   
                                </TableCell>
                                <TableCell align="right">
                                <IconButton onClick={() => navigate(`/ParticipantList/${row.IdMeeting}`)}>
                                       <RemoveRedEyeIcon color="secondary" />
                                   </IconButton>
                                </TableCell>
                            </TableRow>
                           
                           
                            
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
          </Grid>
          </Grid>
        </div>
    )

}