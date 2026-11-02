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
    // Date.now (not Date.now()) so every record gets its own current time
    created_at: {
        type: Date,
        default: Date.now
    }
});

// One user can like a blog only once
Schema.index({ blog : 1, user : 1 }, { unique : true });

var BlogLikeModal = mongoose.model('blog_likes', Schema);

module.exports = BlogLikeModal;
