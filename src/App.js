import React, { useCallback, useEffect, useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

import AlbumSelectionForm from "./components/albumSelectionForm";
import Gallery from "./components/gallery";
import ImageDialog from "./components/imageDialog";

const App = function ({})
{
	const GALLERY_URL = useRef("https://jsonplaceholder.typicode.com/photos");

	const DEFAULT_ALBUM_ID = useRef(3);

	const [ albumId, setAlbumId ] = useState(DEFAULT_ALBUM_ID.current);

	const [ selectedGalleryImage, setSelectedGalleryImage ] = useState(null);

	const handleAlbumIdSelected = useCallback(function (newAlbumId)
	{
		setAlbumId(newAlbumId);
	}, []);

	const handleThumbnailClick = useCallback(function (galleryImage)
	{
		setSelectedGalleryImage(galleryImage);
	}, []);

	const handleImageDialogClose = useCallback(function (eventObject, reason)
	{
		debugger;
		setSelectedGalleryImage(null);
	}, []);

	useEffect(function ()
	{
		setSelectedGalleryImage(null);
	}, []);

	let content =
		<div className="App">
			<AlbumSelectionForm albumId={ albumId } defaultAlbumId={ DEFAULT_ALBUM_ID.current } onAlbumIdSelected={ handleAlbumIdSelected } />

			<Gallery galleryUrl={ GALLERY_URL.current } albumId={ albumId } onThumbnailClick={ handleThumbnailClick } />

			<ImageDialog open={ selectedGalleryImage != null } onClose={ handleImageDialogClose } galleryImage={ selectedGalleryImage } />
		</div>;

	return content;
};

export default App;
