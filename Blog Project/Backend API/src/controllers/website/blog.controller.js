const BlogModal = require('../../modal/Blog.js');
const { escapeRegex } = require('../../helpers/common.js');


exports.view = async(request, response) => {

    try {
        var body = request.body || {};

        var page = Number(body.page) || 1;
        var limit = Number(body.limit) || 15;
        var skip = (page - 1) * limit;

        var condition = {
            deleted_at : null
        }

        // Search by title (case insensitive, partial match)
        if(body.title){
            condition.title = { $regex : escapeRegex(body.title), $options : 'i' };
        }

        if(body.category){
            condition.category = body.category;
        }

        // published can be true / false, empty means all
        condition.published = true;

        var totalRecords = await BlogModal.countDocuments(condition);

        var result = await BlogModal.find(condition)
        .select('category title slug username published date total_comments total_likes status')
        .populate('category', 'name')
        // .populate('category')
        .sort({
            date : 'desc',
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

exports.details = async(request, response) => {

    try {
        var result = await BlogModal.findOne({
            _id : request.params.id,
            deleted_at : null
        });

        if(result){
            const data = {
                _status : true,
                _message : "Record Found.",
                _data : result
            }

            return response.send(data);
        } else {
            const data = {
                _status : false,
                _message : "No Record Found.",
                _data : null
            }

            return response.send(data);
        }
    } catch (error) {
        const data = {
            _status : false,
            _message : "Something went wrong.",
            _data : null
        }

        return response.send(data);
    }
}
