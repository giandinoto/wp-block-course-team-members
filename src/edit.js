import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton, DropdownMenu } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {

	const { text, alignment } = attributes;
	
	const onChangeAlignment = newAlignment => {
		setAttributes ( { alignment: newAlignment } )	
	}
	const onChangeText = newText => {
		setAttributes ( { text: newText } )	
	}

	return (
		<>
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

			<RichText  
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
				} ) }
				onChange={ onChangeText }
				value = { text }
				placeholder={ __("Placeholder", "text-block")}
				tagName="h4"
				allowedFormats={[ ] }
				style={ { textAlign: alignment} } 
			/>
		</>
	);
}
