/**
 * File:  spinner.jsx
 *
 * Description:  React component displaying a CSS spinner to use to mask
 * loading data.
 */
import React from "react";

import "../style/spinner.scss";

/**
 * React component that displays an animated CSS loading spinner
 *
 * @returns {JSX.Element} JSX element to display a CSS loading spinner
 */
const Spinner = function ()
{
	let content =
		<div className={ "spinner" }>
		</div>;

	return content;
};

export default Spinner;
