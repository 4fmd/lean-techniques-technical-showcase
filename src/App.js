/**
 * File:  App.js
 *
 * Description:  Main function for the React photo album web application
 */
import React, { useCallback, useEffect, useState, useRef } from "react";

import AlbumSelectionForm from "./components/albumSelectionForm";
import Gallery from "./components/gallery";
import ImageDialog from "./components/imageDialog";

import "./App.css";

/**
 *
 * @returns
 */
const App = function ({})
{
	/**
	 *
	 */
	const GALLERY_URL = useRef("https://jsonplaceholder.typicode.com/photos");

	/**
	 *
	 */
	const DEFAULT_ALBUM_ID = useRef(3);

	//
	const [ albumId, setAlbumId ] = useState(DEFAULT_ALBUM_ID.current);

	//
	const [ selectedGalleryImage, setSelectedGalleryImage ] = useState(null);

	/**
	 * @param {Number} newAlbumId
	 */
	const handleAlbumIdSelected = useCallback(function (newAlbumId)
	{
		setAlbumId(newAlbumId);
	}, []);

	/**
	 * @param {GalleryImage} galleryImage
	 */
	const handleThumbnailClick = useCallback(function (galleryImage)
	{
		setSelectedGalleryImage(galleryImage);
	}, []);

	/**
	 * @param {Event} eventObject Event object describing the source of the callback
	 * @param {String} reason Reason string for the close (I.e., "escapeKeyDown" or "backdropClick")
	 *
	 * @see https://mui.com/material-ui/api/dialog/
	 */
	const handleImageDialogClose = useCallback(function (eventObject, reason)
	{
		setSelectedGalleryImage(null);
	}, []);

	/**
	 *
	 */
	useEffect(function ()
	{
		setSelectedGalleryImage(null);
		setAlbumId(DEFAULT_ALBUM_ID.current);
	}, []);

	let content =
		<div className="App">
			<AlbumSelectionForm albumId={ albumId } defaultAlbumId={ DEFAULT_ALBUM_ID.current } onAlbumIdSelected={ handleAlbumIdSelected } />

			<Gallery photoAlbumUrl={ GALLERY_URL.current } albumId={ albumId } onThumbnailClick={ handleThumbnailClick } />

			<ImageDialog open={ selectedGalleryImage != null } onClose={ handleImageDialogClose } galleryImage={ selectedGalleryImage } />
		</div>;

	return content;
};

export default App;
