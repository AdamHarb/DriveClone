import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert.js";
import React from "react";
import StarIcon from '@mui/icons-material/Star';

export const StarredFiles = ({files, classes, handleContextMenu, getFileIcon, user, resetType, fetchFilesFolders}) => {
	const starredFiles = files.filter(file => file.type === "starred");

	return (
			starredFiles.map(file => (
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
									<StarIcon></StarIcon>
								</IconButton>
					</div>
			))
	)
}