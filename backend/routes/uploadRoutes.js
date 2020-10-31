import auth from '../middleware/auth.js'
import express from 'express'
import multer from 'multer'
import path from 'path'
const router = express.Router()

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.jpg' || ext !== '.png' || ext!== '.jpeg') {
          return cb(res.status(400).end('only jpg, png, jpeg are allowed'), false);
      }
      cb(null, true)
  }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             Upload Image
//=================================

router.post("/uploadImage", (req, res) => {

  upload(req, res, err => {
      if (err) {
          return res.json({ success: false, err })
      }
      return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
  })

});



export default router
