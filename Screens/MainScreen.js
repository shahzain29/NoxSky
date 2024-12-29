import 'react-native-gesture-handler'
import React, {useEffect, useState} from 'react'
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
  FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Symbol from 'react-native-vector-icons/FontAwesome'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {useSelector} from 'react-redux'
import Loader from '../Assets/Components/Loader'
import moment from 'moment'
import Geocoder from 'react-native-geocoding';

const MainScreen = ({navigation}) => {
  const image = require('../Assets/Images/NEWMOON.png')
  const community = '../Assets/Images/Community.png'
  const perfectStars = '../Assets/Images/PerfectStars.png'
  const lightpollutionmap = '../Assets/Images/LightPollutionMap.png'
  const future = '../Assets/Images/Future.png'
  const aurora = '../Assets/Images/Aurora.png'

  const loc = useSelector(state => state.location.userLocation)
  const userName = useSelector(state => state.userId.userId.name) 
  

  const [nowDate, setNowDate] = useState('')
  const [weather, setWeather] = useState('')
  const [satellitePass, setSatellitePass] = useState('')
  const [loader, setLoader] = useState(false)
  const [singleDayWeather,setSingleDayWeather] = useState('')
  const [city,setCity] =useState('')
  const [moonTimmings,setMoonTimmings]=useState('')

  var weatherIcon;
  var count=0;

  Geocoder.init("AIzaSyAMWIU5X-z8UTp01cqpt9EVBlnQu3O-fyk");

  useEffect(() => {
    console.log('USER LOCATION CHECK->>', loc)
    setLoader(true)
    // getSatellite()
    getUserCity()
  }, [])

  const addcount = () => {
    count=count+1
  }

const getUserCity =() =>{

  Geocoder.from(loc.latitude, loc.longitude)
		.then(json => {
        		var addressComponent = json.results[0].address_components[3].long_name;

      console.log("GetCityAPI=>>",200);
      setCity(addressComponent)
      getDate()

		})
		.catch(error => console.log("GetCityAPIError=>>",error));
  

}

  const getWeatherImages = iconName => {
    switch (iconName) {
      case 'clear-day':
        weatherIcon = require('../Assets/Images/Weather/clear-day.png')
        break

      case 'clear-night':
        weatherIcon = require('../Assets/Images/Weather/clear-night.png')
        break

      case 'cloudy':
        weatherIcon = require('../Assets/Images/Weather/cloudy.png')
        break

      case 'partly-cloudy-day':
        weatherIcon = require('../Assets/Images/Weather/partly-cloudy-day.png')
        break
      case 'partly-cloudy-night':
        weatherIcon = require('../Assets/Images/Weather/partly-cloudy-night.png')
        break

      case 'rain':
        weatherIcon = require('../Assets/Images/Weather/rain.png')
        break

      case 'showers-day':
        weatherIcon = require('../Assets/Images/Weather/showers-day.png')
        break

      case 'showers-night':
        weatherIcon = require('../Assets/Images/Weather/showers-night.png')
        break

      case 'snow-showers-day':
        weatherIcon = require('../Assets/Images/Weather/snow-showers-day.png')
        break

      case 'snow-showers-night':
        weatherIcon = require('../Assets/Images/Weather/snow-showers-night.png')
        break

      case 'snow':
        weatherIcon = require('../Assets/Images/Weather/snow.png')
        break

      case 'thunder-rain':
        weatherIcon = require('../Assets/Images/Weather/thunder-rain.png')
        break

      case 'thunder-showers-day':
        weatherIcon = require('../Assets/Images/Weather/thunder-showers-day.png')
        break

      case 'thunder-showers-night':
        weatherIcon = require('../Assets/Images/Weather/thunder-showers-night.png')
        break

      case 'wind':
        weatherIcon = require('../Assets/Images/Weather/wind.png')
        break
    }
  }

  const getDate = timestamp => {
    var date = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    var minutes = new Date().getMinutes()
    var hours = new Date().getHours()

    var currentDate = year + '.' + month + '.' + date
    var currentDateForWeather = year + '-' + month + '-' + date
    var currentTime = moment()
      .utcOffset('+05:00')
      .format('hh:mm')
    // console.log('CurrentDate=>>',currentDate)
    // console.log('CurrentTime=>>',currentTime)
    
    // getMoonPhase(currentDate,currentTime)

    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
      // ampm = 'AM',
      time

    // if (hh > 12) {
    // 	h = hh - 12;
    // 	ampm = 'PM';
    // } else if (hh === 12) {
    // 	h = 12;
    // 	ampm = 'PM';
    // } else if (hh == 0) {
    // 	h = 12;
    // }

    var time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min
    // console.log('Satellite Pass Time=>>',time)

    // if (dd == date) {
    //   setSatellitePass('pass today at ' + h + ':' + min)
    // } else {
    //   setSatellitePass('not pass today')
    // }
    getMoonPhase()
    getWeather(currentDateForWeather)
    
    // currentWeather(currentDateForWeather)
  }

  const getMoonPhase = () => {
   
    fetch(
      'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=9979b15028574089a7272416220902&q='+loc.latitude+','+loc.longitude+'&format=json&tp=1&date=today',
    //  'https://api.ipgeolocation.io/astronomy?apiKey=13cd47802c0642cfad1a874332867afa&lat=32.0926679&long=74.1849484',
      
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
        // console.log('response_MoonPhase-->', '-' + JSON.stringify(response))
        console.log("MoonPhase API=>>",response.data)
        if(response.data.error){
          alert(response.data.error[0].msg)
        }
        setMoonTimmings(response.data.weather[0].astronomy[0])
      })
      .catch(error => {
        alert('Unable to fetch MoonPhases')
        console.log('MoonPhaseAPI:', error)
      })
  }


  const getWeather = now => {
    console.log(now)
    fetch(
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +
        loc.latitude +
        ',' +
        loc.longitude +
        '/'+now+'?unitGroup=metric&key=JQUHF9DVCDDTDJK44ZS7YXQ73&include=hours',

        
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
        // console.log(
        //   'response_Weather-->',
        //   '-' + JSON.stringify(response.days[0].datetime),
        // )

        // console.log('Weather API =>>',response.days[0].hours)
        setWeather(response.days[0])
        setSingleDayWeather(response.days[0])

        console.log('WeatherAPI=>>', 'status 200')
        setLoader(false)

      })
      .catch(error => {
        setLoader(false)
        console.log('WeatherAPI:', error)
      })
  }

  

  return (
    <AppConsumer>
      {appConsumer => (
        <ScrollView
          indicatorStyle={'black'}
          persistentScrollbar={true}
          showsVerticalScrollIndicator={true}
          style={[
            styles.scrollStyle,
            {backgroundColor: appConsumer.theme.colors.background},
          ]}>
          <View style={{alignItems: 'flex-end', justifyContent: 'flex-start'}}>
            <Symbol
              name='user-circle-o'
              size={40}
              color={appConsumer.theme.colors.FontColor}
              onPress={() => navigation.navigate('Profile')}
            />
          </View>

          <Text
            style={[
              styles.headingStyle,
              {color: appConsumer.theme.colors.FontColor},
            ]}>
            Welcome To Nox Sky, {userName} 
          </Text>

          <View>
            <View style={{flexDirection: 'column', marginTop: '5%'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Community')}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    appConsumer.theme.colors.Maingrad1,
                    appConsumer.theme.colors.Maingrad2,
                    appConsumer.theme.colors.Maingrad3,
                  ]}
                  style={styles.communityLGC}>
                  <Text
                    style={{
                      color: appConsumer.theme.colors.FontColor,
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}>
                    Community
                  </Text>

                  <View
                    style={{
                      width: '40%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require(community)}
                      style={{height: 300, width: 300}}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'space-evenly',
                height: 350,
              }}>
              <View style={styles.viewRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Calculations',{selectedCam:1})}>
                  <LinearGradient
                    colors={[
                      appConsumer.theme.colors.Maingrad1,
                      appConsumer.theme.colors.Maingrad2,
                      appConsumer.theme.colors.Maingrad3,
                    ]}
                    style={styles.ImageBackgroundSub}>
                    <Text
                      style={[
                        styles.imageText,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      Perfect Stars
                    </Text>

                    <View
                      style={{
                        paddingTop: 40,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginLeft: '30%',
                      }}>
                      <Image
                        source={require(perfectStars)}
                        style={{height: 220, width: 220}}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('LightMapWeb')}>
                  <LinearGradient
                    colors={[
                      appConsumer.theme.colors.Maingrad1,
                      appConsumer.theme.colors.Maingrad2,
                      appConsumer.theme.colors.Maingrad3,
                    ]}
                    style={styles.ImageBackgroundSub}>
                    <Text
                      style={[
                        styles.imageText,
                        {color: appConsumer.theme.colors.FontColor,top:5},
                      ]}>
                      Light Pollution Map
                    </Text>

                    <View
                      style={{
                        paddingTop: 40,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginLeft: '30%',
                      }}>
                      <Image
                        source={require(lightpollutionmap)}
                        style={{height: 220, width: 220}}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={styles.viewRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Futureevents')}>
                  <LinearGradient
                    colors={[
                      appConsumer.theme.colors.Maingrad1,
                      appConsumer.theme.colors.Maingrad2,
                      appConsumer.theme.colors.Maingrad3,
                    ]}
                    style={styles.ImageBackgroundSub}>
                    <Text
                      style={[
                        styles.imageText,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      Future Events
                    </Text>

                    <View
                      style={{
                        paddingTop: 40,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginLeft: '25%',
                      }}>
                      <Image
                        source={require(future)}
                        style={{height: 220, width: 220}}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Aurora')}>
                  <LinearGradient
                    colors={[
                      appConsumer.theme.colors.Maingrad1,
                      appConsumer.theme.colors.Maingrad2,
                      appConsumer.theme.colors.Maingrad3,
                    ]}
                    style={styles.ImageBackgroundSub}>
                    <Text
                      style={[
                        styles.imageText,
                        {
                          color: appConsumer.theme.colors.FontColor,
                          paddingTop: -20,
                        },
                      ]}>
                      Aurora
                    </Text>

                    <View
                      style={{
                        paddingTop: 70,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Image
                        source={require(aurora)}
                        style={{height: 190, width: 190}}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <Loader loading={loader} isShowIndicator={true} />
          </View>

          {/* Second Part of the Screen */}

          <View style={{marginTop: '20%'}}>
            <Text
              style={[
                styles.headingStyle2,
                {color: appConsumer.theme.colors.FontColor},
              ]}>
              {city} Tonight
            </Text>
            <View style={{flexDirection: 'column'}}>
              <ImageBackground
                source={image}
                resizeMode='cover'
                style={styles.ImageBackgroundMainPtwo}>
                <Text
                  style={[
                    styles.imageTextMainPtwo,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  {weather.conditions}
                </Text>

                <Text
                  style={[
                    styles.imageTextMainPtwo,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  {parseInt(weather.temp)}&deg;C
                </Text>

                <LinearGradient
                  colors={['#444444', '#333333']}
                  style={{
                    height: 60,
                    width: 120,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: appConsumer.theme.colors.FontColor,
                      fontSize: 40,
                      fontWeight: 'bold',
                    }}>
                    {moonTimmings.moon_illumination}%
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </View>

        

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
                marginTop: '5%',
                marginLeft: '5%',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.tableText,
                    {
                      marginTop: '10%',
                      color: appConsumer.theme.colors.FontColor,
                    },
                  ]}>
                  Rise{' '}
                </Text>

                <Image
                  source={require('../Assets/Images/Rise.png')}
                  style={{height: 60, width: 40}}
                />
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.tableText,
                    {
                      marginTop: '10%',
                      color: appConsumer.theme.colors.FontColor,
                    },
                  ]}>
                  Set{' '}
                </Text>

                <Image
                  source={require('../Assets/Images/Set.png')}
                  style={{height: 60, width: 40}}
                />
              </View>
            </View>

            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                marginTop: '4%',
                justifyContent: 'space-around',
                alignItems: 'stretch',
                borderBottomWidth: 1,
                borderColor: '#8a8a8a',
                height: 40,
              }}>
              <View style={{justifyContent: 'flex-end'}}>
                <Image
                  source={require('../Assets/Images/Sun.png')}
                  style={{height: 70, width: 30}}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={[
                    styles.tableText,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                { moment(moonTimmings.sunrise, ["h:mm A"]).format("HH:mm")}
                </Text>
                <Text
                  style={[
                    styles.tableText,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  {moment(moonTimmings.sunset, ["h:mm A"]).format("HH:mm")}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                marginTop: '4%',
                justifyContent: 'space-around',
                alignItems: 'stretch',
                borderBottomWidth: 3,
                borderColor: '#8a8a8a',
                height: 50,
              }}>
              <View>
                <Icon
                  name='moon'
                  size={30}
                  color={appConsumer.theme.colors.FontColor}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={[
                    styles.tableText,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  {moment(moonTimmings.moonrise, ["h:mm A"]).format("HH:mm")}
                </Text>
                <Text
                  style={[
                    styles.tableText,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  {moment(moonTimmings.moonset, ["h:mm A"]).format("HH:mm")}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: '4%',
                justifyContent: 'space-around',
                alignItems: 'stretch',
              }}>
              {/* <View
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Image
                  source={require('../Assets/Images/Satellite.png')}
                  style={{height: 80, width: 30}}
                />
              </View> */}

              {/* <View style={{flex: 2, marginTop: '2%'}}>
                <Text
                  style={[
                    styles.tableText,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Starlink will {'\n' + satellitePass}
                </Text>
              </View> */}
            </View>

            <View>
              <LinearGradient
                colors={['#464646', '#3c3c3c', '#333333']}
                style={styles.weatherReportStyle}>
                <FlatList
                  horizontal={true}
                  data={weather.hours}
                  renderItem={({item,index}) => (
                    
                    <View>
                       {addcount()} 
                      <View
                        style={{
                          borderBottomWidth: 0.5,
                          borderColor: '#9f9f9f',
                          height: '30%',
                          width: 60,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        
                        <Text
                          style={{
                            color: appConsumer.theme.colors.FontColor,
                            fontSize: 15,
                            fontWeight: 'bold',
                          }}>
                            {/* {index+1}   */}
                          {item.datetime.substring(0,5)}
                        </Text>
                      </View>

                      <View
                        style={{
                          justifyContent: 'center',
                          height: '30%',
                          width: 60,
                          borderBottomWidth: 0.5,
                          borderColor: '#FFF',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: appConsumer.theme.colors.FontColor,
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          {item.temp}&deg;
                        </Text>
                      </View>

                      <View
                        style={{
                          justifyContent: 'center',
                          height: '40%',
                          width: 60,
                          alignItems: 'center',
                        }}>
                        {/* <Image
                          source={require(`../Assets/Images/Weather/${item.icon}.png`)}
                          style={{height: 50, width: 50}}
                          resizeMode={'cover'}
                        /> */}
                        {getWeatherImages(item.icon)}
                        <Image
                          source={weatherIcon}
                          style={{height: 50, width: 50}}
                          resizeMode={'cover'}
                        />

                        {/* {console.log('ListCheck=>>', item.icon)} */}
                      </View>
                    </View>
                  )}
                />
              </LinearGradient>
            </View>
          </View>
          <Text style={{marginTop: '20%'}}>....</Text>
        </ScrollView>
      )}
    </AppConsumer>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  scrollStyle: {
    padding: 20,
    paddingTop: 40,

    height: '110%',
  },

  headingStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.FontColor,
  },
  headingStyle2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.FontColor,
  },

  imageText: {
    color: Colors.FontColor,
    fontSize: 20,
    fontWeight: 'bold',
    width: '110%',
  },

  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: '5%',
    width: '100%',
  },

  imageBackgroundMain: {
    padding: 15,
    flex: 1,
    height: 150,
  },

  ImageBackgroundSub: {
    paddingTop: 60,
    paddingLeft: 10,
    height: 135,
    width: 150,
    justifyContent: 'space-around',

    borderRadius: 15,
  },

  ImageBackgroundMainPtwo: {
    padding: 10,
    flex: 1,
    height: 250,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '5%',
  },

  imageTextMainPtwo: {
    color: Colors.FontColor,
    fontSize: 28,
    fontWeight: 'bold',
  },

  tableText: {
    color: Colors.FontColor,
    fontSize: 20,
    fontWeight: 'bold',
  },

  communityLGC: {
    justifyContent: 'space-between',
    width: '100%',
    height: 150,
    padding: 20,
    flexDirection: 'row',
    borderRadius: 20,
  },

  weatherReportStyle: {
    padding: 15,
    flex: 1,
    height: 170,
    borderRadius: 20,
    alignItems: 'center',
    // flexDirection:'row',
    justifyContent: 'center',
  },
})
