const multer = require('multer');
const { host, port } = require('../../config/application');
const ServerError = require('../errors/ServerError');

const uploadImage = (destination, fileKey) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      // eslint-disable-next-line prefer-template
      cb(null, Date.now() + '.jpg');
    },
  });

  const upload = multer({ storage });

  return (req, res, next) => {
    upload.single(fileKey)(req, res, (err) => {
      if (err) {
        throw new ServerError();
      } else {
        req.body.avatarUrl = `http://${host}:${port}/${fileKey}/${req.file.filename}`;
        next();
      }
    });
  };
};

module.exports = uploadImage;
