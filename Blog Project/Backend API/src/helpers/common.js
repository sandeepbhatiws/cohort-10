var slugify = require('slugify')

// Creates a unique slug like "my-blog", "my-blog-1", "my-blog-2" ...
// excludeId : pass the record id while updating, so the record does not clash with its own slug
exports.generateUniqueSlug = async (Model, text, excludeId = null) => {

    var baseSlug = slugify(text, {
        lower: true,      // convert to lower case
        strict: true,     // strip special characters
    }) || 'item';

    var slug = baseSlug;
    var count = 0;

    var condition = { slug };

    if(excludeId){
        condition._id = { $ne : excludeId };
    }

    while (await Model.findOne(condition)) {
        count++;
        slug = `${baseSlug}-${count}`;
        condition.slug = slug;
    }

    return slug;
};

// Converts mongoose validation errors into { field : message }
exports.getErrorMessages = (error) => {

    var errorMessages = {};

    for(var key in error.errors){
        errorMessages[key] = error.errors[key].message
    }

    return errorMessages;
};

// Escapes special characters so user input can be used safely inside a RegExp search
exports.escapeRegex = (text) => {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
