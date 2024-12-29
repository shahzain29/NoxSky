import React, {Component, useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {Colors} from './Utils/Colors'
import Symbol from 'react-native-vector-icons/FontAwesome'
import Ico from 'react-native-vector-icons/Entypo'
import Back from 'react-native-vector-icons/AntDesign'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {useSelector} from 'react-redux'
import Loader from '../Assets/Components/Loader'
import LinearGradient from 'react-native-linear-gradient'

const ImageProfileScreen = ({navigation, route}) => {
  const image = {uri: route.params.paramPhotographerData.image}
  const Token = useSelector(state => state.general.userToken)
  const [profileData, setProfileData] = useState('')
  const [loader, setLoader] = useState(false)

const photographerData = route.params.paramPhotographerData
const [followButton,setFollowButton]= useState('Follow')
const [fbutton, setFbutton] =useState(true)

  useEffect(() => {
    setLoader(true)
    
    console.log('check data=>>',photographerData)
    getImageProfile(photographerData)
  }, [])

  const getImageProfile = async data => {
    fetch(
      'https://badralsayed.site/Nox_Sky/public/api/User_Profile?user_id=' +
        data.user_id,
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
          'getImageProfile response-->',
          '-' + JSON.stringify(response.status),
        )
        setProfileData(response.data)
      })
      .catch(error => {
        console.log('Error:', error)
      })
    setLoader(false)
  }

  const followUserPress = async()=>{
    var response;
    try {
      const formData=new FormData()
      formData.append('follow_by',photographerData.id)

      if(followButton=='Follow'){

       response= await followUserAPI(formData)
      setFollowButton('Unfollow')
      }
      if(followButton=='Unfollow'){
         response = await unfollowUserAPI(formData)
         setFollowButton('Follow')
      }
      console.log('followUserAPI-status--', response.status)
      setFbutton(false)
      
    } catch (error) {

      console.log('followUserAPI-error-',error)
      
    }
  }

  return (
    <AppConsumer>
      {appConsumer => (
        <View
          style={[
            styles.mainContainer,
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
            onPress={() => navigation.navigate('CommunityMap')}
          />
          <Text
            style={[
              styles.headingStyle,
              {color: appConsumer.theme.colors.FontColor},
            ]}>
            Photographer Profile
          </Text>

          <View style={styles.subContainer}>
            <Image source={image} style={styles.imageStyle} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '120%',
                marginTop:'10%',
                height:'20%',
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Symbol
                  name='user-circle-o'
                  size={60}
                  color={appConsumer.theme.colors.FontColor}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: appConsumer.theme.colors.FontColor,
                    marginBottom: '2%',
                  }}>
                  {profileData.name}
                </Text>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color: appConsumer.theme.colors.FontColor,
                      marginTop: '8%',
                    },
                  ]}>
                  Followers: {profileData.total_followers}
                </Text>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color: appConsumer.theme.colors.FontColor,
                      marginTop: '5%',
                    },
                  ]}>
                  Following: {profileData.following}
                </Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Chat', {chatParam:photographerData})
                  }>
                  <Ico name={'chat'} size={30} color={'#467fd7'} />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '120%',
               
                height:'10%',
                top:10,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 2,
                  
                }}>
                <Symbol
                  name={'instagram'}
                  size={60}
                  color={appConsumer.theme.colors.FontColor}
                />
              </View>
              <View style={{flex: 3}}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: appConsumer.theme.colors.FontColor,
                    marginTop: '5%',
                    left:10
                  }}>
                  {profileData.instagram}
                </Text>
              </View>
            </View>
            <Loader loading={loader} isShowIndicator={true} />
            <View
            style={{
              padding: 10,
              height:100,width:'100%',
              backgroundColor: appConsumer.theme.colors.background,
              // backgroundColor:'red',
              
              top:50,
              bottom:5,
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
          
        </View>
      )}
    </AppConsumer>
  )
}

export default ImageProfileScreen

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    paddingTop: 40,
    height: '100%',
    backgroundColor: Colors.background,
  },
  headingStyle: {
    fontSize: 35,
    fontWeight: 'bold',
  },

  subContainer: {
    alignItems: 'center',
    marginTop: '5%',
    height: '75%',
    justifyContent: 'space-evenly',
  },
  imageStyle: {
    height: 320,
    width: 320,
    borderRadius: 20,
    top:10,
  },
  textStyle: {
    fontSize: 18,
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
