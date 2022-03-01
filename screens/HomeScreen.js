import { useEffect , useState } from 'react';
import React from 'react';
import {View ,StyleSheet, ActivityIndicator} from  'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from '../constants';
import {getLists} from '../store/actions/listActions';
import gloable from '../styles/gloable';
import Lists from '../component/Lists';
import CutomeButton from '../component/CustomeButton';
const HomeScreen = ({navigation}) =>{

    const [loading , setLoading] = useState(true);
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getLists(()=> setLoading(false)));

    },[dispatch]);

    if(loading)
    {
        return <ActivityIndicator color={Colors.primary} size="large" style={gloable.loader}/>
    }

    return(
        <View style={styleSheet.container}>
           <Lists navigation={navigation}/>
           <CutomeButton text="Add new list" icon="add" iconColor="#fff" onPress={()=>navigation.navigate('NewList')} round/>
        </View>
    );
};

const styleSheet = StyleSheet.create({
    container:{
        flex:1,
    },
});
export default HomeScreen;