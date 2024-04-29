import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import DescriptionIcon from "@mui/icons-material/Description.js";
import TextFieldsIcon from "@mui/icons-material/TextFields.js";
import PersonIcon from "@mui/icons-material/Person.js";
import FolderIcon from "@material-ui/icons/Folder.js";
import DateRangeIcon from "@mui/icons-material/DateRange.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";

export const DetailsDialog = ({viewDetailsDialogOpen, setViewDetailsDialogOpen, selectedObj, updateFileDescription, setSelectedObj, user}) => {
	const [description, setDescription] = useState('')

	const handleInputChange = (event) => {
		setDescription(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setSelectedObj(prevState => ({...prevState, description: e.target.value}))
		// handleClose();
	};

	return (
			<Dialog open={viewDetailsDialogOpen} onClose={() => setViewDetailsDialogOpen(false)}>
				<DialogTitle>File Details</DialogTitle>
				<DialogContent>
					{selectedObj ? (
							<>
								<Typography variant="body1" style={{marginBottom: '1rem'}}>
									<DescriptionIcon
											style={{verticalAlign: 'middle', marginRight: '0.5rem'}}/> Type: {selectedObj.mime_type}
								</Typography>
								<Typography variant="body1" style={{marginBottom: '1rem'}}>
									<TextFieldsIcon style={{
										verticalAlign: 'middle',
										marginRight: '0.5rem'
									}}/> Size: {Math.round(selectedObj.size / 1024 / 1024).toFixed(2)} MB
								</Typography>
								<Typography variant="body1" style={{marginBottom: '1rem'}}>
									<PersonIcon style={{verticalAlign: 'middle', marginRight: '0.5rem'}}/> Owner: {user.username}
								</Typography>
								<Typography variant="body1" style={{marginBottom: '1rem'}}>
									<FolderIcon style={{verticalAlign: 'middle', marginRight: '0.5rem'}}/> Location: My Drive
								</Typography>
								<Typography variant="body1" style={{marginBottom: '1rem'}}>
									<DateRangeIcon style={{verticalAlign: 'middle', marginRight: '0.5rem'}}/> Upload
									Date: {new Date(selectedObj.uploaded_at).toLocaleString()}
								</Typography>
								<form onSubmit={updateFileDescription(selectedObj.description)}>
								<TextField
										label="Description"
										autoFocus
										margin="dense"
										type="text"
										fullWidth
										value={description}
										onChange={(e) => {
											handleInputChange(e)
										}}
								/>
								<Button type="submit" color="primary">Update</Button>
								</form>
							</>
					) : (
							<Typography variant="body1">No file or folder selected.</Typography>
					)}
				</DialogContent>

			</Dialog>
	)
}