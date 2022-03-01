import React, { useState } from 'react';
import {View ,TouchableWithoutFeedback , StyleSheet , TextInput , Keyboard , Alert , ToastAndroid , Text} from  'react-native';
import { useDispatch , useSelector } from 'react-redux';
import CustomeButton from '../component/CustomeButton';
import { Colors } from '../constants';
import gloableStyles from '../styles/gloable';
import {createTask}from '../store/actions/taskActions';

const AddTaskScreen = ({navigation}) =>{
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state.task);
    const { activeListId } = useSelector(state => state.list);
  
    const submitHandler = () => {
        if (name.trim() === '') {
          return Alert.alert('Validation', 'Name is required!');
        }
        const alreadyExist = tasks.find(t => t.name.toLowerCase() === name.trim().toLowerCase() && t.listId === activeListId);
        if (alreadyExist) {
          return Alert.alert('Validation', 'Task with this name already exist in this list!');
        }
    
        dispatch(createTask(
            name,
            activeListId,
            () => {
              ToastAndroid.show(`Task "${name}" created!`, ToastAndroid.LONG);
              Keyboard.dismiss();
              navigation.goBack();
            },
            () => { ToastAndroid.show('Something went wrong, please try again!', ToastAndroid.LONG); },
          ));
        };
        
    return(
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <TextInput style={gloableStyles.input} value={name} onChangeText={(val)=>setName(val)}
                placeholder="Task Name" placeholderTextColor={Colors.tertiary}/>
                <CustomeButton text="Submit" onPress={submitHandler} round/>
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        paddingTop:50 , 
        backgroundColor:'#fff',
        flex:1,
    },

});
export default AddTaskScreen;