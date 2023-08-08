import multer from 'multer'
import { v4 } from 'uuid'
// import fileDirName from './file-dir-name.js'
import { extname, resolve } from 'path'

// const { __dirname } = fileDirName(import.meta)

export default {
  storage: multer.diskStorage({
    destination: resolve(process.cwd() + '/uploads'),
    filename: (request, file, cb) => {
      const fileNameExtension = v4() + extname(file.originalname)

      return cb(null, fileNameExtension)
    }
  })
}
