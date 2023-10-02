const { model, Schema } = require('mongoose');

const videoSchema = new Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    }
}, 
{ timestamps: true });

module.exports = model('VideoStream', videoSchema);
