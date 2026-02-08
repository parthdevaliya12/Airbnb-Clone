// import multer from "multer"

// const storage = multer.diskStorage({
//   destination:(req, file, cb) =>{
//     cb(null, './public')
//   },
//   filename: (req, file, cb)=> {
//     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.originalname)
//   }
// })

// const upload = multer({ storage })

// export default upload


import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;

