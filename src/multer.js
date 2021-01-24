import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, __dirname + '/uploads');
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + '_' + file.originalname);
	}
});

const fileFilter = (req, file, callback) => {
	if (file.mimetype.match(/jpg|jpeg|png|gif/gmis)) {
		return callback(null, true);
	}
	callback(new Error('Bad!!'), false);
}

export default multer({ storage: storage, fileFilter: fileFilter }).single('file' /* name attr */);