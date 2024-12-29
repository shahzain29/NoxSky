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
import {editProfileAPI} from '../API/Methods/userApi'

const editProfile =({navigation}) => {
 
 const [name,setName]= useState('')
 const [email,setEmail]= useState('')
 const [instagram, setInstagram] = useState('')

    const checkpass=() =>{
      if(instagram==''){
          alert('Enter Name')
      }
    
      else{
          onchangeProfileAPIpress()
      }
    }

     const onchangeProfileAPIpress = async () =>{
      
      try {
        const formData = new FormData()

      
        formData.append('instagram',instagram)

        const response= await editProfileAPI(formData)

        console.log('onchangePasswordAPI-status',response.status)
        console.log('onchangePasswordAPIpress-data', response.message)
        
        if(response.status===200){
        Alert.alert("profile updated")

      setInstagram('')
     
        }
        
      } catch (error) {

        console.log('onchangePasswordAPIpress-error', error)
        
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
                    padding: 15,
                    marginTop: '8%',
                    borderColor: '#c2c2c2',
                    borderRadius: 40,
                    width: '20%',
                    height: '70%',
                  }}
                  onPress={() => navigation.navigate('Settings')}
                />

                <Text
                  style={[
                    styles.headingStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Edit Profile
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
                  Instagram
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
                    placeholderTextColor={
                      appConsumer.theme.colors.FontColor
                    }
                       onChangeText={(text) => setInstagram(text)}
                      value={instagram}
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
              }}>
              <TouchableOpacity style={{width: 100, alignItems: 'center'}}
              onPress={()=>checkpass()}>
                <LinearGradient
                  colors={[Colors.btnGrad1, Colors.btnGrad2, Colors.btnGrad3]}
                  style={styles.buttonstyle}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: appConsumer.theme.colors.FontColor,
                    }}>
                    Change
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AppConsumer>
    )
  }
export default editProfile

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
    height: '20%',
  },
  subinputcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginTop: '20%',
  },
})
