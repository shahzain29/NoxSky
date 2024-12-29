import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native'
import { Colors } from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import { AppContextProvider, AppConsumer } from './Context/Appcontext'
import { useSelector } from 'react-redux'
import MapView from 'react-native-maps'
import { Circle, PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Loader from '../Assets/Components/Loader'

const AuroraScreen = ({ navigation }) => {

  const location = useSelector(state => state.location.userLocation)
  const Mymap = require('./MapStyles/auroraMapStyle.json')

  const [auroraChance, setAuroraChance] = useState('')
  const [auroraImage, setAuroraImage] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    getAuroraPress()
  }, [])

  const getAuroraPress = () => {
    fetch(
      'http://api.auroras.live/v1/?type=all&lat=' +
      location.latitude +
      '&long=' +
      location.longitude +
      '&forecast=false&threeday=false&ace=false&weather=false&images=true',

      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          // Authorization: 'Bearer ' + Token,
        },
      },
    )
      .then(response => response.json())
      .then(response => {
        setAuroraChance(response.probability.calculated)
        setLoader(false)
      })
      .catch(error => {
        setLoader(false)
        console.log('AuroraAPI:', error)
      })
  }

  const image = { uri: 'https://reactjs.org/logo-og.png' }

  return (
    <AppConsumer>
      {appConsumer => (
        <ScrollView
          style={[
            styles.MainContainer,
            { backgroundColor: appConsumer.theme.colors.background },
          ]}>
          <Back
            name='arrowleft'
            size={40}
            color={appConsumer.theme.colors.FontColor}
            style={{
              backgroundColor: '#303030',
              padding: 15,
              borderRadius: 40,
              width: 70,
              height: 70,
            }}
            onPress={() => navigation.navigate('Main')}
          />

          <Text
            style={[
              styles.HeadingStyle,
              { color: appConsumer.theme.colors.FontColor },
            ]}>
            Aurora
          </Text>

          <LinearGradient
            colors={['#819a83', '#629469']}
            style={styles.LGCcontainer}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontSize: 18,
                  color: appConsumer.theme.colors.FontColor,
                  fontWeight: 'bold',
                }}>
                Chance of seeing Aurora at{'\n'}your Location
              </Text>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 55,
                  width: 70,
                  borderRadius: 20,
                  backgroundColor: '#96b19f',
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    color: auroraChance.colour,
                    fontWeight: 'bold',
                  }}>
                  %{auroraChance.value}
                </Text>
              </View>
            </View>
          </LinearGradient>

          <Text
            style={[
              styles.SubHeadingStyle,
              { color: appConsumer.theme.colors.FontColor },
            ]}>
            Aurora Map
          </Text>

          <View style={styles.auroramap}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              customMapStyle={Mymap}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 2,
                longitudeDelta: 0.1421,
              }}
              zoomEnabled={true}
              enableZoomControl={true}>
              <Circle
                center={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                radius={15000}
                fillColor={'rgb(82,125,191)'}
                strokeWidth={35}
                strokeColor={'rgba(82,125,191,0.3)'}
              />
            </MapView>

            <View
              style={{
                position: 'absolute',
                bottom: 25,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
              }}>
              <Text
                style={[
                  styles.auroraMapText,
                  { color: appConsumer.theme.colors.FontColor },
                ]}>
                0%
              </Text>

              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#4fa248', '#738849', '#8e764b', '#a8644b', '#e3515a']}
                style={{
                  width: '60%',
                  height: 10,
                  borderRadius: 10,
                  marginTop: 10,
                }}></LinearGradient>

              <Text
                style={[
                  styles.auroraMapText,
                  { color: appConsumer.theme.colors.FontColor },
                ]}>
                100%
              </Text>
            </View>
          </View>

          {/* <View style={styles.NSimages}>
            <Image
              source={{uri: auroraImage.North}}
              resizeMode={'cover'}
              style={{height: '95%', width: '47%', borderRadius: 10}}
            />
            <View
              style={{
                height: '100%',
                width: 3,
                backgroundColor:'#c6c6c6',
              }}></View>
            <Image
              source={{uri: auroraImage.South}}
              resizeMode={'cover'}
              style={{height: '95%', width: '47%', borderRadius: 10}}
            />
          </View> */}

          <Text style={{ marginTop: '20%' }}> </Text>
          <Loader loading={loader} isShowIndicator={true} />
        </ScrollView>
      )}
    </AppConsumer>
  )
}

export default AuroraScreen

const styles = StyleSheet.create({
  MainContainer: {
    padding: 15,
    paddingTop: 40,
    height: '100%',
    backgroundColor: Colors.background,
  },

  HeadingStyle: {
    fontSize: 40,
    color: Colors.FontColor,
    fontWeight: 'bold',
  },

  SubHeadingStyle: {
    fontSize: 35,
    color: Colors.FontColor,
    fontWeight: 'bold',
    marginTop: '5%',
  },

  LGCcontainer: {
    width: '100%',
    height: 90,
    borderRadius: 20,
    padding: 20,
    paddingRight: 25,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    marginTop: '5%',
  },

  auroramap: {
    width: '100%',
    height: 190,
    marginTop: '5%',
    borderRadius: 10,
  },

  NSimages: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor:'red',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },

  auroraMapText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
})
