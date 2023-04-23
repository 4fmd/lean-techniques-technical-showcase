/**
 * File:  galleryImage.js
 *
 * Description:  Helper JavaScript object that represents the data returned
 * from the photo album web service.
 */

/**
 * Object representing the data received from the photo album web service.
 * Does not provide any functionality, instead only serves to make the logic
 * easier to read and understand.
 */
class GalleryImage
{
	/**
	 * Unique ID value of the photo album.
	 */
	#albumId = null;

	/**
	 * Unique ID value of the image in the photo album.
	 */
	#id = null;

	/**
	 * Title text of the image in the photo album.
	 */
	#title = null;

	/**
	 * URL of the image in the photo album.
	 */
	#url = null;

	/**
	 * URL of a thumbnail version of the image in the photo album.
	 */
	#thumbnailUrl = null;

	/**
	 * Builds the `GalleryImage` object by setting all of the private
	 * fields to the specified values.
	 *
	 * @param {Number} albumId Unique ID value of the photo album.
	 * @param {Number} id Unique ID value of the image in the photo album.
	 * @param {String} title Title text of the image in the photo album.
	 * @param {String} url URL of the image in the photo album.
	 * @param {String} thumbnailUrl URL of a thumbnail version of the image in the photo album.
	 */
	constructor(albumId, id, title, url, thumbnailUrl)
	{
		this.#albumId = albumId;
		this.#id = id;
		this.#title = title;
		this.#url = url;
		this.#thumbnailUrl = thumbnailUrl;
	}

	/**
	 * Gets the unique ID value of the photo album.
	 *
	 * @returns {Number} The unique ID value of the photo album.
	 */
	get albumId()
	{
		return this.#albumId;
	}

	/**
	 * Sets the unique ID value of the photo album.
	 *
	 * @param {Number} value The unique ID value of the photo album to set.
	 */
	set albumId(value)
	{
		this.#albumId = value;
	}

	/**
	 * Gets the unique ID value of the image in the photo album.
	 *
	 * @returns {Number} The unique ID value of the image in the photo album.
	 */
	get id()
	{
		return this.#id;
	}

	/**
	 * Sets the unique ID value of the image in the photo album.
	 *
	 * @param {Number} value The unique ID value of the image in the photo album to set.
	 */
	set id(value)
	{
		this.#id = value;
	}

	/**
	 * Gets the title text of the image in the photo album.
	 *
	 * @returns {String} The title text of the image in the photo album.
	 */
	get title()
	{
		return this.#title;
	}

	/**
	 * Sets the title text of the image in the photo album.
	 *
	 * @param {String} value The title text of the image in the photo album to set.
	 */
	set title(value)
	{
		this.#title = value;
	}

	/**
	 * Gets the URL of the image in the photo album.
	 *
	 * @returns {String} The URL of the image in the photo album.
	 */
	get url()
	{
		return this.#url;
	}

	/**
	 * Sets the URL of the image in the photo album.
	 *
	 * @param {String} value The URL of the image in the photo album to set.
	 */
	set url(value)
	{
		this.#url = value;
	}

	/**
	 * Gets the URL of a thumbnail version of the image in the photo album.
	 *
	 * @returns {String} The URL of a thumbnail version of the image in the photo album.
	 */
	get thumbnailUrl()
	{
		return this.#thumbnailUrl;
	}

	/**
	 * Sets the URL of a thumbnail version of the image in the photo album.
	 *
	 * @param {String} value The URL of a thumbnail version of the image in the photo album to set.
	 */
	set thumbnailUrl(value)
	{
		this.#thumbnailUrl = value;
	}
}

export { GalleryImage as default };
