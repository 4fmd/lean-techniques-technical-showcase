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
 * Root React component for the photo album application.
 *
 * @returns {JSX.Element} JSX representing the photo album application
 */
const App = function ({})
{
	/**
	 * URL for the photo album web service
	 */
	const PHOTO_ALBUM_URL = useRef("https://jsonplaceholder.typicode.com/photos");

	/**
	 * Default photo Album Id value
	 */
	const DEFAULT_PHOTO_ALBUM_ID = useRef(3);

	//  State Value:  The currently selected Album Id value
	const [ albumId, setAlbumId ] = useState(DEFAULT_PHOTO_ALBUM_ID.current);

	//  State Value:  The currently selected GalleryImage object
	const [ selectedGalleryImage, setSelectedGalleryImage ] = useState(null);

	/**
	 * Event handler callback function for when the photo album id value is changed
	 *
	 * @param {Number} newAlbumId New photo album id value
	 */
	const handleAlbumIdSelected = useCallback(function (newAlbumId)
	{
		//  Set the album id in state
		setAlbumId(newAlbumId);
	}, []);

	/**
	 * Event handler callback function for when a photo album thumbnail image is clicked
	 *
	 * @param {GalleryImage} galleryImage The GalleryImage object representing the image
	 * that was clicked.
	 */
	const handleThumbnailClick = useCallback(function (galleryImage)
	{
		//  Set the GalleryImage object in state
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
		//  Clear out the selected GalleryImage object from state
		setSelectedGalleryImage(null);
	}, []);

	/**
	 * useEffect function to reset all the state values to their defaults.
	 * Should the user perform an action to interrupt the page processing,
	 * and then return the process could continue with the in progress values.
	 * So, clear them out on load.
	 */
	useEffect(function ()
	{
		//  Clear the selected image
		setSelectedGalleryImage(null);

		//  Clear the selected photo album
		setAlbumId(DEFAULT_PHOTO_ALBUM_ID.current);
	}, []);

	let content =
		<div className="App">
			<AlbumSelectionForm albumId={ albumId } defaultAlbumId={ DEFAULT_PHOTO_ALBUM_ID.current } onAlbumIdSelected={ handleAlbumIdSelected } />

			<Gallery photoAlbumUrl={ PHOTO_ALBUM_URL.current } albumId={ albumId } onThumbnailClick={ handleThumbnailClick } />

			<ImageDialog open={ selectedGalleryImage != null } onClose={ handleImageDialogClose } galleryImage={ selectedGalleryImage } />
		</div>;

	return content;
};

export default App;
