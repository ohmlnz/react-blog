const toEditReducer = (state = [], action) => {
	switch (action.type) {
		case 'CHANGE_MODE':
			return !action.current
		default: 
			return state
	}
}

export default toEditReducer;