const mongoose = require('mongoose');
const { any } = require('webidl-conversions');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    //user_id: Number,
    user_name:  String,
    user_mail: String,
    user_password: String,
    user_birth_date: String,//YYYYMMDD
    user_age: String,
    user_img:
    {
        data: Buffer,
        contentType: String
    },
    user_description: {type: String, default:"générique"},
    user_likes: {type: Array, default:[]},
    user_matches: {type: Array, default:[]}, 
    user_profile_img: {type: String, default:"../../assets/images/default.png"},
    user_islogged: {type: Boolean, default: false},
    user_isadmin: {type: Boolean, default: false},
    user_isbanned: {type: Boolean, default: false},
    user_isreported:{type: Boolean, default: false},
    user_reportedby: {type: Array, default:[]},
    user_sexe: {type: Boolean},  //On choisit true == femme
    user_likesexe: {type: Array, default:[]}, //On ne prend pas en compte a possibilité que les gens soit bi :(
  });


const Users = mongoose.model('User', usersSchema)

module.exports = Users