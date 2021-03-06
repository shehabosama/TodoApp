import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants";
import gloable from "../styles/gloable";
const Tasks = ({navigation , listId}) => {

    const { tasks } = useSelector(state => state.task);
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const [data, setData] = useState([]);
  
    useEffect(() => {
        if (tasks) {
          const copyTasks = [...tasks];
         
          const filteredTasks = copyTasks.filter(t => t.listId === listId);
          setData(filteredTasks);
          setTasksLoaded(true);
        }
      }, [tasks, listId]);

    const taskClickHandler = (item) => {
      navigation.navigate('Task', { id: item.id });
    };


    return (
        
        <View style={styles.container}>
        {data.length > 0 ? <FlatList
          data={data}
          contentContainerStyle={gloable.listContainer}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <TouchableOpacity 
          onPress={() => taskClickHandler(item)} style={!item.completed ? gloable.listItem : {...gloable.listItem, ...styles.itemCompleted}}>
            <View style={styles.textWrapper}>
              <Text style={styles.itemText}>{item.name}</Text>
              {item.completed && <Icon name="checkmark-circle-outline" size={30} color={Colors.primary} />}
            </View>
          </TouchableOpacity>}
        />
          : tasksLoaded ? <Text style={gloable.noData}>No tasks in this list</Text> : null
        }
      </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    itemCompleted:{
        backgroundColor:Colors.secondary,
    },
    textWrapper:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between'
    },
    itemText:{
        fontSize:14,
        fontFamily:'Poppins-Regular',
        flex:1,
        paddingRight:10
    },
});
export default Tasks;