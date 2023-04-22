import React, { useCallback, useRef } from "react";

import "../style/albumSelectionForm.scss";

const AlbumSelectionForm = function ({ albumId, defaultAlbumId, onAlbumIdSelected })
{
	const albumIdReference = useRef(null);

	const handleAlbumIDKeyDown = useCallback(function (eventObject)
	{
		console.log(eventObject.keyCode);
		let eventReturnValue = true;
		let arrowKeys = (eventObject.keyCode >= 37 && eventObject.keyCode <= 40);
		let numRow = (eventObject.keyCode >= 48 && eventObject.keyCode <= 57);
		let numPad = (eventObject.keyCode >= 96 && eventObject.keyCode <= 105);
		if (!arrowKeys && !numRow && !numPad)
		{
			eventObject.preventDefault();
			eventReturnValue = false;
		}
		return eventReturnValue;
	}, []);

	const handleAlbumIDChange = useCallback(function (eventObject)
	{
		if (typeof onAlbumIdSelected === "function")
		{
			onAlbumIdSelected(parseInt(eventObject.currentTarget.value));
		}
	}, [ onAlbumIdSelected ]);

	const handleResetClick = useCallback(function (eventObject)
	{
		albumIdReference.current.value = defaultAlbumId;

		if (typeof onAlbumIdSelected === "function")
		{
			onAlbumIdSelected(parseInt(defaultAlbumId));
		}
	}, [ defaultAlbumId, onAlbumIdSelected ]);

	const handleSubmit = useCallback(function (eventObject)
	{
		eventObject.preventDefault();
		return false;
	}, []);

	let content =
		<div className={ "input" }>
			<form id={ "albumSelectionForm1" } className={ "album-selection-form" } method={ "post" } action={ "#" } onSubmit={ handleSubmit }>
				<div>
					<label htmlFor={ "albumId" }>Album:</label>

					<input id={ "albumId" } name={ "ALBUM_ID" } type={ "number" } defaultValue={ albumId } step={ 1 } min={ 1 } ref={ albumIdReference } onKeyDown={ handleAlbumIDKeyDown } onChange={ handleAlbumIDChange } />

					<button id={ "clearAlbumId" } name={ "CLEAR_ALBUM_ID" } type={ "button" } value={ "RESET" } onClick={ handleResetClick }>
						Reset
					</button>
				</div>
			</form>
		</div>;

	return content;
};

export default AlbumSelectionForm;
