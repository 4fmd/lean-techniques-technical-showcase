class GalleryImage
{
	#albumId = null;
	#id = null;
	#title = null;
	#url = null;
	#thumbnailUrl = null;

	constructor(albumId, id, title, url, thumbnailUrl)
	{
		this.#albumId = albumId;
		this.#id = id;
		this.#title = title;
		this.#url = url;
		this.#thumbnailUrl = thumbnailUrl;
	}

	get albumId()
	{
		return this.#albumId;
	}

	set albumId(value)
	{
		this.#albumId = value;
	}

	get id()
	{
		return this.#id;
	}

	set id(value)
	{
		this.#id = value;
	}

	get title()
	{
		return this.#title;
	}

	set title(value)
	{
		this.#title = value;
	}

	get url()
	{
		return this.#url;
	}

	set url(value)
	{
		this.#url = value;
	}

	get thumbnailUrl()
	{
		return this.#thumbnailUrl;
	}

	set thumbnailUrl(value)
	{
		this.#thumbnailUrl = value;
	}
}

export { GalleryImage as default };
