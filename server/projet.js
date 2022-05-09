
const express = require("express");
const bodyParser = require("body-parser");
var bcrypt = require('bcryptjs');
const { Server } = require("socket.io");

const jwt = require("jsonwebtoken")

const app = express();
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
const io = new Server(3001);

const session = require('express-session');
var fs = require('fs');
const mongoose = require('mongoose');
let users = require('./users.js');
let chats=require('./chat.js');
let { db } = require("./users.js");
const { response } = require("express");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' }); //setting the default folder for multer
mongoose.connect('mongodb+srv://eirbmon:eirbmon@cluster0.9jyvc.mongodb.net/tindeirb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

 db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à Mongoose")
  db.collection('users').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
  });
  db.collection('chats').findOne({},function (findErr, result){
    if (findErr) throw findErr;
  });
});

const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        cb(null,fill.originalname)
    }
});


app.post('/uploadImage', upload.single('fileData'), async (req,res)=>{
    console.log('Uploading the image in the database ...')
    console.log(req.file);
    fs.readFile(req.file.path,(err, contents)=> {
        if (err) {
        console.log('Error: ', err);
       }else{
        console.log('File contents ',contents);
       }
      });
    const collection = db.collection('users');
    /*const user= collection.findOneAndUpdate({user_name : req.queryusername},{$set:{user_img:{
        data:req.body.img_url,
        contentType: 'image',
    }}}); */
});

const config = {
    //store: new SQLiteStore,
    secret: 'secret key',
    resave: true,
    rolling: true,
    cookie: {
      maxAge: 1000 * 3600//ms
    },
    saveUninitialized: true
  }
  
if (app.get('env') === 'production') {
app.set('trust proxy', 1) // trust first proxy
sess.cookie.secure = true // serve secure cookies
}
app.use(session(config))

//Fonction d'appel à la database 

const createUser = async object => {
    const collection = db.collection('users');
    const test= await users.findOne({user_name:object.user_name});
    if (test != null){
        console.log("Il y a déja un utilisateur avec ce pseudo:")
        console.log(test)
        return test
    }
    await collection.insertOne(object);
    const user= await users.findOne({user_name:object.user_name});
    return user
  }
  

const findUsers = async user_name => {
    const userss = await users.find({})
    userss.map(users => users.user_name);
    return userss
}

const findUser= async username =>{
    const user = await users.findOne({user_name: username});
    return user;
}

const findUserbyid= async id =>{
    const user = await users.findOne({_id: id});
    return user;
}

app.get("/", (req, res) => {
    res.send("Hello From The Server");
})


function validateUsername(username) {
    let errors = [];
    if (username.length == 0) {
        errors.push("Username Is Null");
    }

    if (username.length > 50) {
        errors.push("Username Length Can Not Exceed 50 Characters.");
    }

    return errors;
}

function validatePasswordconfirm(password,passwordconfirm) {
    let errors = [];
    if (password !== passwordconfirm || passwordconfirm === "") {
        errors.push("password confirmation is different from password");
    }

    return errors;
}

function validatePassword(password) {
    let errors = [];

    // check whether contact no is empty or not
    if (password.length == 0) {
        errors.push("Password Is Null");
    }

    return errors;
}

function validateEmail(email) {
    let errors = [];

    // checks whether email is empty or not
    if (email.length == 0) {
        errors.push("Email Is Null");
    }

    // checks whether email length is more then 100 or not
    if (email.length > 100) {
        errors.push("Email Can not exceed 100 Character");
    }


    // checks whether email is valid or not usinf regular expression
    if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email))) {
        errors.push("Email Is Not Valid");
    }

    return errors;
}

async function validateRegister(username,email){   
    let errors = [];
    const users = await findUsers()
    //On parcourt les pseudos et les emails pour voir si ils sont déjà pris
    let test = false
    for (let i = 0; i<users.length; i++){
        if (users[i].user_mail ===email) {
            test = true
        }
    }
    if (test){
        errors.push("The chosen email is already taken!"); 
    }
    test = false
    for (let i = 0; i<users.length; i++){
        if (users[i].user_name ===username) {
            test = true
        }
    }
    if (test){
        errors.push("The chosen username is already taken!");  
    }
    return errors;
}

async function ValidateUser_email(username_email){   
    let errors = [];
    const userss = await findUsers()
    let test = false;
    for (let i = 0; i<userss.length; i++){
        if (userss[i].user_mail ===username_email) {
            console.log(userss[i]);
            test = true
        }
    }
    for (let i = 0; i<userss.length; i++){
        if (userss[i].user_name ===username_email) {
            test = true
        }
    }
    if (!test){
            errors.push("There are no accounts linked to this email or username")
    }
    return errors;
}

async function ValidateMatchPassword(password,username_email){   
    let errors = [];
    test = false
    const good_user = await users.findOne({ $or: [ { user_mail: username_email } , { user_name: username_email } ] })
    if (good_user){
        if (bcrypt.compareSync(password, good_user.user_password)) {
        test = true
        }
        if (!test){
            errors.push("The password is wrong")
        }
        return errors;
    }
}

async function validateEdit(description,age,gender,likedsex){
    let errors = [""]
    if (description == ""){
        errors.push("Le champ description est vide")
    }
    if (age == ""){
        errors.push("Le champ age est vide")
    }
    if (parseInt(age) <= 17){
        errors.push("Vous êtes trop jeune")
    }
    if (gender == ""){
        errors.push("Le champ du genre est vide")
    }
    if (likedsex == ""){
        errors.push("Le champ de préférence est vide")
    }
    return errors
}

app.post("/signup", async(req, res) => {
    console.log("Sigining up...	");
    let username = req.body.username;
    let email = req.body.email;
    var salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(req.body.password, salt);
    let passwordconfirm = bcrypt.hashSync(req.body.confirmpassword, salt);
    let age = req.body.age;

    let errFUsername = validateUsername(username); // will validate username
    let errEmail = validateEmail(email); // will validate email
    let errPassword = validatePassword(password); // will validate contact no
    let errPasswordconfirm = validatePasswordconfirm(password,passwordconfirm); // will validate passwordconfirm

    //On teste la database
    let errRegister = await validateRegister(username,email); //will validate final registration

    if (errFUsername.length || errEmail.length || errPassword.length || errPasswordconfirm.length || errRegister.length) {
        res.status(200).json({
            msg: "Validation Failed",
            errors: {
                username: errFUsername,
                email: errEmail,
                password: errPassword,
                passwordconfirm: errPasswordconfirm,
                register: errRegister
            }
        });
    }
    else {
        console.log("We add a new user to the database")
        console.log("We redirect to the home page")
        await createUser({ user_name: username, user_mail: email,user_password:password, user_islogged: true, user_age: age, user_profile_img:"../../assets/images/default.png"})
        const collection = db.collection('users');
        const tokens = await collection.findOne({user_name : username}); 
        const id = tokens._id;
        req.session.logged = true; 
        const token = jwt.sign({id},"jwtSecret", {
            expiresIn: 300,
        })
        res.status(200).json({
            msg: "User Registered Succesfully",
            auth:true,
            token:token,
            username:req.body.username,
        })
    }
});


app.get("/signup", async(req, res) => {
    const users = await findUsers()
    console.log(users[1]);
    res.status(200).send({
        msg: "All the data fetched successfully",
        data: users
    })
})

const verifyJWT = (req,res,next) =>{
    const token = req.get("x-access-token")

    if (!token){
        res.json({message:"No, we need a token, please give it to us next time", error:true})
    } 
    else{
        jwt.verify(token,"jwtSecret", (err,decoded)=>{
            if (err){
                res.json({auth:false, message:"You failed to authenticate", error:true})
            } else{
                req.userId = decoded.id;
                next();
            }
        });
    }
}

app.get('/isUserAuth', verifyJWT, (req,res)=> {
    res.json({
        message : "Yes, authentication is true",
        auth:true,
        error:false,
    })
})

app.post("/profileInfo", async(req, res) => {
    console.log("Fetching profile infos ...")
    let username = req.body.username
    const collection = db.collection('users');
    const user = await collection.findOne({user_name : username}); 
    res.status(200).json({
        data:user
    })
})*

app.post("/cardInfo", async(req, res) => {
    console.log("Fetching Card infos ...")
    const user = await users.find({}).limit(20)
    const isAdmin = await users.findOne({user_name: req.body.username});
    const adminboolean = isAdmin.user_isadmin;
    user.map(users => users.user_name);
    res.status(200).json({
        data:user,
        isAdmin:adminboolean
    })
})

app.post("/banInfo", async(req, res) => {
    
    //Attention, admin check dans le front!! danger
    console.log("Fetching the banned accounts ...")
    const reported = await getreported();
    console.log(reported)
    let reasons = "";
    res.status(200).json({
        reported:reported,
        reasons:reasons,
    })
    
})
/*
app.post("/ban", async(req, res) => {
    console.log("Banning " + req.body.currentBan)
    await banuser(req.body.username);
    res.status(200).json({
        message:'utilisateur banni'
    })
})*/

app.post("/forgive/:user", async(req, res) => {

    const collection = db.collection('users');
    const user= await findUser(req.body.username)
    
    if (user.user_isadmin==true){
        console.log("On pardonne "+req.params.user)
        await collection.findOneAndUpdate({user_name : req.params.user},{$set:{user_isreported:false}});
    }
    
})

app.post("/signin", async(req, res) => {
    console.log("Signing in...	");
    let username_email = req.body.username;

    let password = req.body.password;

    let errFUsername_email = await ValidateUser_email(username_email); // will check database to confirm username or email
    let errPassword = await ValidateMatchPassword(password,username_email); // will check the match in the database

    if (errFUsername_email.length ||  errPassword.length) {
        res.status(200).json({
            msg: "Validation Failed",
            errors: {
                username_email: errFUsername_email,
                password: errPassword,
            }
        });
    }
    else {
        console.log("We redirect to the home page")
        const collection = db.collection('users');
        req.session.logged = true; 
        
        await collection.findOneAndUpdate({user_name : username_email},{$set:{user_islogged:true}}); 
        const tokens = await collection.findOne({user_name : username_email}); 
        const id = tokens._id;
        console.log(id);
        const token = jwt.sign({id},"jwtSecret", {
            expiresIn: 300,
        })

        res.status(200).json({
            auth:true,
            token:token,
            username:req.body.username,
        })
    }
});

app.post("/signout", async(req, res) => {
    console.log("Signing out...	");
    const collection = db.collection('users');
    const users = await collection.findOneAndUpdate({user_name : req.body.username},{$set:{user_islogged:false}});
    res.status(200).send({
        msg: "Successfully signed out",
    })
})

app.post("/edit", async(req, res) => {
    console.log("Editing profile...	");
    let username = req.body.username._W
    let description = req.body.user_description
    let date = req.body.date
    let gender = req.body.gender
    let likedsex = req.body.likedsex
    let age = req.body.user_age

    let errors = validateEdit(description,age,gender,likedsex)
    console.log(errors)
    if (!errors[1]){
        const collection = db.collection('users');
        const users = await collection.findOneAndUpdate({user_name : username},{$set:{user_description:description,user_date:date,user_sexe:gender,user_likesexe:likedsex, user_age:age}});
    }
    res.status(200).send({
        msg: "Successfully changed the infos",
        errors: errors
    })
})

//Récuperation des infos publique d'users

async function getpublicinfo(tabuser){
    let size= tabuser.length;
    let tabinfo=[];
    let user;
    let infouser={
        name:"",
        description:"",
        profile_img:"",
    };
    for (let i=0; i< size; i++){
        user = await findUser(tabuser[i])
        infouser.name= user.user_name;
        infouser.description= user.user_description;
        infouser.profile_img= user.user_profile_img;
        tabinfo.push(Object.assign({},infouser));
    }
    return tabinfo;
}   

///////////////////Gestion du chat///////////////////

//Création d'une nouvelle discussion

const createChat = async object => { //object must be {user1_id,user2_id, 0}
    const collection = db.collection('chats');
    const test= await collection.findOne({$or: [{user1_id: object.user1_id,user2_id: object.user2_id},{user1_id: object.user2_id,user2_id: object.user1_id}]});
    if (test != null){
        console.log("Il y a déja une conversation entre ces deux utilisateurs:")
        console.log(test)
        return test
    }

    const chat = await collection.insertOne(object);
    return chat
  }

const createMessage= async object =>{ //object must be {pos, userid, content, chatid}
    const collection = db.collection('messages');
    const test= await collection.findOne({idconv: object.idconv, pos:object.pos});
    console.log("création d'un message:")
    console.log(object)
    if (test != null){
        console.log("Il y a déja un message avec cette position:")
        console.log(test)
        return test
    }
    const message = await collection.insertOne(object);
    return message
}

//Recupération d'une discussion par id
const findChatid = async chat_id => {
    const collection = db.collection('chats');
    const chat = await collection.findOne({ _id : chat_id });
    return chat
    }


//Recuperation d'une discussion par userid

const findChatuser = async (user_id1, user_id2) => {
    const collection = db.collection('chats');
    console.log(user_id1)
    console.log(user_id2)
    const chat= await collection.findOne({$or: [{user1_id: user_id1,user2_id: user_id2},{user1_id: user_id2,user2_id: user_id1}]});
    return chat
    }

//Recuperation des message par conv

const findmessage = async (conv_id) => {
    const message = await messages.findOne({idconv: conv_id});
    return message;
    }

//Fonction créant une nouvelle conversation:
async function Createconv(user1_name, user2_name){
    const collection_chat = db.collection('chats');
    //On testera ici si les deux se sont like (autorisation de demarrer la conv)

    //On teste si les users existe
    const user1 = await users.findOne({user_name : user1_name});
    const user2 = await users.findOne({user_name : user2_name });
    
    if (user1==null || user2==null){
        console.log("The users don't exist");
        return 0;
    }
    //on test si la conv existe déjà
    const chat =await collection_chat.findOne({$or: [{user1_id: user1._id,user2_id: user2._id},{user1_id: user2._id,user2_id: user1._id}]});
    console.log(chat)
    if (chat!=null){
        console.log("La conversation existe déja");
        return 0;
    }
    //Création du chat
    await createChat({user1_id: user1._id, user2_id:user2._id, nb_message: 0})
    console.log(user1._id)
    console.log(user2._id)
    const newchat =await collection_chat.findOne({$or: [{user1_id: user1._id,user2_id: user2._id},{user1_id: user2._id,user2_id: user1._id}]});
    console.log(newchat)
    console.log("Conv créée")
}

//Fonction incrémentant de 1 le nombre de message envoyé:

async function incmessages(chatid){
    const collection_chat = db.collection('chats');
    const chat=await findChatid(chatid);
    let nb_m=chat.nb_message+1;
    await collection_chat.updateOne({_id: chatid},{$set: {nb_message: nb_m}},{upsert: true});
    console.log("on a incrémenté le nb de message")
    console.log(chat.nb_message)
}
//Fonction retournant une liste des messages entre deux users avec les noms

async function getmessages(user1_name, user2_name){
    const collection = db.collection('messages');
    console.log(user2_name)
    const user1 = await users.findOne({user_name : user1_name});
    const user2 = await users.findOne({user_name : user2_name });
    console.log("On va lire les messages entre:");
    console.log(user1.user_name);
    console.log(user2.user_name);
    const chat=await findChatuser(user1._id,user2._id);
    var mymessages=[];
    var senders=[]
    let message;
    let sender;
    console.log(["Il y a ",chat.nb_message," messages"])
    for (let i=1; i<= chat.nb_message;i++){
        message = await collection.findOne({idconv: chat._id,pos:i});
        mymessages.push(message.content);
        sender = await users.findOne({_id: message.property});
        senders.push(sender.user_name);
    };
    //console.log(mymessages)
    //console.log(senders)
    return {mymessages,senders};
}


async function getmessagesbyid(chatid){
    const collection = db.collection('messages');
    const chat=await findChatid(chatid);
    var mymessages=[];
    var senders=[]
    let message;
    let sender;
    console.log(chat)
    console.log(["Il y a ",chat.nb_message," messages"])
    for (let i=1; i<= chat.nb_message;i++){
        message = await collection.findOne({idconv: chat._id,pos:i});
        mymessages.push(message.content);
        sender = await users.findOne({_id: message.property});
        senders.push(sender.user_name);
    };
    return {mymessages,senders};
}

async function newmessage(user1_name, user2_name, sender, contentmessage){
    const user1 = await users.findOne({user_name : user1_name});
    const user2 = await users.findOne({user_name : user2_name});
    const oursender= await users.findOne({user_name : sender});
    const chat=await findChatuser(user1._id, user2._id)
    await createMessage({pos: (chat.nb_message+1), property: oursender._id, content: contentmessage, idconv: chat._id })
    await incmessages(chat._id)
}


/////////////Gestion des likes/////////////////

async function likuser(liker_name,liked_name){
    const collection = db.collection('users');
    
    const liker = await users.findOne({user_name : liker_name});
    const liked = await users.findOne({user_name : liked_name});
    
    
    let arrayliked=[];
    if (liker.user_likes==undefined){ //Dans le cas ou la valeur par default ne serais pas set
        arrayliked=[];
        console.log("was undefined")
    }
    else{
        arrayliked=liker.user_likes;
    }
    if (arrayliked.indexOf(liked._id)!=-1){
        console.log(["L'utilisateur",liker.user_name,"à déja liké",liked.user_name])
        return -1;

    }
    arrayliked.push(liked._id);
    await collection.updateOne({_id: liker._id},{$set: {user_likes: arrayliked}},{upsert: true});
    if ((liked.user_likes).indexOf(liker._id)!=-1){
        console.log("C'est un match!");
        Createconv(liker_name,liked_name)
        let array_liker=[];
        let array_liked=[];
        if (liker.user_matches==undefined){ 
            array_liker=[];
            console.log("liker was undefined")
        }
        else{
            array_liker=liker.user_matches;
        }
        if (liked.user_matches==undefined){
            array_liked=[];
            console.log("liked was undefined")
        }
        else{
            array_liked=liked.user_matches;
        }
        array_liker.push(liked._id)
        array_liked.push(liker._id)
        await collection.updateOne({_id: liker._id},{$set: {user_matches: array_liker}},{upsert: true});
        await collection.updateOne({_id: liked._id},{$set: {user_matches: array_liked}},{upsert: true});
        return 1;
    }
    return 0;
}
///////////////////////////////Système de report///////////////


//Fonction pour report un utilisateur
async function reportuser(reporter_name,reported_name){
    const collection = db.collection('users');
    const reporter = await users.findOne({user_name : reporter_name});
    const reported = await users.findOne({user_name : reported_name});
    let arrayreported=[];
    if (reported.user_reportedby==undefined){ //Dans le cas ou la valeur par default ne serais pas set
        console.log("was undefined");
    }
    else{
        arrayreported=reported.user_reportedby;
    }
    if (arrayreported.indexOf(reporter._id)!=-1){
        console.log("Cet utilisateur à déja reporté cette personne");
        if (reported.user_isreported==true){
            console.log("et le report n'a pas encore été traité");
            return 0;
        }
        return 0;
    }
    
    arrayreported.push(reporter._id)//On stock l'id de la personne qui a été reporté
    await collection.updateOne({_id: reported._id},{$set: {user_isreported: true}},{upsert: true});
    await collection.updateOne({_id: reported._id},{$set: {user_reportedby: arrayreported}},{upsert: true});
    return 1;
}

//Fonction pour recuperer les noms de toutes les personne reporté
async function getreported(){
    const cursor = users.find({user_isreported: true}).cursor();
    let reported_name=[]
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        reported_name.push(doc.user_name);
    }
    return reported_name;
}
//Fonction pour obtenir les id des personnes ayant reporté username
async function getWhoReported(username){
    const reported = await users.findOne({user_name : username});
    const tabid= reported.user_reportedby;
    return tabid;
}

//Fonction pour bannir quelqun
async function banuser(username){
    const collection = db.collection('users');
    const reported = await users.findOne({user_name : username});
    await collection.updateOne({_id: reported._id},{$set: {user_isbanned: true, user_isreported:false}},{upsert: true});
}

/////////////Listen////////////////////////

app.listen(3000, () => {
    console.log("Server started ...");
});

////////////app.get et post/////////////////////
/*
app.get("/signin", async(req, res) => {
    const users = await findUsers()
    console.log(users[1]);
    res.status(200).send({
        msg: "All the data fetched successfully",
        data: users
    })
})*/

//Obtenir les personnes avec lequelle on discute, req.session.user doit être l'username du demandeur
app.post("/chat", async(req,res) =>{
    console.log("fetching chat...")
    const collec_chat= db.collection('chats');
    const user = await findUser(req.body.username);
    const cursor = await collec_chat.find({$or: [{user1_id: user._id},{user2_id: user._id}]});
    //users.find({user_isreported: true}).cursor();
    let name_conv=[]
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        let user1= await findUserbyid(doc.user1_id);
        if (user1._id.equals(user._id)){
            user1= await findUserbyid(doc.user2_id);
        }
        name_conv.push(user1.user_name)
        console.log(user1.user_name)
    }
    console.log(name_conv)
    const names=await getpublicinfo(name_conv);
    console.log(names)
    res.status(200).json({
        msg: "Liste des users avec qui on dicute",
        data: names
    })
})

//Obtenir les message avec username, req.session.user doit être l'username du demandeur
app.post("/chat/:username", async(req,res) =>{
    const mesmsg=await getmessages(req.body.username,req.params.username);
        let mydata=[];
    for (let i=0; i< mesmsg.mymessages.length;i++){
        mydata.push({
            data_msg: mesmsg.mymessages[i],
            data_sender: mesmsg.senders[i],
            nmsg: i
        })
    }
    console.log(mydata)
    res.status(200).send({
        msg: "Liste des msg dans data_msg, liste des sender dans data_sender",
        data: mydata
    })
})

//Envoyer un message

app.post("/chatsend/:username", async(req,res) =>{
    console.log(req.body.myusername+ " envoit "+req.body.content+ "a "+req.params.username,)
    await newmessage(req.body.myusername,req.params.username,req.body.myusername,req.body.content);
    /*io.on("connection", (socket) => {
        // send a message to the client username, with content and sender
        socket.timeout(1000).emit(req.params.username, (req.body.user,req.body.content));
        });*/
    res.status(200).send({
        msg: "Message enregistré"
    })
})

app.post("/ban/:user",async(req,res)=>{
    const user= await findUser(req.body.username)
    console.log(user)
    if (user.user_isadmin==true){
        console.log("on ban "+req.params.user)
        banuser(req.params.user)
    }
})
//Liker quelqu'un:

app.post("/like", async(req,res) =>{
    console.log(req.body.liker + " a liké "+ req.body.liked)
    const test= await likuser(req.body.liker,req.body.liked);
    if (test==0){
        res.status(200).send({
            msg: "Like effectué",
            data: false
        })
    }
    else if (test==1){
        res.status(200).send({
            msg: "Like effectué, c'est un match",
            data: true
        })
    }
    else if (test==-1){
        res.status(200).send({
            msg: "Il y a eu une erreur",
            data: false
        })
    }
})

//Recuperer les noms des personnes report

app.post("/report", async(req,res) =>{
    console.log("Fetching reported....")
    const user = await findUser(req.body.username);
    //console.log(user)
    if (user.user_isadmin==true){
        console.log("isadmin")
        const cursor = users.find({user_isreported: true}).cursor();
        let reported_name=[]
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            reported_name.push(doc.user_name);
        }
        
        const reported=await getpublicinfo(reported_name)
        console.log(reported)
        res.status(200).send({
            msg: "Liste des personne reporté",
            data: reported
        })
    }
    else{
        res.status(200).send({
            msg: "Vous n'êtes pas admin",
            data: []
        })
    }
})

//Afficher les personnes qui ont report username:

app.post("/report/:username", async(req,res) =>{
    console.log("Fetching who reported...")
    const user = await findUser(req.body.username);
    if (user.user_isadmin==true){
        const reporters=await getWhoReported(req.params.username);
        res.status(200).send({
            msg: "Id des personnes qui ont report",
            data: reporters
        })
    }
    else{
        res.status(200).send({
            msg: "Vous n'êtes pas admin",
            data: []
        })
    }
})
    
//Afficher la conv entre reported et reporter

app.post("/reportchat/:name_reported", async(req,res) =>{
    const user = await findUser(req.body.username);
    if (user.user_isadmin==true){
        const reporter= await findUserbyid(req.body.id_reporter);
        const mesmsg =await getmessages(req.params.name_reported,reporter.user_name);
        mydata=[]
        console.log(mesmsg)
        for (let i=0; i< mesmsg.mymessages.length;i++){
            if (mesmsg.senders[i]==reporter.user_name){
                mesmsg.senders[i]="reporter" // On anonymise le reporter
            }
            mydata.push({
                data_msg: mesmsg.mymessages[i],
                data_sender: mesmsg.senders[i],
                nmsg: i
            })
        }
        console.log(mydata)
        res.status(200).send({
            msg: "Liste des msg dans data_msg, liste des sender dans data_sender",
            data: mydata
        })
    }
    else{
        res.status(200).send({
            msg: "Vous n'êtes pas admin",
            data: []
        })
    }
})

//Recuperer number potentiel match

app.get("/match", async(req,res) =>{
    const user = await findUser(req.body.user);
    const nb = req.body.number;
    let tab_name=[];
    let nb_match= db.users.find({user_sexe: user.user_likesex, user_likesexe: user.user_sexe, user_isbanned: false, _id: {$ne: user._id}}).count();// On génere aléatoirement
    for (let i=0; i< nb; i++){
        let yourRandomNumber= Math.floor(Math.random() * nb_match);
        tab_name.push(otheruser.user_name);
        /*
        test=0;
        while (test==0){
            const otheruser = db.users.find({user_sexe: user.user_likesex, user_likesexe: user.user_sexe, user_isbanned: false, _id: {$ne: user._id}}).limit(-1).skip(yourRandomNumber).next()
            if (user.user_likes.includes(otheruser._id)==false){
                tab_name.push(otheruser.user_name);
                test=1;
            }
        }
        */
    }
    res.status(200).send({
        msg: "On envoie de potentiel match",
        data: getpublicinfo(tab_name)
    })
})


//get du profile

app.get("/profile/:user", async(req,res) =>{
    if (req.body.user != req.params.user){
        const tab = getpublicinfo(req.body.user)
        res.status(200).send({
            msg: "On envoie les info publique de l'user",
            data: tab
        })
    }
    else if (req.body.user != null){
        const user = await findUser(req.body.user);
        const mesinfos ={
            //remplir avel les infos nécessaire
        }
        res.status(200).send({
            msg: "On envoie les infos publiques et privées de l'user",
            data: mesinfos
        })
    }

})

//Mise a jour du profile de l'user: description, image et sexe des match désirés (true pour une femme, false pour un homme)

app.post("/profile/:user", async(req,res) =>{
    if (req.body.user == req.params.user){
        const user = await findUser(req.body.user);
        await users.updateOne({user_name: user.user_name},{$set: {user_description: req.body.description,user_profile_img: req.body.profile_img, user_likesex: req.body.likesex}},{upsert: true}); 
        res.status(200).send({
            msg: "Modification effectué",
        })
    }
    else{
        res.status(200).send({
            msg: "Vous n'avez pas les droit pour effectuer ces modifications",
        })
    }
})




/////////////Fonctions de tests///////////////
async function testdb(){
    const user1= await createUser({ user_name: "user1"});
    const user2= await createUser({ user_name: "user2"});
    await Createconv("yoan","test");
    console.log("Conversation débuté");
    await newmessage("yoan","test","yoan","Bonjour, comment va tu?");
    await newmessage("yoan","test","test","Salut! Bien et toi?");

    console.log("Messages ajouté a la db")
    const mesmessages=await getmessages("yoan","test");
    //console.log([mesmessages.senders[1], "dit:", mesmessages.messages[1]]);
    //console.log([mesmessages.senders[2], "dit:", mesmessages.messages[2]]);
    console.log(mesmessages)
}

async function testlike(){
    const user1= await createUser({ user_name: "user1"});
    const user2= await createUser({ user_name: "user2"});
    await likuser("user1", "user2");
    
    console.log("user 2 like user 1:");
    await likuser("user2","user1");
    
}

async function testbanned(){
    await testdb();
    console.log("user1 report user2:");
    await reportuser("user1","user2");
    const tab_reported=await getreported();
    const reporters=await getWhoReported(tab_reported[0]);
    const chatrep=await findChatuser(tab_reported[0],reporters[0]);
    const mess= await getmessagesbyid(chatrep._id);
    console.log(mess);
    await banuser("user2");
}
async function unbann(){
    await users.findOneAndUpdate({user_name : "Martin"},{$set:{user_isbanned:false}});
    await users.findOneAndUpdate({user_name : "Martin"},{$set:{user_isreported:true}});
}
//testdb();
//testlike();
//testbanned();
//reportuser("yoan","Martin")
unbann()