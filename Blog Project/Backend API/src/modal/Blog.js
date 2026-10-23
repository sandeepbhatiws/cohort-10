const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog_categories',
        required: [true, 'Category is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minLength: [3, 'Title should be at least 3 characters.'],
        maxLength: [200, 'Title should not be more than 200 characters.']
    },
    slug: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: [true, 'Short description is required'],
        trim: true,
        maxLength: [300, 'Short description should not be more than 300 characters.']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        maxLength: [50, 'Username should not be more than 50 characters.']
    },
    published: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
        default: Date.now
    },
    total_comments: {
        type: Number,
        default: 0,
        min: [0, 'Total comments can not be negative.']
    },
    total_likes: {
        type: Number,
        default: 0,
        min: [0, 'Total likes can not be negative.']
    },
    status: {
        type: Boolean,
        default: true
    },
    // Date.now (not Date.now()) so every record gets its own current time
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: null
    }
});


var BlogModal = mongoose.model('blogs', Schema);

module.exports = BlogModal;
