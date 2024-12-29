import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Keyboard,
    Platform,
} from 'react-native';
import { StackActions, navigation } from '@react-navigation/native';
import GradientContainer from 'app/components/GradientContainerSignup';
import InputField from 'app/components/RegistrationInput/RegistrationInput'
import Button from 'app/components/button/Button'
import Font from './../../assets/Fonts/'
import StaticTxt from 'app/utils/en'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isIphoneX } from 'app/lib/isIphoneX'
import database from '@react-native-firebase/database';
import moment from 'moment'
import { getUser } from 'app/utils/Prefrences'
import EmojiBoard from 'react-native-emoji-board'
import { event } from 'react-native-reanimated';

const onClick = emoji => {  
    console.log(emoji);
    this.setState({
        show: false
    })
};
const UserTableRef = database().ref('/users');
const chatRoomRef = database().ref('/ChatRoom');
export default class MsgDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userIdForUpdate: '',
            senderId: '',
            reciverId: '',
            userEmail: getUser().email,
            show: false,
            msgTxt: '',
            personName: '',
            chatRoomId: '',
            keyboardHeight: 0,
            msgList: [],
            isDisableDate: true,
            personImage:null
        }
        this.firebaseRef = null
    }
    componentDidMount() {
        if (this.props.route.params) {
            this.setState({
                personName: this.props.route.params.personName,
                personImage:this.props.route.params.personImage,
                chatRoomId: this.props.route.params.chatRoomId,
                reciverId: this.props.route.params.reciverId,
                senderId: this.props.route.params.sender,
                disableDate: this.props.route.params.dateForChatDisable,

            }, () => {
                const currentDate = moment(moment().format('YYYY-MM-DD'), "'YYYY-MM-DD'")
                console.log(this.state.disableDate)
                console.log('date: bef ', moment(this.state.disableDate, 'YYYY-MM-DD').diff(currentDate))
                if (moment(this.state.disableDate, 'YYYY-MM-DD').diff(currentDate) >= 0) {
                    this.setState({ isDisableDate: true })
                }
                else {
                    this.setState({ isDisableDate: false })
                }



                this.getMsgList()
                this.updatMsgCounter()
            })
        }
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    onFirebaseValueChanged = (snapshot) => {
        var fbObject = snapshot.val();
        var idTemp = [];
        if (fbObject) {
            Object.values(fbObject).map((item, index) => {
                idTemp.push({ ...item });
            })
        }
        setTimeout(() => {
            this.updatMsgCounter()
        }, 3000);
        idTemp.sort((item1, item2) => {
            if (moment(item1.dateTime).isBefore(moment(item2.dateTime))) {
                return false;
            } else {
                return true;
            }
        })
        this.setState({
            msgList: []
        }, () => {
            this.setState({
                msgList: idTemp
            })
        })
    };
    getMsgList() {
        chatRoomRef.child(this.state.chatRoomId).once("value", (snapshot) => {
            // console.log('snapshot.val()', snapshot.val());
            const value = snapshot.val()
            if (value == null) {
                // console.log('chat not exit')
                this.setState({
                    msgList: []
                })
            }
            else {
                // console.log('chat exit')
                var friendList = Object.values(snapshot.val())
                friendList.sort((item1, item2) => {
                    if (moment(item1.dateTime).isBefore(moment(item2.dateTime))) {
                        return false;
                    } else {
                        return true;
                    }
                })
                this.setState({
                    msgList: friendList,
                }, () => {
                    setTimeout(() => {
                        if (this.FlatListRef) this.FlatListRef.scrollToEnd({ animated: true })
                    }, 500);
                    this.firebaseRef = database().ref('/ChatRoom/').child(this.state.chatRoomId)
                    this.firebaseRef.on("value", this.onFirebaseValueChanged);
                    // console.log('M---', this.state.msgList)
                })
            }
        });
    }
    updatMsgCounter() {
        var updatedFriendList = []
        UserTableRef.child(this.state.senderId).once("value", (snapshot) => {
            const value = snapshot.val()
            if (value == null) { } else {
                updatedFriendList = value.userFriend
                for (var i = 0; i < updatedFriendList.length; i++) {
                    if (updatedFriendList[i].chatRoomId === this.state.chatRoomId.toString()) {
                        updatedFriendList[i] = {
                            chatRoomId: updatedFriendList[i].chatRoomId,
                            first_name: updatedFriendList[i].first_name,
                            image: updatedFriendList[i].image,
                            last_name: updatedFriendList[i].last_name,
                            userId: updatedFriendList[i].userId,
                            eventEndDate: updatedFriendList[i].eventEndDate,
                            lastMsg: updatedFriendList[i].lastMsg,
                            timeStamp: updatedFriendList[i].timeStamp,
                            msgCounter: 0
                        }
                        console.log('update Msg Counter')
                    }
                }
                UserTableRef.child(this.state.senderId).update({
                    userFriend: updatedFriendList,
                }).then(() => {
                    console.log('counter updated.')
                });
            }
        });

    }
    sendMsgToChatRoom(msg) {
        chatRoomRef.child(this.state.chatRoomId)
            .push(msg).then((data) => {
                if (this.FlatListRef) this.FlatListRef.scrollToEnd({ animated: true })
                this.updateLastMsg(true, this.state.senderId, msg.msg, msg.userId, msg.dateTime)
                this.updateLastMsg(false, this.state.reciverId, msg.msg, msg.userId, msg.dateTime)
            }).catch((error) => {
                console.log('error ', error)
            })
    }

    updateLastMsg(isSender, keyId, msg, userId, time) {
        var updatedFriendList = []
        UserTableRef.child(keyId).once("value", (snapshot) => {
            const value = snapshot.val()
            if (value == null) { } else {
                updatedFriendList = value.userFriend
                for (var i = 0; i < updatedFriendList.length; i++) {
                    if (updatedFriendList[i].chatRoomId === this.state.chatRoomId.toString()) {
                        updatedFriendList[i] = {
                            chatRoomId: updatedFriendList[i].chatRoomId,
                            first_name: updatedFriendList[i].first_name,
                            image: updatedFriendList[i].image,
                            last_name: updatedFriendList[i].last_name,
                            userId: updatedFriendList[i].userId,
                            eventEndDate: updatedFriendList[i].eventEndDate,
                            lastMsg: msg,
                            timeStamp: time,
                            msgCounter: (updatedFriendList[i].msgCounter != undefined && isSender === false) ? parseInt(updatedFriendList[i].msgCounter) + 1 : isSender === false ? 1 : updatedFriendList[i].msgCounter
                        }
                        console.log('haskdfhk')
                    }
                }
                console.log('keyId.', keyId)
                UserTableRef.child(keyId).update({
                    userFriend: updatedFriendList,
                }).then(() => {
                    console.log('userFriend updated.')
                });
            }
        });

    }
    componentWillUnmount() {
        if (this.keyboardDidShowListener) this.keyboardDidShowListener.remove()
        if (this.keyboardDidHideListener) this.keyboardDidHideListener.remove()
    }
    _keyboardDidShow = (e) => {
        let keyboardHeight = Platform.OS === 'ios' ? e.endCoordinates.height : 0
        this.setState({ keyboardHeight }, () => {
            setTimeout(() => {
                if (this.FlatListRef) this.FlatListRef.scrollToEnd({ animated: true })
            }, 200);
        })
    };

    _keyboardDidHide = () => {
        this.setState({ keyboardHeight: 0 }, () => {

        })
    };
    render() {
        const { keyboardHeight } = this.state
        console.log('keyboardHeight', keyboardHeight)
        return (
            <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'white' }}>
                <View style={{ width: '100%', height: isIphoneX() ? 100 : 90 }}>
                    <GradientContainer>
                        <View style={styles.container}>
                            <StatusBar
                                translucent={true}
                                backgroundColor="transparent"
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: isIphoneX() ? 30 : 15, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                        <Image resizeMode={'contain'} style={{ width: 20, height: 20, marginLeft: 20 }} source={require('app/assets/Images/backarrow_white.png')} />
                                    </TouchableOpacity>
                                     <Image 
                                        resizeMode={'cover'}
                                        style={styles.listPicture}
                                        source={{uri:"https://mixer.appcrates.co/"+this.state.personImage}}
                                     />
                                    <Text style={styles.logoText}>{this.state.personName}</Text>
                                </View>
                            </View>
                        </View>
                    </GradientContainer>
                </View>
                <View style={{ flex: 1, paddingBottom: keyboardHeight + (isIphoneX() ? 90 : 75), width: '100%' }}>
                    <FlatList
                        data={this.state.msgList}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        listKey={moment().format('x').toString()}
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ flex: 1 }}
                        extraData={this.state}
                        ref={ref => (this.FlatListRef = ref)}
                        // onContentSizeChange={() => }
                        // onLayout={() => this.FlatListRef.scrollToEnd({ animated: true })}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ backgroundColor: 'white' }}>
                                    <View
                                        style={[styles.listItemCont, {
                                            backgroundColor: item.userId != getUser().email ? 'rgba(250, 202, 67, 0.1)' : 'rgba(58, 119, 246, 0.08)',
                                            borderTopLeftRadius: item.userId != getUser().email ? 16 : 16,
                                            borderTopRightRadius: item.userId != getUser().email ? 16 : 16,
                                            borderBottomLeftRadius: item.userId != getUser().email ? 0 : 16,
                                            borderBottomRightRadius: item.userId != getUser().email ? 16 : 0,
                                            alignSelf: item.userId != getUser().email ? 'flex-start' : 'flex-end'
                                        }]}>
                                        <Text style={styles.titleStyle}>{item.msg}</Text>
                                    </View>
                                    <Text style={[styles.listMsgTime, { alignSelf: item.userId != getUser().email ? 'flex-start' : 'flex-end' }]}>{moment(item.dateTime).format('hh:mm')}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
                {this.state.isDisableDate===true &&
                <View style={[styles.bottomCont, { height: isIphoneX() ? 80 : 65, marginBottom: keyboardHeight }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ paddingLeft: 20, }} onPress={() => {
                            // Keyboard.dismiss()
                            this.setState({
                                show: !this.state.show,
                            })
                        }}>
                            <Image
                                resizeMode={'contain'}
                                style={{
                                    width: 25, height: 25, marginTop: Platform.OS === 'ios' ? 3 : 10
                                }}
                                source={require('app/assets/Images/emoji.png')}
                            />
                        </TouchableOpacity>
                        <EmojiBoard
                            containerStyle={{ marginBottom: 45 }}
                            showBoard={this.state.show}
                            onRemove={() => {
                                this.setState({
                                    show: false,
                                })
                            }}
                            onClick={onClick} onClick={emoji => {
                                console.log(emoji);
                                this.setState({
                                    // show: false,
                                    msgTxt: this.state.msgTxt + emoji.code
                                })
                            }} />
                        <TextInput
                            // editable={this.state.isDisableDate}
                            style={styles.msgInput}
                            placeholder='Type your message...'
                            placeholderTextColor={'#B7BABF'}
                            value={this.state.msgTxt}
                            onChangeText={(text) => this.setState({ msgTxt: text })}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.msgTxt != '') {
                                var temp = {
                                    userId: this.state.userEmail,
                                    msg: this.state.msgTxt,
                                    dateTime: database.ServerValue.TIMESTAMP
                                }
                                var tempFlatList = {
                                    userId: this.state.userEmail,
                                    msg: this.state.msgTxt,
                                    dateTime: moment(new Date()).valueOf(),
                                }
                                let tempAry = this.state.msgList
                                tempAry.push(tempFlatList)
                                this.sendMsgToChatRoom(temp)
                                this.setState({
                                    show: false,
                                    msgTxt: '',
                                    msgList: tempAry,
                                })
                            }
                        }}
                    >
                        <Image
                            resizeMode={'contain'}
                            style={{ width: 30, height: 30 }}
                            source={require('app/assets/Images/send_arrow.png')}
                        />
                    </TouchableOpacity>
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
    },
    inputContainer: {
        marginTop: 12,
    },
    searchStyle: {
        position: 'absolute',
        left: 55,
        width: '60%',
        paddingLeft: 10,
        height: 40,
        fontSize: 18,
        color: 'white',
    },
    logoText: {
        fontFamily: Font.Bold,
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 15,
    },
    listItemCont: {
        width: '70%',
        flexDirection: 'row',
        marginLeft: 16,
        marginRight: 16,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10
    },
    listPicture: {
        width: 44,
        height: 44,
        borderRadius: 30,
        backgroundColor:'#E0E0E0',
        marginStart:10
    },
    titleStyle: {
        fontSize: 16,
        color: '#2F3034',
        fontFamily: Font.Regular,
        paddingLeft: 10,
        paddingRight: 10
    },
    lastMsg: {
        color: '#2F3034',
        fontSize: 14,
        fontFamily: Font.Regular
    },
    timeStyle: {
        color: '#B7BABF',
        fontSize: 14,
        fontFamily: Font.Regular
    },
    msgCont: {
        backgroundColor: '#3A77F6',
        borderRadius: 30,
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomCont: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopColor: '#DCDDDF',
        borderTopWidth: 1,
        width: '100%',
        height: 65,
        alignItems: 'center',
        // paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between'

    },
    msgInput: {
        width: '76%',
        marginLeft: 20,
        fontSize: 16,
        color: '#B7BABF',
        fontWeight: '600',
        fontFamily: Font.Regular
    },
    listMsgTime: {
        backgroundColor: 'white',
        color: '#B7BABF',
        marginTop: 10,
        marginLeft: 16,
        marginRight: 16
    }
});

