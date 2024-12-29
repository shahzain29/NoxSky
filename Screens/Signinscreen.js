import React, {useState, useEffect,} from 'react';
import {StatusBar,PermissionsAndroid,Platform} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppContextProvider, AppConsumer} from './Context/Appcontext';
import {normal, red} from './Context/Themes';
import {Colors} from './Utils/Colors';
import {loginAPI} from '../API/Methods/userApi';
import {Store} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {setUserToken, setUserId, setUserLocation} from '../redux/actions';
import {bindActionCreators} from 'redux';
import Loader from '../Assets/Components/Loader';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const Signinscreen = ({navigation}) => {
  const dispatch = useDispatch();
  const uid = useSelector(state => state.userId.userId);
  const token = useSelector(state => state.general.userToken);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getUserLocation();
    skipLogin();
  }, [token]);

  const skipLogin = () => {
    if (token != '') {
      // setLoader(true);
      // getUserLocation();
      navigation.navigate('Main');
    }
  };

  
  const inputcheck = async () => {
    if (userName === '') {
      alert('Username is required');
    } else if (password === '') {
      alert('Enter Password'); 
    } else {
      onSignInPress();
    }
  };

  const getUserLocation  = async () => {

    // if (Platform.OS === 'ios') {
    //   const auth = await Geolocation.requestAuthorization("whenInUse");
    //   if(auth === "granted") {
    //      // do something if granted...
    //   }
    // }
    setLoader(true)
  
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if ('granted' == PermissionsAndroid.RESULTS.GRANTED) {
        // do something if granted...

        Geolocation.getCurrentPosition(
          info => {
            // console.log(info.coords)
    
            const currentLocation = {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            };
    
            dispatch(setUserLocation(currentLocation));
    
          },
          err => {
            console.log('getCurrentPosition.error', err);
            // debugger;
            // resolve(false);
          },
          {
            enableHighAccuracy: false,
            // timeout: 20000,
            // maximumAge: 1000,
          },
        );
      }
    }

    setLoader(false)
    
  };

  const onSignInPress = async () => {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append('user_name', userName);
      formData.append('password', password);

      const response = await loginAPI(formData);

      console.log('onSignInPress-status', response.status);
      //  console.log('onSignInPress-Data.id-', response.data.data.id)
      // console.log('TOKEN=>>' , response.data.token )

     ;

      // console.log('redux user id-', uid.id)

      if (response.data.status === 100){
      setLoader(false);
        alert('userName or Password not correct');
      }
      
        else if (response.data.status == 200) {
          dispatch(setUserToken(response.data.token));
          dispatch(setUserId(response.data.data))
      setLoader(false)
      navigation.navigate('Main');
      setUserName('');
      setPassword('');
        }
    } catch (error) {
      setLoader(false);
      console.log('onSignInPress-error', error);
    }
  };

  return (
    <AppConsumer>
      {appConsumer => (
        <KeyboardAwareScrollView
          style={{backgroundColor: appConsumer.theme.colors.background}}>
          <View style={{padding: 15, flex: 1, justifyContent: 'space-evenly'}}>
            <View
              style={{
                top: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../Assets/Images/Nox_Sky_Logo1.png')}
                style={styles.logo}
                resizeMode="cover"
              />
            </View>

            <View
              style={{
                marginTop: '60%',
                height: '65%',
                justifyContent: 'space-evenly',
              }}>
              <View style={styles.innerContainer}>
                <Text
                  style={[
                    styles.Labelstyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Username
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
                    placeholder="Type..."
                    placeholderTextColor={appConsumer.theme.colors.FontColor}
                    onChangeText={text => setUserName(text)}
                    value={userName}
                  />
                </LinearGradient>
              </View>

              <View style={styles.innerContainer}>
                <Text
                  style={[
                    styles.Labelstyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Password
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
                    placeholder="Type..."
                    placeholderTextColor={appConsumer.theme.colors.FontColor}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                  />
                </LinearGradient>
              </View>

              <View style={styles.innerContainer}>
                <TouchableOpacity
                  style={{width: 100, alignItems: 'center'}}
                  onPress={inputcheck}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#4d516b', '#5e5867', '#6d5e63']}
                    style={styles.buttonstyle}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: appConsumer.theme.colors.FontColor,
                      }}>
                      SignIn
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{width: 100, alignItems: 'center'}}
                  onPress={() => navigation.navigate('Signup')}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#6d5e63', '#5e5867', '#4d516b']}
                    style={styles.buttonstyle}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: appConsumer.theme.colors.FontColor,
                      }}>
                      SignUp
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={{
                  height: 40,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: appConsumer.theme.colors.FontColor,
                    fontWeight: 'bold',
                    fontSize: 20,
                    textDecorationLine: 'underline',
                  }}>
                  Forgot Your Password?
                </Text>
              </TouchableOpacity>
            </View>

            <Loader loading={loader} isShowIndicator={true} />
          </View>
        </KeyboardAwareScrollView>
      )}
    </AppConsumer>
  );
};

export default Signinscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  Labelstyle: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: '2%',
  },

  heading: {
    marginLeft: '20%',
    marginTop: '30%',
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
  },

  buttonstyle: {
    height: 60,
    width: 130,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  linearGradient: {
    width: '60%',
    paddingLeft: 5,
    paddingTop: 5,
    marginLeft: '5%',
    marginTop: 10,
    borderRadius: 10,
    height: 60,
  },
  inputstyle: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 20,
  },
  logo: {
    height: 200,
    width: 300,
  },
});
