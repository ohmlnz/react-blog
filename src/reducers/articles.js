const articlesReducer = (state = [], action) => {
	switch (action.type) {
		case 'REMOVE_ARTICLE':
			const i = state.articles.indexOf(action.article);
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
				articles: !action.articles.length?
				`There aren't any more articles :'(`:
				action.articles,
				total: action.total,
				lastUpdated: action.receivedAt,
				pageIndex: action.pageIndex
			}
		default:
			return state;
	}
}

export default articlesReducer;