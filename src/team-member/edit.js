import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL } from '@wordpress/blob';
import { Spinner, ToolbarButton, socialLinks } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import { Icon, Tooltip, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {

	const [ selectedLink, setSelectedLink ] = useState();
	
	const { name, bio, url, alt, id, socialLinks } = attributes;

	const prevURL = usePrevious( url );

	const prevIsSelected = usePrevious( isSelected );

	const titleRef = useRef();

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



	const addNewSocialItem = () => {
		setAttributes( {
			socialLinks: [ ...socialLinks, { icon: 'wordpress', link: '' } ],
		} );
		setSelectedLink( socialLinks.length );
	};

	const updateSocialItem = ( type, value) => {

		const socialLinksCopy = [ ...socialLinks ];
		socialLinksCopy[ selectedLink ][ type ] = value;
		setAttributes( { socialLinks: socialLinksCopy } );

	}

	const removeSocialItem = () => {
		setAttributes( {
			socialLinks: [
				...socialLinks.slice( 0, selectedLink ),
				...socialLinks.slice( selectedLink + 1 ),
			],
		} );
		setSelectedLink();
	};

	/* Despue de subir foto focus en titulo h4 solo cuando es nueva | No en edit o delete */

	useEffect( () => {
		if ( url && ! prevURL ) {
			titleRef.current.focus();
		}
	}, [ url, prevURL ] );


	useEffect( () => {
		if ( prevIsSelected && ! isSelected ) {
			setSelectedLink();
		}
	}, [ isSelected, prevIsSelected ] );




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
				ref = { titleRef }
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

			<div className='wp-block-blocks-course-team-member-social-links'>
				<ul>
				{ socialLinks.map( ( item, index ) => {
							return (
								<li
									key={ index }
									className={
										selectedLink === index
											? 'is-selected'
											: null
									}
								>
									<button
										aria-label={ __(
											'Edit Social Link',
											'team-members'
										) }
										onClick={ () =>
											setSelectedLink( index )
										}
									>
										<Icon icon={ item.icon } />
									</button>
								</li>
							);
						} ) }
					{ isSelected && (
							<li className="wp-block-blocks-course-team-member-add-icon-li">
								<Tooltip
									text={ __(
										'Add Social Link',
										'team-members'
									) }
								>
									<button
										aria-label={ __(
											'Add Social Link',
											'team-members'
										) }
										onClick={ addNewSocialItem }
									>
										<Icon icon="plus" />
									</button>
								</Tooltip>
							</li>
						) }
				</ul>
			</div>
				{ selectedLink !== undefined && (
					<div className="wp-block-blocks-course-team-member-link-form">
						<TextControl 
							label={ __( 'Icon', 'text-members' ) }
							value =  {socialLinks[selectedLink].icon }
							onChange={ ( icon ) => {
								updateSocialItem( 'icon', icon );
							} }
						/>
						<TextControl 
							label={ __( 'URL', 'text-members' ) }
							value =  {socialLinks[selectedLink].link }
							onChange={ ( link ) => {
								updateSocialItem( 'link', link );
							} }
						/>
						<br />
						<Button isDestructive onClick={ removeSocialItem }>
							{ __( 'Remove Link', 'text-members' ) }
						</Button>
					</div>
				) }						

		</div>

		</>
	);
}