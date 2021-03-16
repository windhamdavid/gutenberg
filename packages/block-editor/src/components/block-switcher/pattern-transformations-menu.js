/**
 * External dependencies
 */
import { cloneDeep } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useMemo } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { chevronRight } from '@wordpress/icons';
import {
	MenuGroup,
	MenuItem,
	Popover,
	VisuallyHidden,
	__unstableComposite as Composite,
	__unstableUseCompositeState as useCompositeState,
	__unstableCompositeItem as CompositeItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import BlockPreview from '../block-preview';

/**
 * Find a selected block match in a pattern and return it.
 * We return a reference to the block object to mutate it.
 * We have first deep cloned the pattern from state.
 *
 * @param {*} parsedBlock
 * @param {*} selectedBlockName
 * @param {*} transformedBlocks
 */
// TODO jsdoc
// TODO tests
function findMatchingBlockInPattern(
	parsedBlock,
	selectedBlockName,
	transformedBlocks
) {
	const { clientId, name, innerBlocks = [] } = parsedBlock;
	// Check if parsedBlock has been transformed already.
	// This is needed because we loop the selected blocks
	// and for example we may have selected two paragraphs and
	// the patterns could have more `paragraphs`.
	if ( transformedBlocks.has( clientId ) ) return false;
	if ( name === selectedBlockName ) {
		// We have found a matched block type, so
		// add it to the transformed blocks Set and return it.
		transformedBlocks.add( clientId );
		return parsedBlock;
	}
	// Recurse through the inner blocks of a parsed block and
	// try to find a matching block.
	for ( const innerBlock of innerBlocks ) {
		const match = findMatchingBlockInPattern(
			innerBlock,
			selectedBlockName,
			transformedBlocks
		);
		if ( match ) return match;
	}
}

function PatternTransformationsMenu( {
	blocks,
	patterns: statePatterns,
	onSelect,
	replaceMode = false,
} ) {
	const [ showTransforms, setShowTransforms ] = useState( false );
	// Replace mode is if we want to replace all contents of selected block
	// and not try to transform the selected blocks. This mode is set when a
	// single block is selected and currently is a Template Part.
	const patterns = useMemo( () => {
		let _patterns;
		if ( replaceMode ) {
			_patterns = statePatterns.map( ( statePattern ) => ( {
				...statePattern,
				// TODO check `cloneBlock` better and why was producing wrong results.
				transformedBlocks: cloneDeep( statePattern.contentBlocks ), //  statePattern.contentBlocks.map( cloneBlock ),
			} ) );
		} else {
			_patterns = statePatterns.reduce( ( accumulator, statePattern ) => {
				// Clone deep the parsed pattern's block in `transformedBlocks`
				// to mutate this prop.
				const pattern = {
					...statePattern,
					transformedBlocks: cloneDeep( statePattern.contentBlocks ),
				};
				const { transformedBlocks: patternBlocks } = pattern;
				const transformedBlocksSet = new Set();
				blocks.forEach( ( block ) => {
					// Recurse through every pattern block
					// to find matches with each selected block,
					// and transform these blocks (mutate).
					patternBlocks.forEach( ( patternBlock ) => {
						const match = findMatchingBlockInPattern(
							patternBlock,
							block.name,
							transformedBlocksSet
						);
						if ( ! match ) return;
						// Found a match so update it with the selected block's attributes.
						match.attributes = {
							...match.attributes,
							...block.attributes,
						};
						// TODO check innerBlocks handling :) - not sure yet.
						// match.innerBlocks = [
						// 	...match.innerBlocks,
						// 	...block.innerBlocks,
						// ];
					} );
				} );
				// If we haven't matched all the selected blocks, don't add
				// the pattern to the transformation list.
				if ( blocks.length !== transformedBlocksSet.size ) {
					return accumulator;
				}
				// Maybe prioritize first matches with fewer tries to find a match?
				accumulator.push( pattern );
				return accumulator;
			}, [] );
		}
		return _patterns;
	}, [ replaceMode, statePatterns ] );

	if ( ! patterns.length ) return null;
	return (
		<MenuGroup className="block-editor-block-switcher__pattern__transforms__menugroup">
			{ showTransforms && (
				<PreviewPatternsPopover
					patterns={ patterns }
					onSelect={ onSelect }
				/>
			) }
			<MenuItem
				onClick={ ( event ) => {
					event.preventDefault();
					setShowTransforms( ! showTransforms );
				} }
				icon={ chevronRight }
			>
				{ __( 'Patterns' ) }
			</MenuItem>
		</MenuGroup>
	);
}

function PreviewPatternsPopover( { patterns, onSelect } ) {
	return (
		<div className="block-editor-block-switcher__popover__preview__parent">
			<div className="block-editor-block-switcher__popover__preview__container">
				<Popover
					className="block-editor-block-switcher__preview__popover"
					position="bottom right"
					focusOnMount={ false }
				>
					<div className="block-editor-block-switcher__preview">
						<div className="block-editor-block-switcher__preview-title">
							{ __( 'Preview' ) }
						</div>
						<BlockPatternsList
							patterns={ patterns }
							onSelect={ onSelect }
						/>
					</div>
				</Popover>
			</div>
		</div>
	);
}

function BlockPatternsList( { patterns, onSelect } ) {
	const composite = useCompositeState();
	return (
		<Composite
			{ ...composite }
			role="listbox"
			className="block-editor-block-switcher__preview-patterns-container"
			aria-label={ __( 'Patterns list' ) }
		>
			{ patterns.map( ( pattern ) => (
				<BlockPattern
					key={ pattern.name }
					pattern={ pattern }
					onSelect={ onSelect }
					composite={ composite }
				/>
			) ) }
		</Composite>
	);
}

// This needs to be consolidated to probably be reused across: Patterns in Placeholder, Inserter and here.
function BlockPattern( { pattern, onSelect, composite } ) {
	const baseClassName =
		'block-editor-block-switcher__preview-patterns-container';
	// TODO check viewportWidth. From pattern? From resizeObserver to have current width
	// and manipulate later??
	const descriptionId = useInstanceId(
		BlockPattern,
		`${ baseClassName }-list__item-description`
	);
	return (
		<div
			className={ `${ baseClassName }-list__list-item` }
			aria-label={ pattern.title }
			aria-describedby={ pattern.description ? descriptionId : undefined }
		>
			<CompositeItem
				role="option"
				as="div"
				{ ...composite }
				className={ `${ baseClassName }-list__item` }
				onClick={ () => onSelect( pattern.transformedBlocks ) }
			>
				<BlockPreview
					blocks={ pattern.transformedBlocks }
					viewportWidth={ 500 }
				/>
			</CompositeItem>
			{ !! pattern.description && (
				<VisuallyHidden id={ descriptionId }>
					{ pattern.description }
				</VisuallyHidden>
			) }
		</div>
	);
}

export default PatternTransformationsMenu;
