import { combineReducers } from 'redux';
import selectionReducer from './selection';
import articlesReducer from './articles';

export const rootReducer = combineReducers({
  selection: selectionReducer,
  blogState: articlesReducer
})
