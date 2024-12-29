import React, {Component, useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Back from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from './Utils/Colors'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {deleteCommunityAPI} from '../API/Methods/userApi'

const LatestOtherUserScreen = ({navigation, route}) => {
  // const image = {uri: 'https://reactjs.org/logo-og.png'}

  const image = {uri: route.params.paramKey.image}
  const [communityData,setCommunityData]=useState('')
  

  useEffect(() => {
    //  setCommunityData(route.params.paramKey)
    // console.log(route.params.paramKey)
    // data=route.params.paramkey
    // console.log(data.id)
  }, [])


  const onDeleteCommunityPress = async (val)=>{

    // const data=route.params.paramkey.id
    console.log(val.id)
    
    try {
       const formData =  new FormData()

     formData.append('comunity_id',val.id)
     const response = await deleteCommunityAPI(formData)

     console.log('delAPI-status',response.status)
     
     if(response.status===200){
     alert('deletion successful')
     navigation.navigate('Main')
     }
      
    } catch (error) {
      console.log('delAPI-error',error)
      
    }
   
  }

  const gotoCommunityMap=(imageData) =>{
      navigation.navigate('CommunityMap',{param:imageData})
  }


  return (
    <AppConsumer>
      {appConsumer => (
        <View
          style={[
            styles.mainContainer,
            {backgroundColor: appConsumer.theme.colors.background},
          ]}>
          <Back
            name='arrowleft'
            size={40}
            color={appConsumer.theme.colors.FontColor}
            style={{
              backgroundColor: '#303030',
              padding: 15,
              // marginTop:"3%",

              borderRadius: 40,
              width: 70,
              height: 70,
            }}
            onPress={() => navigation.goBack()}
          />
          <View style={{alignItems: 'center', marginTop: '20%'}}>
            <Image
              source={image}
              resizeMode='cover'
              style={styles.imageStyle}
            />
          </View>

          <View
            style={{
            //   marginTop: '5%',
              justifyContent: 'space-evenly',
              height: 150,
              width: '85%',
              marginLeft: '8%',
            }}>
            <TouchableOpacity onPress={()=>gotoCommunityMap(route.params.paramKey)}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#83aae5',
                  textDecorationLine: 'underline',
                }}>
                View on Map
              </Text>
            </TouchableOpacity>

             {/* <TouchableOpacity onPress={()=>onDeleteCommunityPress(route.params.paramKey)}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#191919', '#282828', '#393939']}
              style={styles.LGbtn}>
             
                <Text
                  style={{color: '#9d4d49', fontSize: 25, fontWeight: 'bold'}}>
                  Delete
                </Text>
             
            </LinearGradient>
             </TouchableOpacity> */}
          </View>
        </View>
      )}
    </AppConsumer>
  )
}

export default LatestOtherUserScreen

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.background,
    height: '100%',
  },

  imageStyle: {
    height: 300,
    width: 300,
    borderRadius: 20,
  },
  LGbtn: {
    width: '105%',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
