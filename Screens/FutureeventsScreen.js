import 'react-native-gesture-handler'
import React ,{useState,useEffect} from 'react'
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
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {useSelector} from 'react-redux'
import Loader from '../Assets/Components/Loader'

const FutureeventsScreen =({navigation}) => {
  
    const Token = useSelector((state) => state.general.userToken)
    const image = {uri: 'https://reactjs.org/logo-og.png'}
    const [feData,setFeData]=useState('')
    const [loader, setLoader] = useState(false)


  useEffect(()=>{
    FutureEventsAPI()
    setLoader(true)
  },[])


  const FutureEventsAPI=()=>{

          fetch('https://badralsayed.site/Nox_Sky/public/api/get_events', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer ' + Token, 
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log('responseFind_trip-status-->', '-' + JSON.stringify(response.status))
        setFeData(response.data)
        setLoader(false)
               
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }





    return (
      <AppConsumer>
        {appConsumer => (
          <View
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
              Future Events
            </Text>

           
              
              
              <FlatList
              data={feData}
              renderItem={({item}) => (

              <View style={styles.container}>   
              <TouchableOpacity>
                <ImageBackground
                  source={{uri : item.image}}
                  resizeMode='cover'
                  style={styles.imageBackground}
                  imageStyle={{borderRadius: 25}}>
                  <Text
                    style={[
                      styles.buttonTextStyle,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.buttonTextsubStyle,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    {item.day}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              
              </View>
              )}
              />
               
               <Loader loading={loader} isShowIndicator={true} />
           
          </View>
        )}
      </AppConsumer>
    )
  }

export default FutureeventsScreen

const styles = StyleSheet.create({
  scrollStyle: {
    padding: 15,
    paddingTop: 40,
    flex: 1,
    backgroundColor: 'black',
  },

  headingStyle: {
    fontSize: 35,
    color: Colors.FontColor,
    fontWeight: 'bold',
    marginTop: '5%',
  },

  imageBackground: {
    padding: 10,
    height: 140,
  },

  buttonTextStyle: {
    color: Colors.FontColor,
    fontSize: 30,
    fontWeight: 'bold',
  },

  buttonTextsubStyle: {
    color: Colors.SubFontColor,
    fontSize: 20,
    fontWeight: 'bold',
  },

  container: {
    // justifyContent: 'space-around',
    // height: 530,
    marginTop:'5%',

  },
})
