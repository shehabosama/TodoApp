import React , {useState , useEffect} from "react";
import {View , Text , StyleSheet, ActivityIndicator} from 'react-native';
import { useDispatch } from "react-redux";
import gloable from "../styles/gloable";
import { Colors } from "../constants";
import CustomeButton from "../component/CustomeButton";
import Tasks from "../component/Tasks";
import { getTasks } from "../store/actions/taskActions";
import { setActiveListId } from "../store/actions/listActions";
const ListScreen=({navigation, route})=>{

    const [loading , setLoading] = useState(true);
    const {id} = route.params;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setActiveListId(id));

    },[dispatch,id]);

    
    useEffect(()=>{
        dispatch(getTasks(()=>setLoading(false)));

    },[dispatch]);

    if(loading){
        return <ActivityIndicator color={Colors.primary} size="large" style={ gloable.loader}/>
    }


    return(
        <View style={styles.container}>
            <Tasks navigation={navigation} listId={id}/>
            <CustomeButton text ="Add new Task" icon="add" iconColor="#fff" onPress={()=>navigation.navigate('NewTask') }/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1, 
        paddingTop:20,
    },
});

export default ListScreen;