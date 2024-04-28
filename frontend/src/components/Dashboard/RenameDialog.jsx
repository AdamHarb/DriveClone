import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@material-ui/core';

const RenameDialog = ({ open, handleClose, handleRename }) => {
	const [newName, setNewName] = useState('');

	const handleInputChange = (event) => {
		setNewName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleRename(newName);
		handleClose();
	};

	return (
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Rename File/Folder</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit}>
						<TextField
								autoFocus
								margin="dense"
								label="New Name"
								type="text"
								fullWidth
								value={newName}
								onChange={(e) => handleInputChange(e)}
						/>
						<Button type="submit" color="primary">
							Rename
						</Button>
					</form>
				</DialogContent>
			</Dialog>
	);
};

export default RenameDialog;