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
  Alert,
} from 'react-native'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import {Picker} from '@react-native-picker/picker'
import {postATripAPI} from '../API/Methods/userApi'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'

import {useSelector} from 'react-redux' 

const PostYourTripScreen =({navigation}) => {
  
const cityVal = useSelector(state=> state.tripCity.city)
  

  const [type,setType] = useState('')
  const [when,setWhen] = useState('')
  const [near,setNear] = useState('')
  
  const checkFields =() =>{
     if(cityVal==='')
    {
      alert('select city')
    }
    
    else if(when===''){
      alert('select Days')
    }
    else if(type===''){
      alert('Select Type')
    }
    
    else{
      onPostATripPress()
    }
  }



  const onPostATripPress = async () =>{

    try {
     

      const formData = new FormData()
      formData.append('when', when)
      formData.append('near', cityVal)
      formData.append('type', type)

      const response = await postATripAPI(formData)

      console.log('postATripAPI-status', response.status)
      // console.log('postATripAPI-data', response.data)
      Alert.alert('Trip Posted Successfully')

      setWhen('')
      setType('')
      setNear('')

    } catch (error) {
      console.log('postATripAPI-error', error)
      
    }

  }


    return (
      <AppConsumer>
        {appConsumer => (
          <ScrollView
            style={{backgroundColor: appConsumer.theme.colors.background}}>
            <View style={styles.MainContainer}>
              <Back
                name='arrowleft'
                size={40}
                color={appConsumer.theme.colors.FontColor}
                style={{
                  backgroundColor: '#303030',
                  padding: 15,
                  // marginTop: '8%',
                  borderColor: '#303030',
                  borderRadius: 40,
                  width: '20%',
                  height: 70,
                }}
                onPress={() => navigation.goBack()}
              />

              <Text
                style={[
                  styles.headingStyle,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Post Your Trip
              </Text>

              <View>
                <View style={styles.innerContainer}>
                  <Text
                    style={[
                      styles.textStyle,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    Near
                  </Text>
                    <TouchableOpacity  style={{width:'100%',left:'98%'}} onPress={()=>{navigation.navigate('FindTripCities')}}>  
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={[
                      Colors.Gradient1,
                      Colors.Gradient2,
                      Colors.Gradient3,
                    ]}
                    style={styles.linearGradient}>
                    <Text
                      style={[
                        styles.inputstyle,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}
                     >
                       {cityVal}
                       </Text>
                   
                  </LinearGradient>
                  </TouchableOpacity>
                </View>

                <View style={styles.innerContainer}>
                  <Text
                    style={[
                      styles.textStyle,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    When
                  </Text>

                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={[
                      Colors.Gradient1,
                      Colors.Gradient2,
                      Colors.Gradient3,
                    ]}
                    style={styles.linearGradient}>
                    <Picker
                      style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: 'transparent',
                        color: appConsumer.theme.colors.FontColor,
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                      selectedValue={when}
                      onValueChange={value => setWhen(value)}
                      mode='dropdown'
                      dropdownIconColor={appConsumer.theme.colors.FontColor}
                      dropdownIconRippleColor={'black'}>
                      <Picker.Item label='Choose....' value='Unknown' />
                      <Picker.Item label='<7 days' value='7 days' />
                      <Picker.Item label='<5 days' value='5 days' />
                      <Picker.Item label='<3 days' value='3 days' />
                      <Picker.Item label='<1 day' value='1 day' />
                    </Picker>
                  </LinearGradient>
                </View>

                <View style={styles.innerContainer}>
                  <Text
                    style={[
                      styles.textStyle,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    Type
                  </Text>

                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={[
                      Colors.Gradient1,
                      Colors.Gradient2,
                      Colors.Gradient3,
                    ]}
                    style={styles.linearGradient}>
                    <Picker
                      style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: 'transparent',
                        color: appConsumer.theme.colors.FontColor,
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                      selectedValue={type}
                      onValueChange={value => setType(value)}
                      mode='dropdown' // Android only
                      dropdownIconColor={appConsumer.theme.colors.FontColor}
                      dropdownIconRippleColor={'black'}>
                      <Picker.Item label='Choose....' value='Unknown' />
                      <Picker.Item label='Lunar' value='Lunar' />
                      <Picker.Item label='Planetary' value='Planetary' />
                      <Picker.Item label='Meteor Shower' value='Meteorshower' />
                      <Picker.Item label='Timelapse/Trails' value='Timelapse' />
                      <Picker.Item label='Milky Way' value='Milkyway' />
                      <Picker.Item label='Deep Sky' value='Deepsky' />
                    </Picker>
                  </LinearGradient>
                </View>
              </View>

              <TouchableOpacity onPress={checkFields}>
              <LinearGradient
                colors={[Colors.Grad3, Colors.Grad2, Colors.Grad1]}
                style={styles.LGbtn}>
                <Text
                  style={[
                    styles.btnTextstyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  POST!
                </Text>
              </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </AppConsumer>
    )
  }
export default PostYourTripScreen;

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: 40,
    padding: 15,
    height: '100%',
  },

  headingStyle: {
    fontSize: 35,
    fontWeight: 'bold',
    // marginLeft:'15%',
    marginTop: '5%',
  },

  linearGradient: {
    width: '70%',
    paddingLeft: 5,

    // marginLeft: '5%',
    // marginTop: '3%',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
  },
  inputstyle: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 18,
  },

  textStyle: {
    fontSize: 25,

    fontWeight: 'bold',
    marginTop: '1%',
  },

  btnTextstyle: {
    fontSize: 30,

    fontWeight: 'bold',
  },

  LGbtn: {
    width: '100%',
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '15%',
  },
})
