import React, {Component,useState,useEffect} from 'react'
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import Symbol from 'react-native-vector-icons/Entypo'
import Back from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from './Utils/Colors'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import MapView from 'react-native-maps'
import {Circle, Marker,Overlay,UrlTile,Heatmap,LocalTile} from 'react-native-maps'
import {useSelector} from 'react-redux'


const LightMapScreen = ({navigation}) => {
  const location = '../Assets/Images/LocationArrow.png'

  const loc=useSelector(state=>state.location.userLocation)

  const [userRegion,setUserRegion] = useState({
                                              latitude:34.14664353206825,
                                               longitude:43.09445729479194,
                                               latitudeDelta: 85.80626703656321,
                                               longitudeDelta: 69.03408575803041})


  return (
    <AppConsumer>
      {appConsumer => (
        <View
          style={[
            styles.mainContainer,
            {backgroundColor: appConsumer.theme.colors.background},
          ]}>

          <MapView
              style={styles.map}
              // customMapStyle={Mymap}
             
              region={ 
              userRegion
              }
              zoomEnabled={true}
              // onRegionChangeComplete={(region)=>console.log(region)}
              enableZoomControl={true}>
             <Marker
                coordinate={{
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                  }}
             />
          {/* <Overlay
            image={require('../Assets/Images/sky_map.jpg')}
            bounds={[coord1,coord2]}
            opacity={1}
          /> */}

           {/* <UrlTile
                        urlTemplate={  }
                        maximumZ={ 6 }
                        zIndex={1}
                        tileSize={256}
                        shouldReplaceMapContent={true}
                        flipY={ false }
                    /> */}

   {/* <LocalTile
   pathTemplate={'../Assets/World_Atlas_2015{z}/{x}/{y}.tif'}
 
   tileSize={512}
  /> */}
            </MapView>
          <Back
            name='arrowleft' 
            size={40}
            color={appConsumer.theme.colors.FontColor}
            style={{
              backgroundColor: 'rgba(119, 119, 119, 0.8)',
              padding: 15,
              // marginTop:"3%",
              top:40,
              left:10,
              borderRadius: 40,
              width: 70,
              height: 70,
              position:'absolute',
            }}
            onPress={() => navigation.navigate('Main')}
          />


          <View style={styles.subContainer}>
            <LinearGradient
              colors={['rgba(119, 119, 119, 0.8)', 'rgba(119, 119, 119, 0.8)']}
              style={styles.SubLGcontainer}>
              <Text
                style={[
                  styles.textStyle,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Bortle Scale: 5
              </Text>
            </LinearGradient>

        

          <TouchableOpacity onPress={()=>setUserRegion(loc)}>
            <Image
           
              source={require(location)}
              style={{
                backgroundColor: 'rgba(119, 119, 119, 0.8)',
                borderRadius: 40,
                width: 65,
                height: 65,
                // position:'absolute' 
              }}
            />
            </TouchableOpacity>
            
          </View>
        </View>
      )}
    </AppConsumer>
  )
}

export default LightMapScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
  },
  subContainer: {
    flexDirection: 'row',
    height: '20%',
    // backgroundColor:'blue',
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'space-between',
    position:'absolute',
    padding:10,
    bottom:10,
  },

  SubLGcontainer: {
    width: '70%',
    height: 60,
    // alignItems:'center',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 20,
   
  },

  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.FontColor,
  },

  map:{
    flex:1,
  },
})
