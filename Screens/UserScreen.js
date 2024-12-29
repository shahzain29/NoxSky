import 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react'
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
import LinearGradient from 'react-native-linear-gradient'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {useSelector} from 'react-redux'
import {getUserCommunityAPI,followUserAPI,unfollowUserAPI} from '../API/Methods/userApi'



const UserScreen = ({navigation,route}) => {
  LogBox.ignoreAllLogs(true)

  const Token = useSelector(state => state.general.userToken)
  const userid= useSelector(state=> state.userId.userId.id)

  const [userData,setUserData] = useState([])
  const [communityData,setCommunityData] = useState([])
  const [followButton,setFollowButton]= useState('Follow')
  const [fbutton, setFbutton] =useState(true)
  
  useEffect(()=>{
    onGetUserPress(route.params.paramKey)
    onGetUserCommunityPress(route.params.paramKey)
    // console.log('userId=>>',userid)
  },[])
  

  const onGetUserPress =(userId) =>{

     fetch(
      'https://badralsayed.site/Nox_Sky/public/api/User_Profile?user_id=' + userId,
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
          'responseFind_trip-->','-' + JSON.stringify(response.status),
        )
        setUserData(response.data)

        if(userid==response.data.id){
          setFbutton(false)
        }

        

        // console.log(profileData)
      })
      .catch(error => {
        console.log('Error:', error)
      })

  }

  const onGetUserCommunityPress =async (userId)=>{

    try {
      const formData=new FormData()
      formData.append('user_id',userId)

      const response= await getUserCommunityAPI(formData)

      console.log('getUserCommunityAPI-status--', response.status)
      setCommunityData(response.data.data)
    } catch (error) {

      console.log('getUserCommunityAPI-error-',error)
      
    }
    
  }

  const followUserPress = async(userId)=>{
    var response;
    try {
      const formData=new FormData()
      formData.append('follow_by',userId)

      if(followButton=='Follow'){

       response= await followUserAPI(formData)
      setFollowButton('Unfollow')
      }
      if(followButton=='Unfollow'){
         response = await unfollowUserAPI(formData)
         setFollowButton('Follow')
      }
      console.log('followUserAPI-status--', response.status)
      // setFbutton(false)
      
    } catch (error) {

      console.log('followUserAPI-error-',error)
      
    }
  }



  
  return (
    <AppConsumer>
      {appConsumer => (
        <View style={{paddingBottom: 20}}>
          <ScrollView
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
                borderRadius: 40,
                width: 70,
                height: 70,
              }}
              onPress={() => navigation.goBack()}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginTop: '2%',
              }}>
              <Text
                style={[
                  styles.headingStyle,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Profile
              </Text>
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
                  height: 180,
                }}>
                <Text
                  style={[
                    styles.name,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  {userData.name}
                </Text>

                <Text
                  style={[
                    styles.details,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Followers:{userData.total_followers}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Following:{userData.following}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Trips:{userData.trips}
                </Text>

                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                  <Symbol
                    name={'instagram'}
                    size={40}
                    color={appConsumer.theme.colors.FontColor}
                  />

                  <Text
                    style={[
                      styles.details,
                      {color: appConsumer.theme.colors.FontColor},
                    ]}>
                    {userData.instagram}
                    
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 2,
                borderColor: Colors.FontColor,
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
                      flex: 1,
                      flexDirection: 'column',
                      margin: 1,
                      height: 120,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('LatestOtherUserScreen', {paramKey: item})
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
          </ScrollView>

          <View
            style={{
              padding: 10,
              height:100,
              backgroundColor: appConsumer.theme.colors.background,
              
            }}>
            {fbutton==true?  
            <TouchableOpacity style={{height: 80, width: '100%'}} onPress={()=>followUserPress(route.params.paramKey)}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[Colors.Grad3, Colors.Grad2, Colors.Grad1]}
                style={styles.LGbtn}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: appConsumer.theme.colors.FontColor,
                  }}>
                  {followButton}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            :null} 
          </View>
        </View>
      )}
    </AppConsumer>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  scrollStyle: {
    padding: 20,
    paddingTop: 40,
    height: '90%',
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
  LGbtn: {
    height: '100%',
    width: '95%',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 20,
    bottom:10,
  },
})
