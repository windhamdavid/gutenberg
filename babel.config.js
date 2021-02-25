console.log( '=====================> BC 1' );
module.exports = ( api ) => {
	api.cache( true );

	return {
		presets: [ '@wordpress/babel-preset-default' ],
		plugins: [ 'babel-plugin-emotion', 'babel-plugin-inline-json-import' ],
		babelrcRoots: [ 'packages/*' ],
	};
};
