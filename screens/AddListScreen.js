import React, { useState } from 'react';
import {View ,TouchableWithoutFeedback , StyleSheet , TextInput , Keyboard , Alert , ToastAndroid , Text} from  'react-native';
import { useDispatch , useSelector } from 'react-redux';
import CustomeButton from '../component/CustomeButton';
import { Colors } from '../constants';
import gloableStyles from '../styles/gloable';
import {createList}from '../store/actions/listActions';
const AddListScreen = ({navigation}) =>{
    const [name , setName] = useState('');
    const dispatch = useDispatch();
    const {lists } = useSelector(state=> state.list);
    const submitHandler =()=>{
        if(name.trim()=== ''){
            return Alert.alert('validation' ,'Name is required');
        }
        const alreadyExist = lists.find(l=>l.name.toLowerCase() === name.trim().toLowerCase());
        if(alreadyExist){
            return Alert.alert( 'Validation' , 'List With this name already exist!' );
        }
        dispatch(createList(name , ()=>{
            ToastAndroid.show(`List "${name}" created!` , ToastAndroid.LONG);
            Keyboard.dismiss();
            navigation.navigate('Home'); 
            
        } , 
        ()=>{ToastAndroid.show('Somthing went wrong , please try again!' , ToastAndroid.LONG)}
        ));
    }
    return(
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <TextInput style={gloableStyles.input} value={name} onChangeText={(val)=>setName(val)}
                placeholder="List Name" placeholderTextColor={Colors.tertiary}/>
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
export default AddListScreen;