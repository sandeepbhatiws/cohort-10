const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z ]{2,15}$/
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        validate: {
            validator: async function (v) {
                const name = await this.constructor.findOne({ email: v });
                return !name;
            },
            message: props => `The specified email is already in use.`
        }
    },
    mobile_number: {
        type: String,
        match: /^[0-9]{8,15}$/
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
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

var UserModal = mongoose.model('users', Schema);

module.exports = UserModal;