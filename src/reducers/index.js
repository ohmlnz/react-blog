import { combineReducers } from 'redux';
import toEditReducer from './toEdit';
import articlesReducer from './articles';

export const rootReducer = combineReducers({
  editor: toEditReducer,
  blogState: articlesReducer
})
