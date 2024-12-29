import React, {Component, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import MapView from 'react-native-maps'
import {Marker} from 'react-native-maps'
import Geocoder from 'react-native-geocoding'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

const MapsScreen = ({navigation}) => {
  const onLocationSelect = (event: MapEvent) => {
    console.log(event.nativeEvent.coordinate)
  }

  const [region, setRegion] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.0,
    longitudeDelta: 0.0,
  })
  const [address,setAddress]=useState('')

  const regionChange = region => {
    // console.log(region.latitude)
    // console.log(region.longitude)
    // console.log(region.latitudeDelta)
    // console.log(region.longitudeDelta)

    setRegion(region)


    // Geocoder.init("AIzaSyCFfNiPRb99BdxyN7TDEsBNbVtZEJ8BN0w")
    //  Geocoder.from(region.latitude, region.longitude)
    // 	.then(json => {
    // 	var addressComponent = json.results[0].address_components[0];
    // 		console.log(addressComponent);
    // 	})
    // 	.catch(error => console.warn(error));

  }

  return (
    <AppConsumer>
      {appConsumer => (
        <View style={styles.container}>
          
         

          {region.latitude ? (
            <MapView
              style={styles.map}
              // initialRegion={{
              //   latitude: 37.78825,
              //   longitude: -122.4324,
              //   latitudeDelta: 0.0922,
              //   longitudeDelta: 0.0421,
              // }}

              onRegionChangeComplete={region => regionChange(region)}
              region={region}
              onPress={onLocationSelect}>
              <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
              />

              {/* <Image source={require('../Assets/Images/map-marker.png')} style={{height:20,width:20,position:'absolute'}}/> */}
            </MapView>
          ) : null}

           <View style={{position:'absolute',width:'100%',height:'auto',top:10}}>
          <GooglePlacesAutocomplete
            style={{flex: 1}}
            placeholder='Search'
            fetchDetails={true}
            returnKeyType={'search'}
            autoFocus={true}
            minLength={2}
            textInputProps={{placeholderTextColor:'#777777'}}
           
            onPress={(data, details = null) => {
              
              // console.log( details.geometry);
              // console.log('search latitude-',details.geometry.location.lng)
              // console.log('search longitude-',details.geometry.location.lat)
              setRegion({
                ...region,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                longitudeDelta: 0.0421,
                latitudeDelta: 0.0922,
              })
               
            //  setAddress(getAddressText)
            //   console.log(address)

            }}
            query={{
              key: 'AIzaSyAMWIU5X-z8UTp01cqpt9EVBlnQu3O-fyk',
              language: 'en',
            }}
          />
          </View>

          {region.latitude ? (
            <View
              style={{
                alignItems: 'center',
                position: 'absolute',
                bottom: 2,
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  bottom:10,
                  borderRadius: 20,
                  height: 50,
                  width: '90%',
                  backgroundColor: appConsumer.theme.colors.ButtonBackground,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('UploadImage', {mapRegion:region})}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: appConsumer.theme.colors.FontColor,
                  }}>
                  {' '}
                  SET LOCATION
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
    </AppConsumer>
  )
}

export default MapsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 3,
    //  position:'absolute',
    //  alignItems:'center',
    //  justifyContent:'center',
  },
})
