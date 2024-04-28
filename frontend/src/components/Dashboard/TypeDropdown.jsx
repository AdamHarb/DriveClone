import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#f0ecf4",
    borderRadius: "25px",
    textTransform: "none",
    border: "none",
    padding: theme.spacing(1, 2),
    marginLeft: theme.spacing(1),
    fontSize: "18px",
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#e0d9e7",
    },
    "&:focus": {
      outline: "none",
    },
    "&:active": {
      backgroundColor: "#f0ecf4",
    },
  },
  selectedType: {
    display: "flex",
    alignItems: "center",
  },
  closeIcon: {
    marginLeft: theme.spacing(1),
    cursor: "pointer",
  },
}));

const TypeDropdown = ({ files, onTypeSelect, selectedType }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTypeSelect = (type) => {
    onTypeSelect(type);
    handleClose();
  };

  const handleClearType = () => {
    onTypeSelect(null);
  };

  const uniqueTypes = [...new Set(files.map((file) => file.mime_type))];

  return (
    <div>
      <Button
        className={classes.button}
        aria-controls="type-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ArrowDropDownOutlinedIcon />}
      >
        {selectedType ? (
          <div className={classes.selectedType}>
            {selectedType}
            <CloseIcon
              className={classes.closeIcon}
              onClick={handleClearType}
            />
          </div>
        ) : (
          "Type"
        )}
      </Button>
      <Menu
        id="type-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {uniqueTypes.map((type) => (
          <MenuItem key={type} onClick={() => handleTypeSelect(type)}>
            {type}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default TypeDropdown;