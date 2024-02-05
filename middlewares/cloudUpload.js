require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: async (req, file) => {
		let folder;
		if (file.fieldname === 'avatar') {
			folder = 'avatars';
		} else if (file.fieldname === 'documents') {
			folder = 'documents';
		} else {
			folder = 'misc';
		}
		return {
			folder: folder,
			allowed_formats: ['jpg', 'png'],
			public_id: file.originalname, // Use original filename as the public ID
			transformation: [
				{ width: 350, height: 350 },
				{ width: 700, height: 700 },
			],
		};
	},
});

const parser = multer({ storage: storage });

module.exports = parser;
