import { combineReducers } from 'redux';
// import selectionReducer from './selection';
import toEditReducer from './toEdit';
import articlesReducer from './articles';

export const rootReducer = combineReducers({
  // selection: selectionReducer,
  editMode: toEditReducer,
  blogState: articlesReducer
})
