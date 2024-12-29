import React, {Component, useState, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Back from 'react-native-vector-icons/AntDesign'
import {Colors} from './Utils/Colors'
import Modal from 'react-native-modal'
import {Rating, AirbnbRating} from 'react-native-elements'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {normal, red} from './Context/Themes'
import {useDispatch, useSelector} from 'react-redux'
import {setNoxMode,setMessage} from '../redux/actions'

const SettingsScreen = ({navigation}) => {
  const dispatch = useDispatch()

  const Data = [
    {value: 'Change Password', key: 1},
    {value: 'Change Email', key: 2},
    {value: 'Send Feedback', key: 3},
    {value: 'Rate Nox Sky', key: 4},
    {value: 'Privacy Policy', key: 5},
    {value: 'Terms of Use', key: 6},
    {value: 'Edit Profile', key:7},
  ]

  const [noxModeSwitchVal, setNoxModeSwitchVal] = useState(false)
  const [enableMessagesSwitch, setEnableMesagesswitch] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [myTheme, setMyTheme] = useState(normal)

  const noxValue = useSelector(state => state.noxModeVal.noxModeVal.noxVal)
  const theme = useSelector(state => state.noxModeVal.noxModeVal.theme)
  const messageBit = useSelector(state => state.enableMessage.messageBit)

  useEffect(() => {
     console.log(theme)
  }, [theme])

  const NoxmodetoggleSwitch = () => {
    const invert = !noxModeSwitchVal
    // console.log(invert)
    setNoxModeSwitchVal(invert)

    if (invert == false) {
      dispatch(setNoxMode({noxVal: noxModeSwitchVal, theme: normal}))
    } else {
      dispatch(setNoxMode({noxVal: noxModeSwitchVal, theme: red}))
    }
  }

  const EnableMessagestoggleSwitch = () => {
    const invert= ! messageBit
    dispatch(setMessage(invert))
    console.log("function=>>",messageBit)
  }

  const nav = key => {
    if (key == 1) {
      return navigation.navigate('Change Password')
    } else if (key == 2) {
      return navigation.navigate('Change Email')
    } else if (key == 3) {
      return Linking.openURL(
        'mailto:feedback@noxsky.app?subject=SkyguideFeedback&body=Hello,',
      )
    } else if (key == 4) {
      setShowModal(true)
    }
    else if (key == 5){
      return navigation.navigate('PrivacyPolicy')
    }
    else if (key == 6) {
      return navigation.navigate('TermsConditions')
    }
    else if (key=7){
      return navigation.navigate('editProfile')
    }
  }

  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating)
    setShowModal(false)
  }
  return (
    <AppConsumer>
      {appConsumer => (
        <ScrollView>
        <View
          style={[
            styles.MainContainer,
            {backgroundColor: appConsumer.theme.colors.background},
          ]}>
          <Modal isVisible={showModal}>
            <View
              style={{width: '100%', height: 150, backgroundColor: 'black'}}>
              <Rating
                // showRating
                onFinishRating={ratingCompleted}
                style={{paddingTop: 60}}
                tintColor={appConsumer.theme.colors.background}
              />
            </View>
          </Modal>
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
            onPress={() => navigation.navigate('Profile')}
          />
          <Text
            style={[
              styles.headingStyle,
              {color: appConsumer.theme.colors.FontColor},
            ]}>
            Settings
          </Text>

          <View
            style={{
              marginTop: '3%',
              borderTopWidth: 2,
              borderColor: appConsumer.theme.colors.FontColor,
            }}>
            <View
              style={[
                styles.subContainer,
                {borderColor: appConsumer.theme.colors.FontColor},
              ]}>
              
                <Text
                  style={[
                    styles.textStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Nox Mode
                </Text>
              

              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={noxModeSwitchVal ? '#81b0ff' : '#f4f3f4'}
                onValueChange={() => {
                  [NoxmodetoggleSwitch(), appConsumer.updateTheme(theme)]
                }}
                value={noxValue}
              />
            </View> 

            <View
              style={[
                styles.subContainer,
                {borderColor: appConsumer.theme.colors.FontColor},
              ]}>
              <Text
                style={[
                  styles.textStyle,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Enable Messages
              </Text>

              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={enableMessagesSwitch ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={()=>EnableMessagestoggleSwitch()}
                value={messageBit}
              />
            </View>
            {/* <SafeAreaView> */}
              <FlatList
                data={Data}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => nav(item.key)}>
                    <View
                      style={[
                        styles.subContainer,
                        {borderColor: appConsumer.theme.colors.FontColor},
                      ]}>
                      <Text
                        style={[
                          styles.textStyle,
                          {color: appConsumer.theme.colors.FontColor},
                        ]}>
                        {item.value}
                      </Text>
                      <Icon
                        name={'chevron-right'}
                        size={20}
                        color={appConsumer.theme.colors.FontColor}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            {/* </SafeAreaView> */}
            <View style={{justifyContent: 'center', marginTop: '2%'}}>
              <Text
                style={[
                  styles.textStyle,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Version 1.2
              </Text>
            </View>
          </View>
        </View>
        </ScrollView>
      )}
    </AppConsumer>
  )
}
export default SettingsScreen

const styles = StyleSheet.create({
  MainContainer: {
    padding: 20,
    paddingTop: 40,
    height: '100%',
  },

  headingStyle: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subContainer: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
})
