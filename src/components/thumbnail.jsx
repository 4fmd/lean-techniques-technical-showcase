/**
 * File:  thumbnail.jsx
 *
 * Description:  React component for displaying a photo album image thumbnail.
 * The photo album is composed of a grid of thumbnail images.  When a
 * thumbnail image is clicked the full size version can be opened.
 */
import React, { useCallback } from "react";

/**
 * React component representing the thumbnail version of an image in the
 * photo album.
 *
 * @param {GalleryImage} galleryImage GalleryImage object representing the photo
 * album image data downloaded from the web service.
 * @param {Function} onImageLoaded Event handler function for when the image data
 * (E.g. the image linked to in the `<img />` tag) is downloaded.
 * @param {Function} onClick Event handler function for when the thumbnail image
 * is clicked.  Will receitJSX element representing a photo album image thumbnail
 */
const Thumbnail = function ({ galleryImage, onImageLoaded, onClick })
{
	/**
	 * Event handler function called when an image loads (or fails to load).
	 * Will fire the `onImageLoaded` prop function.
	 *
	 * @param {Event} eventObject Event object describing the load of a photo
	 * album image.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
	 * @see https://www.w3schools.com/jsref/event_onload.asp
	 */
	const handleImageLoad = useCallback(function (eventObject)
	{
		if (typeof onImageLoaded === "function")
		{
			onImageLoaded(eventObject);
		}
	}, [ onImageLoaded ]);

	/**
	 * Event handler function called when an anchor tag (a link) containing an image is
	 * clicked.  Will fire the `onClick` prop function.
	 *
	 * @param {Event} eventObject Event object describing the click.
	 *
	 * @returns {Boolean} Standard boolean cancel event return value.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
	 */
	const handleThumbnailLinkClick = useCallback(function (eventObject)
	{
		if (typeof onClick === "function")
		{
			onClick(galleryImage);
		}

		//  Cancel the event otherwise the browser will attempt to navigate
		eventObject.preventDefault();
		return false;
	}, [ galleryImage, onClick ]);

	let content =
		<a href={ galleryImage.url } className={ "image-link" } onClick={ handleThumbnailLinkClick }>
			<img id={ "thumb"  + galleryImage.id } className={ "image" } src={ galleryImage.thumbnailUrl } alt={ galleryImage.title } title={ galleryImage.title } width={ 150 } height={ 150 } onLoad={ handleImageLoad } onError={ handleImageLoad } />
		</a>;

	return content;
};

export default Thumbnail;
