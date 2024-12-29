import React, {Component, useEffect, useState} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, LogBox,} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {getConversationAPI } from '../API/Methods/userApi'
import {useSelector} from 'react-redux'
import Loader from '../Assets/Components/Loader'



const MessagesScreen = ({navigation}) => {
LogBox.ignoreAllLogs(true)
  const userId = useSelector(state => state.userId.userId.id)
  const [conversationData, setConversationData] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    // console.log(userId)
    setLoader(true)
    onGetConversationPress()
  }, [])


  const onGetConversationPress = async () => {
    try {
      const formData = new FormData()

      formData.append('user_id', userId)

      const response = await getConversationAPI(formData)

      console.log('getConversationAPI-status=>>', response.status)

      setConversationData(response.data.data.data)

      setLoader(false)
    } catch (error) {
      console.log('getConversationAPI-ERROR=>>', error)
      setLoader(false)
    }   
  }

  return (
    <AppConsumer>
      {appConsumer => (
        <View
          style={[
            styles.MainContainer,
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
            onPress={() => navigation.navigate('Community')}
          />

          <Text
            style={[
              styles.HeadingStyle,
              {color: appConsumer.theme.colors.FontColor},
            ]}>
            Messages
          </Text>

          <View
            style={{
              height: 1,
              width: '100%',
              borderBottomWidth: 1,
              borderColor: appConsumer.theme.colors.FontColor,
              marginTop: '6%',
            }}></View>

          <FlatList
            data={conversationData}
            renderItem={({item}) => (
               
               <View> 

              {item.sender_id==userId ? (
                // IF CONDITION
              <TouchableOpacity
                style={{height: 110}}
                onPress={() =>
                  navigation.navigate('Chat', {chatParamMsg1: item})
                }>
                <View
                  style={[
                    styles.ListStyle,
                    {borderColor: appConsumer.theme.colors.FontColor},
                  ]}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Icon
                      name='user-circle-o'
                      size={60}
                      color={appConsumer.theme.colors.FontColor}
                    />
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flex: 3,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={[
                        styles.TextStyle,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      {item.reciever_username}
                    </Text>
                    {item.message_count!=0 &&
                  
                   
                     <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={[Colors.Grad3, Colors.Grad2, Colors.Grad1]}
                      style={styles.LGmessageContainer}>
                      <Text
                        style={[
                          styles.messagecounttextStyle,
                          {color: appConsumer.theme.colors.FontColor},
                        ]}>
                      
                        {item.message_count}
                         
                      </Text>
                    </LinearGradient>  }
                  </View>
                </View>
              </TouchableOpacity>
              
              ):( 
                // ELSE Condition
                <TouchableOpacity
                style={{height: 110}}
                onPress={() =>
                  navigation.navigate('Chat', {chatParamMsg: item})
                }>
                <View
                  style={[
                    styles.ListStyle,
                    {borderColor: appConsumer.theme.colors.FontColor},
                  ]}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Icon
                      name='user-circle-o'
                      size={60}
                      color={appConsumer.theme.colors.FontColor}
                    />
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flex: 3,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={[
                        styles.TextStyle,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      {item.sender_username}
                    </Text>

                    {item.message_count!=0 &&
                  
                   
                  <LinearGradient
                   start={{x: 0, y: 0}}
                   end={{x: 1, y: 0}}
                   colors={[Colors.Grad3, Colors.Grad2, Colors.Grad1]}
                   style={styles.LGmessageContainer}>
                   <Text
                     style={[
                       styles.messagecounttextStyle,
                       {color: appConsumer.theme.colors.FontColor},
                     ]}>
                   
                     {item.message_count}
                      
                   </Text>
                 </LinearGradient>  }
                  </View>
                </View>
              </TouchableOpacity>


              )}
              </View>
            )}
          />
          <Loader loading={loader} isShowIndicator={true} />
        </View>
      )}
    </AppConsumer>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({
  MainContainer: {
    padding: 20,
    paddingTop: 40,
    height: '100%',
  },

  TextStyle: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  ListStyle: {
    flexDirection: 'row',
    height: 100,
    borderBottomWidth: 0.5,

    justifyContent: 'center',
  },
  HeadingStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  LGmessageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagecounttextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
