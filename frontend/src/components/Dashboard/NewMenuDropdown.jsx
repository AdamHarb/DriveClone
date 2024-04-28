import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const NewMenuDropdown = ({ anchorEl, open, handleClose, handleUploadFile, handleUploadFolder, handleCreateFolder }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={() => {
        handleClose();
        document.getElementById('file-input').click();
      }}>
        Upload File
      </MenuItem>
      <MenuItem onClick={() => {
        handleClose();
        document.getElementById('folder-input').click();
      }}>
        Upload Folder
      </MenuItem>
      <MenuItem onClick={handleCreateFolder}>
        Create Folder
      </MenuItem>
    </Menu>
  );
};

export default NewMenuDropdown;