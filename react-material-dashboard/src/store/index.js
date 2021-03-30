import { combineReducers } from 'redux';
import tarefaReducer from './tarefasReducer';

const mainReducer = combineReducers({
  tarefaReducer
});

export default mainReducer;
