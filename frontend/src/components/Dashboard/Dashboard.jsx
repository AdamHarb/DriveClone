import React from 'react';
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
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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
}));

const Dashboard = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [logoutAnchorEl, setLogoutAnchorEl] = React.useState(null);

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

	const files =
		[
			{
				"name": "ProposaljahkwrjwehfljwhefjkhwelkfhklwehfkwefkwflkwNKCLKAEFJKSLJFKLWEFRJL.pdf",
				"uploadedAt": "2024-04-12T07:20:50.123Z",
				"lastEdited": "2024-04-15T09:30:00.123Z",
				"ownerName": "507f1f77bcf86cd799439011",
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
				"ownerName": "507f1f77bcf86cd799439012",
				"sharedWith": [],
				"size": 55843,
				"mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			},
			{
				"name": "LogoDesign.ai",
				"uploadedAt": "2024-02-18T12:00:00.123Z",
				"lastEdited": "2024-02-20T08:50:00.123Z",
				"ownerName": "507f1f77bcf86cd799439013",
				"sharedWith": [
					"507f191e810c19729de860ec"
				],
				"size": 102400,
				"mime_type": "application/illustrator"
			}
		];






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

				<Button
					variant="contained"
					color="default"
					className={classes.addbutton}
					startIcon={<AddIcon className={classes.newicon} />}
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
									<FilterListIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

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
				<div className={classes.fileList}>
					{files.map(file => (
						<div key={file.file_id} className={classes.fileItem}>
							<Typography className={classes.fileName}>{file.name}</Typography>
							<div className={classes.fileDetails}>
								<Typography className={classes.fileDetailsItem} > {file.lastEdited}</Typography>
								<Typography > {file.sharedWith.length} people</Typography>
								<Typography > {file.ownerName}</Typography>
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
				<MenuItem onClick={handleClose}>Delete</MenuItem>
				<MenuItem onClick={handleClose}>Share</MenuItem>
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