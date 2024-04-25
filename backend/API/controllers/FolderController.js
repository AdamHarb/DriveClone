import File from '../models/File';
import Folder from '../models/Folder';

//When user logs in to website display his folders (This should be used with getFilesByUserId to get everything)
exports.getFoldersByUserId = async (req, res) => {
    try{
        const user_id = req.params.user_id;
        const folders = await Folder.find({user_id: user_id});
        res.status(200).json(folders);
    }
    catch  (err){
        res.status(500).json({message: "Internal server error"});
    }
}
//This only creates the folder name and object which needs to be filled using another api.
exports.createFolder = async (req, res) => {
    try{
        const {user_id, folder_name} = req.body;
        const folder = new Folder({
            user_id,
            folder_name
        });
        await folder.save();
        res.status(201).json({message: "Folder created successfully"});
    }
    catch (err){
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
}




