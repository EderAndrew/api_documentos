import multer from "multer"

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination for uploaded files to './tmp'
        cb(null, './tmp')
    },
    //This function sets the filename for a given file.
    filename: (req, file, cb) => {
        // Set the filename to the original name of the file
        cb(null, file.originalname)
    }
})

export const upload = multer({
   storage: storageConfig,

   fileFilter: (req, file, cb) => {
        // Define the allowed mimetypes
       const allowed: string[] = ['application/pdf']

        // Check if the file's mimetype is included in the allowed lists
       cb(null, allowed.includes(file.mimetype))
   },
   limits: { fieldSize: 10000000 },
})