'use strict'
require('dotenv').config()

const {Storage} = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
}

console.log('1');
const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)
  console.log('>>>>> ', gcsname);
  console.log('<<<<', file);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    console.log(err);
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)

      console.log('masukkk ', req.file.cloudStoragePublicUrl);
      next()
    })
  })

  stream.end(req.file.buffer)
}

const deleteImage = async (req, res, next) => {
  const picture_url = req.headers.picture_url //old image
  const newPicture = req.file ? req.file.originalname : ''
  let pictureSplit = picture_url.split('/')
  let oldPicture = pictureSplit[pictureSplit.length-1]

  if(newPicture && oldPicture && newPicture !== oldPicture) {
    await storage
    .bucket(CLOUD_BUCKET)
    .file(oldPicture)
    .delete();
  }
  
  next()
}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer,
  deleteImage
}