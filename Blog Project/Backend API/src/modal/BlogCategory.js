const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [2, 'Name should be at least 2 characters.'],
        maxLength: [50, 'Name should not be more than 50 characters.']
    },
    slug: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: [true, 'Order is required'],
        min: [0, 'Order should be at least 0.'],
        max: [1000, 'Order should not be more than 1000.']
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


var BlogCategoryModal = mongoose.model('blog_categories', Schema);

module.exports = BlogCategoryModal;
