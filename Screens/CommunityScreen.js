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
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {useSelector} from 'react-redux'
const CommunityScreen = ({navigation}) => {
  
  const messageBit = useSelector (state => state.enableMessage.messageBit)

    const communityMap = '../Assets/Images/CommunityMap.png'
    const Network = '../Assets/Images/Network.png'
    const Messages = '../Assets/Images/Messages.png'

  const goToMessages =() => {

    if(messageBit==true) {
      navigation.navigate('Messages')
    }
    else {
      alert('Please Enable Messages')
    }

  }
    return (
      <AppConsumer>
        {appConsumer => (
          <ScrollView
            style={[
              styles.scrollStyle,
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
              onPress={() => navigation.navigate('Main')}
            />

            <Text
              style={[
                styles.headingStyle,
                {color: appConsumer.theme.colors.FontColor},
              ]}>
              Community
            </Text>

            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => navigation.navigate('CommunityMap',{param:'Community'})}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    appConsumer.theme.colors.Communitygrad1,
                    appConsumer.theme.colors.Communitygrad2,
                    appConsumer.theme.colors.Communitygrad3,
                  ]}
                  style={[
                    styles.linearGradient,
                    {paddingLeft: 20, width: '102%'},
                  ]}>
                  <View style={{}}>
                    <Text
                      style={[
                        styles.buttonTextStyle,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      Community Map
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '45%',
                      height: 160,
                      
                      right:10,
                    }}>
                    <Image
                      source={require(communityMap)}
                      style={{height: 200, width: 280}}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Network')}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    appConsumer.theme.colors.Communitygrad1,
                    appConsumer.theme.colors.Communitygrad2,
                    appConsumer.theme.colors.Communitygrad3,
                  ]}
                  style={styles.linearGradient}>
                  <View style={{}}>
                    <Text
                      style={[
                        styles.buttonTextStyle,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      Network
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '40%',
                      height: 160,
                      right:10,
                    }}>
                    <Image
                      source={require(Network)}
                      style={{height: 300, width: 250}}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => goToMessages()}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    appConsumer.theme.colors.Communitygrad1,
                    appConsumer.theme.colors.Communitygrad2,
                    appConsumer.theme.colors.Communitygrad3,
                  ]}
                  style={styles.linearGradient}>
                  <View style={{}}>
                    <Text
                      style={[
                        styles.buttonTextStyle,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      Messages{' '}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '40%',
                      height: 160,
                    }}>
                    <Image
                      source={require(Messages)}
                      style={{height: 300, width: 300}}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </AppConsumer>
    )
  }
export default CommunityScreen

const styles = StyleSheet.create({
  scrollStyle: {
    padding: 15,
    paddingTop: 40,
    flex: 1,
    backgroundColor: Colors.background,
  },

  headingStyle: {
    fontSize: 35,
    color: Colors.FontColor,
    fontWeight: 'bold',
  },

  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    height: 600,
  },

  linearGradient: {
    width: '95%',
    height: 160,
    borderRadius: 20,
    // alignItems: 'stretch',
    justifyContent: 'space-around',
    // paddingLeft: 10,
    paddingTop: 10,

    flexDirection: 'row',
  },

  buttonTextStyle: {
    color: Colors.FontColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
})
