import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloudIcon from '@material-ui/icons/Cloud';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// more icons for the sidebar
import HomeIcon from '@material-ui/icons/Home';
//import DriveFolderUploadIcon from '@material-ui/icons/DriveFolderUpload';
import ComputerIcon from '@material-ui/icons/Computer';
import PeopleIcon from '@material-ui/icons/People';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ReportIcon from '@material-ui/icons/Report';
import DeleteIcon from '@material-ui/icons/Delete';
import StorageIcon from '@material-ui/icons/Storage';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import DoneIcon from '@material-ui/icons/Done';
import { useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FormControl, InputLabel, Select, FormControlLabel, Checkbox, Box } from '@mui/material';




const drawerWidth = 240;
// makestyles is from material ui . its a hook that defines css with javascript objects
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
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
		position: 'relative',
	},
	storageInfo: {
		marginTop: 'auto',
		padding: theme.spacing(2),
	},
	searchBar: {
		marginBottom: theme.spacing(2),
		width: 'calc(100% - 64px)',
	},
	fileList: {
		marginTop: theme.spacing(2),
	},
	fileName: {
		marginTop: '10px', // the name of the file was a bit up from its details. this is to push it down
		flexGrow: 1,
		overflow: 'hidden',
		textOverflow: 'ellipsis', // SOME FILES NAMES MIGHT BE EXTREMELEY LONG SO WE PUT ...
		width: '400px', // since name takes most of the row 
		// color: rgb(31, 31, 31),

	},
	fileItem: {
		display: 'flex',
		transition: 'background-color 0.3s', // Smooth transition for background color
		'&:hover': {
			backgroundColor: '#f5f5f5', // Change to your preferred shade of grey
		},
	}, //puting the the 2 divs as flex items: name AND (locations, reason, owner) 
	fileDetails: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexGrow: 1, //assigning some space for each flex item
		marginLeft: theme.spacing(2),
	},
	fileDetailsItem: {

	},
	avatar: {
		position: 'absolute',
		top: theme.spacing(2),
		right: theme.spacing(2),
		cursor: 'pointer',
	},
	logo: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(2),
	},
	logoIcon: {
		marginRight: theme.spacing(1),
	},
	suggestedContainer: {
		display: 'flex',
	},
	suggested: {
		marginRight: '10px'
	},
	suggestedIcons: {
		borderRadius: '10px',
		width: '90px',
		height: '40px',
	},
	filefolderIcon: {
		width: '16px',
	},
	addbutton: {
		margin: theme.spacing(1),
		borderRadius: 20,
		boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	newicon: {
		marginRight: theme.spacing(1),
	},
	filteroptions: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	listlayout: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	listlayoutitems: {
		display: 'flex',
		marginRight: '2rem',
		flexGrow: 0.45,
	},

	listlayoutitem: {
		display:'flex',
		flexGrow: 1,
	}
}));

const Dashboard = () => {
	const classes = useStyles();
	const fileInputRef = useRef(null);
	const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false); // handling the advancedsearch modal
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [logoutAnchorEl, setLogoutAnchorEl] = React.useState(null);
	const [searchParams, setSearchParams] = React.useState({
		type: '',
		owner: '',
		hasTheWords: '',
		itemName: '',
		location: '',
		inTrash: false,
		starred: false,
	});

	const handleButtonClick = () => {
		fileInputRef.current.click();
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
		console.log('Logout clicked');
		handleLogoutClose();
	};

	const handleReset = () => {
		resetForm(); // Function to reset the advancedsearch form
	};

	const handleSearch = () => {
		performSearch(); // Function to perform the advancedsearch
	};

	const handleAdvancedSearchClick = () => {
		setIsAdvancedSearchOpen(!isAdvancedSearchOpen); // if filtericon is clicked, will set AdvancedSearchOpen to TRUE
	};

	const handleInputChange = (event) => {
		const { name, value, checked, type } = event.target;

		setSearchParams(prevParams => ({
			...prevParams,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};
	//This creates a new object with all the current searchParams, but with the value for the property named name updated to the new value that came from the text field. 
	//The new object is then set as the new state.


	const initialFiles =
		[
			{
				"name": "ProposaljahkwrjwehfljwhefjkhwelkfhklwehfkwefkwflkwNKCLKAEFJKSLJFKLWEFRJL.pdf",
				"uploadedAt": "2024-04-12T07:20:50.123Z",
				"lastEdited": "2024-04-15T09:30:00.123Z",
				"user_id": "507f1f77bcf86cd799439011",
				"sharedWith": [
					"507f191e810c19729de860ea",
					"507f191e810c19729de860eb"
				],
				"size": 153402,
				"mime_type": "application/pdf"
			},
			{
				"name": "Budget.xlsx",
				"uploadedAt": "2024-03-27T05:24:30.123Z",
				"lastEdited": "2024-04-05T11:45:30.123Z",
				"user_id": "507f1f77bcf86cd799439012",
				"sharedWith": [],
				"size": 55843,
				"mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			},
			{
				"name": "LogoDesign.ai",
				"uploadedAt": "2024-02-18T12:00:00.123Z",
				"lastEdited": "2024-02-20T08:50:00.123Z",
				"user_id": "507f1f77bcf86cd799439013",
				"sharedWith": [
					"507f191e810c19729de860ec"
				],
				"size": 102400,
				"mime_type": "application/illustrator"
			}
		];

	const [files, setFiles] = useState(initialFiles);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const filteredFiles = initialFiles.filter(file =>
			file.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFiles(filteredFiles);
	}, [searchTerm]);

	const handleChangeSearch = (event) => {
		setSearchTerm(event.target.value);
	}; // everytime the search input changes, set it as the new search term and it will filter it out 




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
					<CloudIcon className={classes.logoIcon} />
					<Typography variant="h6">Drive</Typography>
				</div>
				<input
					type="file"
					style={{ display: 'none' }} // Hide the file input element
					ref={fileInputRef}
					onChange={(event) => {
						const file = event.target.files[0];
						console.log(file); // Log the selected file, or handle it as needed
					}}
				/>
				<Button
					variant="contained"
					color="default"
					className={classes.addbutton}
					startIcon={<AddIcon className={classes.newicon} />}
					onClick={handleButtonClick}
				>
					<Typography variant="body2">New</Typography>
				</Button>
				<List>
					<ListItem button>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText primary="Shared with others" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<AccessTimeIcon />
						</ListItemIcon>
						<ListItemText primary="Recent" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<StarBorderIcon />
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<ReportIcon />
						</ListItemIcon>
						<ListItemText primary="Spam" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<DeleteIcon />
						</ListItemIcon>
						<ListItemText primary="Delete" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<StorageIcon />
						</ListItemIcon>
						<ListItemText primary="Storage" />
					</ListItem>
				</List>
				<div className={classes.storageInfo}>
					<Typography variant="subtitle1">Storage Used: 10 GB</Typography>
					<div style={{ width: '100%', height: 10, backgroundColor: '#ddd' }}>
						<div style={{ width: '60%', height: '100%', backgroundColor: '#4caf50' }}></div>
					</div>
				</div>
			</Drawer>
			<main className={classes.content}>
				<Avatar className={classes.avatar} onClick={handleLogoutClick}>
					JD
				</Avatar>
				<TextField
					className={classes.searchBar}
					label="Search in Drive"
					variant="outlined"
					onChange={handleChangeSearch}
					value={searchTerm}
					fullWidth
					InputProps={{ //this is an object that provides properties to the input element
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton>
									<FilterListIcon onClick={handleAdvancedSearchClick} />
									{/*  will trigger whether to open a modal or not  */}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				{/* This is the Modal for the Advanced Search Fields BTWWWW */}
				<Dialog open={isAdvancedSearchOpen} onClose={handleAdvancedSearchClick}>
					<DialogTitle>Advanced Search</DialogTitle>
					<DialogContent>
						<FormControl fullWidth margin="normal">
							<InputLabel>Type</InputLabel>
							<Select
								name="type" //for each textfield you give it a name attribute that corresponds to a key in you searchParams object
								value={searchParams.type}
								onChange={handleInputChange}
								label="Type"
							>
								<MenuItem value="office-doc">Office Document (Word, Excel)</MenuItem>
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
							<Button variant="contained" color="primary" onClick={handleSearch}>
								Search
							</Button>
						</Box>
					</DialogContent>
				</Dialog>

				<Typography variant="h5">Welcome to Drive</Typography>
				<br />
				<div className={classes.filteroptions}>
					<div className={classes.suggestedContainer}>
						<Typography className={classes.suggested} variant="subtitle1" gutterBottom>
							Suggested
						</Typography>
						<ToggleButton className={classes.suggestedIcons} value="files" aria-label="left aligned">
							<InsertDriveFileIcon className={classes.filefolderIcon} />
							Files
						</ToggleButton>
						<ToggleButton className={classes.suggestedIcons} value="folders" aria-label="centered">
							<FolderIcon className={classes.filefolderIcon} />
							Folders
						</ToggleButton>
					</div>

					<div>
						<ToggleButtonGroup
							exclusive
							aria-label="text alignment"
						>
							<ToggleButton value="list" aria-label="left aligned">
								<DoneIcon />
								<ViewListIcon />
							</ToggleButton>
							<ToggleButton value="module" aria-label="centered">
								<ViewModuleIcon />
							</ToggleButton>
						</ToggleButtonGroup>
					</div>
				</div>
				<div className={classes.listlayout}>
					<Typography> File Name</Typography>
					<div className={classes.listlayoutitems}>
						<Typography className={classes.listlayoutitem}> Date Uploaded</Typography>
						<Typography className={classes.listlayoutitem}> Owner</Typography>
						<Typography className={classes.listlayoutitem}> Location</Typography>
					</div>
				</div>
				<div className={classes.fileList}>
					{files.map(file => (
						<div key={file.file_id} className={classes.fileItem}>
							<Typography className={classes.fileName}>{file.name}</Typography>
							<div className={classes.fileDetails}>
								<Typography className={classes.fileDetailsItem} > {file.lastEdited}</Typography>
								<Typography > {file.sharedWith.length} people</Typography>
								<Typography > {file.user_id}</Typography>
							</div>
							<IconButton onClick={handleClick}>
								<MoreVertIcon />
							</IconButton>
						</div>
					))}
				</div>
			</main >
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
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
		</div >
	);
};

export default Dashboard;