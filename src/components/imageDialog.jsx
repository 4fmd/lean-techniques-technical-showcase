import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const ImageDialog = function ({ open, onClose, galleryImage })
{
	let content = (typeof galleryImage !== "undefined" && galleryImage !== null) ?
		<Dialog open={ open } onClose={ onClose }>
			<div>
				<DialogTitle>{ galleryImage.title }</DialogTitle>

				<img id={ "full" + galleryImage.id } className={ null } src={ galleryImage.url } alt={ galleryImage.title } title={ galleryImage.title } width={ 600 } height={ 600 } />
			</div>
		</Dialog>
		: null;

	return content;
};

export default ImageDialog;
