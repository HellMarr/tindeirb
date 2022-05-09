const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    user1_id:  ObjectId,
    user2_id: ObjectId,
    nb_message: Number,
  });

const MessageSchema = new Schema({
    pos: Number,
    property: Number,
    content: String,
    idconv: [{ type: Schema.Types.ObjectId, ref: 'Chats' }]
});


const chats = mongoose.model('chats', ChatSchema)
const messages = mongoose.model('messages', MessageSchema)

module.exports = chats
module.exports = messages