import { RichUtils } from 'draft-js';

export const toInline = (state, style) => {
	return RichUtils.toggleInlineStyle(state, style)
}

export const toBlock = (state, style) => {
	return RichUtils.toggleBlockType(state, style)
}

export const toMedia = (url, state, imagePlugin) => {
	return imagePlugin.addImage(state, url)
}