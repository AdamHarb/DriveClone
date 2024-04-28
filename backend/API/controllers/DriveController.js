const folderController = require("./FolderController");
const fileController = require("./FileController");

exports.getRootStuff = async (req, res) => {
    try {
        const [userFolders, userFiles] = await Promise.all([
            folderController.getRootFoldersByUserId(req,res),
            fileController.listRootFiles(req,res)
        ]);
        if(userFolders.status !== 200 || userFiles.status !== 200){
            res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({
            userFolders: userFolders.data,
            userFiles: userFiles.data
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getFolderStuff = async (req, res) => {
    try {
        const [userFolders, userFiles] = await Promise.all([
            folderController.getFoldersByUserId(req,res),
            fileController.listFiles(req,res)
        ]);
        if(userFolders.status !== 200 || userFiles.status !== 200){
            res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({
            userFolders: userFolders.data,
            userFiles: userFiles.data
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }}