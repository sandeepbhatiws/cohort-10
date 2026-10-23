const BlogCategoryModal = require('../../modal/BlogCategory.js');
const BlogModal = require('../../modal/Blog.js');
const { generateUniqueSlug, getErrorMessages, escapeRegex } = require('../../helpers/common.js');

// Only these fields can be saved / updated from the form
const fields = ['name', 'order'];

exports.create = async(request, response) => {

    try {
        var body = request.body || {};

        var dataSave = {};

        fields.forEach((key) => {
            if(body[key] !== undefined){
                dataSave[key] = body[key];
            }
        });

        if(typeof body.name == 'string' && body.name.trim()){
            dataSave.slug = await generateUniqueSlug(BlogCategoryModal, body.name);
        }

        var result = await BlogCategoryModal(dataSave).save();

        const data = {
            _status : true,
            _message : "Record Created.",
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

exports.view = async(request, response) => {

    try {
        var body = request.body || {};

        var page = Number(body.page) || 1;
        var limit = Number(body.limit) || 15;
        var skip = (page - 1) * limit;

        var condition = {
            deleted_at : null
        }

        // Search by name (case insensitive, partial match)
        if(body.name){
            condition.name = { $regex : escapeRegex(body.name), $options : 'i' };
        }

        var totalRecords = await BlogCategoryModal.countDocuments(condition);

        var result = await BlogCategoryModal.find(condition).select('name slug order status')
        .sort({
            order : 'asc',
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
        var result = await BlogCategoryModal.findOne({
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

exports.update = async(request, response) => {

    try {
        var body = request.body || {};

        var dataUpdate = {
            updated_at : Date.now()
        }

        fields.forEach((key) => {
            if(body[key] !== undefined){
                dataUpdate[key] = body[key];
            }
        });

        if(typeof body.name == 'string' && body.name.trim()){
            dataUpdate.slug = await generateUniqueSlug(BlogCategoryModal, body.name, request.params.id);
        }

        // runValidators : updateOne skips schema validation by default
        var result = await BlogCategoryModal.updateOne({
            _id : request.params.id,
            deleted_at : null
        }, dataUpdate, { runValidators : true });

        if(result.matchedCount == 0){
            const data = {
                _status : false,
                _message : "No Record Found.",
                _data : ''
            }

            return response.send(data);
        }

        const data = {
            _status : true,
            _message : "Record Updated.",
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

// Body -> { ids : ['id1', 'id2'] }
exports.destroy = async(request, response) => {

    try {
        var ids = request.body?.ids;

        if(!Array.isArray(ids) || ids.length == 0){
            const data = {
                _status : false,
                _message : "Please select at least one record.",
                _data : ''
            }

            return response.send(data);
        }

        // A category can not be deleted while blogs are still using it
        var totalBlogs = await BlogModal.countDocuments({
            category : { $in : ids },
            deleted_at : null
        });

        if(totalBlogs > 0){
            const data = {
                _status : false,
                _message : `Selected categories are used in ${totalBlogs} blog(s). Delete or move those blogs first.`,
                _data : ''
            }

            return response.send(data);
        }

        var result = await BlogCategoryModal.updateMany({
            _id : { $in : ids },
            deleted_at : null
        }, {
            deleted_at : Date.now(),
            updated_at : Date.now()
        });

        const data = {
            _status : true,
            _message : "Record Deleted.",
            _data : result
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

// Body -> { ids : ['id1', 'id2'] }
exports.changeStatus = async(request, response) => {

    try {
        var ids = request.body?.ids;

        if(!Array.isArray(ids) || ids.length == 0){
            const data = {
                _status : false,
                _message : "Please select at least one record.",
                _data : ''
            }

            return response.send(data);
        }

        var records = await BlogCategoryModal.find({
            _id : { $in : ids },
            deleted_at : null
        }).select('status');

        // Active -> InActive and InActive -> Active
        await Promise.all(records.map((record) => {
            return BlogCategoryModal.updateOne({ _id : record._id }, {
                status : !record.status,
                updated_at : Date.now()
            });
        }));

        const data = {
            _status : true,
            _message : "Status changed successfully.",
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
