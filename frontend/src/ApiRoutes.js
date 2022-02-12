const link = "http://localhost:9000/api/";
const meetingRoute = link + "meeting";
const participantRoute = link + "participant";
/*
//creare playlist
router.route('/playlist').post(async(req, res) => {
    try{
        return res.json(await createPlaylist(req.body));
    }
    catch(e){
        console.log(e.message);
    }
})
//creare song
router.route('/song').post(async(req, res) => {
    try{
        return res.json(await createSong(req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/playlist').get(async(req, res) => {
    try{
        return res.json(await getPlaylist());
    }
    catch(e){
        console.log(e.message);
    }
})
router.route('/playlist/:id').get(async(req, res) => {
    try{
        return res.json(await getPlaylistById(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})
router.route('/playlist/:idPlaylist/song/:idSong').get(async(req, res) => {
    try{
        return res.json(await getSongById(req.params.idPlaylist,req.params.idSong));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/playlist/:idPlaylist').put(async(req, res) => {
    try{
        return res.json(await updatePlaylist(req.params.id, req.body));
    }
    catch(e){
        console.log(e.message);
    }
})
router.route('/playlist/:idPlaylist/song/:idSong').put(async(req, res) => {
    try{
        return res.json(await updateSong(req.params.idPlaylist,req.params.idSong, req.body));
    }
    catch(e){
        console.log(e.message);
    }
})
router.route('/playlist/:idPlaylist').delete(async(req, res) => {

router.route('/playlist/:idPlaylist/song/:idSong').delete(async(req, res) => {
*/
export {meetingRoute,participantRoute};