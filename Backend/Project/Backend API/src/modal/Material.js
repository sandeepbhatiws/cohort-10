const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,15}$/,
        // validate: {
        //     validator: async function (v) {
        //         const name = await this.constructor.findOne({ name: v });
        //         return !name;
        //     },
        //     message: props => `The specified name is already in use.`
        // }
    },
    slug : {
        type : String,
        required : true,
    },
    order: {
        type: Number,
        required: [true, 'Order is required'],
        min: 0,
        max: 1000
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: null
    }
});


var MaterialModal = mongoose.model('materials', Schema);

module.exports = MaterialModal;