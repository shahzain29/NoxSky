import React, {Component, useState, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {useSelector} from 'react-redux'
import {
  sendMessageAPI,
  getMessagesWithoutConversationIdAPI,
  updateMessageCounterAPI,
} from '../API/Methods/userApi'

import Loader from '../Assets/Components/Loader'

const ChatScreen = ({navigation, route}) => {
  var userName = ''
  var recieverId = ''
  var conversationId=''

  if (route.params.chatParamMsg) {
    userName = route.params.chatParamMsg.sender_username
    recieverId = route.params.chatParamMsg.sender_id
    conversationId = route.params.chatParamMsg.conversation_id
  } 
  else if(route.params.chatParamMsg1){
    userName= route.params.chatParamMsg1.reciever_username
    recieverId= route.params.chatParamMsg1.reciever_id
    conversationId = route.params.chatParamMsg1.conversation_id
  }
  
  else {
    userName = route.params.chatParam.user_name
    recieverId = route.params.chatParam.user_id
    conversationId = route.params.chatParam.conversation_id
  }

  const userid = useSelector(state => state.userId.userId.id)
  const Token = useSelector(state => state.general.userToken)

  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState('')

  useEffect(() => {
    // console.log('reciever DATA=>', conversationId )
    // setLoader(true)
    getMessagesPress()
   
  }, [conversation])
  
  useEffect(() => {
 onUpdateMessageCounterPress()
  },[])

  const onUpdateMessageCounterPress = async () => {

    try {
      const formData =  new FormData()

      formData.append('user_id',recieverId)
      formData.append('conversation_id',conversationId)

      const response = await updateMessageCounterAPI(formData)

      console.log('updateMessageCounterAPI-status=>>',response.status)
    } catch (error) {
      console.log('updateMessageCounterAPI-error=>>', error)
    }
  }

  const getMessagesPress = async () => {
    try {
      const formData = new FormData()

      formData.append('receiver_id', recieverId)
      formData.append('user_id', userid)

      const response = await getMessagesWithoutConversationIdAPI(formData)

      console.log('getMessagesPress-status=>>>', response.status)

      setConversation(response.data.data)
      setLoader(false)
      // console.log('conversation', conversation)
    } catch (error) {
      console.log('getMessagesPress-ERROR=>>>', error)
      setLoader(false)
    }
  }
  const checkEmpty =(msg) =>{
    if (msg==''){
      alert("Write a message")
    }

    else{
      onSendMessagePress(msg)
    }
  }
  const onSendMessagePress = async msg => {
    try {
      const formData = new FormData()

      formData.append('user_id', userid)
      formData.append('receiver_id', recieverId)
      formData.append('message', msg)

      const response = await sendMessageAPI(formData)

      console.log('sendMessageAPI-Status=>', response.status)

      if (response.status === 200) {
        setMessage('')
      }
    } catch (error) {
      console.log('sendMessageAPI Error=>', error)
    }

    getMessagesPress()
  }

  return (
    <AppConsumer>
      {appConsumer => (
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: appConsumer.theme.colors.background,
              // backgroundColor:'blue',
            },
          ]}>
          <View
            style={{
              padding: 10,
              paddingBottom: 60,
              height: '90%',
              width: '100%',
              // backgroundColor: 'red',
              // justifyContent: 'space-between',
              marginTop: '17%',
            }}>
            <FlatList
              inverted
              data={conversation}
              renderItem={({item}) => (
                <View>
                  {userid === item.sender_id ? (
                    <LinearGradient
                      colors={['#393133', '#302d35', '#272a38']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.messageBubble2}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: appConsumer.theme.colors.FontColor,
                          fontWeight: 'bold',
                        }}>
                        {item.message}
                      </Text>
                    </LinearGradient>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name='user-circle-o'
                        size={35}
                        color={appConsumer.theme.colors.FontColor}
                        onPress={() =>
                          navigation.navigate('User', {paramKey: recieverId})
                        }
                        style={{margin: 2}}
                      />

                      <LinearGradient
                        colors={['#393133', '#302d35', '#272a38']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={styles.messageBubble}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: appConsumer.theme.colors.FontColor,
                            fontWeight: 'bold',
                          }}>
                          {item.message}
                        </Text>
                      </LinearGradient>
                    </View>
                  )}
                </View>
              )}
            />
            <Loader loading={loader} isShowIndicator={true} />
          </View>
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: 'black',
              position: 'absolute',
              marginTop: '10%',
              marginLeft: '5%',
            }}>
            <View
              style={{
                // backgroundColor:'blue',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <Back
                name='arrowleft'
                size={35}
                color={appConsumer.theme.colors.FontColor}
                style={{
                  backgroundColor: '#303030',
                  padding: 15,

                  borderRadius: 40,
                  width: 65,
                  height: 65,
                }}
                onPress={() => navigation.navigate('Messages')}
              />

              <Icon
                name='user-circle-o'
                size={65}
                color={appConsumer.theme.colors.FontColor}
                onPress={() =>
                  navigation.navigate('User', {paramKey: recieverId})
                }
              />
            </View>

            <View
              style={{
                marginLeft: '5%',
                flex: 1.2,
                // backgroundColor:'red'
              }}>
              <Text
                style={[
                  styles.nameHeading,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                {userName}
              </Text>
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              //  backgroundColor:'blue',
            }}>
            <LinearGradient
              colors={['#2f2f2f', '#282828', '#202020']}
              style={styles.LGmsgInput}>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  width: '100%',
                  paddingRight: 15,
                }}>
                <TextInput
                  style={[
                    styles.inpStyle,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}
                  keyboardType={'visible-password'}
                  placeholder='Message...'
                  placeholderTextColor={appConsumer.theme.colors.FontColor}
                  multiline={true}
                  onChangeText={text => setMessage(text)}
                  value={message}
                />

                <TouchableOpacity onPress={() => checkEmpty(message)}>
                  <Icon
                    name='angle-right'
                    size={50}
                    color={appConsumer.theme.colors.FontColor}
                    style={{
                      backgroundColor: '#444c6b',
                      height: 50,
                      width: 50,
                      borderRadius: 30,
                      paddingLeft: 20,
                    }}
                  />
                </TouchableOpacity>
              </ScrollView>
            </LinearGradient>
          </View>
        </View>
      )}
    </AppConsumer>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    paddingTop: 40,
    height: '100%',
  },

  nameHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '3%',
  },

  LGmsgInput: {
    width: '90%',
    borderRadius: 20,
    height: '120%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  inpStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '88%',
  },

  messageBubble: {
    alignItems: 'center',
    justifyContent: 'center',
    // height:30,
    // width:'50%'
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 8,
    margin: 3,
    marginLeft: 5,
    maxWidth: '50%',
  },

  messageBubble2: {
    alignItems: 'center',
    justifyContent: 'center',
    // height:30,
    // width:'50%'
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 8,
    margin: 3,
    maxWidth: '45%',
  },
})
