const File = require('../models/File');
const User = require('../models/User');
const { getGridFSBucket, getDB} = require('../../db/db');
const {ObjectId} = require("mongodb");

exports.uploadFile = async (req, res) => {
	try {
		const { parent_id } = req.body;

		const user = await User.findOne({ _id: req.user._id });

		await User.updateOne({ _id: req.user._id }, { storage_used: user.storage_used + req.file.size / 1048576 });

		const fileBuffer = req.file.buffer;

		const bucket = await getGridFSBucket();
		const uploadStream = bucket.openUploadStream(req.file.originalname, {
			contentType: req.file.mimetype
		});
		uploadStream.end(fileBuffer);

		const fileId = uploadStream.id;

		const file = new File({
			user_id: req.user._id,
			parent_id,
			name: req.file.originalname,
			mime_type: req.file.mimetype,
			size: req.file.size,
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

exports.renameFile = async (req, res) => {
	try {
		const {newName, fileId, name} = req.body;

		const ext = name.split('.').pop();
		const newNameWithExt = newName + '.' + ext;

		const file = await File.findOneAndUpdate(
				{file_id: fileId, user_id: req.user._id},
				{name: newNameWithExt},
				{new: true}
		);

		if (!file) {
			return res.status(404).json({message: "File not found"});
		}

		res.status(200).json(file);
	} catch (e) {
		res.status(500).json({message: "Internal server error"});
	}
}

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

		const user = await User.findOne({ _id: req.user._id });

		await User.updateOne({ _id: user._id }, { storage_used: user.storage_used - file.size / 1048576 });

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
		const parent_id = req.params.folderId;
		const query = { user_id: req.user._id };

		if (parent_id) {
			query.parent_id = parent_id;
		}

		const files = await File.find(query);
		return {
			"status": 200,
			"data": files
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.listRootFiles = async (req, res) => {
	try {
		const query = { user_id: req.user._id, parent_id: null};

		const files = await File.find(query);
		return {
			"status": 200,
			"data": files
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.starFile = async (req, res) => {
	try {
		const fileId = req.body.fileId;

		const file = await File.findOneAndUpdate({ _id: fileId }, { type: 'starred' }, { new: true });

		if (!file) {
			return res.status(404).json({ message: "File not found" });
		}

		console.log(file)

		res.status(200).json(file);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
}

exports.viewFile = async (req, res) => {
	try {
		const fileId = new ObjectId(req.params.fileId);

		const file = await File.findOne({ _id: fileId });

		if (!file) {
			return res.status(404).json({ message: "File not found" });
		}

		const bucket = await getGridFSBucket();
		const downloadStream = bucket.openDownloadStream(file.file_id);

		res.set({
			'Content-Type': file.mime_type,
			'Content-Disposition': `inline; filename="${file.name}"`,
		});

		downloadStream.pipe(res);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};