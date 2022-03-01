import {SET_TASKS } from '../types';
const initialState = {
    tasks:[],
};

const tasksReducer = (state = initialState , action)=>{
    switch(action.type){
        case SET_TASKS:
            return{
                tasks:action.payload,
            };
            default:
                return state;
    }
};
export default tasksReducer;