import 'react-native-gesture-handler'
import React, {useState} from 'react'
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
} from 'react-native'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'

import {forgotPassAPI} from '../API/Methods/userApi'

const ForgotPasswordScreen =({navigation}) => {
  
  const [email,setEmail] =useState('')


 const checkField=() =>{

   if((/^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/).test(email.trim()) == false){
     alert('Invalid Email')
   }
   else{
     onForgetPassPress()
   }
 }

  const onForgetPassPress = async () => {
    try {
      

      const formData = new FormData()

      formData.append('email', email)

      const response = await forgotPassAPI(formData)

      console.log('onForgetPassPress-status', response.status)
      console.log('onForgetPassPress-data', response.data)

      if(response.data.status===201){
        alert('Email Does Not Exist')
      }
      else if(response.data.status===200){
        alert('Please check your Mail')
        navigation.navigate('Signin')
      }
    } catch (error) {
      console.log('onForgetPassPress-error', error)
    }
  }

  
    return (
      <AppConsumer>
        {appConsumer => (
          <View
            style={{
              backgroundColor: appConsumer.theme.colors.background,
              height: '100%',
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
                    padding: 14,
                    marginTop: '8%',
                    borderColor: '#c2c2c2',
                    borderRadius: 40,
                    width: '19%',
                    height: 70,
                  }}
                  onPress={() => navigation.navigate('Signin')}
                />

                <Text
                  style={[
                    styles.headingStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Forgot Password
                </Text>
              </View>

              <View>
                <Text
                  style={[
                    styles.paraStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  If you forgot your password, you can enter the account email
                  here and you will recieve an email with instructions on how to
                  reset your password
                </Text>
              </View>
            </LinearGradient>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: '20%',
              }}>
              <Text
                style={[
                  styles.TextStyle,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Email
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
                  placeholder='Email'
                  placeholderTextColor={appConsumer.theme.colors.FontColor}
                  onChangeText={text => setEmail(text)}
                  value={email}
                />
              </LinearGradient>
            </View>

            <View
              style={{
                marginTop: '15%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <TouchableOpacity
                style={{width: 100, alignItems: 'center'}}
                onPress={checkField}>
                <LinearGradient
                  colors={[Colors.btnGrad3, Colors.btnGrad2, Colors.btnGrad1]}
                  style={styles.buttonstyle}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: appConsumer.theme.colors.FontColor,
                    }}>
                    Send
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AppConsumer>
    )
  
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  LGCcontainer: {
    width: '100%',
    height: 200,
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
  },

  inputstyle: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 20,
  },

  buttonstyle: {
    height: 55,
    width: 220,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  paraStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: '2%',
  },
})
