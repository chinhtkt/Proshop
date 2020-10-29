import auth from '../middleware/auth.js'
import express from 'express'
import multer from 'multer'
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
      if (ext !== '.jpg' || ext !== '.png') {
          return cb(res.status(400).end('only jpg, png are allowed'), false);
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


router.post("/uploadProduct", auth, (req, res) => {

  //save all the data we got from the client into the DB 
  const product = new Product(req.body)

  product.save((err) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true })
  })

});
export default router
