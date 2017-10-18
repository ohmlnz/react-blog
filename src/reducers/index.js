import { combineReducers } from 'redux';
// import removeReducer from './remove';
import selectionReducer from './selection';
import articlesReducer from './articles';

export const rootReducer = combineReducers({
  // remove: removeReducer,
  selection: selectionReducer,
  blogState: articlesReducer
})
