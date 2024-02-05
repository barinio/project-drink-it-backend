const cloudinaryController = async (req, res) => {
	if (!req.file) {
		return res.status(400).send('No image uploaded.');
	}
	res.json({ imageUrl: req.file.path });
};

module.exports = cloudinaryController;
