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
    address: {
        type: String,
        trim: true,
        maxLength: [200, 'Address should not be more than 200 characters.']
    },
    age: {
        type: Number,
        min: [18, 'Age should be at least 18.'],
        max: [100, 'Age should not be more than 100.'],
        validate: {
            validator: (v) => v == null || Number.isInteger(v),
            message: props => `Age should be a whole number.`
        }
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: 'Gender should be male, female or other.'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role_type : {
        type : String,
        default : 'user',
        required : ['true', 'Role Type is required'],
        enum : ['user', 'admin']
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