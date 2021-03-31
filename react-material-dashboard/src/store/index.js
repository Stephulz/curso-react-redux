import { combineReducers } from 'redux';
import tarefaReducer from './tarefasReducer';
import dialogReducer from './dialogReducer';

const mainReducer = combineReducers({
  tarefaReducer,
  dialogReducer
});

export default mainReducer;
