const multer = require('multer');
const storage = multer.memoryStorage() //setting the storage as memory(RAM)
const upload = multer({storage:storage}) 

module.exports = upload
