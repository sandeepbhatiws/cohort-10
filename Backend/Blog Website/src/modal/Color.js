const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        // minLength : [3, 'Name is shorter than the minimum allowed length (3).'],
        // maxLength : [15, 'Name is grether than the maximum allowed length (15).'],
        match: /^[a-zA-Z ]{2,15}$/,
        validate: {
            validator: async function (v) {
                const name = await this.constructor.findOne({ name: v });
                return !name;
            },
            message: props => `The specified name is already in use.`
        }
    },
    mobile_number: {
        type: String,
        required: true,
        match: /^[0-9]{8,15}$/
    },
    code: {
        type: String,
        required: [true, 'Code is required'],
        enum: ['A', 'B']
    },
    order: {
        type: Number,
        required: [true, 'Order is required'],
        min: 5,
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


var ColorModal = mongoose.model('colors', Schema);

module.exports = ColorModal;