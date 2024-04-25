import File from '../models/File';
import Folder from '../models/Folder';

//When user logs in to website display his folders (This should be used with getFilesByUserId to get everything)
exports.getFoldersByUserId = async (req, res) => {
    try{
        const user_id = req.params.user_id;
        const folders = await Folder.find({user_id: user_id});
        res.status(200).json(folders);
    }
    catch{
        res.status(500).json({message: "Internal server error"});
    }
}
exports.createFolder = async (req, res) => {

}



