const { nanoid } = require("nanoid");

const multer = require("multer");

const fileUploader = ({
  destinationFolder = "",
  prefix = "POST",
  fileType = "image", //tipe apa yang akan diuploaad
}) => {
  const storageConfig = multer.diskStorage({
    //storageconfig = tempat penyimpaan gambar menggunakan "multer"
    //multerdisstorage = menentukan destinationnya dimana.
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../public/${destinationFolder}`); //depan cb error/null,setelah itu dia diisi path
    },
    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split("/")[1]; //mimetpe = value of the content type biasa berupa image/png atau jpg
      //split nanti jadinya isinya menjadi array

      const filename = `${prefix}_${nanoid()}.${fileExtension}`; //penamaan filenya nantinya beserta dengan ekstendinya mo jadi file apaan

      cb(null, filename);
    },
  });

  const uploader = multer({
    storage: storageConfig,

    fileFilter: (req, file, cb) => {
      console.log(file);
      if (file.mimetype.split("/")[0] != fileType) {
        return cb(null, false);
      }

      cb(null, true);
    },
  });

  return uploader;
};

module.exports = fileUploader;
