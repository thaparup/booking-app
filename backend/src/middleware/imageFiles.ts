import multer from "multer";

// const upload = multer({ dest: "./../../public/temp/" });

// const uploadImage = () => upload;

// export { uploadImage };

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./public/temp/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const uploadImage = () => {
  return multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  });
};

export { uploadImage };
