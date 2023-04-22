/**
 * File:  gallery.jsx
 *
 * Description:
 *
 */
import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";

import GalleryImage from "../scripts/galleryImage.js";

import Spinner from "./spinner";
import Thumbnail from "./thumbnail.jsx";

import "../style/gallery.scss";

const Gallery = function ({ photoAlbumUrl, albumId, onThumbnailClick })
{
	//  State Value:  The photo album data downloaded from the web service.
	const [ photoAlbumData, setPhotoAlbumData ] = useState(null);

	//  State Value:  Collection of JSX elements generated from the data
	//  downloaded from the web service.
	const [ photoAlbumContent, setPhotoAlbumContent ] = useState(null);

	//  State Value:  Number of images loaded from the URLs specified in the
	//  data downloaded from the web service.  When the number of images
	//  loaded reaches the number of images in the album the loading image
	//  is hidden and the photo album is displayed.
	const [ numberOfImagesLoaded, setNumberOfImagesLoaded ] = useState(0);

	/**
	 * Event handler callback for when an image in the phot gallery loads
	 *
	 * @param {Event} eventObject Event object describing the load of a photo
	 * album image
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
	 * @see https://www.w3schools.com/jsref/event_onload.asp
	 *
	 */
	const handleImageLoaded = useCallback(function (eventObject)
	{
		setNumberOfImagesLoaded(function (previous)
		{
			//  The new value is simply the previous value incremented by one
			return previous + 1;
		});
	}, []);

	/**
	 * Helper function to hide the loading spinner image.
	 */
	const hideSpinner = useCallback(function ()
	{
		let spinner = document.querySelector("div.loading");
		if (spinner !== null)
		{
			Object.assign(spinner.style,
			{
				"display": "none",
				"visibility": "hidden",
				"opacity": 0.00
			});
		}
	}, []);

	/**
	 * Helper function to show the loading spinner image.
	 */
	const showSpinner = useCallback(function ()
	{
		let spinner = document.querySelector("div.loading");
		if (spinner !== null)
		{
			Object.assign(spinner.style,
			{
				"display": "flex",
				"visibility": "visible",
				"opacity": 1.00
			});
		}
	}, []);

	/**
	 * Helper function to hide the photo album.
	 */
	const hidePhotoAlbum = useCallback(function ()
	{
		let photoAlbum = document.querySelector("div.gallery");
		if (photoAlbum !== null)
		{
			Object.assign(photoAlbum.style,
			{
				"display": "none",
				"visibility": "hidden",
				"opacity": 0.00
			});
		}
	}, []);

	/**
	 * Helper function to show the photo album.
	 */
	const showPhotoAlbum = useCallback(function ()
	{
		let photoAlbum = document.querySelector("div.gallery");
		if (photoAlbum !== null)
		{
			Object.assign(photoAlbum.style,
			{
				"display": "flex",
				"visibility": "visible",
				"opacity": 1.00
			});
		}
	}, []);

	/**
	 * Map function for converting a `GalleryImage` object to a
	 * `<Thumbnail />` photo album image.
	 *
	 * @param {GalleryImage} element Item in the array of `GalleryImage` objects
	 * @param {Number} index Index of the current item in the array of `GalleryImage` objects
	 * @param {GalleryImage[]} array Entire array of `GalleryImage` objects
	 *
	 * @returns {JSX.Element} Thumbnail JSX element
	 */
	const createPhotoAlbumContent = useCallback(function (element, index, array)
	{
		let content = <Thumbnail key={ index }
								 galleryImage={ element }
								 onImageLoaded={ handleImageLoaded }
								 onClick={ onThumbnailClick } />;

		return  content;
	}, [ handleImageLoaded, onThumbnailClick ]);

	/**
	 * Converts the array of `GalleryImage` objects to an array of
	 * `<Thumbnail />` JSX elements.
	 */
	const generatePhotoAlbumContent = useCallback(function ()
	{
		let content = null;
		try
		{
			if (!Array.isArray(photoAlbumData))
			{
				throw new Error("Photo Album data must be provided before the JSX content can be generated!");
			}

			//  Call the createPhotoAlbumContent function to create the JSX elements
			content = photoAlbumData.map(createPhotoAlbumContent);
		}
		catch (exception)
		{
			console.error("Error while trying to generate JSX for the photo album content", exception);
			console.error("Returning null to indicate failure.  No content will be displayed.");
			content = null;
		}
		finally
		{
			//  Set the generated content in local state
			setPhotoAlbumContent(content);
		}
	}, [ photoAlbumData, createPhotoAlbumContent ]);

	/**
	 * Map function to convert an instance of the data downloaded from the
	 * photo album web service to an instance of a `GalleryImage` object.
	 *
	 * @param {Object} element Item in the array of JSON objects downloaded
	 * from the photo album web service.
	 * @param {Number} index Index of the current item in the array of JSON
	 * objects
	 * @param {Object[]} array Entire array of JSON objects downloaded from
	 * the web service.
	 *
	 * @returns {GalleryImage} Instance of a `GalleryImage` object converted
	 * from an instance of the data downloaded from the web service.
	 */
	const createPhotoAlbumData = useCallback(function (element, index, array)
	{
		return new GalleryImage(element.albumId,
								element.id,
								element.title,
								element.url,
								element.thumbnailUrl);
	}, []);

	/**
	 * Calls the photo album REST web service to download the photo album
	 * data and store it in state.
	 *
	 * @param {AbortController} controller Axios abort controller to cancel
	 * the request if necessary.
	 *
	 * @see https://axios-http.com/docs/cancellation
	 */
	const loadPhotoAlbumData = useCallback(function (controller)
	{
		let photoAlbum = null;
		let requestData = null;
		try
		{
			if (typeof photoAlbumUrl === "undefined" || photoAlbumUrl === null)
			{
				throw new Error("URL of image gallery to load must be provided!");
			}

			//  Clear any photo album JSX content that is already in state
			setPhotoAlbumContent(null);

			//  Build a request object for the web service.  The service
			//  can be called without providing input, however that is not
			//  the intention
			if (typeof albumId !== "undefined" && albumId !== null)
			{
				requestData =
				{
					"albumId": parseInt(albumId)
				};
			}

			//  And away we go ...
			axios.get(photoAlbumUrl,
			{
				"params": requestData,
				"signal": controller.signal
			}).then(function (response)
			{
				if (Array.isArray(response.data))
				{
					//  Create a collection of helper objects from the data returned
					//  from the web service
					photoAlbum = response.data.map(createPhotoAlbumData);
				}
				else
				{
					//  Did not expect this back ...
					console.warn("Did not receive an array ofhttps://axios-http.com/docs/cancellation objects from the web service, but the service did not return an error code.");
					console.warn("Setting the results to an empty array.  No content will be displayed.");
					photoAlbum = [];
				}
			}).catch(function (error)
			{
				//  The server returned an error ...
				console.error("Error response received from the web service.");
				console.error("Setting the results to null.  No content will be displayed.")
				photoAlbum = null;
			}).finally(function ()
			{
				//  Set the results in state to trigger the JSX generation.  Perform
				//  the state update in the .finally() callback to ensure that the
				//  promise has been fully resolved (E.g. any callbacks triggered by
				//  updates in the .then() callback have already been executed).
				setPhotoAlbumData(photoAlbum);
			});
		}
		catch (exception)
		{
			console.error("Error while trying to download photo album from the web service", exception);
			console.error("Setting the photo album content to null.  No content will be displayed.");
			setPhotoAlbumData(null);
		}
	}, [ albumId, photoAlbumUrl, createPhotoAlbumData ]);

	/**nessicary
	 * useEffect function to reset all the state values to their defaults.
	 * Should the user perform an action to interrupt the load and generate
	 * process, and then return the process could start again using intermediate
	 * values.  So, perform a reset on load.
	 */
	useEffect(function ()
	{
		//  Set the photo album data to null
		setPhotoAlbumData(null);

		//  Set the photo album JSX content to null
		setPhotoAlbumContent(null);

		//  Set the number of images loaded to zero
		setNumberOfImagesLoaded(0);
	}, []);

	/**
	 * useEffect function to load the photo album from the specified Album Id.
	 */
	useEffect(function ()
	{
		//  Create an abort controller for the Axios Ajax call and a clean up
		//  function for the useEffect function.nessicary
		const controller = new AbortController();
		const cleanup = function ()
		{
			controller.abort();
		};

		//  If an Album Id has been provided ...
		if (typeof albumId !== "undefined" && albumId !== null)
		{
			//  ... load it
			loadPhotoAlbumData(controller);
		}

		return cleanup;
	}, [ albumId, loadPhotoAlbumData ]);

	/**
	 * useEffect function for generating the phot album JSX content from the data
	 * downloaded from the web service.
	 */
	useEffect(function ()
	{
		//  Set the number of images loaded to be zero even if the photo album data is being cleared
		setNumberOfImagesLoaded(0);

		//  If there is photo album data set ...
		if (Array.isArray(photoAlbumData))
		{
			//  ... generate the corresponding JSX content
			generatePhotoAlbumContent();
		}
	}, [ photoAlbumData, generatePhotoAlbumContent ]);

	/**
	 * useEffect function for toggling between the loading spinner and the
	 * photo album components.  The generated JSX content contains `<img />`
	 * tags when then need to download the image file.  This can take some
	 * time, while the browser is downloading them display a spinner.
	 * Otherwise the user will see a grid of images popping in at seemingly
	 * random times.
	 */
	useEffect(function ()
	{
		let showPhotoAlbum = false;

		//  If there is generated JSX content ...
		if (Array.isArray(photoAlbumContent))
		{
			//  ... and the images in the photo album have been loaded
			if (numberOfImagesLoaded > 0 && numberOfImagesLoaded === photoAlbumContent.length)
			{
				//  ... then show the phot album
				showPhotoAlbum = true;
			}
		}

		if (showPhotoAlbum)
		{
			hideSpinner();
			showPhotoAlbum();
		}
		else
		{
			hidePhotoAlbum();
			showSpinner();
		}
	}, [ photoAlbumContent, numberOfImagesLoaded, hideSpinner, showSpinner, hidePhotoAlbum, showPhotoAlbum ]);

	let content =
		<div className={ "content" }>
			<div className={ "loading" }>
				<Spinner />
			</div>

			<div className={ "gallery" }>
				{ photoAlbumContent }
			</div>
		</div>;

	return content;
};

export default Gallery;
