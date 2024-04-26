const File = require('../models/File');
const { getGridFSBucket, getDB} = require('../../db/db');
const {ObjectId} = require("mongodb");

exports.uploadFile = async (req, res) => {
	try {
		const { parent_id, name, size } = req.body;

		const fileCount = await File.countDocuments({ user_id: req.user._id });

		const fileBuffer = req.file.buffer;

		const bucket = await getGridFSBucket();
		const uploadStream = bucket.openUploadStream(name || `File ${fileCount + 1}`, {
			contentType: req.file.mimetype
		});
		uploadStream.end(fileBuffer);

		const fileId = uploadStream.id;

		const file = new File({
			user_id: req.user._id,
			parent_id,
			name: name || `File ${fileCount + 1}`,
			mime_type: req.file.mimetype,
			size,
			file_id: fileId
		});

		await file.save();
		res.status(201).json({ message: "File uploaded successfully", fileId });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.downloadFile = async (req, res) => {
	try {
		const fileId = req.params.fileId;

		const db = await getDB();

		const file = await db.collection('fs.files').findOne({ _id: new ObjectId(fileId) });

		if (!file) {
			return res.status(404).json({ message: "File not found" });
		}

		const bucket = await getGridFSBucket();
		const downloadStream = bucket.openDownloadStream(file._id);
		res.set({
			'Content-Type': file.contentType,
			'Content-Disposition': `attachment; filename="${file.name}"`
		});
		downloadStream.pipe(res);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.getFileDetails = async (req, res) => {
	try {
		const fileId = req.params.fileId;
		const file = await File.findOne({ _id: fileId, user_id: req.user._id });

		if (!file) {
			return res.status(404).json({ message: "File not found" });
		}

		res.status(200).json(file);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.updateFileDetails = async (req, res) => {
	try {
		const fileId = req.params.fileId;
		const { name, parent_id } = req.body;

		const file = await File.findOneAndUpdate(
				{ _id: fileId, user_id: req.user._id },
				{ name, parent_id },
				{ new: true }
		);

		if (!file) {
			return res.status(404).json({ message: "File not found" });
		}

		res.status(200).json(file);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.deleteFile = async (req, res) => {
	try {
		const fileId = req.params.fileId;
		const file = await File.findOneAndDelete({ _id: fileId, user_id: req.user._id });

		if (!file) {
			return res.status(404).json({ message: "File not found" });
		}

		if (!fileContent) {
			return res.status(404).json({ message: "File not found" });
		}

		const bucket = await getGridFSBucket();
		await bucket.delete(file.file_id);

		res.status(200).json({ message: "File deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.listFiles = async (req, res) => {
	try {
		const { parent_id } = req.query;
		const query = { user_id: req.user._id };

		if (parent_id) {
			query.parent_id = parent_id;
		}

		const files = await File.find(query);
		res.status(200).json(files);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};