const File = require('../models/File');
const bucket = require('../../db/db').getGridFSBucket();

exports.uploadFile = async (req, res) => {
	try {
		const { parent_id, name, mime_type, size } = req.body;

		const fileCount = await File.countDocuments({ user_id: req.user._id });

		const fileBuffer = req.file.buffer;

		const uploadStream = bucket.openUploadStream(name || `File ${fileCount + 1}`, {
			contentType: mime_type
		});
		uploadStream.end(fileBuffer);

		const fileId = uploadStream.id;

		const file = new File({
			user_id: req.user._id,
			parent_id,
			name: name || `File ${fileCount + 1}`,
			mime_type,
			size,
			file_id: fileId
		});

		await file.save();
		res.status(201).json({ message: "File uploaded successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};