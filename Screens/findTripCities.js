import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, FlatList,TextInput,TouchableOpacity } from 'react-native'
import Cities from '../JsonDataFiles/citiesData.json'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {useDispatch,useSelector} from 'react-redux'
import {setCity} from '../redux/actions'

const findTripCities = ({navigation}) => {

    const val = useSelector(state=> state.tripCity)

    var filter = require('lodash.filter');
    const dispatch = useDispatch()

    const [filterCities,setFilterCities] = useState(Cities)

    const filterData=(text)=>{

        const filteredData= Cities.filter(
            function(item) {
              // Applying filter for the inserted text in search bar
              const itemData = item.city
              const textData = text.charAt(0).toUpperCase() + text.slice(1)
              const spaceindex=textData.indexOf(' ')
            
                // console.log(spaceindex)
             

             if(spaceindex>0){
                const finalString = (textData.substring(0,spaceindex) )+' '+ textData.charAt((spaceindex+1)).toUpperCase() + textData.slice((spaceindex+2))
                // console.log('FINAL=>>',finalString)
                return itemData.indexOf(finalString) > -1 ;
                
             }

             else{
                return itemData.indexOf(textData) > -1;
             }

           }
          );
          
            setFilterCities(filteredData)
            // console.log(filteredData)
          
      

    }

    const setCityFunc = (text) => {
        console.log("filterCityVal=>>",text)
         dispatch(setCity(text))
        //  console.log('REDUX CIty Val=>>',val)
       
        navigation.goBack()
    }


    return (
        <AppConsumer>{appConsumer=>(
        <View style={styles.container}>

            <View style={{alignItems:'center'}}>
            <TextInput
            style={{backgroundColor:'#FFFF',color:'black',width:'95%',borderRadius:20}}
            onChangeText={(text)=>filterData(text)}
            placeholder="Search City.."
            />
            </View>
           <FlatList 
           data={filterCities}
           renderItem={({item})=>(

               <TouchableOpacity style={{width:'100%'}} onPress={()=>setCityFunc(item.city)}>
               <View style={{flexDirection:'row',padding:10,height:50,JustifyContent:'space-around',alignItems:'center',borderBottomWidth:1,borderColor:appConsumer.theme.colors.FontColor,width:'100%'}}>
                  
                   <View style={{flex:1}}>
                   <Text style={{fontSize:20,color:appConsumer.theme.colors.FontColor}}>{item.city}</Text>
                   </View>
                   <View style={{flex:1}}>
                   <Text style={{fontSize:20,color:appConsumer.theme.colors.FontColor}}>{item.country}</Text>
                   </View>
               </View>
               </TouchableOpacity>
           )}
           />
        </View>
        )}</AppConsumer>
    )
}

export default findTripCities

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#282828',
        padding:10,
    },
})
