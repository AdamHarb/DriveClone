import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	IconButton,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
	shareLink: {
		display: "flex",
		alignItems: "center",
		marginBottom: theme.spacing(2),
	},
	shareLinkText: {
		flexGrow: 1,
		marginRight: theme.spacing(1),
	},
}));

const ShareDialog = ({ open, handleClose, fileId }) => {
	const classes = useStyles();
	const [copied, setCopied] = useState(false);

	const shareLink = `${import.meta.env.VITE_BACKEND_URL}/api/view-file/${fileId}`;

	const handleCopy = () => {
		navigator.clipboard.writeText(shareLink);
		setCopied(true);
	};

	return (
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Share File</DialogTitle>
				<DialogContent>
					<Typography variant="subtitle1" gutterBottom>
						Share this link with your friends:
					</Typography>
					<div className={classes.shareLink}>
						<TextField
								value={shareLink}
								fullWidth
								variant="outlined"
								InputProps={{
									readOnly: true,
									endAdornment: (
											<IconButton>
												<VisibilityIcon />
											</IconButton>
									),
								}}
								className={classes.shareLinkText}
						/>
						<Button
								variant="contained"
								color="primary"
								startIcon={<FileCopyIcon />}
								onClick={handleCopy}
						>
							{copied ? "Copied!" : "Copy"}
						</Button>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
	);
};

export default ShareDialog;
