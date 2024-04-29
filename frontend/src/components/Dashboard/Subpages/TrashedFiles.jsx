import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreIcon from '@mui/icons-material/Restore';
import {useCookies} from "react-cookie";

export const TrashedFiles = ({files, classes, handleContextMenu, getFileIcon, user, resetType, fetchFilesFolders}) => {
	const trashedFiles = files.filter(file => file.type === "trashed");
	const [cookies, setCookie, removeCookie] = useCookies(['token']);

	const deleteFile = async(id) => {
		try {
			const response = await axios.delete(`http://localhost:3000/api/delete-files/${id}`, {
				headers: {
					'Authorization': `Bearer ${cookies.token}`
				}
			}).then((r) => {
				fetchFilesFolders();
			});
			console.log(response.data)
		}
		catch (error) {
			console.error('Error during file deletion:', error);
		}
	}

	return (
			trashedFiles.map(file => (
					<div key={file.file_id} className={classes.fileItem} onContextMenu={handleContextMenu(file)}>
						<div className={classes.fileIcon}>
							{getFileIcon(file.mime_type)}
						</div>
						<Typography className={classes.fileName}>{file.name}</Typography>
						<div className={classes.fileDetails}>
							<Typography className={classes.fileDetailsItem} style={{
								marginRight: "20px"
							}}>{new Date(file.updated_at).toLocaleString()}</Typography>
							<Avatar style={{
								marginRight: "60px"
							}}>
								{user?.username?.split(" ").map((name) => name[0]).join("").toUpperCase()}
							</Avatar>
							<Typography style={{
								marginRight: "178px"
							}}>My Drive</Typography>
						</div>
						<IconButton onClick={() => {
							resetType(file).then(() => {
								fetchFilesFolders();
							})
						}}>
							<RestoreIcon />
						</IconButton>
						<IconButton onClick={() => {
							deleteFile(file._id).then(() => {
								fetchFilesFolders();
							})
						}}>
							<DeleteForeverIcon />
						</IconButton>
					</div>
			))
	)
}