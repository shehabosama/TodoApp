import React,{useState , useEffect} from "react";
import {View , Text  , TextInput , Switch , StyleSheet , TouchableWithoutFeedback , Keyboard , ActivityIndicator, ToastAndroid , Alert}
from 'react-native';
import { useSelector , useDispatch } from "react-redux";

import { Colors } from "../constants";
import gloable from "../styles/gloable";
import CutomeButton from "../component/CustomeButton";
import {updateTask , deleteTask} from '../store/actions/taskActions';


const TaskScreen=({route , navigation})=>{
    const [name , setName] = useState('');
    const [completed , setCompleted] = useState(false);
    const [task , setTask] = useState({});
    const [loading , setLoading] = useState(true);
    const dispatch = useDispatch();
    const {tasks} = useSelector(state=>state.task);

    useEffect(()=>{
        const taskFound = tasks.find(t=> t.id === route.params.id);
        if(taskFound){
            setName(taskFound.name);
            setCompleted(taskFound.completed);
            setTask(taskFound);
            setLoading(false);
        }
    } , [tasks , route.params.id])

    const updateTaskClickHandler=()=>{
        if(task.name == name && task.completed == completed){
            return Alert.alert('Nothing changed' , 'Cannot update because nothing was changed!')
        }
        const updateTasks={
            ...task , 
            name , 
            completed,
        };
        dispatch(updateTask(updateTasks,
        ()=>{  
            navigation.goBack();
            ToastAndroid.show('Task updated!' , ToastAndroid.LONG);
        },
        ()=>{
            ToastAndroid.show('Somethig went worng. please try again!' , ToastAndroid.LONG);
         }
        
        ));
    };

    const deleteTaskClickHandler=()=>{
        Alert.alert(
            'Delete task',
            'Are you sure you want to delete this task ?',
            [{text:'Cancel'},{text:'Delete' , onPress:()=>deleteTaskHandler()}]
        );
    };
    const deleteTaskHandler=()=>{
        dispatch(deleteTask(
            task.id,
            () => {
              navigation.goBack();
              ToastAndroid.show(`Task "${task.name} deleted!"`, ToastAndroid.LONG);
            },
            () => {
              ToastAndroid.show('Something went wrong. Please try again!', ToastAndroid.LONG);
            },
          ));
    }


    if(loading){
        return <ActivityIndicator color={Colors.primary} size="large" style={gloable.loader}></ActivityIndicator>
    }
return( 
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss}>
        <View style={styles.container}>
            <TextInput value={name} onChangeText={(val)=>setName(val)} placeholder = "Task name"
             placeholderTextColor={Colors.quaternary} style={gloable.input}/>
             <View style={gloable.switchContainer}>
                 <Switch
                 value={completed}
                 onValueChange={(val)=>setCompleted(val)}
                 thumbColor = {completed ? Colors.primary : Colors.secondary}
                 trackColor = {{false : Colors.tertiary , true : Colors.quaternary}}
                 />
                 <Text style={gloable.switchText}>Complete task</Text>
             </View>
             <CutomeButton text="Update task" onPress={updateTaskClickHandler} round style={styles.spaceBottom}/>
             <CutomeButton text="Delete task" onPress={deleteTaskClickHandler} danger round style={styles.spaceBottom}/>
        </View>
    </TouchableWithoutFeedback>
);
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
    },
    spaceBottom:{
        marginBottom:30,
    },
});
export default TaskScreen;