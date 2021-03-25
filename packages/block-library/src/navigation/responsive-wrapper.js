/**
 * External dependencies
 */
import classnames from 'classnames';
import micromodal from 'micromodal';
/**
 * WordPress dependencies
 */
import { close, menu, Icon } from '@wordpress/icons';
import { Button } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function ResponsiveWrapper( props ) {
	useEffect( () => {
		if ( true === props.isResponsive ) {
			micromodal.init( {
				openClass: 'is-menu-open',
			} );
		}
	}, [ props.isResponsive ] );

	if ( ! props.isResponsive ) {
		return props.children;
	}
	const responsiveContainerClasses = classnames(
		'wp-block-navigation__responsive-container',
		{
			'is-menu-open': props.isOpen,
		}
	);

	const modalId = `${ props.clientId }-modal`;

	return (
		<>
			<Button
				className="wp-block-navigation__responsive-container-open "
				aria-label="Close menu"
				data-micromodal-trigger={ modalId }
				onClick={ () => props.onToggle( true ) }
			>
				<Icon icon={ menu } />
			</Button>

			<div
				className={ responsiveContainerClasses }
				id={ modalId }
				aria-hidden="true"
			>
				<div
					className="wp-block-navigation__responsive-close"
					tabIndex="-1"
					data-micromodal-close
				>
					<div
						className="wp-block-navigation__responsive-dialog"
						role="dialog"
						aria-modal="true"
						aria-labelledby={ `${ modalId }-title` }
					>
						<Button
							className="wp-block-navigation__responsive-container-close"
							aria-label="Close menu"
							data-micromodal-close
							onClick={ () => props.onToggle( false ) }
						>
							<Icon icon={ close } />
						</Button>
						<div
							className="wp-block-navigation__responsive-container-content"
							id={ `${ props.clientId }-modal-content` }
						>
							{ props.children }
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
