//TODO: delete this when api-fetch provides type definitions
//      see https://github.com/WordPress/gutenberg/pull/29993#discussion_r599066110
declare module '@wordpress/api-fetch' {
	export default function ( request: { path: string } ): Promise< any >;
}
