/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { close, menu, Icon } from '@wordpress/icons';
import { Button } from '@wordpress/components';

export default function ResponsiveWrapper( props ) {
	if ( ! props.isResponsive ) {
		return props.children;
	}
	const responsiveContainerClasses = classnames(
		'wp-block-navigation__responsive-container',
		{
			'is-menu-open': props.isOpen,
		}
	);

	return (
		<>
			<Button
				className="wp-block-navigation__responsive-container-open "
				aria-label="Close menu"
				data-micromodal-trigger="modal-1"
				onClick={ () => props.onToggle( true ) }
			>
				<Icon icon={ menu } />
			</Button>

			<div
				className={ responsiveContainerClasses }
				id={ `${ props.clientId }-modal` }
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
						aria-labelledby="modal-1-title"
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
