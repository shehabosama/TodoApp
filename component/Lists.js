import React from "react";
import { View , Text , StyleSheet , TouchableOpacity , FlatList } from "react-native";
import { useSelector } from "react-redux";
import gloableStyle from "../styles/gloable";

const Lists = ({ navigation })=>{

    const {lists} = useSelector(state => state.list)

   const itemClickHandler =(item)=>{
    navigation.navigate('List' , {name:item.name , id:item.id});
   }
    
return(
    <View style={styles.container}>
        {lists.length > 0 ? <FlatList
            keyExtractor={(item)=> item.id}
            contentContainerStyle={gloableStyle.listContainer}
            data={lists}
            renderItem={({item})=> <TouchableOpacity style={gloableStyle.listItem} onPress={()=> itemClickHandler(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>}
        />: <Text style={gloableStyle.noData}>No lists</Text>}
    </View>
);
};

const styles = StyleSheet.create({
    container:{
        paddingVertical:20,
        flex : 1,
    },
    itemText:{
        fontFamily:'Poppins-Light',
        fontSize:16,
        color : '#000',
    },
});
export default Lists;