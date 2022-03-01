import { createStore , applyMiddleware , combineReducers } from "redux";
import thunk from "redux-thunk";
import listReducer from './reducers/listReducer';
import tasksReducer from "./reducers/taskReducer";

const rootReducer = combineReducers({
    list : listReducer,
    task : tasksReducer
});

const store = createStore(rootReducer , applyMiddleware(thunk));
export default store;