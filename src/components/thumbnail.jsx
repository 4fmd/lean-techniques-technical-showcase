import React, { useCallback } from "react";

const Thumbnail = function ({ galleryImage, onImageLoaded, onClick })
{
	const handleImageLoad = useCallback(function (eventObject)
	{
		if (typeof onImageLoaded === "function")
		{
			onImageLoaded(eventObject);
		}
	}, [ onImageLoaded ]);

	const handleThumbnailLinkClick = useCallback(function (eventObject)
	{
		if (typeof onClick === "function")
		{
			onClick(galleryImage);
		}

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
