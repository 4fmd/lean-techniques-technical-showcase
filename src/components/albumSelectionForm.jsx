/**
 * File:  albumSelectionForm.jsx
 *
 * Description:  React component for displaying a form to select the photo
 * album to be displayed.  Form consists of a single numeric input control
 * and a button to reset the album back to the default.
 */
import React, { useCallback, useRef } from "react";

import "../style/albumSelectionForm.scss";

/**
 * React component for selecting the album to be displayed in the photo
 * gallery.
 *
 * @param {Number} albumId The currently selected Album ID value
 * @param {Number} defaultAlbumId The default Album ID value
 * @param {Function} onAlbumIdSelected Event handler callback function
 * executed when the user selects a new album to display.  Receives the new
 * Album ID value as a parameter.
 *
 * @returns {JSX.Element} JSX form element containing the components to select
 * a photo album to display.
 *
 */
const AlbumSelectionForm = function ({ albumId, defaultAlbumId, onAlbumIdSelected })
{
	/**
	 * React reference to the Album ID numeric `<input />` element.
	 */
	const albumIdReference = useRef(null);

	/**
	 * Event handler callback function for when a key is pressed in the Album
	 * ID `<input />` element.  The browser does not prevent the user from
	 * entering non numeric data in a numeric input (for ... reasons).  So,
	 * to this function is bound to cancel the key event if the input is non
	 * numeric.
	 *
	 * @param {KeyboardEvent} eventObject Keyboard event object describing the
	 * key down press event.
	 *
	 * @returns {Boolean} Standard boolean cancel event return value.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
	 */
	const handleAlbumIDKeyDown = useCallback(function (eventObject)
	{
		let eventReturnValue = true;

		//  Allow the arrow keys
		let arrowKeys = (eventObject.keyCode >= 37 && eventObject.keyCode <= 40);

		//  Allow the numbers at the top of the keyboard
		let numRow = (eventObject.keyCode >= 48 && eventObject.keyCode <= 57);

		//  Allow the numbers on the num pad
		let numPad = (eventObject.keyCode >= 96 && eventObject.keyCode <= 105);

		if (!arrowKeys && !numRow && !numPad)
		{
			eventObject.preventDefault();
			eventReturnValue = false;
		}
		return eventReturnValue;
	}, []);

	/**
	 * Event handler callback function for when the Album Id value is changed.
	 * Will call the `onAlbumIdSelected` prop event handler function.
	 *
	 * @param {Event} eventObject Event describing the value change in the
	 * input element
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
	 */
	const handleAlbumIDChange = useCallback(function (eventObject)
	{
		if (typeof onAlbumIdSelected === "function")
		{
			onAlbumIdSelected(parseInt(eventObject.currentTarget.value));
		}
	}, [ onAlbumIdSelected ]);

	/**
	 * Event handler callback function for when the Reset button is clicked.
	 * Will set the value of the Album Id `<input />` to the provided
	 * `defaultAlbumId` prop value and call the `onAlbumIdSelected` prop
	 * event handler function.
	 *
	 * @param {Event} eventObject Event describing the click event on the
	 * Reset button.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
	 */
	const handleResetClick = useCallback(function (eventObject)
	{
		if (typeof defaultAlbumId === "number" && defaultAlbumId > 0)
		{
			//  Set the value of the Album Id input to the specified default
			albumIdReference.current.value = defaultAlbumId;

			//  Fire the change event handler callback
			if (typeof onAlbumIdSelected === "function")
			{
				onAlbumIdSelected(parseInt(defaultAlbumId));
			}
		}
	}, [ defaultAlbumId, onAlbumIdSelected ]);

	/**
	 * Event handler callback function for when the form containing the Album
	 * Id value is submitted.  The form is not intended to be submitted, but
	 * the browser can trigger a form submission when the `Enter` key is
	 * pressed on a form element.
	 *
	 * @param {SubmitEvent} eventObject Event describing the submission of the
	 * form.
	 *
	 * @returns {Boolean} Standard boolean cancel event return value.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent/SubmitEvent
	 */
	const handleSubmit = useCallback(function (eventObject)
	{
		//  Prevent the form submission
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
