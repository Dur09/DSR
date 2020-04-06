const mongoose = require('mongoose');

const {Schema} = mongoose;

const dsrModel = new Schema(
    {
        rsrc: { type: String }, 
        tid: { type: String },
        ttitle: { type: String },
        status: { type: String },
        comments: { type: String },
    }
);

module.exports = mongoose.model('Dsr', dsrModel);