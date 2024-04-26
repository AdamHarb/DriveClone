const Folder = require('../models/Folder');

//When user logs in to website display his folders (This should be used with getFilesByUserId to get everything)
exports.getFoldersByUserId = async (req, res) => {
    try{
        const user_id = req.user.user_id;
        const folders = await Folder.find({user_id: user_id});
        res.status(200).json(folders);
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

        if (!folder_name) {
            return res.status(400).json({message: "Missing required field: folder_name"});
        }

        const folder = new Folder({
            user_id,
            folder_name,
            parent_id
        });

        await folder.save();
        console.log(folder);
        res.status(201).json({message: "Folder created successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
};





