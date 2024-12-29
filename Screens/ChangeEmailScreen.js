import 'react-native-gesture-handler'
import React, {Component,useState} from 'react'
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
  Alert,
} from 'react-native'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {changeEmailAPI} from '../API/Methods/userApi'

const ChangeEmailScreen =({navigation}) => {
  
  const [oldEmail, setOldEmail]=useState('')
  const [newEmail, setNewEmail]=useState('')
  const [confirmEmail, setConfirmEmail]=useState('')

  const checkmail = () => {
    if((/^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/).test(oldEmail.trim()) == false){
    alert("invalid old Email")
    }
    else if((/^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/).test(email.trim()) == false){
      alert('invalid new email')
    }
    else if(confirmEmail!=newEmail){  
      alert('Emails Do Not Match')
      
    }
    else
    {
      onChangeEmailPress()
    }
  }

   const onChangeEmailPress = async () => {
    try {
      

      const formData = new FormData()
      
      formData.append('oldemail', oldEmail)
      formData.append('newemail', newEmail)
      formData.append('confirmemail', confirmEmail)
    
      const response = await changeEmailAPI(formData)

      console.log('changeEmailAPI-status', response.status)
      // console.log('changeEmailAPI-data', response.data)

      Alert.alert("Email changed")

      setOldEmail('')
      setNewEmail('')
      setConfirmEmail('')
    } catch (error) {
      console.log('changeEmailAPI-error', error)      
    }
  }

    return (
      <AppConsumer>
        {appConsumer => (
          <ScrollView style={{backgroundColor:appConsumer.theme.colors.background}}>
          <View
            style={{
              justifyContent:'space-between',
              backgroundColor: appConsumer.theme.colors.background,
              height:'100%'
              
            }}>
            <LinearGradient colors={[Colors.Grad1, Colors.Grad1]}>
              <StatusBar
                barStyle='light-content'
                hidden={false}
                backgroundColor='transparent'
                translucent={true}
              />
            </LinearGradient>

            <LinearGradient
              colors={[Colors.Grad1, Colors.Grad2, Colors.Grad3]}
              style={styles.LGCcontainer}>
              <View style={{flexDirection: 'row'}}>
                <Back
                  name='arrowleft'
                  size={40}
                  color={appConsumer.theme.colors.FontColor}
                  style={{
                    backgroundColor: Colors.Backbtn1,
                    padding: 15,
                    marginTop: '8%',
                    borderRadius: 40,
                    width: '20%',
                    height: '70%',
                  }}
                  onPress={() => navigation.goBack()}
                />

                <Text
                  style={[
                    styles.headingStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Change Email
                </Text>
              </View>
            </LinearGradient>

            <View style={styles.inputfieldscontainer}>
              <View style={styles.subinputcontainer}>
                <Text
                  style={[
                    styles.TextStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Current{'\n'}Email
                </Text>

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#181818', '#393939']}
                  style={styles.linearGradient}>
                  <TextInput
                    style={[
                      styles.inputstyle,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}
                    placeholder='Type...'
                    placeholderTextColor={appConsumer.theme.colors.FontColor}
                    onChangeText={text => setOldEmail(text)}
                    value={oldEmail}
                  />
                </LinearGradient>
              </View>

              <View style={styles.subinputcontainer}>
                <Text
                  style={[
                    styles.TextStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  New Email
                </Text>

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#181818', '#393939']}
                  style={styles.linearGradient}>
                  <TextInput
                    style={[
                      styles.inputstyle,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}
                    placeholder='Type...'
                    placeholderTextColor={appConsumer.theme.colors.FontColor}
                    onChangeText={text => setNewEmail(text)}
                    value={newEmail}
                  />
                </LinearGradient>
              </View>

              <View style={styles.subinputcontainer}>
                <Text
                  style={[
                    styles.TextStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Confirm New{'\n'}Email
                </Text>

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#181818', '#393939']}
                  style={styles.linearGradient}>
                  <TextInput
                    style={[
                      styles.inputstyle,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}
                    placeholder='Type...'
                    placeholderTextColor={appConsumer.theme.colors.FontColor}
                    onChangeText={text => setConfirmEmail(text)}
                    value={confirmEmail}
                  />
                </LinearGradient>
              </View>
            </View>
            <View
              style={{
                marginTop: '15%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                height:300
              }}>
              <TouchableOpacity
                style={{width: 100, alignItems: 'center'}}
                onPress={checkmail}>
                <LinearGradient
                  colors={[Colors.btnGrad3, Colors.btnGrad2, Colors.btnGrad1]}
                  style={styles.buttonstyle}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: Colors.FontColor,
                    }}>
                    Change
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        )}
      </AppConsumer>
    )
  }

export default ChangeEmailScreen

const styles = StyleSheet.create({
  LGCcontainer: {
    width: '100%',
    height: 130,
    borderRadius: 20,
    padding: 10,
  },

  headingStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: '8%',
    marginTop: '10%',
  },

  linearGradient: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: '60%',
    height: 55,
    paddingTop: 8,
  },

  TextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '3%',
    width: 120,
  },

  inputstyle: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 20,
  },

  buttonstyle: {
    height: 55,
    width: 220,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputfieldscontainer: {
    marginTop: '10%',
    justifyContent: 'space-evenly',
    height: '40%',
  },
  subinputcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})
