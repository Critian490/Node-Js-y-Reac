const { Schema, model } = require('mongoose');

const StateSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    active:{
        type: String,
        required: true,
        enum: [
            'Activo',
            'Inactivo',
        ],
    },
    created_at:{
        type: Date,
        required: true,
        default: Date.now,
    },
    modified_at:{
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = model('State', StateSchema);