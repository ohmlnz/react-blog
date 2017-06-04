import { RichUtils } from 'draft-js';

export const toBold = (state) => {
	return RichUtils.toggleInlineStyle(state, 'BOLD')
}

export const toItalic = (state) => {
	return RichUtils.toggleInlineStyle(state, 'ITALIC')
}

export const toUnderline = (state) => {
	return RichUtils.toggleInlineStyle(state, 'UNDERLINE')
}

export const toMonospace = (state) => {
	return RichUtils.toggleInlineStyle(state, 'CODE')
}

export const toH1 = (state) => {
	return RichUtils.toggleBlockType(state, 'header-one')
}

export const toH2 = (state) => {
	return RichUtils.toggleBlockType(state, 'header-two')
}

export const toH3 = (state) => {
	return RichUtils.toggleBlockType(state, 'header-three')
}

export const toH4 = (state) => {
	return RichUtils.toggleBlockType(state, 'header-four')
}

export const toH5 = (state) => {
	return RichUtils.toggleBlockType(state, 'header-five')
}

export const toH6 = (state) => {
	return RichUtils.toggleBlockType(state, 'header-six')
}

export const toBlockquote = (state) => {
	return RichUtils.toggleBlockType(state, 'blockquote')
}

export const toUL = (state) => {
	return RichUtils.toggleBlockType(state, 'unordered-list-item')
}

export const toOL = (state) => {
	return RichUtils.toggleBlockType(state, 'ordered-list-item')
}

export const toCodeblock = (state) => {
	return RichUtils.toggleBlockType(state, 'code-block')
}
