import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL } from '@wordpress/blob';
import { Spinner, ToolbarButton } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { name, bio, url, alt, id } = attributes;
	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	};
	const onChangeBio = ( newBio ) => {
		setAttributes( { bio: newBio } );
	};
	const onSelectImage = ( image ) => {
		if ( ! image || ! image.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
			return;
		}
		setAttributes( { url: image.url, id: image.id, alt: image.alt } );
	};

	const removeImage = ( image ) => {
		setAttributes( { url: undefined, id: undefined, alt: '' } );
	}

	return (

		<>
		{ url && (
		<BlockControls group="inline">
			<MediaReplaceFlow
				name = { __("Replace image", "team-members") }
				onSelect={ onSelectImage }
				onSelectURL={ ( val ) => console.log( val ) }
				onError={ ( err ) => console.log( err ) }
				accept="image/*"
				allowedTypes={ [ 'image' ] }
				mediaId = { id }
				mediaURL = { url }
			/>

			<ToolbarButton onClick={ removeImage }>
				{ __( "Remove image" ,  "team-members" ) }
			</ToolbarButton> 

		</BlockControls>
		) }
		<div { ...useBlockProps() }>
			{ url && (
				<div
					className={ `wp-block-blocks-course-team-member-img${
						isBlobURL( url ) ? ' is-loading' : ''
					}` }
				>
					<img src={ url } alt={ alt } />
					{ isBlobURL( url ) && <Spinner /> }
				</div>
			) }
			<MediaPlaceholder
				icon="admin-users"
				onSelect={ onSelectImage }
				onSelectURL={ ( val ) => console.log( val ) }
				onError={ ( err ) => console.log( err ) }
				accept="image/*"
				allowedTypes={ [ 'image' ] }
				disableMediaButtons={ url }
			/>
			<RichText
				placeholder={ __( 'Member Name', 'team-member' ) }
				tagName="h4"
				onChange={ onChangeName }
				value={ name }
				allowedFormats={ [] }
			/>
			<RichText
				placeholder={ __( 'Member Bio', 'team-member' ) }
				tagName="p"
				onChange={ onChangeBio }
				value={ bio }
				allowedFormats={ [] }
			/>
		</div>

		</>
	);
}