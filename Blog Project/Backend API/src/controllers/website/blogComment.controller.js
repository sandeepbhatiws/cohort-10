const BlogModal = require('../../modal/Blog.js');
const BlogCommentModal = require('../../modal/BlogComment.js');
const { getErrorMessages } = require('../../helpers/common.js');

// Counted from real comments ($inc would keep the hand entered total_comments of old blogs,
// and the count would never match the comments shown under the blog)
const updateTotalComments = async (blogId) => {
    var totalComments = await BlogCommentModal.countDocuments({
        blog : blogId,
        deleted_at : null
    });

    await BlogModal.updateOne({ _id : blogId }, { total_comments : totalComments });
}

// Body -> { comment : 'text' }
exports.create = async(request, response) => {

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

        var result = await BlogCommentModal({
            blog : blogId,
            user : request.userId,
            comment : request.body?.comment
        }).save();

        await updateTotalComments(blogId);

        const data = {
            _status : true,
            _message : "Comment added.",
            _data : result
        }

        return response.send(data);
    } catch (error) {
        const data = {
            _status : false,
            _message : "Something went wrong.",
            _error : getErrorMessages(error),
            _data : ''
        }

        return response.send(data);
    }
}

// Body -> { page : 1, limit : 10 }
exports.view = async(request, response) => {

    try {
        var body = request.body || {};

        var page = Number(body.page) || 1;
        var limit = Number(body.limit) || 10;
        var skip = (page - 1) * limit;

        var condition = {
            blog : request.params.id,
            deleted_at : null
        }

        var totalRecords = await BlogCommentModal.countDocuments(condition);

        var result = await BlogCommentModal.find(condition)
        .select('user comment created_at')
        .populate('user', 'name')
        .sort({
            created_at : 'desc',
            _id : 'desc'
        })
        .limit(limit)
        .skip(skip);

        const paginate = {
            current_page: page,
            limit: limit,
            total_pages: Math.ceil(totalRecords/limit),
            total_records: totalRecords
        }

        if(result.length != 0){
            const data = {
                _status : true,
                _message : "Record Found.",
                _paginate : paginate,
                _data : result
            }

            return response.send(data);
        } else {
            const data = {
                _status : false,
                _message : "No Record Found.",
                _paginate : paginate,
                _data : []
            }

            return response.send(data);
        }
    } catch (error) {
        const data = {
            _status : false,
            _message : "Something went wrong.",
            _data : []
        }

        return response.send(data);
    }
}

exports.destroy = async(request, response) => {

    try {
        // user in the condition -> only the person who wrote the comment can delete it
        var result = await BlogCommentModal.findOneAndUpdate({
            _id : request.params.id,
            user : request.userId,
            deleted_at : null
        }, {
            deleted_at : Date.now(),
            updated_at : Date.now()
        });

        if(!result){
            const data = {
                _status : false,
                _message : "No Record Found.",
                _data : ''
            }

            return response.send(data);
        }

        await updateTotalComments(result.blog);

        const data = {
            _status : true,
            _message : "Comment deleted.",
            _data : ''
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
