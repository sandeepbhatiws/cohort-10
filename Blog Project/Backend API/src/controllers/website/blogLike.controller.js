const BlogModal = require('../../modal/Blog.js');
const BlogLikeModal = require('../../modal/BlogLike.js');

// Not liked yet -> adds the like, already liked -> removes the like
exports.toggle = async(request, response) => {

    try {
        var blogId = request.params.id;

        var blogExists = await BlogModal.exists({
            _id : blogId,
            published : true,
            deleted_at : null
        });

        if(!blogExists){
            const data = {
                _status : false,
                _message : "No Record Found.",
                _data : ''
            }

            return response.send(data);
        }

        var removedLike = await BlogLikeModal.findOneAndDelete({
            blog : blogId,
            user : request.userId
        });

        if(removedLike){
            // Admin panel can also edit this count, so it may already be 0
            await BlogModal.updateOne({
                _id : blogId,
                total_likes : { $gt : 0 }
            }, {
                $inc : { total_likes : -1 }
            });
        } else {
            try {
                await BlogLikeModal({
                    blog : blogId,
                    user : request.userId
                }).save();

                await BlogModal.updateOne({ _id : blogId }, {
                    $inc : { total_likes : 1 }
                });
            } catch (error) {
                // 11000 -> a double click already saved this like (unique index), so count it only once
                if(error.code != 11000){
                    throw error;
                }
            }
        }

        var blog = await BlogModal.findById(blogId).select('total_likes');

        const data = {
            _status : true,
            _message : removedLike ? "Like removed." : "Blog liked.",
            _data : {
                is_liked : !removedLike,
                total_likes : blog.total_likes
            }
        }

        return response.send(data);
    } catch (error) {
        const data = {
            _status : false,
            _message : "Something went wrong.",
            _data : ''
        }

        return response.send(data);
    }
}

// Has the logged in user already liked this blog ?
exports.status = async(request, response) => {

    try {
        var like = await BlogLikeModal.exists({
            blog : request.params.id,
            user : request.userId
        });

        const data = {
            _status : true,
            _message : "Record Found.",
            _data : {
                is_liked : !!like
            }
        }

        return response.send(data);
    } catch (error) {
        const data = {
            _status : false,
            _message : "Something went wrong.",
            _data : ''
        }

        return response.send(data);
    }
}
