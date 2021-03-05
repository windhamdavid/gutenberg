<?php
/**
 * Block patterns registration.
 *
 * @package gutenberg
 */

// Initial Query block patterns.
register_block_pattern(
	'query/large-posts',
	array(
		'title'   => __( 'Large', 'gutenberg' ),
		'scope'   => array(
			'inserter' => false,
			'block'    => array( 'core/query' ),
		),
		'content' => '<!-- wp:post-title {"isLink":true} /-->
						<!-- wp:post-featured-image  {"isLink":true,"align":"wide"} /-->
						<!-- wp:post-excerpt /-->
						<!-- wp:separator -->
						<hr class="wp-block-separator"/>
						<!-- /wp:separator -->
						<!-- wp:post-date /-->',
	)
);

register_block_pattern(
	'query/medium-posts',
	array(
		'title'   => __( 'Medium', 'gutenberg' ),
		'scope'   => array(
			'inserter' => false,
			'block'    => array( 'core/query' ),
		),
		'content' => '<!-- wp:columns {"align":"wide"} -->
						<div class="wp-block-columns alignwide"><!-- wp:column {"width":"66.66%"} -->
						<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:post-featured-image {"isLink":true} /--></div>
						<!-- /wp:column -->
						<!-- wp:column {"width":"33.33%"} -->
						<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:post-title {"isLink":true} /-->
						<!-- wp:post-excerpt /--></div>
						<!-- /wp:column --></div>
						<!-- /wp:columns -->',
	)
);

register_block_pattern(
	'query/small-posts',
	array(
		'title'   => __( 'Small', 'gutenberg' ),
		'scope'   => array(
			'inserter' => false,
			'block'    => array( 'core/query' ),
		),
		'content' => '<!-- wp:columns {"verticalAlignment":"center"} -->
						<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center","width":"25%"} -->
						<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:25%"><!-- wp:post-featured-image {"isLink":true} /--></div>
						<!-- /wp:column -->
						<!-- wp:column {"verticalAlignment":"center","width":"75%"} -->
						<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:75%"><!-- wp:post-title {"isLink":true} /--></div>
						<!-- /wp:column --></div>
						<!-- /wp:columns -->',
	)
);


// Buttons scoped pattern to test with Placeholder.
register_block_pattern(
	'buttons/large-posts',
	array(
		'title'   => __( 'Large', 'gutenberg' ),
		'scope'   => array(
			'inserter' => false,
			'block'    => array( 'core/buttons' ),
		),
		'content' => '<!-- wp:columns -->
						<div class="wp-block-columns"><!-- wp:column -->
						<div class="wp-block-column"><!-- wp:buttons {"contentJustification":"center","orientation":"vertical"} -->
						<div class="wp-block-buttons is-content-justification-center is-vertical"><!-- wp:button -->
						<div class="wp-block-button"><a class="wp-block-button__link">Hello</a></div>
						<!-- /wp:button -->

						<!-- wp:button {"style":{"color":{"background":"#4acbc3"}}} -->
						<div class="wp-block-button"><a class="wp-block-button__link has-background" style="background-color:#4acbc3">Buttons</a></div>
						<!-- /wp:button --></div>
						<!-- /wp:buttons --></div>
						<!-- /wp:column -->

						<!-- wp:column -->
						<div class="wp-block-column"><!-- wp:buttons {"contentJustification":"center","orientation":"vertical"} -->
						<div class="wp-block-buttons is-content-justification-center is-vertical"><!-- wp:button {"style":{"color":{"background":"#229fd5"}}} -->
						<div class="wp-block-button"><a class="wp-block-button__link has-background" style="background-color:#229fd5">Scoped</a></div>
						<!-- /wp:button -->

						<!-- wp:button {"style":{"color":{"background":"#ce9ddf"}}} -->
						<div class="wp-block-button"><a class="wp-block-button__link has-background" style="background-color:#ce9ddf">Pattern</a></div>
						<!-- /wp:button --></div>
						<!-- /wp:buttons --></div>
						<!-- /wp:column --></div>
						<!-- /wp:columns -->',
	)
);
