const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs',
        required: [true, 'Blog is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
        trim: true,
        maxLength: [1000, 'Comment should not be more than 1000 characters.']
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

Schema.index({ blog : 1, created_at : -1 });

var BlogCommentModal = mongoose.model('blog_comments', Schema);

module.exports = BlogCommentModal;
