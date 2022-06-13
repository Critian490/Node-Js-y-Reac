const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    active:{
        type: String,
        required: true,
        enum: [
            'Activo',
            'Inactivo',
        ]
    },
    created_at:{
        type: Date,
        required: true,
        default: Date.now,

    },
    modified_at:{
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = model('User', UserSchema);