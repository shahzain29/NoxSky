import React, {Component, useState,useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  SafeAreaView,
  LogBox,
} from 'react-native'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Symbol from 'react-native-vector-icons/Entypo'
import Back from 'react-native-vector-icons/AntDesign'
import {Picker} from '@react-native-picker/picker'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {findATripAPI} from '../API/Methods/userApi'
import Loader from '../Assets/Components/Loader'
import {useSelector} from 'react-redux'

const FindaTripScreen = ({navigation}) => {
  
  const cityVal =useSelector(state=>state.tripCity.city)

  useEffect(()=>{
    // console.log("CityVal=>>",cityVal)
  },[])
  
  

  const [Type, setType] = useState('')
  const [when, setWhen] = useState('')
  const [near, setNear] = useState('')
  const [trips,setTrips]=useState([])
  const [loader, setLoader] = useState(false)
  const [otherTrips,setOtherTrips] = useState(false)

  const setFunction = (val) => {
    console.log('function val-', val)
    setType(val)

    console.log('TYPE-',Type)
    
    if(cityVal=='')
    {alert('Enter city')}
    // else if(when=='')
    // {alert('enter days')} 
    else{
    onFindATripPress(val)
      }
  }

  const onFindATripPress = async (valueTrip) => {
    setLoader(true)
      try {
        const formData =  new FormData()
        
        formData.append('near',cityVal)
        formData.append('when',when)
        formData.append('type',valueTrip)
      
        

        const response = await findATripAPI(formData)

        if(response.data.status===200){
        console.log('findATripAPI-status', response.data.status)
        // console.log('findATripAPI-data', response.data.data)

        setTrips(response.data.data)
        console.log('state Data-',trips)
        setOtherTrips(false)
        

        }
        if(response.data.status==205){
          setTrips(response.data.data)
          alert('No such trips, Please Check Other Trips')
          setOtherTrips(true)
        }

        setLoader(false)

       

        if(response.data.status==201){
          alert('No Such Trips')
        } 

      } catch (error) {

        console.log('findATripAPI-error', error)

      }
  }

  LogBox.ignoreAllLogs(true)

  return (
    <AppConsumer>
      {appConsumer => (
        <View
          style={[
            styles.MainContainer,
            {backgroundColor: appConsumer.theme.colors.background},
          ]}>
          <ScrollView nestedScrollEnabled={true}>
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
              onPress={() => navigation.navigate('Network')}
            />

            <Text
              style={[
                styles.HeadingStyle,
                {color: appConsumer.theme.colors.FontColor},
              ]}>
              Find A Trip
            </Text>

            <View
              style={[
                styles.LGCView,
                {borderColor: appConsumer.theme.colors.FontColor},
              ]}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  appConsumer.theme.colors.Communitygrad1,
                  appConsumer.theme.colors.Communitygrad2,
                  appConsumer.theme.colors.Communitygrad3,
                ]}
                style={styles.LinearGradientContainer}>
                <View style={styles.subLGC}>
                  <Text
                    style={[
                      styles.LGCtext,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    Near:
                  </Text>

                  <TouchableOpacity onPress={()=>navigation.navigate('FindTripCities')}>
                    <LinearGradient
                      colors={['#3f3f3f', '#535353']}
                      style={[styles.chooseContainer,{alignItems:'center'}]}>
                     
                      <Text style={[styles.subLGCtext,{color: appConsumer.theme.colors.FontColor}]}> 
                        
                       
                       {cityVal}
                        
                        </Text>

                  
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <View style={styles.subLGC}>
                  <Text
                    style={[
                      styles.LGCtext,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    Time Filter:
                  </Text>

                  <LinearGradient
                    colors={['#3f3f3f', '#535353']}
                    style={styles.chooseContainer}>
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
                      <Picker.Item label='Any..' value='' />
                      <Picker.Item label='< 7 days' value='7 days' />
                      <Picker.Item label='< 5 days' value='5 days' />
                      <Picker.Item label='< 3 days' value='3 days' />
                      <Picker.Item label='< 1 day' value='1 day' />
                    </Picker>
                  </LinearGradient>
                </View>

                <View style={styles.subLGC}>
                  <Text
                  
                    style={[
                      styles.LGCtext,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    Type Filter:
                  </Text>

                  <LinearGradient
                    colors={['#3f3f3f', '#535353']}
                    style={styles.chooseContainer}>
                    <Picker
                      style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: 'transparent',
                        color: appConsumer.theme.colors.FontColor,
                        fontSize: 20,
                        fontWeight: 'bold',
                        
                      }}
                      selectedValue={Type}
                      onValueChange={value => setFunction(value)}
                      mode='dropdown'
                      dropdownIconColor={appConsumer.theme.colors.FontColor}
                      dropdownIconRippleColor={'black'}>
                      <Picker.Item label='Choose....' value='Unknown' />
                      <Picker.Item label='Any..' value='' />
                      <Picker.Item label='Lunar' value='Lunar' />
                      <Picker.Item label='Planetary' value='Planetary' />
                      <Picker.Item label='Meteor Shower' value='Meteorshower' />
                      <Picker.Item label='Timelapse/Trails' value='Timelapse' />
                      <Picker.Item label='Milky Way' value='Milkyway' />
                      <Picker.Item label='Deep Sky' value='Deepsky' />
                    </Picker>
                  </LinearGradient>
                </View>
              </LinearGradient>
            </View>

            
            <SafeAreaView style={{marginBottom:'auto'}}>
              {otherTrips==true &&
              <Text style={{color:appConsumer.theme.colors.FontColor,fontSize:20,}}>Other Trips</Text>
              }
              <FlatList
                data={trips}
                renderItem={({item}) => (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      // margin: 1,
                      height: 150,
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: appConsumer.theme.colors.FontColor,
                    }}>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('User',{paramKey: item.user_id})}>
                        <Icon
                          name='user-circle-o'
                          size={70}
                          color={appConsumer.theme.colors.FontColor}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 3,
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                      }}>
                      <Text
                        style={[
                          styles.listTextStyle,
                          {color: appConsumer.theme.colors.FontColor},
                        ]}>
                        {item.user_name}
                      </Text>
                      <Text
                        style={[
                          styles.listTextStyle,
                          {color: appConsumer.theme.colors.FontColor},
                        ]}>
                        Near:{item.near}
                      </Text>
                      <Text
                        style={[
                          styles.listTextStyle,
                          {color: appConsumer.theme.colors.FontColor},
                        ]}>
                        In: {'<'}
                        {item.when}
                      </Text>
                      <Text
                        style={[
                          styles.listTextStyle,
                          {color: appConsumer.theme.colors.FontColor},
                        ]}>
                        Type: {item.type}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('Chat',{chatParam:item})}>
                      <Symbol name={'chat'} size={30} color={'#467fd7'} />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </SafeAreaView>
           
          </ScrollView>
           <Loader loading={loader} isShowIndicator={true} />
        </View>
      )}
    </AppConsumer>
  )
}

export default FindaTripScreen

const styles = StyleSheet.create({
  MainContainer: {
    padding: 15,
    paddingTop: 40,
    height: '100%',
    justifyContent: 'space-around',
  },

  HeadingStyle: {
    fontSize: 35,
    fontWeight: 'bold',
  },

  LGCView: {
    alignItems: 'center',
    marginTop: '5%',
    borderBottomWidth: 2,
    height: 200,
  },

  LinearGradientContainer: {
    width: '100%',
    height: '90%',
    padding: 15,
    paddingTop: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
  },

  subLGC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  LGCtext: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '1%',
  },

  subLGCtext: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  chooseContainer: {
    width: 190,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    // paddingLeft: 10,
  },

  listTextStyle: {
    fontSize: 20,

    fontWeight: 'bold',
  },
})
