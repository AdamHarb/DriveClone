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
import { useTheme } from '@material-ui/core/styles';
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
import {Dialog, DialogTitle, DialogContent, Skeleton} from "@mui/material";
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
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PersonIcon from "@mui/icons-material/Person";
import {DialogActions} from '@mui/material';

import DateRangeIcon from '@mui/icons-material/DateRange';



import TypeDropdown from "./Dropdowns/TypeDropdown.jsx";
import NewMenuDropdown from './Dropdowns/NewMenuDropdown.jsx';

import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import RenameDialog from "./Dialogues/RenameDialog.jsx";
import ShareDialog from "./Dialogues/ShareDialog.jsx";
import {StarredFiles} from "./Subpages/StarredFiles.jsx";
import {TrashedFiles} from "./Subpages/TrashedFiles.jsx";

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
  sortButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
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
    marginBottom: theme.spacing(1),
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
    maxWidth: 350,
    width: 350,
    height: 'auto',
    background: '#e9eef6',
    borderRadius: '10px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    margin: "0 auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.54)',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
  email: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  profilePicture: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(2),
    fontSize: '3rem',
    backgroundColor: '#c2185b',
  },
  greeting: {
    fontSize: '1.75rem',
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
  const folderInputRef = useRef(null);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false); // Handling the advanced search modal
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutAnchorEl, setLogoutAnchorEl] = useState(null);
  const [activeButton, setActiveButton] = useState("files");
  const [activeLayout, setActiveLayout] = useState("list");
  const [activeListButton, setActiveListButton] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState("files");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationAnchorEl, setLocationAnchorEl] = useState(null);
  const [selectedModifiedDate, setSelectedModifiedDate] = useState(null);
  const [modifiedAnchorEl, setModifiedAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [personAnchorEl, setPersonAnchorEl] = useState(null);
  const [nameOption, setNameOption] = useState(null);
  const [sizeOption, setSizeOption] = useState(null);
  const [uploadDateOption, setUploadDateOption] = useState(null);
  const [nameAnchorEl, setNameAnchorEl] = useState(null);
const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
const [uploadDateAnchorEl, setUploadDateAnchorEl] = useState(null);

const handleNameClick = (event) => {
  setNameAnchorEl(event.currentTarget);
};

const handleSizeClick = (event) => {
  setSizeAnchorEl(event.currentTarget);
};

const handleUploadDateClick = (event) => {
  setUploadDateAnchorEl(event.currentTarget);
};

const handleNameClose = () => {
  setNameAnchorEl(null);
  setNameOption(null);
  fetchFilesFolders();
};

const handleSizeClose = () => {
  setSizeAnchorEl(null);
  setSizeOption(null);
  fetchFilesFolders();
};
const handleUploadDateClose = () => {
  setUploadDateAnchorEl(null);
  setUploadDateOption(null);
  fetchFilesFolders();
};
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
  const [selectedObj, setSelectedObj] = useState(null);
  const [user, setUser] = useState({
    storage_used: 0
  });
  const [loading, setLoading] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("default");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dir, setdir] = useState();

  useEffect(async () => {
    await fetchUser();
  }, []);

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }
  }, [])

  const fetchUser = async () => {
    const res = await axios.get('http://localhost:3000/api/current-user', {
      headers: {
        'Authorization': `Bearer ${cookies.token}`
      }
    });
    setUser(res.data.user);
  }
  const sortFiles = (files) => {
  const sortedFiles = files.filter(file => file !== undefined); // Filter out undefined values

  sortedFiles.sort((a, b) => {
    const isAFolder = !a.hasOwnProperty('name'); // Check if 'a' is a folder
    const isBFolder = !b.hasOwnProperty('name'); // Check if 'b' is a folder

    if (nameOption === 'asc') {
      return isAFolder
        ? a.folder_name.localeCompare(b.folder_name || b.name)
        : isBFolder
        ? (a.name || a.folder_name).localeCompare(b.folder_name)
        : a.name.localeCompare(b.name);
    } else if (nameOption === 'desc') {
      return isAFolder
        ? b.folder_name.localeCompare(a.folder_name || a.name)
        : isBFolder
        ? (b.name || b.folder_name).localeCompare(a.folder_name)
        : b.name.localeCompare(a.name);
    } else if (sizeOption === 'largest') {
      return isBFolder ? -1 : isAFolder ? 1 : b.size - a.size;
    } else if (sizeOption === 'smallest') {
      return isBFolder ? -1 : isAFolder ? 1 : a.size - b.size;
    } else if (uploadDateOption === 'ascending') {
      const aDate = new Date(a.created_at);
      const bDate = new Date(b.created_at);
      return aDate.getTime() - bDate.getTime(); 
       // Sort based on timestamp (including minutes and seconds)
    } else if (uploadDateOption === 'descending') {
      const aDate = new Date(a.created_at);
      const bDate = new Date(b.created_at);
      return bDate.getTime() - aDate.getTime(); // Sort based on timestamp (including minutes and seconds)
    }
    return 0;
  });

  return sortedFiles;
};
  
  const fetchFilesFolders = () => {
    handleDashboardApi().then((response) => {
      console.log("fetched");
      const data = response;
      console.log(data);
      setFiles(data.userFiles);
      setFolders(data.userFolders);
      setLoading(false);
    });
  };

  useEffect(async () => {
    fetchFilesFolders();
  }, [])

  const handleSizeApi = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/profile', {
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

  const handleDashboardApi = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/dashboard', {
        headers: {
          withCredentials: true,
          'Authorization': `Bearer ${cookies.token}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleViewDetailsClick = () => {
    setViewDetailsDialogOpen(true);
  };
  const theme = useTheme();

  const handleUploadFile = async (file) => {
    try {
      if (!file) {
        return;
      }

      console.log(file);
      const formData = new FormData();
      formData.append('file', file);
      if(dir){
        formData.append('parent_id', dir);
      }
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${cookies.token}`
        },
      }).then((r) => {
        fetchFilesFolders()
        fetchUser()
      });
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  const handleCreateFolder = async (folderName) => {
    try {
      const parentId = dir ? dir : null;
      console.log(parentId)
      const response = await axios.post('http://localhost:3000/api/create-folder', {parent_id:parentId}, {
            headers: {
              'Authorization': `Bearer ${cookies.token}`
            }
          }
      ).then((r) => {
        fetchFilesFolders()
      })
      return response.data.folder_id;
    } catch (e) {
      console.error('Error during folder creation:', e);
    }
  }
  const handleDeleteFile = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/toggle-type`, {
          fileId: selectedObj._id,
          type: "trashed"
        }, {
        headers: {
          'Authorization': `Bearer ${cookies.token}`
        }
      }).then((r) => {
          handleClose()
          fetchFilesFolders();
      });
        console.log(response.data)
    }
    catch (error) {
        console.error('Error during file deletion:', error);
    }
  }

  // Use: <input type="file" webkitdirectory="" directory="" onChange={handleFileChange} />
  const handleUploadFolder = async (folder) => {
    try {
      if (!folder) {
        return;
      }

      const files = Array.from(folder.target.files);
      const directoryName = files[0].webkitRelativePath.split('/').slice(0, -1).join('/');

      const folder_id = await handleCreateFolder(directoryName);

      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('parent_id', folder_id);

        try {
          const response = await axios.post('http://localhost:3000/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${cookies.token}`
            }
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error during file upload:', error);
        }
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error during folder upload:', error);
    }
  }

  const handleDownload = async (id) => {
    try {
       const response = await axios.get(`http://localhost:3000/api/download/${id === null ? selectedObj.file_id : id}`, {}, {
         headers: {
           withCredentials: true,
           'Authorization': `Bearer ${cookies.token}`
         },
       });
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', selectedObj.name);
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      console.error('Error during file download:', e);
    }
  }

  function handleSharedWith(file) {
    if (file.sharedWith){
      return file.sharedWith.length
    }
    else return 0
  }
  const handlePersonClose = () => {
    setPersonAnchorEl(null);
  };
  const handlePersonSelect = (owner) => {
    if (owner === null) {
      setSelectedPerson(null);
      fetchFilesFolders(); // Fetch all files and folders when person is deselected
    } else {
      setSelectedPerson(owner);
      const filteredFiles = files.filter((file) => file.owner === owner);
      setFiles(filteredFiles);
    }
    handlePersonClose(); // Close the dropdown after selecting a person
  };
  const handleButtonClick = (event) => {
    event.stopPropagation(); // Stop event propagation
    setIsMenuOpen(true);
  };
  const handleToggleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setSelectedItemType(buttonType);
  };
  const handleLayoutButtonClick = (layoutType) => {
    setActiveLayout(layoutType);
  };

  const handleRenameClick = () => {
    setRenameDialogOpen(true);
  };

  const handleRenameClose = () => {
    setRenameDialogOpen(false);
  };


  const handleLocationClick = (event) => {
    if (!selectedLocation) {
      setLocationAnchorEl(event.currentTarget);
    }
  };
  const handleLocationClose = () => {
    setLocationAnchorEl(null);
  };
  const  handleLocationSelect = (location) => {
    if (location === null) {
      setSelectedLocation(null);
      fetchFilesFolders(); // Fetch files and folders when location is deselected
    } else {
      setSelectedLocation(location);
    }
    handleLocationClose();
  };


  const handleRename = async (newName) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/rename-file`, {
        newName,
        name: selectedObj.name,
        fileId: selectedObj.file_id
      }, {
        headers: {
          withCredentials: true,
          'Authorization': `Bearer ${cookies.token}`
        },
      }).then((r) => {
        fetchFilesFolders();
        console.log(response.data);
      });
    } catch (e) {
      console.error('Error during file renaming:', e);
    }
  };

  const handleShareClick = () => {
    setShareDialogOpen(true);
  };

  const handleShareClose = () => {
    setShareDialogOpen(false);
  };

  const handlePersonClick = (event) => {
    if (!selectedPerson && files.length > 0) {
      setPersonAnchorEl(event.currentTarget);
    }
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };


const newButtonRef = useRef(null);


const [typeAnchorEl, setTypeAnchorEl] = useState(null);

const handleTypeClick = (event) => {
  if (!selectedType && files.length > 0) {
    setTypeAnchorEl(event.currentTarget);
  }
};
const handleTypeClose = () => {
  setTypeAnchorEl(null);
};
  const handleListButtonClick = (buttonType) => {
    setActiveListButton(buttonType);
  };

  const handleContextMenu = (obj) => (event) => {
    event.preventDefault(); // Prevent the default right-click behavior

    const cursorPosition = {
      left: event.clientX,
      top: event.clientY,
    };

    const virtualElement = document.createElement('div');
    virtualElement.style.position = 'fixed';
    virtualElement.style.left = `${cursorPosition.left}px`;
    virtualElement.style.top = `${cursorPosition.top}px`;
    virtualElement.style.width = '1px';
    virtualElement.style.height = '1px';
    document.body.appendChild(virtualElement);

    setAnchorEl(virtualElement);
    setSelectedObj(obj);
  };

  const handleTypeSelect = (type) => {
    if (type === null) {
      setSelectedType(null);
      fetchFilesFolders(); // Fetch files and folders when type is deselected
    } else {
      setSelectedType(type);
    }
    handleTypeClose(); // Close the dropdown after selecting a type
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = (event) => {
    setLogoutAnchorEl(event.currentTarget);
  };



  const handleModifiedClick = (event) => {
    if (!selectedModifiedDate) {
      setModifiedAnchorEl(event.currentTarget);
    }
  };
  const handleModifiedClose = () => {
    setModifiedAnchorEl(null);
  };
  const handleModifiedSelect = (modifiedDate) => {
    if (modifiedDate === null) {
      setSelectedModifiedDate(null);
      fetchFilesFolders(); // Fetch files and folders when modified date is deselected
    } else {
      setSelectedModifiedDate(modifiedDate);
    }
    handleModifiedClose();
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

  const handleFileSelect = (file) => {
    const selectedIndex = selectedFiles.indexOf(file);
    let newSelectedFiles = [];

    if (selectedIndex === -1) {
      newSelectedFiles = newSelectedFiles.concat(selectedFiles, file);
    } else if (selectedIndex === 0) {
      newSelectedFiles = newSelectedFiles.concat(selectedFiles.slice(1));
    } else if (selectedIndex === selectedFiles.length - 1) {
      newSelectedFiles = newSelectedFiles.concat(selectedFiles.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFiles = newSelectedFiles.concat(
          selectedFiles.slice(0, selectedIndex),
          selectedFiles.slice(selectedIndex + 1)
      );
    }

    setSelectedFiles(newSelectedFiles);
  };

  const handleDownloadSelectedFiles = async () => {
    for (const file of selectedFiles) {
      try {
        const response = await axios.get(`http://localhost:3000/api/download/${file.file_id}`, {
          headers: {
            withCredentials: true,
            'Authorization': `Bearer ${cookies.token}`
          },
          responseType: 'blob', // Specify the response type as 'blob'
        });

        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', file.name); // Use the actual file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the temporary link
      } catch (e) {
        console.error('Error during file download:', e);
      }
    }
  };

  const handleStarSelectedFiles = async () => {
    try {
      await Promise.all(
          selectedFiles.map((file) =>
              axios.post(
                  `http://localhost:3000/api/toggle-type`,
                  {
                    fileId: file._id,
                    type: "starred",
                  },
                  {
                    headers: {
                      withCredentials: true,
                      Authorization: `Bearer ${cookies.token}`,
                    },
                  }
              )
          )
      );
      setSelectedFiles([]); // Clear the selected files after starring
      fetchFilesFolders(); // Refresh the files and folders
    } catch (e) {
      console.log("Error starring files:", e);
    }
  };

  const handleDeleteSelectedFiles = async () => {
    try {
      await Promise.all(
          selectedFiles.map((file) =>
              axios.post(
                  `http://localhost:3000/api/toggle-type`,
                  {
                    fileId: file._id,
                    type: "trashed",
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${cookies.token}`,
                    },
                  }
              )
          )
      );
      setSelectedFiles([]); // Clear the selected files after trashing
      fetchFilesFolders(); // Refresh the files and folders
    } catch (error) {
      console.error("Error during file deletion:", error);
    }
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
    const isToday = (date) => {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };
    
    const isLast7Days = (date) => {
      const today = new Date();
      const last7Days = new Date(today);
      last7Days.setDate(today.getDate() - 7);
      return date >= last7Days && date <= today;
    };
    
    const isLast30Days = (date) => {
      const today = new Date();
      const last30Days = new Date(today);
      last30Days.setDate(today.getDate() - 30);
      return date >= last30Days && date <= today;
    };
    
    const isThisYear = (date) => {
      const today = new Date();
      return date.getFullYear() === today.getFullYear();
    };
    
    const isLastYear = (date) => {
      const today = new Date();
      return date.getFullYear() === today.getFullYear() - 1;
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

    const handleGridItemClick = (event) => {
      // Check if the click event target is the "New" button
      if (event.target.tagName.toLowerCase() === 'button') {
        // If it is, do nothing (prevent the kebab menu from opening)
        return;
      }

      // Otherwise, open the kebab menu as usual
      setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
      return () => {
        setAnchorEl(null);
      };
    }, []);

    return (
      <div className={classes.gridContainer}>
        {selectedItemType === 'files'
          ? files.map((file) => (
              <div key={file.file_id} className={classes.gridItem}>
                <div className={classes.gridIcon}>{getFileIcon(file.mime_type)}</div>
                <div className={classes.gridDetails}>
                  <div className={classes.gridName}>{file.name}</div>
                </div>
                <IconButton className={classes.kebabMenu} onClick={handleContextMenu(file)}>
                  <MoreVertIcon />
                </IconButton>
              </div>
            ))
          : folders.map((folder) => (
              <div key={folder.folder_id} className={classes.gridItem}>
                <div className={classes.gridIcon}>{getFolderIcon(folder.folder_name)}</div>
                <div className={classes.gridDetails}>
                  <div className={classes.gridName}>{folder.folder_name}</div>
                </div>
                <IconButton className={classes.kebabMenu} onClick={handleGridItemClick}>
                  <MoreVertIcon />
                </IconButton>
              </div>
            ))}
      </div>
    );
  };


  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const fileTypeMap = {
    'application/pdf': { icon: <PictureAsPdfIcon style={{ color: '#ea4335' }} />, displayName: 'PDF' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: <ArticleIcon style={{ color: '#4285f4' }} />, displayName: 'Word Document' },
    'application/msword': { icon: <ArticleIcon style={{ color: '#4285f4' }} />, displayName: 'Word Document' },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { icon: <ArticleIcon style={{ color: '#4285f4' }} />, displayName: 'Excel Spreadsheet' },
    'text/plain': { icon: <DescriptionIcon style={{ color: '#34a853' }} />, displayName: 'Text File' },
    'application/zip': { icon: <FolderZipIcon style={{ color: '#5f6368' }} />, displayName: 'ZIP Archive' },
    'application/x-rar-compressed': { icon: <FolderZipIcon style={{ color: '#5f6368' }} />, displayName: 'RAR Archive' },
    'video/mp4': { icon: <MovieIcon style={{ color: '#ea4335' }} />, displayName: 'MP4 Video' },
    'video/mpeg': { icon: <MovieIcon style={{ color: '#ea4335' }} />, displayName: 'MPEG Video' },
  };

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    let filteredFiles = files;
    let filteredFolders = folders;
  
    if (searchTerm) {
      filteredFiles = filteredFiles.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      filteredFolders = filteredFolders.filter((folder) =>
        folder.folder_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (selectedType) {
      filteredFiles = filteredFiles.filter((file) => file.mime_type === selectedType);
    }
  
    if (selectedPerson) {
      filteredFiles = filteredFiles.filter((file) => file.owner === selectedPerson);
      filteredFolders = filteredFolders.filter((folder) => folder.owner === selectedPerson);
    }
  
    if (selectedLocation) {
      if (selectedLocation === "Anywhere in Drive") {
        // No additional filtering needed
      } else if (selectedLocation === "My Drive") {
        // No additional filtering needed
      } else if (selectedLocation === "Shared with me") {
        filteredFiles = filteredFiles.filter((file) => file.sharedWith?.length > 0);
        filteredFolders = filteredFolders.filter((folder) => folder.sharedWith?.length > 0);
      }
    }
  
    if (selectedModifiedDate) {
      filteredFiles = filteredFiles.filter((file) => {
        const fileDate = new Date(file.updated_at);
        if (selectedModifiedDate === "Today") {
          return isToday(fileDate);
        } else if (selectedModifiedDate === "Last 7 days") {
          return isLast7Days(fileDate);
        } else if (selectedModifiedDate === "Last 30 days") {
          return isLast30Days(fileDate);
        } else if (selectedModifiedDate === "This year") {
          return isThisYear(fileDate);
        } else if (selectedModifiedDate === "Last year") {
          return isLastYear(fileDate);
        }
        return false;
      });
  
      filteredFolders = filteredFolders.filter((folder) => {
        const folderDate = new Date(folder.updated_at);
        if (selectedModifiedDate === "Today") {
          return isToday(folderDate);
        } else if (selectedModifiedDate === "Last 7 days") {
          return isLast7Days(folderDate);
        } else if (selectedModifiedDate === "Last 30 days") {
          return isLast30Days(folderDate);
        } else if (selectedModifiedDate === "This year") {
          return isThisYear(folderDate);
        } else if (selectedModifiedDate === "Last year") {
          return isLastYear(folderDate);
        }
        return false;
      });
    }
  
    if (nameOption !== null) {
      filteredFiles = filteredFiles.sort((a, b) => {
        if (nameOption === 'asc') {
          return a.name.localeCompare(b.name);
        } else if (nameOption === 'desc') {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
  
      filteredFolders = filteredFolders.sort((a, b) => {
        if (nameOption === 'asc') {
          return a.folder_name.localeCompare(b.folder_name);
        } else if (nameOption === 'desc') {
          return b.folder_name.localeCompare(a.folder_name);
        }
        return 0;
      });
    }
  
    if (sizeOption !== null) {
      filteredFiles = filteredFiles.sort((a, b) => {
        if (sizeOption === 'largest') {
          return b.size - a.size;
        } else if (sizeOption === 'smallest') {
          return a.size - b.size;
        }
        return 0;
      });
    }
  
    if (uploadDateOption !== null) {
      filteredFiles = filteredFiles.sort((a, b) => {
        if (uploadDateOption === 'ascending') {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (uploadDateOption === 'descending') {
          return new Date(a.created_at) - new Date(b.created_at);
        }
        return 0;
      });
  
      filteredFolders = filteredFolders.sort((a, b) => {
        if (uploadDateOption === 'ascending') {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (uploadDateOption === 'descending') {
          return new Date(a.created_at) - new Date(b.created_at);
        }
        return 0;
      });
    }
  
    setFiles(filteredFiles);
    setFolders(filteredFolders);
  }, [
    searchTerm,
    selectedType,
    selectedPerson,
    selectedLocation,
    selectedModifiedDate,
    nameOption,
    sizeOption,
    uploadDateOption,
    files,
    folders,
  ]);
  

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  }; // Every time the search input changes, set it as the new search term and it will filter out

  const handleStar = async () => {
    try {
      await axios.post(`http://localhost:3000/api/toggle-type`, {
        fileId: selectedObj._id,
        type: "starred"
      }, {
        headers: {
          withCredentials: true,
          'Authorization': `Bearer ${cookies.token}`
        },
      }).then((r) => {
        fetchFilesFolders()
      });
    } catch(e) {
      console.log('Error starring file:', e);
    }
  }

  const resetType = async (file) => {
    try {
      await axios.post(`http://localhost:3000/api/toggle-type`, {
        fileId: selectedObj?._id || file?._id,
        type: "default"
      }, {
        headers: {
          withCredentials: true,
          'Authorization': `Bearer ${cookies.token}`
        },
      })
    } catch(e) {
      console.log('Error resetting file:', e);
    }
  }

  async function handleFolderClick(folder_id) {
    try {
      console.log(folder_id)
      const response = await axios.get(`http://localhost:3000/api/dashboard/${folder_id}`, {
        headers: {
          withCredentials: true,
          'Authorization': `Bearer ${cookies.token}`
        },
      });
      console.log(response.data)
      setFiles(response.data.userFiles);
      setFolders(response.data.userFolders);
      setdir(folder_id)
    } catch (error) {
        console.error('Error retrieving files');
    }
  }


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
        <input
        type="file"
        id="file-input"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={(event) => {
          handleUploadFile(event.target.files[0])
        }}
      />
      <input
        type="file"
        id="folder-input"
        webkitdirectory=""
        directory=""
        style={{ display: 'none' }}
        ref={folderInputRef}
        onChange={handleUploadFolder}
      />
        <Button
  variant="contained"
  color="default"
  className={classes.addButton}
  startIcon={<AddIcon className={classes.newIcon} />}
  onClick={handleButtonClick}
  ref={newButtonRef}
>
  <Typography variant="body2" style={{ fontSize: '18px' }}>
    New
  </Typography>
</Button>
<NewMenuDropdown
  anchorEl={() => {
    return newButtonRef.current;
  }}
  open={isMenuOpen}
  handleClose={handleMenuClose}
  handleUploadFile={() => fileInputRef.current.click()}
  handleUploadFolder={() => folderInputRef.current.click()}
  handleCreateFolder={handleCreateFolder}
/>

        <List>
          <ListItem
            button
            className={classes.listButton}
            style={{
              backgroundColor:
                activeListButton === "home" ? "#c2e7ff" : "white",
            }}
            onClick={() => {
              handleListButtonClick("home")
              setCurrentPage("default")
            }}
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
            onClick={() => {
              handleListButtonClick("starred")
              setCurrentPage("starred")
            }}
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
            onClick={() => {
              handleListButtonClick("bin")
              setCurrentPage("trashed")
            }}
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
                  width: user.storage_used / 10000 * 100 + "%",
                  height: "100%",
                  backgroundColor: "#0b57d0",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
            <Typography variant="subtitle1">{Math.round(user.storage_used / 1024).toFixed(2)} GB of 15 GB used</Typography>
          </div>
          <Typography variant="subtitle1" style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1), marginLeft: '18px', fontSize: 18,}}>
  Filter by:
</Typography>
          <Button
  variant="outlined"
  className={classes.button}
  onClick={handleNameClick}
  startIcon={<TextFieldsIcon />}
  endIcon={<ArrowDropDownOutlinedIcon />}
>
  Name
</Button>
<Menu
  anchorEl={nameAnchorEl}
  keepMounted
  open={Boolean(nameAnchorEl)}
  onClose={handleNameClose}
>
  <MenuItem onClick={() => setNameOption('asc')}>A-Z</MenuItem>
  <MenuItem onClick={() => setNameOption('desc')}>Z-A</MenuItem>
  <MenuItem onClick={() => setNameOption(null)}>Reset</MenuItem>
</Menu>

<Button
  variant="outlined"
  className={classes.button}
  onClick={handleSizeClick}
  startIcon={<StorageIcon />}
  endIcon={<ArrowDropDownOutlinedIcon />}
>
  Size
</Button>
<Menu
  anchorEl={sizeAnchorEl}
  keepMounted
  open={Boolean(sizeAnchorEl)}
  onClose={handleSizeClose}
>
  <MenuItem onClick={() => setSizeOption('largest')}>Largest</MenuItem>
  <MenuItem onClick={() => setSizeOption('smallest')}>Smallest</MenuItem>
  <MenuItem onClick={() => setSizeOption(null)}>Reset</MenuItem>
</Menu>

<Button
  variant="outlined"
  className={classes.button}
  onClick={handleUploadDateClick}
  startIcon={<DateRangeIcon />}
  endIcon={<ArrowDropDownOutlinedIcon />}
>
  Upload Date
</Button>
<Menu
  anchorEl={uploadDateAnchorEl}
  keepMounted
  open={Boolean(uploadDateAnchorEl)}
  onClose={handleUploadDateClose}
>
  <MenuItem onClick={() => setUploadDateOption('ascending')}>Ascending</MenuItem>
  <MenuItem onClick={() => setUploadDateOption('descending')}>Descending</MenuItem>
  <MenuItem onClick={() => setUploadDateOption(null)}>Reset</MenuItem>
</Menu>
        </List>
      </Drawer>

      <main className={classes.content}>
      <Avatar
  className={classes.avatar}
  onClick={handleProfileClick}
  ref={profilePictureRef}
>
        {user?.username?.split(" ").map((name) => name[0]).join("").toUpperCase()}
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
    <Typography variant="subtitle1" className={classes.email}>
      {user.email}
    </Typography>
    <Avatar className={classes.profilePicture}>{user?.username?.split(" ").map((name) => name[0]).join("").toUpperCase()}</Avatar>
    <Typography variant="h6" className={classes.greeting}>
      Hi, {user.username}!
    </Typography>
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
  className={classes.button}
  onClick={handleTypeClick}
  startIcon={selectedType ? null : <InsertDriveFileOutlinedIcon />}
  endIcon={
    selectedType ? (
      <CloseIcon
        className={classes.closeIcon}
        onClick={(event) => {
          event.stopPropagation();
          handleTypeSelect(null);
        }}
      />
    ) : (
      <ArrowDropDownOutlinedIcon />
    )
  }
  style={{
    backgroundColor: selectedType ? "#c2e7ff" : undefined,
  }}
>
  {selectedType ? fileTypeMap[selectedType]?.displayName || selectedType : "Type"}
</Button>
<Button
  variant="outlined"
  className={classes.button}
  onClick={handlePersonClick}
  startIcon={selectedPerson ? null : <PermIdentityOutlinedIcon />}
  endIcon={
    selectedPerson ? (
      <CloseIcon
        className={classes.closeIcon}
        onClick={(event) => {
          event.stopPropagation();
          handlePersonSelect(null);
        }}
      />
    ) : (
      <ArrowDropDownOutlinedIcon />
    )
  }
  style={{
    backgroundColor: selectedPerson ? "#c2e7ff" : undefined,
  }}
>
  {selectedPerson || "People"}
</Button>
<Button
  variant="outlined"
  className={classes.button}
  onClick={handleModifiedClick}
  startIcon={selectedModifiedDate ? null : <CalendarTodayOutlinedIcon />}
  endIcon={
    selectedModifiedDate ? (
      <CloseIcon
        className={classes.closeIcon}
        onClick={(event) => {
          event.stopPropagation();
          handleModifiedSelect(null);
        }}
      />
    ) : (
      <ArrowDropDownOutlinedIcon />
    )
  }
  style={{
    backgroundColor: selectedModifiedDate ? "#c2e7ff" : undefined,
  }}
>
  {selectedModifiedDate || "Modified"}
</Button>
          <Button
  variant="outlined"
  className={classes.button}
  onClick={handleLocationClick}
  startIcon={selectedLocation ? null : <FolderOpenOutlinedIcon />}
  endIcon={
    selectedLocation ? (
      <CloseIcon
        className={classes.closeIcon}
        onClick={(event) => {
          event.stopPropagation();
          handleLocationSelect(null);
        }}
      />
    ) : (
      <ArrowDropDownOutlinedIcon />
    )
  }
  style={{
    backgroundColor: selectedLocation ? "#c2e7ff" : undefined,
  }}
>
  {selectedLocation || "Location"}
</Button>
        </div>
        {typeAnchorEl && files.length > 0 && (
 <Menu
 anchorEl={typeAnchorEl}
 keepMounted
 open={Boolean(typeAnchorEl)}
 onClose={handleTypeClose}
>
 {[...new Set(files.map((file) => file.mime_type))].map((type) => (
   <MenuItem key={type} onClick={() => handleTypeSelect(type)}>
     {fileTypeMap[type]?.icon}
     <Typography style={{ marginLeft: 8 }}>{fileTypeMap[type]?.displayName || type}</Typography>
   </MenuItem>
 ))}
</Menu>
)}
{personAnchorEl && files.length > 0 && (
  <Menu
    anchorEl={personAnchorEl}
    keepMounted
    open={Boolean(personAnchorEl)}
    onClose={handlePersonClose}
  >
    {[...new Set(files.map((file) => ({ name: file.owner, picture: file.ownerPicture })))].map((owner) => (
      <MenuItem key={owner.name} onClick={() => handlePersonSelect(owner.name)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {owner.picture ? (
            <Avatar src={owner.picture} style={{ marginRight: '8px' }} />
          ) : (
            <Typography>{owner.name}</Typography>
          )}
        </div>
      </MenuItem>
    ))}
  </Menu>
)}
<Menu
  anchorEl={locationAnchorEl}
  keepMounted
  open={Boolean(locationAnchorEl)}
  onClose={handleLocationClose}
>
  <MenuItem onClick={() => handleLocationSelect("Anywhere in Drive")}>
    Anywhere in Drive
  </MenuItem>
  <MenuItem onClick={() => handleLocationSelect("My Drive")}>
    My Drive
  </MenuItem>
  <MenuItem onClick={() => handleLocationSelect("Shared with me")}>
    Shared with me
  </MenuItem>
</Menu>
{(files.length > 0 || folders.length > 0) && (
  <Menu
    anchorEl={modifiedAnchorEl}
    keepMounted
    open={Boolean(modifiedAnchorEl)}
    onClose={handleModifiedClose}
  >
    <MenuItem onClick={() => handleModifiedSelect("Today")}>Today</MenuItem>
    <MenuItem onClick={() => handleModifiedSelect("Last 7 days")}>
      Last 7 days
    </MenuItem>
    <MenuItem onClick={() => handleModifiedSelect("Last 30 days")}>
      Last 30 days
    </MenuItem>
    <MenuItem onClick={() => handleModifiedSelect("This year")}>This year</MenuItem>
    <MenuItem onClick={() => handleModifiedSelect("Last year")}>Last year</MenuItem>
  </Menu>
)}

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
      {
        loading ? <div>
          <Skeleton height={"80px"} />
          <Skeleton height={"80px"} />
          <Skeleton height={"80px"} width={"700px"} />
        </div> : <div>
          {selectedItemType === "files" ? files.length === 0 ? <Typography>
            No files have been created yet, feel free to create some!
                  </Typography> :
                  currentPage === "starred" ?
                      <StarredFiles
                          files={files}
                          user={user}
                          classes={classes}
                          handleContextMenu={handleContextMenu}
                          getFileIcon={getFileIcon}
                          resetType={resetType}
                          fetchFilesFolders={fetchFilesFolders}
                      /> :
                      currentPage === "trashed" ? <TrashedFiles
                          files={files}
                          user={user}
                          classes={classes}
                          handleContextMenu={handleContextMenu}
                          getFileIcon={getFileIcon}
                          resetType={resetType}
                          fetchFilesFolders={fetchFilesFolders}
                          selectedFiles={selectedFiles}
                          handleFileSelect={handleFileSelect}
                      /> : files.filter((file) => file.type !== "trashed").map(file => (
                          <div key={file.file_id}
                               className={classes.fileItem}
                               onContextMenu={handleContextMenu(file)}
                               onClick={() => handleFileSelect(file)}
                               style={{
                            backgroundColor: selectedFiles.indexOf(file) !== -1 ? "#c2e7ff" : "inherit",
                          }}>
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
                            <IconButton onClick={handleContextMenu(file)}>
                              <MoreVertIcon />
                            </IconButton>
                          </div>
                      ))
              :
              folders.map((folder) => (
              <div key={folder.folder_id} className={classes.fileItem} onClick={() => handleFolderClick(folder._id)} onContextMenu={handleContextMenu(folder)}>
                <div className={classes.fileIcon}>
                  {getFolderIcon(folder.folder_name)}
                </div>
            ))
    :
    sortFiles(folders).map((folder) => (
    <div key={folder.folder_id} className={classes.fileItem} onContextMenu={handleContextMenu(folder)}>
      <div className={classes.fileIcon}>
        {getFolderIcon(folder.folder_name)}
      </div>
      <Typography className={classes.fileName}>{folder.folder_name}</Typography>
      <div className={classes.fileDetails}>
        <Typography className={classes.fileDetailsItem} style={{
          marginRight: "20px"
        }}>{new Date(folder.updated_at).toLocaleString()}</Typography>
        <Avatar style={{
          marginRight: "60px"
        }}>
          {user?.username?.split(" ").map((name) => name[0]).join("").toUpperCase()}
        </Avatar>
        <Typography style={{
          marginRight: "178px"
        }}>My Drive</Typography>
      </div>
      <IconButton onClick={handleContextMenu(folder)}>
        <MoreVertIcon/>
      </IconButton>
    </div>
    ))}
        </div>
      }
    </div>
  </>
) : (
    <div className={classes.gridContainer}>
      {selectedItemType === 'files'
          ? files.map((file) => (
              <div key={file.file_id} className={classes.gridItem} onContextMenu={handleContextMenu(file)}>
                <div className={classes.gridIcon}>{getFileIcon(file.mime_type)}</div>
                <div className={classes.gridName}>{file.name}</div>
                <IconButton onClick={handleContextMenu(file)}>
                  <MoreVertIcon/>
                </IconButton>
              </div>
        ))
      : folders.map((folder) => (
          <div key={folder.folder_id} className={classes.gridItem} onContextMenu={handleContextMenu(folder)} >
            <div className={classes.gridIcon}>{getFolderIcon(folder.folder_name)}</div>
            <div className={classes.gridName}>{folder.folder_name}</div>
            <IconButton onClick={handleContextMenu(folder)}>
              <MoreVertIcon />
            </IconButton>
          </div>
        ))}
  </div>
)}
      </main>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => {
        handleClose();
        if (anchorEl && anchorEl.parentNode) {
          anchorEl.parentNode.removeChild(anchorEl);
        }
      }}>
        {selectedFiles.length >= 2 ? (
            <>
              <MenuItem onClick={handleDownloadSelectedFiles}>Download</MenuItem>
              <MenuItem onClick={handleStarSelectedFiles}>Star</MenuItem>
              <MenuItem onClick={handleDeleteSelectedFiles}>Delete</MenuItem>
            </>
        ) : (
            <>
              <MenuItem onClick={handleShareClick}>Share</MenuItem>
              <ShareDialog
                  open={shareDialogOpen}
                  handleClose={handleShareClose}
                  fileId={selectedObj?._id}
              />
              <MenuItem onClick={handleDownload}>Download</MenuItem>
              <MenuItem onClick={handleRenameClick}>Rename</MenuItem>
              <RenameDialog
                  open={renameDialogOpen}
                  handleClose={handleRenameClose}
                  handleRename={handleRename}
              />
              <MenuItem onClick={handleStar}>Star</MenuItem>
              <MenuItem onClick={handleDeleteFile}>Delete</MenuItem>
              <MenuItem onClick={handleViewDetailsClick}>View Details</MenuItem>
            </>
        )}
      </Menu>
      <Dialog open={viewDetailsDialogOpen} onClose={() => setViewDetailsDialogOpen(false)}>
  <DialogTitle>File Details</DialogTitle>
  <DialogContent>
  {selectedObj ? (
    <>
      <Typography variant="body1" style={{ marginBottom: '1rem' }}>
        <DescriptionIcon style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Type: {selectedObj.mime_type}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '1rem' }}>
        <TextFieldsIcon style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Size: {selectedObj.size} KB
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '1rem' }}>
        <PersonIcon style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Owner: {selectedObj.owner}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '1rem' }}>
        <FolderIcon style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Location: My Drive
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '1rem' }}>
        <DateRangeIcon style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Upload Date: {new Date(selectedObj.created_at).toLocaleString()}
      </Typography>
      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        value={selectedObj.description || ''} // Set the initial value to selectedObj.description or an empty string
        onChange={(e) => setSelectedObj({ ...selectedObj, description: e.target.value })}
      />
    </>
  ) : (
    <Typography variant="body1">No file or folder selected.</Typography>
  )}
</DialogContent>
  
</Dialog>
    </div>
  );
};

export default Dashboard;
