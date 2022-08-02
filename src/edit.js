import { __ } from '@wordpress/i18n';
import { 	useBlockProps,
			RichText,
			BlockControls,
			InspectorControls,
			AlignmentToolbar,
			PanelColorSettings 
		} from '@wordpress/block-editor';

import { 	ToolbarGroup,ToolbarButton,
			DropdownMenu,
			PanelBody,
			TextControl,
			TextareaControl,
			ToggleControl,
			ColorPicker, 
			ColorPalette
		} from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {

	const { text, alignment, backgroundColor, textColor } = attributes;
	
	const onChangeAlignment = newAlignment => {
		setAttributes ( { alignment: newAlignment } )	
	}
	const onChangeText = newText => {
		setAttributes ( { text: newText } )	
	}

	const onBackgroundColorChange = ( newBgColor ) => {
		setAttributes( { backgroundColor: newBgColor } );
		//console.log(newBgColor);
	};
	const onTextColorChange = ( newTextColor ) => {
		setAttributes( { textColor: newTextColor } );
	};

	return (
		<>

{ /*
			 <InspectorControls>
				
	
			 <PanelBody
					title = { __("Color settings", "text-box") }
					icon = "admin-appearance"
					>

					<ColorPalette
							colors={ [
								{ name: 'red', color: '#F00' },
								{ name: 'black', color: '#000' },
							] }
							value = { backgroundColor }
							onChange={ onBackgroundColorChange }
					/>	
					
					<TextControl
						label="Input vaulue"
						value= { text } 
						onChange= { onChangeText }  
						help="Help"
					/>

					<TextareaControl 
						label="Text area label"
						value= { text } 
						onChange= { onChangeText }   
						help="Help"
					/>
					
					<ToggleControl 
						label="Toggle control"
						onChange = { ( v ) => console.log( v ) }
					/>

					<ColorPicker
						onChangeComplete={ ( v ) => console.log ( v )}>
					</ColorPicker>
				
						</PanelBody>

			</InspectorControls> */}
			
			{ /*
			
			<BlockControls>
				<AlignmentToolbar 
					value= { alignment }
					onChange = { onChangeAlignment }
				/>
			</BlockControls>

			<BlockControls group="inline">
				<p>Inline</p>
			</BlockControls>

			<BlockControls group="block">
				<p>Block controls</p>
			</BlockControls>

			*/}
			
			<BlockControls 
				controls={[{
				title: "Button 1",
				icon: "admin-generic",
				isActive: true,
				onClick: () => console.log("Botton 1 click")
			}]} >
				<ToolbarGroup>
					<p><b>Title</b></p>	
					<ToolbarButton 
						title = "Align left"
						icon="editor-alignleft"
						onclick =  { () => console.log("align left") } 
						
					/>

					<ToolbarButton 
						title = "Align center"
						icon="editor-aligncenter"
						onclick =  { () => console.log("align center") } 
					/>

					<ToolbarButton 
						title = "Align Right"
						icon="editor-alignright"
						onclick =  { () => console.log("align Right") } 
					/>

					<DropdownMenu
						icon="arrow-down-alt2"
						label = { __( "More alignments", "text-box")}
						controls = { [
							{
								title: __( "wide", "text-box"),
								icon: "align-wide",
								onClick: () => console.log("Wide")
							},
							{
								title: __( "Full", "text-box"),
								icon: "align-full-wide",
								onClick: () => console.log("Full")
							}		
						] }
					/>
				</ToolbarGroup>
			
			</BlockControls>


			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'text-box' ) }
					icon="admin-appearance"
					initialOpen
					disableCustomColors={ false }
					colorSettings={ [
						{
							value: backgroundColor,
							onChange: onBackgroundColorChange,
							label: __( 'Background Color', 'text-box' ),
						},
						{
							value: textColor,
							onChange: onTextColorChange,
							label: __( 'Text Color', 'text-box' ),
						},
					] }
				>
					
				</PanelColorSettings>
			</InspectorControls>

			<RichText
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
					style: {
						backgroundColor,
						color: textColor,
					},
				} ) }
				onChange={ onChangeText }
				value={ text }
				placeholder={ __( 'Your Text', 'text-box' ) }
				tagName="h4"
				allowedFormats={ [] }
			/>
		</>
	);
}
