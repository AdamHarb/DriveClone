const Folder = require('../models/Folder');
const mongoose = require("mongoose");

//When user logs in to website display his folders (This should be used with getFilesByUserId to get everything)
exports.getFoldersByUserId = async (req, res) => {
    try{
        const parent_id = req.params.folderId;
        const query = { user_id: req.user.user_id };
        if (parent_id) {
            query.parent_id = parent_id;
        }
        const folders = await Folder.find(query);
        return {
            "status": 200,
            "data": folders
        }
    }
    catch  (err){
        res.status(500).json({message: "Internal server error"});
    }
}

exports.getRootFoldersByUserId = async (req, res) => {
    try{
        const query = { user_id: req.user.user_id, parent_id: null};
        const folders = await Folder.find(query);
        return {
            "status": 200,
            "data": folders
        }
    }
    catch  (err){
        res.status(500).json({message: "Internal server error"});
    }
}

//This only creates the folder name and object which needs to be filled using another api.
exports.createFolder = async (req, res) => {
    let user_id;
    try {
        user_id = req.user.user_id;
        const {folder_name, parent_id} = req.body;

        const folder = new Folder({
            user_id,
            folder_name: folder_name || `Folder ${Folder.countDocuments({}) + 1}`,
            parent_id
        });

        await folder.save();
        console.log(folder);
        res.status(201).json({message: "Folder created successfully", folder_id: folder._id});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
};