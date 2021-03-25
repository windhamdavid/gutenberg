// This preset and related files were put in place to address what is seemingly
// a bug in @testing-library/react-native that causes erroneous act warnings.
// This may be able to be removed if the issue is addressed in the package.
// https://git.io/JYLQW

/**
 * External dependencies
 */
const reactNativePreset = require( 'react-native/jest-preset' );

module.exports = Object.assign( {}, reactNativePreset, {
	setupFiles: [ require.resolve( './save-promise.js' ) ]
		.concat( reactNativePreset.setupFiles )
		.concat( [ require.resolve( './restore-promise.js' ) ] ),
} );
