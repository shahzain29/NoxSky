import 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  LogBox,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Back from 'react-native-vector-icons/AntDesign'
import Symbol from 'react-native-vector-icons/FontAwesome'
import {Colors} from './Utils/Colors'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {useDispatch} from 'react-redux'
import {setUserToken,setInsta} from '../redux/actions'
import {logOutAPI} from '../API/Methods/userApi'
import {useSelector} from 'react-redux'
import Loader from '../Assets/Components/Loader'
import {getUserCommunityAPI} from '../API/Methods/userApi'



const ProfileScreen = ({navigation}) => {
  LogBox.ignoreAllLogs(true)
 

  const dispatch = useDispatch()

  const Token = useSelector(state => state.general.userToken)
  const userId = useSelector(state => state.userId.userId)

  const instagram = useSelector(state => state.instagram.insta)
  
  const [loader, setLoader] = useState(false)
  const [communityData, setCommunityData] = useState([])

  const [profileData, setProfileData] = useState([])
  const [instaId,setInstaId] = useState('')

  const onLogoutPress = async () => {
    const response = await logOutAPI()

    console.log(response.status)
    dispatch(setUserToken(''))
    // dispatch(setUserId(''))
    navigation.navigate('Signin')
  }

  useEffect(() => {
    setLoader(true)
    getProfile()
    getUserCommunityPress()
    console.log("userInsta=>",instagram)
  }, [])

  
  const getProfile = () => {
    fetch(
      'https://badralsayed.site/Nox_Sky/public/api/User_Profile?user_id=' +
        userId.id,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + Token,
        },
      },
    )
      .then(response => response.json())
      .then(response => {
        console.log(
          'response_Get_Profile-->',
          '-' + JSON.stringify(response.status),
        )
        setProfileData(response.data)

        // console.log(profileData)
      })
      .catch(error => {
        setLoader(false)
        console.log('Error:', error)
      })
  }

  const getUserCommunityPress = async () => {
    try {
      const formData = new FormData()

      formData.append('user_id', userId.id)

      const response = await getUserCommunityAPI(formData)
      console.log('getUserCommunityAPI-data', response.status)

      setCommunityData(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log('getUserCommunityAPI-error', error)
    }
  }

  

  return (
    <AppConsumer>
      {appConsumer => (
        <ScrollView
          style={[
            styles.scrollStyle,
            {backgroundColor: appConsumer.theme.colors.background},
          ]}
          nestedScrollEnabled={true}>
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

          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                alignItems: 'center',
                // marginTop: '5%',
                flex: 3,
              }}>
              <Text
                style={[
                  styles.headingStyle,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Profile
              </Text>

              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Symbol
                  name='gear'
                  size={40}
                  color={appConsumer.theme.colors.FontColor}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={()=>onLogoutPress()}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#191919', '#282828', '#393939']}
                  style={styles.LGlogoutBtn}>
                  <Text
                    style={{
                      color: '#9d4d49',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Log Out
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              flex: 3,
              width: '100%',
            }}>
            <View style={{flex: 2, alignItems: 'flex-start'}}>
              <Symbol
                name='user-circle-o'
                size={110}
                color={appConsumer.theme.colors.FontColor}
              />
            </View>

            <View
              style={{
                flex: 3,
                flexDirection: 'column',

                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.name,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                {profileData.name}
              </Text>

              <Text
                style={[
                  styles.details,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Followers:{profileData.total_followers}
              </Text>
              <Text
                style={[
                  styles.details,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Following:{profileData.following}
              </Text>
              <Text
                style={[
                  styles.details,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Trips:{profileData.trips}
              </Text>

              <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <Symbol
                  name={'instagram'}
                  size={40}
                  color={appConsumer.theme.colors.FontColor}
                />

               
               <Text style={{color:appConsumer.theme.colors.FontColor,fontSize:25}}> {profileData.instagram}</Text>

              
                
                
              </View>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 2,
              borderColor: appConsumer.theme.colors.FontColor,
              height: 70,
            }}>
            <Text
              style={[
                styles.headingStyle,
                {color: appConsumer.theme.colors.FontColor},
              ]}>
              Latest Trips
            </Text>
          </View>

          <SafeAreaView style={{marginTop: '5%'}}>
            <FlatList
              data={communityData}
              renderItem={({item}) => (
                <View
                  style={{
                    // flex: 1,
                    flexDirection: 'column',
                    margin: 1,
                    marginLeft:'3%',
                    height: 120,
                  
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Latest', {paramKey: item})
                    }>
                    <Image
                      style={{
                        height: 100,
                        width: 100,
                        margin: 2,
                        borderRadius: 10,
                      }}
                      source={{uri: item.image}}
                    />
                  </TouchableOpacity>
                </View>
              )}
              numColumns={3}
            />
          </SafeAreaView>

          <Text style={{marginTop: '10%'}}> </Text>

          <Loader loading={loader} isShowIndicator={true} />
        </ScrollView>
      )}
    </AppConsumer>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  scrollStyle: {
    
    padding: 20,
    paddingTop: 40,

    height: '100%',
  },
  headingStyle: {
    fontSize: 40,

    fontWeight: 'bold',
  },

  name: {
    fontSize: 30,

    fontWeight: 'bold',
  },

  details: {
    fontSize: 20,

    fontWeight: 'bold',
  },

  LGlogoutBtn: {
    height: 40,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
