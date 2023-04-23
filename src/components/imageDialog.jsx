/**
 * File:  imageDialog.jsx
 *
 * Description:  React component for a dialog to open an image in the photo
 * album.
 */
import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import "../style/imageDialog.scss";

/**
 * React component containing a Material UI dialog which contains an image
 * from the photo album.
 *
 * @param {Boolean} open Whether the dialog is currently open
 * @param {Function} onClose Event handler callback function for when the dialog
 * closes.
 * @param {GalleryImage} galleryImage GalleryImage object representing the photo
 * album image data downloaded from the web service.
 *
 * @returns {JSX.Element} Material UI dialog JSX element containing an image from
 * the photo album.
 *
 * @see https://mui.com/material-ui/api/dialog/
 */
const ImageDialog = function ({ open, onClose, galleryImage })
{
	let content = (typeof galleryImage !== "undefined" && galleryImage !== null) ?
		<Dialog open={ open } onClose={ onClose } className={ "image-dialog" }>
			<div className={ "image-dialog-content" }>
				<DialogTitle>{ galleryImage.id} - { galleryImage.title }</DialogTitle>

				<div className={ "image-container" }>
					<img id={ "full" + galleryImage.id } className={ null } src={ galleryImage.url } alt={ galleryImage.title } title={ galleryImage.title } width={ 600 } height={ 600 } />
				</div>
			</div>
		</Dialog>
		: null;

	return content;
};

export default ImageDialog;
