import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloudIcon from '@material-ui/icons/Cloud';

const drawerWidth = 240;

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
	fileItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
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
					<List>
						<ListItem button>
							<ListItemText primary="Home" />
						</ListItem>
						<ListItem button>
							<ListItemText primary="Shared with others" />
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
							label="Search files"
							variant="outlined"
							fullWidth
					/>
					<div className={classes.fileList}>
						<div className={classes.fileItem}>
							<Typography>File 1</Typography>
							<IconButton onClick={handleClick}>
								<MoreVertIcon />
							</IconButton>
						</div>
						<div className={classes.fileItem}>
							<Typography>File 2</Typography>
							<IconButton onClick={handleClick}>
								<MoreVertIcon />
							</IconButton>
						</div>
						{/* Add more file items */}
					</div>
				</main>
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
			</div>
	);
};

export default Dashboard;