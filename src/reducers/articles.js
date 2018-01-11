const articlesReducer = (state = [], action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				user: action.user.displayName,
				userAva: action.user.photoURL,
				userProfile: action.result.additionalUserInfo.profile.html_url,
				addArticle: 'block',
				editMode: true
			}
		case 'LOGOUT_SUCCESS':
			return {
				...state,
				user: '',
				userAva: '',
				userProfile: '',
				addArticle: '',
				editMode: false
			}
		case 'REMOVE_ARTICLE':
			const i = state.articles.indexOf(action.article);
 			return {
				...state,
				articles: [
					...state.articles.slice(0, i),
					...state.articles.slice(i + 1, state.length)
				]
			}
		case 'EDIT_ARTICLE':
			return {
				...state,
				content: {
					body: action.article.content,
					id: action.article.id,
					lastEdit: ''
				}
			}
		case 'SAVE_EDITS':
			return {
				...state,
				content: {
					...state,
					lastEdit: action.timestamp
				}
			}
		case 'RECEIVE_ARTICLES':
			const nothing = action.total !== 0? `There aren't any more articles :'(` : `There aren't any articles :'(`
			return {
				...state,
				articles: !action.articles.length? `${nothing}` : action.articles,
				total: action.total,
				lastId: action.lastId,
				receivedAt: action.receivedAt,
				pageIndex: action.pageIndex,
				animation: true
			}
		default:
			return state;
	}
}

export default articlesReducer;
