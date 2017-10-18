// const removeReducer = (state = [], action) => {
// 	switch (action.type) {
// 		case 'REMOVE_ARTICLE':
// 			const i = state.indexOf(action.post);
// 			return {
// 				...state
// 				...state.slice(0, i),
// 				...state.slice(i + 1, state.length)
// 			}
// 		default:	
// 			return state;
// 	}
// }

// export default removeReducer;
