import React, {Component, useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  PermissionsAndroid,
  Platform,
  Modal,
  Touchable,
} from 'react-native'

import Back from 'react-native-vector-icons/AntDesign'
import Symbol from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from './Utils/Colors'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {useSelector} from 'react-redux'
import MapView from 'react-native-maps'
import {PROVIDER_GOOGLE,Marker, Callout,Circle} from 'react-native-maps'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Loader from '../Assets/Components/Loader'


import Geolocation from 'react-native-geolocation-service'

const CommunityMapScreen = ({navigation, route}) => {
  const Token = useSelector(state => state.general.userToken)

  const [communities, setCommunities] = useState([])
  const [showMark, setShowMark] = useState(false)
  const Mymap = require('./MapStyles/mapStyle.json')
  const [showName, setShowName] = useState('')

  const [initialRegion, setinitialRegion] = useState()
  const [userRegion, setUserRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    mark: false,
  })
  const [loader, setLoader] = useState(false)
  const [currentLocation,setCurrentLocation]= useState(userRegion)

  const [photographer, setPhotographer] = useState('')
  const [modalVisible,setModalVisible] = useState(false)
  const [fullImage,setFullImage]= useState('')

  useEffect(() => {
    setLoader(true)
    getCommunity()
    viewFromLatest(route.params.param)
    //  console.log('map PArams--',route.params.param)
  }, [])

  const viewImage =(address) => {
    setFullImage(address)
    setModalVisible(true)
  }

  const viewProfilePress = () => {
    if (photographer != '') {
      navigation.navigate('Image Profile', {
        paramPhotographerData: photographer,
      })
    } else {
      alert('No User Selected')
    }
  }

  const getUserLocation = () => {
    setPhotographer('')
    Geolocation.getCurrentPosition(info => {
      // console.log(info.coords)

      setUserRegion({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        mark: true,
      })
      setCurrentLocation({

        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        mark: true,

      })


    })
    // console.log('mark--', userRegion.mark)
  }

  const viewFromLatest = loc => {
    if (loc != 'Community') {
      setUserRegion({
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    } else {
      setUserRegion({
        // latitude: 31.5204,
        // longitude:  74.3587,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
        latitude: 0,
        longitude: 0,
        latitudeDelta: 150,
        longitudeDelta: 150,
      })
    }
  }

  const getCommunity = async () => {
    fetch('https://badralsayed.site/Nox_Sky/public/api/get_community', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + Token,
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(
          'responseGet_Community-Status-->',
          '-' + JSON.stringify(response.status),
        )

        if (response.status == 200) {
          setCommunities(response.data)
          // console.log('STATE-DATA-',communities)
          setLoader(false)
        }
      })

      .catch(error => {
        setLoader(false)
        console.log('Error:', error)
      })
    // console.log('id-',id)
  }

  const location = '../Assets/Images/LocationArrow.png'

  return (
    <AppConsumer>
      {appConsumer => (
        <View
          style={[
            styles.mainContainer,
            {backgroundColor: appConsumer.theme.colors.background},
          ]}>

            <Modal
            animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>

          <View style={{backgroundColor:'black',flex:1,alignItems:'center'}}>

        <View style={{width:'100%',alignItems:'flex-end',padding:10 }}>
          <TouchableOpacity style={{top:0}}onPress={()=>setModalVisible(false)}>
          <Symbol name='cross' size={30} color='#FFFF'/>
          </TouchableOpacity>
          </View>
            <Image
            source={{uri: fullImage}}
            style={{height:350,width:350,marginTop:'40%',borderRadius:20}}
            resizeMode='cover'
            />

          </View>
            </Modal>
          <MapView
            style={styles.map}
            // initialRegion={{latitude:0,longitude:0,latitudeDelta:30,longitude:delta:30}}
          provider={PROVIDER_GOOGLE}
            customMapStyle={Mymap}
            onRegionChangeComplete={region => setUserRegion(region)}
            region={userRegion}
            zoomEnabled={true}
            enableZoomControl={true}>
            {communities.map((val, index) => {
              return (
                <Marker
                  coordinate={{
                    latitude: val.latitude,
                    longitude: val.longitude,
                  }}
                  key={index}
                  // title = {val.user_name}
                  // description={}
                  image={require('../Assets/Images/newStar.png')}
                  onPress={() => {
                    setPhotographer(val)
                    // console.log(val)
                  }}>
                  <Callout
                  onPress={()=>viewImage(val.image)} 
                    tooltip={true}
                    style={
                      {
                        // minHeight:160,
                        // minWidth:160,
                      }
                    }>
                    <View 
                      style={{
                        height: 140,
                        width: 140,
                        backgroundColor: 'rgba(67,67,67, 0.7)',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderRadius: 20,
                      }}>
                      <Text>
                       
                        <Image
                          source={{uri: val.image}}
                          style={{
                            height: 110,
                            width: 135,
                            backgroundColor: 'red',
                            borderRadius: 20,
                          }}
                          resizeMode={'cover'}
                        />
                      
                      </Text>

                      {/* <Button title="click" onPress={console.log(index)}/> */}
                    </View>
                  </Callout>
                </Marker>
              )
            })}

            {/* {userRegion.mark && ( */}
              {/* <Marker
                coordinate={{
                  latitude: userRegion.latitude,
                  longitude: userRegion.longitude,
                }}
              /> */}
              {currentLocation.mark ? 
                <Circle
                center={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                radius={100}
                fillColor={'rgb(82,125,191)'}
                strokeWidth={30}
                strokeColor={'rgba(82,125,191,0.3)'}
              />    
              :null}
            
          </MapView>
          <Back
            name='arrowleft'
            size={40}
            color={appConsumer.theme.colors.FontColor}
            style={{
              backgroundColor: 'rgba(67,67,67, 0.7)',
              padding: 15,
              borderRadius: 40,
              width: 70,
              height: 70,
              position: 'absolute',
              top: 40,
              left: 10,
            }}
            onPress={() => navigation.goBack()}
          />

          <View
            style={{
              alignItems: 'flex-end',
              height: '30%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 20,
              left: 20,
            }}>
            <View
              style={{
                padding: 10,
                backgroundColor: 'rgba(67,67,67,0.7)',

                borderRadius: 20,
                height: 100,
                width: '70%',
                alignItems: 'flex-start',
                justifyContent: 'space-around',
                marginTop: '10%',
              }}>
              <Text
                style={{
                  color: appConsumer.theme.colors.FontColor,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Photographer: {photographer.user_name}
              </Text>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => viewProfilePress()}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#83aae5',
                      textDecorationLine: 'underline',
                    }}>
                    View Profile
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Chat', {
                      chatParam: photographer,
                    })
                  }>
                  <Symbol
                    name={'chat'}
                    size={30}
                    color={appConsumer.theme.colors.FontColor}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{justifyContent: 'space-between', height: 180}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('UploadImage')}>
                <Symbol
                  name={'plus'}
                  size={50}
                  color={appConsumer.theme.colors.FontColor}
                  style={{
                    backgroundColor: 'rgba(67,67,67,0.7)',
                    padding: 10,
                    borderRadius: 40,
                    width: 70,
                    height: 70,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={getUserLocation}>
                <Image
                  source={require(location)}
                  resizeMode='cover'
                  style={{
                    backgroundColor: 'rgba(67,67,67,0.7)',
                    // backgroundColor:'red',
                    borderRadius: 40,
                    width: 70,
                    height: 70,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Loader loading={loader} isShowIndicator={true} size={'large'} />
        </View>
      )}
    </AppConsumer>
  )
}

export default CommunityMapScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  LGCcontainer: {
    height: 80,
    width: 200,
    borderRadius: 20,
  },

  map: {
    flex: 1,
  },
})
