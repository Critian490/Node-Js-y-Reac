const { Schema, model } = require('mongoose');

const InventorySchema = Schema({
    serial:{
        type: String,
        required: true,
        unique: true,
    },
    model:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String, 
        required: true
    },
    photo:{
        type: String,
        required: true,
        default: 'https://bit.ly/3yNymys'
    },
    colour:{
        type: String,
        required: true,
    },
    sold_at:{
        type: Date,
        required: true,
        default: Date.now,
    },
    price:{
        type: Number,
        required: true,
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
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    type:{
        type: Schema.Types.ObjectId,
        ref: 'Type',
        required: true,
    },
    state:{
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true,
    },
    brand:{
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
});

module.exports = model('Inventory', InventorySchema);