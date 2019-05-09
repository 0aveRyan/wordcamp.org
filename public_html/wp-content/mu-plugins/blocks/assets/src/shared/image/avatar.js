/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Disabled } = wp.components;
const { __, sprintf } = wp.i18n;
const { addQueryArgs, isURL } = wp.url;

/**
 * Component for an avatar image, optionally including a link.
 *
 * This tries to mirror the markup output by WP's get_avatar function, with the addition
 * of an optional wrapping link and a container div.
 *
 * @param {Object} props {
 *     @type {string} className
 *     @type {string} name
 *     @type {number} size
 *     @type {string} url
 *     @type {string} imageLink
 * }
 *
 * @return {Element}
 */
export function AvatarImage( {
	className,
	name,
	size,
	url,
	imageLink,
} ) {
	const getSizedURL = ( avatar_url, avatar_size ) => {
		// 's' is the name of the parameter used by Gravatar.
		// eslint-disable-next-line id-length
		return addQueryArgs( avatar_url, { s: avatar_size } );
	};

	let image = (
		<img
			className={ classnames( 'avatar', 'avatar-' + size, 'photo' ) }
			src={ getSizedURL( url, size ) }
			srcSet={ getSizedURL( url, size * 2 ) + ' 2x' }
			alt={ name ? sprintf( __( 'Avatar of %s', 'wordcamporg' ), name ) : '' }
			width={ size }
			height={ size }
		/>
	);

	if ( isURL( imageLink ) ) {
		image = (
			<Disabled>
				<a href={ imageLink } className={ classnames( 'wordcamp-image-link', 'wordcamp-avatar-link' ) }>
					{ image }
				</a>
			</Disabled>
		);
	}

	image = (
		<div className={ classnames( 'wordcamp-image-container', 'wordcamp-avatar-container', className ) }>
			{ image }
		</div>
	);

	return image;
}