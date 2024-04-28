import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloudIcon from "@material-ui/icons/Cloud";
import ToggleButton from "@material-ui/lab/ToggleButton";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
// more icons for the sidebar
import HomeIcon from "@material-ui/icons/Home";
//import DriveFolderUploadIcon from '@material-ui/icons/DriveFolderUpload';
import ComputerIcon from "@material-ui/icons/Computer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleIcon from "@material-ui/icons/People";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ReportIcon from "@material-ui/icons/Report";
import DeleteIcon from "@material-ui/icons/Delete";
import StorageIcon from "@material-ui/icons/Storage";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import DoneIcon from "@material-ui/icons/Done";
import { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { ToggleButtonGroup } from "@material-ui/lab";
import logo from "../Assets/logo.png";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import AddToDriveOutlinedIcon from "@mui/icons-material/AddToDriveOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from '@mui/icons-material/Description'; // default icon
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // for PDFs
import ArticleIcon from '@mui/icons-material/Article';
import MovieIcon from '@mui/icons-material/Movie';
import FolderZipIcon from '@mui/icons-material/FolderZip';


import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;
// makestyles is from material ui . its a hook that defines CSS with JavaScript objects
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "Roboto, sans-serif",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    position: "relative",
  },
  storageInfo: {
    marginTop: "auto",
    padding: theme.spacing(2),
  },
  searchBar: {
    marginBottom: theme.spacing(2),
    width: "60%", // Maintain the width of the search bar
    marginLeft: 325,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f0ecf4", // Base color when not focused
      borderRadius: "10px", // Border radius for the search bar
      height: "60px", // Increase the height of the search bar
      "&:hover": {
        backgroundColor: "#f0ecf4", // Hover state remains the same
      },
      "&.Mui-focused": {
        backgroundColor: "#fff", // Color when focused
        boxShadow:
          "0 4px 8px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.05)", // Shadow when focused
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none", // Remove border entirely
      },
    },
    "& .MuiOutlinedInput-input": {
      height: "100%", // Ensure the input height matches the search bar height
      fontSize: "18px", // Optional: Increase font size
    },
    "& input::placeholder": {
      color: "black", // Set the placeholder text color to black
    },
  },

  fileName: {
    marginTop: "10px", // The name of the file was a bit up from its details. This is to push it down
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis", // SOME FILE NAMES MIGHT BE EXTREMELY LONG, SO WE PUT ...
    width: "400px", // Since name takes most of the row
    // Color: rgb(31, 31, 31),
  },
  fileItem: {
    display: "flex",
    transition: "background-color 0.3s", // Smooth transition for background color
    "&:hover": {
      backgroundColor: "#f5f5f5", // Change to your preferred shade of gray
    },
    borderBottom: "1px solid #e0e0e0", // Add border at the bottom of each file item
    paddingBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(1),
  },
  // Putting the 2 divs as flex items: name AND (locations, reason, owner)
  fileDetails: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1, // Assigning some space for each flex item
    marginLeft: theme.spacing(2),
  },
  fileDetailsItem: {},
  avatar: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    cursor: "pointer",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  logoIcon: {
    marginRight: theme.spacing(1),
    width: "60px", // Specify the width you want
    height: "60px",
  },
  // Suggested container modified to enclose 'Files' and 'Folders' buttons in one box
  suggestedContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1), // Optional: Add padding if needed
  },
  suggestedText: {
    marginRight: theme.spacing(3), // Add margin to the right of the "Suggested" text
    marginLeft: theme.spacing(-1),
    fontSize: "22px",
  },

  suggestedIcons: {
    borderRadius: "10px",
    width: "90px",
    height: "40px",
    marginRight: theme.spacing(1),
    "&:last-child": {
      marginRight: 0,
    },
  },
  separator: {
    borderLeft: "1px solid #ccc", // Add a vertical separator line
    height: "40px", // Match the height of the buttons
    margin: theme.spacing(0, 1), // Add some spacing around the separator
  },
  filefolderIcon: {
    width: "16px",
  },
  addButton: {
    margin: theme.spacing(2),
    width: "55%",
    borderRadius: 20,
    backgroundColor: "#fff", // Set background color to white
    color: "black", // Use primary color for text
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    textTransform: "none",
    paddingBottom: theme.spacing(2),
    boxShadow: `
            0 4px 8px rgba(0, 0, 0, 0.1), // Bottom shadow
            0 3px 6px rgba(0, 0, 0, 0.07), // Middle shadow
            0 2px 4px rgba(0, 0, 0, 0.05)  // Top shadow
        `,
    "&:hover": {
      backgroundColor: "#e7edf8", // Change background color on hover
      boxShadow: `
                0 5px 10px rgba(0, 0, 0, 0.2), // Bottom shadow
                0 4px 8px rgba(0, 0, 0, 0.15), // Middle shadow
                0 3px 6px rgba(0, 0, 0, 0.1)   // Top shadow
            `,
    },
  },
  newIcon: {
    marginRight: theme.spacing(1),
    width: "32px",
    height: "32px",
  },
  filterOptions: {
    display: "flex",
    justifyContent: "space-between",
  },
  listLayout: {
    paddingTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #e0e0e0", // Add a thin bottom border to the div containing the titles
    paddingBottom: theme.spacing(1), // Add padding for separation
  },
  listLayoutItems: {
    display: "flex",
    marginRight: "2rem",
    flexGrow: 0.45,
  },
  listLayoutItem: {
    display: "flex",
    flexGrow: 1,
    fontSize: 18,
  },
  centeredText: {
    textAlign: "center", // Center the text horizontally
    marginBottom: theme.spacing(2), // Add some margin below the text
  },
  nameBold: {
    fontSize: 18,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center", // Center the buttons horizontally
    marginBottom: theme.spacing(3), // Add margin below the container
    alignItems: "center", // Align the buttons vertically
  },
  // Add styles for the buttons
  button: {
    backgroundColor: "#f0ecf4", // Base color for the buttons
    borderRadius: "25px", // Border radius for the buttonsssssss
    textTransform: "none", // Ensure text is not capitalized
    border: "none", // Remove the border from the buttons
    padding: theme.spacing(1, 2), // Adjust padding as desired
    marginLeft: theme.spacing(1), // Add small margin between buttons
    fontSize: "18px",
    marginRight: theme.spacing(1),
    "&:first-child": {
      marginLeft: 0, // Remove margin for the first button
    },
    "&:last-child": {
      marginRight: 0, // Remove margin for the last button
    },
    // Hover style for buttons
    "&:hover": {
      backgroundColor: "#e0d9e7", // Adjust color on hover
    },
    // Remove any focus and active styles
    "&:focus": {
      outline: "none", // Optional: Remove outline when focused
    },
    "&:active": {
      backgroundColor: "#f0ecf4", // Keep base color when pressed
    },
  },
  icon: {
    color: "black",
    marginRight: theme.spacing(-2),
  },
  fileIcon: {
    verticalAlign: 'middle', // Adjust this as needed to lower the icons
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1), // Optional: Adjust spacing between icon and file name
  },
  verticalSeparator: {
    borderLeft: "1px solid #ccc", // Thin vertical line
    height: "40px", // Match the height of the buttons
    margin: theme.spacing(0, 0.1), // Add some spacing around the separator
  },
  listButton: {
    borderRadius: "25px",
    padding: theme.spacing(0.5, 3),
    textTransform: "none",
    width: "85%", // Adjusted width for the buttons
    marginLeft: theme.spacing(2), // Adjusted margin for spacing
    marginRight: theme.spacing(2), // Adjusted margin for spacing
    "&:hover": {
      backgroundColor: "#e7e8eb", // Set the hover background color to #e7e8eb
    },
    "&:active": {
      backgroundColor: "#c8e4fc", // Color when pressed
    },
  },
  fileFolderButton: {
    borderRadius: "25px", // Border radius of 25px
    border: "0.1px solid black", // Outlined in black
    color: "black", // Text color is black
    textTransform: "none", // Don't capitalize the text
    height: "40px", // Set the button height to your desired value (e.g., '50px')
    width: "120px", // Set the button width to your desired value (e.g., '180px')
    "&:hover": {
      backgroundColor: "#f0f0f0", // Optional: Light gray background on hover
    },
  },
  layoutButton: {
    borderRadius: "25px", // Border radius of 25px
    border: "0.1px solid black", // Outlined in black
    color: "black", // Text color is black
    textTransform: "none", // Don't capitalize the text
    height: "40px", // Adjust height as needed
    marginLeft: 1100,
    width: "70px", // Smaller width for layout buttons
    "&:hover": {
      backgroundColor: "#f0f0f0", // Optional: Light gray background on hover
    },
  },
  modalContainer: {
    position: "relative",
    padding: theme.spacing(3),
    maxWidth: 600,
    width: 550,
    height: 350,
    background: '#e9eef6',
    

    margin: "0 auto", // Center the modal horizontally

  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: 'black',
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
  email: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    fontFamily: 'productSans',
  },
  profilePicture: {
    width: 100,
    height: 100,
    margin: "0 auto",
    marginBottom: theme.spacing(2),
  },
  greeting: {
    textAlign: "center",
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
  },
  gridItem: {
    width: '22.75%', // Adjust the width as needed
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    background: '#f0f4f9', // Default background color
    borderRadius: '15px',
    padding: theme.spacing(1.25),
    transition: 'background-color 0.3s', // Add transition for smooth color change
    '&:hover': {
      backgroundColor: '#dfe3e7', // Change background color on hover
    },
  },
  gridIcon: {
    fontSize: '2rem',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  
  },
  gridName: {
    wordBreak: 'break-word',
    flexGrow: 1, // Allow the name to take remaining space
    marginLeft: 7,
    fontSize: 18,
  },
  gridDetails: {
    display: 'flex', // Add flex display
    alignItems: 'center', // Center items vertically
    flexGrow: 1, // Allow the details to take remaining space
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const fileInputRef = useRef(null);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false); // Handling the advanced search modal
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutAnchorEl, setLogoutAnchorEl] = useState(null);
  const [activeButton, setActiveButton] = useState("files");
  const [activeLayout, setActiveLayout] = useState("list");
  const [activeListButton, setActiveListButton] = useState("home");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState("files");
  const [searchParams, setSearchParams] = useState({
    type: "",
    owner: "",
    hasTheWords: "",
    itemName: "",
    location: "",
    inTrash: false,
    starred: false,
  });
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  let data;

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }
  }, [])

  useEffect(() => {
    handleDashboardApi().then((response) => {
      console.log("fetched")
      data = response
    });
  }, [])

  const handleDashboardApi = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/dashboard', {
        headers: {
          withCredentials: true,
          'Authorization': `Bearer ${cookies.token}`
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
        console.error('Error during login:', error);
    }
  }

  function handleSharedWith(file) {
    if (file.sharedWith){
      return file.sharedWith.length
    }
    else return 0
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleToggleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setSelectedItemType(buttonType);
  };
  const handleLayoutButtonClick = (layoutType) => {
    setActiveLayout(layoutType);
  };
  const handleListButtonClick = (buttonType) => {
    setActiveListButton(buttonType);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = (event) => {
    setLogoutAnchorEl(event.currentTarget);
  };

  const handleLogoutClose = () => {
    setLogoutAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
    handleLogoutClose();
  };
  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
    profilePictureRef.current = event.currentTarget;
  };
  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
  };

  const handleReset = () => {
    resetForm(); // Function to reset the advanced search form
  };

  const handleSearch = () => {
    performSearch(); // Function to perform the advanced search
  };

  const getFileIcon = (mime_type) => {
		switch (mime_type) {
		  case 'application/pdf':
			return <PictureAsPdfIcon style={{ color: '#ea4335' }} />;
		  case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
		  case 'application/msword':
		  case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
			return <ArticleIcon style={{ color: '#4285f4' }}/>;
		  case 'text/plain':
			return <DescriptionIcon  style={{ color: '#34a853' }}/>;
		  case 'application/zip':
		  case 'application/x-rar-compressed':
			return <FolderZipIcon  style={{ color: '#5f6368' }}/>;
		  case 'video/mp4':
		  case 'video/mpeg':
			return <MovieIcon style={{ color: '#ea4335' }} />;
		  default:
			return <DescriptionIcon />;
		} 
	  };
    const getFolderIcon = (folderName) => {
      // Add logic to determine the appropriate folder icon based on the folder name or any other criteria
      // For example:
      if (folderName.toLowerCase().includes("project")) {
        return <FolderIcon style={{ color: "#444746" }} />;
      } else {
        return <FolderIcon />;
      }
    };

  const handleAdvancedSearchClick = () => {
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen); // Toggle the advanced search modal
  };
  const profilePictureRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;

    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const renderGrid = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.gridContainer}>
        {selectedItemType === 'files'
          ? files.map((file) => (
              <div key={file.file_id} className={classes.gridItem}>
                <div className={classes.gridIcon}>{getFileIcon(file.mime_type)}</div>
                <div className={classes.gridDetails}>
                  <div className={classes.gridName}>{file.name}</div>
                </div>
                <IconButton className={classes.kebabMenu} onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
              </div>
            ))
          : folders.map((folder) => (
              <div key={folder.folder_id} className={classes.gridItem}>
                <div className={classes.gridIcon}>{getFolderIcon(folder.name)}</div>
                <div className={classes.gridDetails}>
                  <div className={classes.gridName}>{folder.name}</div>
                </div>
                <IconButton className={classes.kebabMenu} onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
              </div>
            ))}
      </div>
    );
  };

  // This creates a new object with all the current searchParams, but with the value for the property named name updated to the new value that came from the text field.
  // The new object is then set as the new state.
  const initialFiles = [
    {
      name: "Proposal.pdf",
      uploadedAt: "2024-04-12T07:20:50.123Z",
      lastEdited: "2024-04-15T09:30:00.123Z",
      user_id: "507f1f77bcf86cd799439011",
      sharedWith: ["507f191e810c19729de860ea", "507f191e810c19729de860eb"],
      size: 153402,
      mime_type: "application/pdf",
    },
    {
      name: "ProjectPlan.docx",
      uploadedAt: "2024-03-27T05:24:30.123Z",
      lastEdited: "2024-04-05T11:45:30.123Z",
      user_id: "507f1f77bcf86cd799439012",
      sharedWith: [],
      size: 2048, // 2 KB
      mime_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
    {
      name: "ReadMe.txt",
      uploadedAt: "2024-04-10T14:00:00.123Z",
      lastEdited: "2024-04-12T15:30:00.123Z",
      user_id: "507f1f77bcf86cd799439013",
      sharedWith: ["507f191e810c19729de860ec"],
      size: 1024, // 1 KB
      mime_type: "text/plain",
    },
    // New video file (MP4)
    {
      name: "SampleVideo.mp4",
      uploadedAt: "2024-04-18T12:30:00.123Z",
      lastEdited: "2024-04-19T14:00:00.123Z",
      user_id: "507f1f77bcf86cd799439014",
      sharedWith: ["507f191e810c19729de860ed"],
      size: 20485760, // 20 MB
      mime_type: "video/mp4",
  },
  // New ZIP/RAR file
  {
      name: "Archive.zip",
      uploadedAt: "2024-04-15T08:15:00.123Z",
      lastEdited: "2024-04-17T09:45:00.123Z",
      user_id: "507f1f77bcf86cd799439015",
      sharedWith: [],
      size: 1024000, // 1 MB
      mime_type: "application/zip",
  }
  ];

  const [files, setFiles] = useState(initialFiles);

  const [searchTerm, setSearchTerm] = useState("");


  const initialFolders = [
    {
      name: "Project Documents",
      createdAt: "2024-04-10T09:00:00.123Z",
      lastModified: "2024-04-15T14:30:00.123Z",
      user_id: "507f1f77bcf86cd799439011",
      sharedWith: ["507f191e810c19729de860ea", "507f191e810c19729de860eb"],
    },

  ];

  const [folders, setFolders] = useState(initialFolders);

  
  useEffect(() => {
    const filteredFiles = initialFiles.filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiles(filteredFiles);
  
    const filteredFolders = initialFolders.filter((folder) =>
      folder.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFolders(filteredFolders);
  }, [searchTerm]);

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  }; // Every time the search input changes, set it as the new search term and it will filter out

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.logo}>
          <img src={logo} alt="Drive Logo" className={classes.logoIcon} />
          <Typography variant="h5">Drive</Typography>
        </div>

        <input
          type="file"
          style={{ display: "none" }} // Hide the file input element
          ref={fileInputRef}
          onChange={(event) => {
            const file = event.target.files[0];
            console.log(file); // Log the selected file, or handle it as needed
          }}
        />
        <Button
          variant="contained"
          color="default"
          className={classes.addButton}
          startIcon={<AddIcon className={classes.newIcon} />}
          onClick={handleButtonClick}
        >
          <Typography variant="body2" style={{ fontSize: "18px" }}>
            New
          </Typography>
        </Button>
        <List>
          <ListItem
            button
            className={classes.listButton}
            style={{
              backgroundColor:
                activeListButton === "home" ? "#c2e7ff" : "white",
            }}
            onClick={() => handleListButtonClick("home")}
          >
            <ListItemIcon className={classes.icon}>
              {activeListButton === "home" ? (
                <HomeIcon />
              ) : (
                <HomeOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem
            button
            className={classes.listButton}
            style={{
              backgroundColor:
                activeListButton === "myDrive" ? "#c2e7ff" : "white",
            }}
            onClick={() => handleListButtonClick("myDrive")}
          >
            <ListItemIcon className={classes.icon}>
              {activeListButton === "myDrive" ? (
                <AddToDriveOutlinedIcon />
              ) : (
                <AddToDriveIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="My Drive" />
          </ListItem>

          {/* Add margin to create a gap between groups */}
          <div style={{ margin: "24px 0" }}></div>

          <ListItem
            button
            className={classes.listButton}
            style={{
              backgroundColor:
                activeListButton === "sharedWithMe" ? "#c2e7ff" : "white",
            }}
            onClick={() => handleListButtonClick("sharedWithMe")}
          >
            <ListItemIcon className={classes.icon}>
              {activeListButton === "sharedWithMe" ? (
                <PeopleAltIcon />
              ) : (
                <PeopleAltOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="Shared with me" />
          </ListItem>

          <ListItem
            button
            className={classes.listButton}
            style={{
              backgroundColor:
                activeListButton === "starred" ? "#c2e7ff" : "white",
            }}
            onClick={() => handleListButtonClick("starred")}
          >
            <ListItemIcon className={classes.icon}>
              {activeListButton === "starred" ? (
                <StarOutlinedIcon />
              ) : (
                <StarOutlineOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>

          {/* Add margin to create a gap between groups */}
          <div style={{ margin: "24px 0" }}></div>

          <ListItem
            button
            className={classes.listButton}
            style={{
              backgroundColor: activeListButton === "bin" ? "#c2e7ff" : "white",
            }}
            onClick={() => handleListButtonClick("bin")}
          >
            <ListItemIcon className={classes.icon}>
              {activeListButton === "bin" ? (
                <DeleteIcon />
              ) : (
                <DeleteOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="Bin" />
          </ListItem>
          <ListItem
            button
            className={classes.listButton}
            style={{
              backgroundColor:
                activeListButton === "storage" ? "#c2e7ff" : "white",
            }}
            onClick={() => handleListButtonClick("storage")}
          >
            <ListItemIcon className={classes.icon}>
              {activeListButton === "storage" ? (
                <CloudIcon />
              ) : (
                <CloudQueueIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="Storage" />
          </ListItem>

          {/* Add storage bar directly under the "Storage" button */}
          <div className={classes.storageInfo}>
            <div
              style={{
                width: "100%",
                marginTop: -6,
                marginBottom: 6,
                height: 5,
                backgroundColor: "#e1e3e1",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  width: "60%",
                  height: "100%",
                  backgroundColor: "#0b57d0",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
            <Typography variant="subtitle1">10 GB of 15 GB used</Typography>
          </div>
        </List>
      </Drawer>

      <main className={classes.content}>
      <Avatar
  className={classes.avatar}
  onClick={handleProfileClick}
  ref={profilePictureRef}
>
  JD
</Avatar>
<Dialog
  open={isProfileModalOpen}
  onClose={handleProfileModalClose}
  anchorEl={profilePictureRef.current}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  getContentAnchorEl={null}
>
  <DialogContent className={classes.modalContainer}>
    <IconButton
      className={classes.closeButton}
      onClick={handleProfileModalClose}
    >
      <CloseIcon />
    </IconButton>
    <h2 className={classes.email}>nourzamel35@gmail.com</h2>
    <Avatar className={classes.profilePicture}>NZ</Avatar>
    <p className={classes.greeting}>Hi, Nour Zamel!</p>
  </DialogContent>
</Dialog>

        <Typography variant="h4" className={classes.centeredText}>
          Welcome to Drive
        </Typography>
        <TextField
          className={classes.searchBar}
          placeholder="Search in Drive"
          variant="outlined"
          onChange={handleChangeSearch}
          value={searchTerm}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <FilterListIcon onClick={handleAdvancedSearchClick} />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              borderRadius: "25px", // Set the border radius to your desired value (e.g., '25px')
            },
          }}
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            startIcon={<InsertDriveFileOutlinedIcon />} // Icon on the left side
            endIcon={<ArrowDropDownOutlinedIcon />} // Arrow icon on the right side
            className={classes.button}
          >
            Type
          </Button>
          <Button
            variant="outlined"
            startIcon={<PermIdentityOutlinedIcon />} // Icon on the left side
            endIcon={<ArrowDropDownOutlinedIcon />} // Arrow icon on the right side
            className={classes.button}
          >
            People
          </Button>
          <Button
            variant="outlined"
            startIcon={<CalendarTodayOutlinedIcon />} // Icon on the left side
            endIcon={<ArrowDropDownOutlinedIcon />} // Arrow icon on the right side
            className={classes.button}
          >
            Modified
          </Button>
          <Button
            variant="outlined"
            startIcon={<FolderOpenOutlinedIcon />} // Icon on the left side
            endIcon={<ArrowDropDownOutlinedIcon />} // Arrow icon on the right side
            className={classes.button}
          >
            Location
          </Button>
        </div>

        {/* This is the Modal for the Advanced Search Fields */}
        <Dialog open={isAdvancedSearchOpen} onClose={handleAdvancedSearchClick}>
          <DialogTitle>Advanced Search</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                name="type" // Each text field gets a name attribute that corresponds to a key in the searchParams object
                value={searchParams.type}
                onChange={handleInputChange}
                label="Type"
              >
                <MenuItem value="office-doc">
                  Office Document (Word, Excel)
                </MenuItem>
                <MenuItem value="text-file">Text File</MenuItem>
                <MenuItem value="archive">Zip/Rar File</MenuItem>
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="video">Video</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="owner-select-label">Owner</InputLabel>
              <Select
                labelId="owner-select-label"
                name="owner"
                value={searchParams.owner}
                onChange={handleInputChange}
                label="Owner"
              >
                <MenuItem></MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="hasTheWords"
              label="Has the words"
              fullWidth
              margin="normal"
              value={searchParams.hasTheWords}
              onChange={handleInputChange}
            />

            <TextField
              name="itemName"
              label="Item name"
              fullWidth
              margin="normal"
              value={searchParams.itemName}
              onChange={handleInputChange}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="location-select-label">Location</InputLabel>
              <Select
                labelId="location-select-label"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                label="Location"
              >
                <MenuItem></MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  name="starred"
                  checked={searchParams.starred}
                  onChange={handleInputChange}
                />
              }
              label="Starred"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="inTrash"
                  checked={searchParams.inTrash}
                  onChange={handleInputChange}
                />
              }
              label="In trash"
            />

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        <br />

        <div className={classes.filterOptions}>
          <div className={classes.suggestedContainer}>
            <Typography className={classes.suggestedText}>Suggested</Typography>

            {/* Files and Folders buttons */}
            <ToggleButtonGroup exclusive aria-label="files and folders">
              <ToggleButton
                value="files"
                aria-label="files"
                className={classes.fileFolderButton}
                style={{
                  backgroundColor:
                    activeButton === "files" ? "#c2e7ff" : "white",
                }}
                onClick={() => handleToggleButtonClick("files")}
              >
                {activeButton === "files" ? (
                  <DoneIcon />
                ) : (
                  <ArticleOutlinedIcon />
                )}
                <Typography style={{ marginLeft: 8, textTransform: "none" }}>
                  Files
                </Typography>
              </ToggleButton>

              {/* Separator between Files and Folders buttons */}
              <div className={classes.verticalSeparator}></div>

              <ToggleButton
                value="folders"
                aria-label="folders"
                className={classes.fileFolderButton}
                style={{
                  backgroundColor:
                    activeButton === "folders" ? "#c2e7ff" : "white",
                }}
                onClick={() => handleToggleButtonClick("folders")}
              >
                {activeButton === "folders" ? (
                  <DoneIcon />
                ) : (
                  <FolderOpenOutlinedIcon />
                )}
                <Typography style={{ marginLeft: 8, textTransform: "none" }}>
                  Folders
                </Typography>
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Layout buttons */}
            <ToggleButtonGroup exclusive aria-label="layout buttons">
              <ToggleButton
                value="list"
                aria-label="list"
                className={classes.layoutButton}
                style={{
                  backgroundColor:
                    activeLayout === "list" ? "#c2e7ff" : "white",
                }}
                onClick={() => handleLayoutButtonClick("list")}
              >
                {activeLayout === "list" && <DoneIcon />}
                <MenuOutlinedIcon />
              </ToggleButton>

              {/* Separator between List and Module buttons */}
              <div className={classes.verticalSeparator}></div>

              <ToggleButton
                value="module"
                aria-label="module"
                className={classes.layoutButton}
                style={{
                  backgroundColor:
                    activeLayout === "module" ? "#c2e7ff" : "white",
                }}
                onClick={() => handleLayoutButtonClick("module")}
              >
                {activeLayout === "module" && <DoneIcon />}
                <GridViewOutlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {activeLayout === 'list' && (
  <div className={classes.listLayout}>
    <Typography className={classes.nameBold}>Name</Typography>
    <div className={classes.listLayoutItems}>
      <Typography className={classes.listLayoutItem}>Date Uploaded</Typography>
      <Typography className={classes.listLayoutItem}>Owner</Typography>
      <Typography className={classes.listLayoutItem}>Location</Typography>
    </div>
  </div>
)}

{activeLayout === 'list' ? (
  <>
    <div className={classes.fileList}>
      {selectedItemType === "files" ? files.map(file => (
        <div key={file.file_id} className={classes.fileItem}>
          <div className={classes.fileIcon}>
            {getFileIcon(file.mime_type)}
          </div>
          <Typography className={classes.fileName}>{file.name}</Typography>
          <div className={classes.fileDetails}>
            <Typography className={classes.fileDetailsItem}>{file.lastEdited}</Typography>
            <Typography>{file.sharedWith.length} people</Typography>
            <Typography>{file.user_id}</Typography>
          </div>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </div>
      )) : folders.map((folder) => (
        <div key={folder.folder_id} className={classes.fileItem}>
          <div className={classes.fileIcon}>
            {getFolderIcon(folder.name)}
          </div>
          <Typography className={classes.fileName}>{folder.name}</Typography>
          <div className={classes.fileDetails}>
            <Typography className={classes.fileDetailsItem}>
              {folder.lastModified}
            </Typography>
            <Typography>{folder.sharedWith.length} people</Typography>
            <Typography>{folder.user_id}</Typography>
          </div>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </div>
      ))}
    </div>
  </>
) : (
  <div className={classes.gridContainer}>
    {selectedItemType === 'files'
      ? files.map((file) => (
          <div key={file.file_id} className={classes.gridItem}>
            <div className={classes.gridIcon}>{getFileIcon(file.mime_type)}</div>
            <div className={classes.gridName}>{file.name}</div>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </div>
        ))
      : folders.map((folder) => (
          <div key={folder.folder_id} className={classes.gridItem}>
            <div className={classes.gridIcon}>{getFolderIcon(folder.name)}</div>
            <div className={classes.gridName}>{folder.name}</div>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </div>
        ))}
  </div>
)}
      </main>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Share</MenuItem>
        <MenuItem onClick={handleClose}>Download</MenuItem>
        <MenuItem onClick={handleClose}>Rename</MenuItem>
        <MenuItem onClick={handleClose}>Star</MenuItem>
      </Menu>
      <Menu
        anchorEl={logoutAnchorEl}
        open={Boolean(logoutAnchorEl)}
        onClose={handleLogoutClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Dashboard;
