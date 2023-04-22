import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";

import Thumbnail from "./thumbnail.jsx";
import Spinner from "./spinner";
import GalleryImage from "../scripts/galleryImage.js";

import "../style/gallery.scss";

const Gallery = function ({ galleryUrl, albumId, onThumbnailClick })
{
	const [ galleryData, setGalleryData ] = useState(null);

	const [ galleryContent, setGalleryContent ] = useState(null);

	const [ imagesLoaded, setImagesLoaded ] = useState(0);


	/**
	 * @param {Event} eventObject
	 */
	const handleImageLoaded = useCallback(function (eventObject)
	{
		setImagesLoaded(function (previous)
		{
			return previous + 1;
		});
	}, []);

	/**
	 * @param {GalleryImage} element
	 * @param {Number} index
	 * @param {GalleryImage[]} array
	 *
	 * @returns {JSX.Element}
	 */
	const createGalleryContent = useCallback(function (element, index, array)
	{
		let content = <Thumbnail key={ index } galleryImage={ element } onImageLoaded={ handleImageLoaded } onClick={ onThumbnailClick } />;

		return  content;
	}, [ handleImageLoaded, onThumbnailClick ]);

	/**
	 *
	 */
	const generateGalleryContent = useCallback(function ()
	{
		let content = null;
		try
		{
			if (!Array.isArray(galleryData))
			{
				throw new Error("");
			}

			content = galleryData.map(createGalleryContent);
		}
		catch (exception)
		{
			content = null;
		}
		finally
		{
			setGalleryContent(content);
		}
	}, [ galleryData, createGalleryContent ]);


	/**
	 * @param {Object} element
	 * @param {Number} index
	 * @param {Object[]} array
	 *
	 * @returns {GalleryImage}
	 */
	const createGalleryData = useCallback(function (element, index, array)
	{
		return new GalleryImage(element.albumId, element.id, element.title, element.url, element.thumbnailUrl);
	}, []);

	/**
	 * @param {AbortController} controller
	 */
	const loadGalleryData = useCallback(function (controller)
	{
		let gallery = null;
		let requestData = null;
		try
		{
			if (typeof galleryUrl === "undefined" || galleryUrl === null)
			{
				throw new Error("URL of image gallery to load must be provided!");
			}

			setGalleryContent(null);

			if (typeof albumId !== "undefined" && albumId !== null)
			{
				requestData =
				{
					"albumId": parseInt(albumId)
				};
			}

			axios.get(galleryUrl,
			{
				"params": requestData,
				"signal": controller.signal
			}).then(function (response)
			{
				gallery = response.data.map(createGalleryData);
			}).catch(function (error)
			{
				gallery = null;
			}).finally(function ()
			{
				setGalleryData(gallery);
			});
		}
		catch (exception)
		{
			//
		}

	}, [ albumId, galleryUrl, createGalleryData ]);




	/**
	 *
	 */
	useEffect(function ()
	{
		setGalleryData(null);

		setGalleryContent(null);

		setImagesLoaded(0);
	}, []);

	/**
	 *
	 */
	useEffect(function ()
	{
		const controller = new AbortController();
		const cleanup = function ()
		{
			controller.abort();
		};

		if (typeof albumId !== "undefined" && albumId !== null)
		{
			loadGalleryData(controller);
		}

		return cleanup;
	}, [ albumId, loadGalleryData ]);

	/**
	 *
	 */
	useEffect(function ()
	{
		setImagesLoaded(0);
		if (Array.isArray(galleryData))
		{
			generateGalleryContent();
		}
	}, [ galleryData, generateGalleryContent ]);

	useEffect(function ()
	{
		let show = false;
		let loadingDiv = null;
		let galleryDiv = null;
		if (Array.isArray(galleryContent))
		{
			if (imagesLoaded > 0)
			{
				if (imagesLoaded === galleryContent.length)
				{
					show = true;
				}
			}
		}

		loadingDiv = document.querySelector("div.loading");
		galleryDiv = document.querySelector("div.gallery");

		if (show)
		{
			Object.assign(loadingDiv.style,
			{
				"display": "none",
				"visibility": "hidden",
				"opacity": 0.00
			});

			Object.assign(galleryDiv.style,
			{
				"display": "flex",
				"visibility": "visible",
				"opacity": 1.00
			});
		}
		else
		{
			Object.assign(loadingDiv.style,
			{
				"display": "flex",
				"visibility": "visible",
				"opacity": 1.00
			});

			Object.assign(galleryDiv.style,
			{
				"display": "none",
				"visibility": "hidden",
				"opacity": 0.00
			});
		}

	}, [ galleryContent, imagesLoaded ]);

	let content =
		<div className={ "content" }>
			<div className={ "loading" }>
				<Spinner />
			</div>

			<div className={ "gallery" }>
				{ galleryContent }
			</div>
		</div>;

	return content;
};

export default Gallery;
