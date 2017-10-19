const articlesReducer = (state = [], action) => {
	switch (action.type) {
		case 'REMOVE_ARTICLE':
			const i = state.articles.indexOf(action.post);
			
			return {
				...state,
				articles: [
					...state.articles.slice(0, i),
					...state.articles.slice(i + 1, state.length)
				]
			}
		case 'RECEIVE_ARTICLES':
			return {
				...state,
				articles: action.articles,
				lastUpdated: action.receivedAt,
				pageIndex: action.pageIndex
			}
		default:
			return state;
	}
}

export default articlesReducer;