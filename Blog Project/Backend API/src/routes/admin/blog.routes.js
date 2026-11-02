const express = require('express');
const { create, view, details, update, destroy, changeStatus } = require('../../controllers/admin/blog.controller');
const auth = require('../../middleware/auth.middleware');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/blogs' })
const crypto = require('crypto')
const path = require('path');


const route = express.Router();

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/blogs')
        },
        filename: function (req, file, cb) {

            crypto.randomBytes(16, function (err, raw) {
            if (err) return cb(err)
            cb(null, file.fieldname + '-' + raw.toString('hex')+path.extname(file.originalname))
            })
        }
    })

    const uploads = multer({ storage: storage })

    route.post('/create', auth, uploads.single('image'), create)

    route.post('/view', auth, upload.none(), view)

    route.post('/details/:id', auth, upload.none(), details)

    route.put('/update/:id', auth, upload.none(), update)

    route.put('/change-status', auth, upload.none(), changeStatus)

    route.delete('/delete', auth,upload.none(), destroy)

    server.use('/api/admin-panel/blog', route);
}
