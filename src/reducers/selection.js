const selectionReducer = (state = [], action) => {
	switch (action.type) {
		case 'SELECTED_PAGE':
			return action.pageIndex
		default: 
			return state
	}
}

export default selectionReducer;
