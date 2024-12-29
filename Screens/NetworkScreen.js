import 'react-native-gesture-handler'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
const NetworkScreen =({navigation}) => {
   

    const findTrip = '../Assets/Images/FindTrip.png'
    const postTrip = '../Assets/Images/PostTrip.png'

    return (
      <AppConsumer>
        {appConsumer => (
          <View
            style={{
              backgroundColor: appConsumer.theme.colors.background,
              height: '100%',
            }}>
            <LinearGradient
              // start={{x: 0, y: 0}}
              // end={{x: 1, y: 0}}
              colors={[Colors.Grad3, Colors.Grad3]}>
              <StatusBar
                barStyle='light-content'
                hidden={false}
                backgroundColor='transparent'
                translucent={true}
              />
            </LinearGradient>

            <LinearGradient
              // start={{x: 0, y: 0}}
              // end={{x: 1, y: 0}}
              colors={[Colors.Grad3, Colors.Grad2, Colors.Grad1]}
              style={styles.LGCcontainer}>
              <View style={{flexDirection: 'row'}}>
                <Back
                  name='arrowleft'
                  size={40}
                  color={appConsumer.theme.colors.FontColor}
                  style={{
                    backgroundColor: Colors.Backbtn1,
                    opacity: 10,
                    padding: 15,
                    marginTop: '8%',
                    borderColor: '#c2c2c2',
                    borderRadius: 40,
                    width: '20%',
                    height: '70%',
                  }}
                  onPress={() => navigation.navigate('Community')}
                />

                <Text
                  style={[
                    styles.headingStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Network
                </Text>
              </View>

              <View>
                <Text
                  style={[
                    styles.paraStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Here, you can find fellow Astrophotographers planning a trip
                  soon. If you are planning a trip, look for someone in your
                  area who is doing the same and go out under the stars
                  together! If you can't find anyone, You can post your own
                  trip.{' '}
                </Text>
              </View>
            </LinearGradient>

            <View
              style={{
                height: '55%',
                marginTop: '5%',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('FindaTrip')}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    appConsumer.theme.colors.Communitygrad1,
                    appConsumer.theme.colors.Communitygrad2,
                    appConsumer.theme.colors.Communitygrad3,
                  ]}
                  style={styles.linearGradient}>
                  <Text
                    style={[
                      styles.buttonTextStyle,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    Find a Trip
                  </Text>

                  <View style={{justifyContent: 'center'}}>
                    <Image
                      source={require(findTrip)}
                      style={{height: 220, width: 220}}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('PostYourTrip')}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    appConsumer.theme.colors.Communitygrad1,
                    appConsumer.theme.colors.Communitygrad2,
                    appConsumer.theme.colors.Communitygrad3,
                  ]}
                  style={styles.linearGradient}>
                  <Text
                    style={[
                      styles.buttonTextStyle,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    Post A Trip
                  </Text>

                  <View style={{justifyContent: 'center'}}>
                    <Image
                      source={require(postTrip)}
                      style={{height: 300, width: 200}}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AppConsumer>
    )
  }
export default NetworkScreen

const styles = StyleSheet.create({
  LGCcontainer: {
    width: '100%',
    height: 230,
    borderRadius: 20,
    padding: 10,
  },

  headingStyle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: '15%',
    marginTop: '10%',
  },

  paraStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: '2%',
  },

  linearGradient: {
    width: '95%',

    height: 170,
    borderRadius: 20,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    paddingLeft: 30,
    paddingTop: 10,
    flexDirection: 'row',
  },

  buttonTextStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
})
