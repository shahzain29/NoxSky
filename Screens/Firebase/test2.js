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
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { StackActions, navigation } from '@react-navigation/native';
import GradientContainer from 'app/components/GradientContainerSignup';
import InputField from 'app/components/RegistrationInput/RegistrationInput'
import Button from 'app/components/button/Button'
import Font from './../../assets/Fonts/'
import StaticTxt from 'app/utils/en'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isIphoneX } from 'app/lib/isIphoneX'
import moment from 'moment'
import { getUser } from 'app/utils/Prefrences'
import database from '@react-native-firebase/database';
import { Wave } from 'react-native-animated-spinkit'

const { width, height } = Dimensions.get('window');
const UserTableRef = database().ref('/users');

export default class MsgList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            senderId: '',
            change: false,
            isSearch: false,
            searchList: [],
            msgList: []
        }
        this.firebaseRef = null
    }
    componentDidMount() {
        console.log('-------', getUser().email)
        this.getUserFriendList()
    }
    onFirebaseValueChanged = (snapshot) => {
        var fbObject = snapshot.val();
        console.log('hello--->', fbObject)
        var idTemp = [];
        if (fbObject) {
            idTemp = fbObject.userFriend
            if (idTemp != undefined) {
                idTemp.sort((item1, item2) => {
                    if (moment(item2.timeStamp).isBefore(moment(item1.timeStamp))) {
                        return false;
                    } else {
                        return true;
                    }
                })
            }
        }
        this.setState({
            msgList: []
        }, () => {
            this.setState({
                msgList: idTemp
            })
        })
    };
    getUserFriendList() {
        this.setState({ loading: true })
        UserTableRef.orderByChild('email').equalTo(getUser().email).once("value", (snapshot) => {
            this.setState({ loading: false })
            console.log('snapshot.val()', snapshot.val());
            var sendId = Object.keys(snapshot.val())
            // console.log('sendId',sendId[0] )
            var senderI = sendId[0]
            const value = snapshot.val()
            if (value == null) {
                console.log('not exit')
                this.setState({
                    msgList: [],
                    searchList: [],
                    senderId: sendId[0]
                }, () => {
                    console.log('afterA', this.state.senderId)
                    this.forceUpdate()
                    // this.firebaseRef = database().ref('/users/').child(this.state.senderId)
                    // this.firebaseRef.on("value", this.onFirebaseValueChanged);
                })

            }
            else {
                console.log('exit')
                var friendList = Object.values(snapshot.val())
                this.setState({
                    msgList: friendList[0].userFriend,
                    searchList: friendList[0].userFriend,
                    senderId: sendId[0]
                }, () => {
                    console.log('asfd', this.state.msgList)
                    this.firebaseRef = database().ref('/users/').child(this.state.senderId)
                    this.firebaseRef.on("value", this.onFirebaseValueChanged);
                })

            }
        });
    }
    render() {
        return (
            <View>
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
                                    {this.state.isSearch === false ?
                                        <Text style={styles.logoText}>Messages</Text> : null
                                    }
                                </View>
                                {this.state.isSearch === true ?
                                    <TextInput
                                        style={styles.searchStyle}
                                        placeholder="Search here!"
                                        placeholderTextColor={'white'}
                                        value={this.state.name}
                                        onChangeText={(text) => {
                                            let filteredListOfItemsTemp = this.state.searchList
                                            if (text !== '') {
                                                filteredListOfItemsTemp = filteredListOfItemsTemp.filter((item) => {
                                                    var searchWord = item.first_name + ' ' + item.last_name
                                                    return (searchWord.toLowerCase().indexOf((text + "").toLowerCase()) >= 0)
                                                })
                                            }
                                            this.setState({
                                                name: text,
                                                msgList: filteredListOfItemsTemp,
                                            })
                                        }}
                                    /> : null
                                }
                                <TouchableOpacity onPress={() => {
                                    if (this.state.isSearch === false)
                                        this.setState({ isSearch: true })
                                    else
                                        this.setState({ isSearch: false })
                                }} >
                                    <Image
                                        resizeMode={'contain'}
                                        style={{ width: 22, height: 22, marginRight: 24 }}
                                        source={require('app/assets/Images/search_icon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </GradientContainer>
                </View>
                <View style={styles.inputContainer}>
                    <FlatList
                        data={this.state.msgList}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        listKey={moment().format('x').toString()}
                        contentContainerStyle={{ marginTop: 10 }}
                        extraData={this.state}
                        ListHeaderComponent={() => (this.state.msgList?.length === 0 || this.state.msgList === undefined ?
                            <Text style={styles.emptyMessageStyle}>The Inbox is empty</Text>
                            : null)
                        }

                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.listItemCont, {
                                        borderLeftWidth: item.msgCounter > 0 ? 3 : 0,
                                        borderLeftColor: item.msgCounter > 0 ? '#3A77F6' : '',
                                        backgroundColor: item.msgCounter > 0 ? 'rgba(58, 119, 246, 0.08)' : ''
                                    }]}
                                    onPress={() => {
                                        console.log('click', this.state.senderId,)
                                        this.props.navigation.navigate('MsgDetail', {
                                            personName: item.first_name + ' ' + item.last_name,
                                            personImage: item.image,
                                            chatRoomId: item.chatRoomId,
                                            reciverId: item.userId,
                                            sender: this.state.senderId,
                                            dateForChatDisable:item.eventEndDate
                                        })
                                    }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            resizeMode={'cover'}
                                            source={{ uri: "https://mixer.appcrates.co/" + item.image }}
                                            style={styles.listPicture}
                                        />
                                        <View style={{ marginLeft: 18, width: '74%' }}>
                                            <Text style={styles.titleStyle}>{item.first_name + ' ' + item.last_name}</Text>
                                            <View style={{ flexDirection: 'row', width: '100%',}}>
                                                <Text ellipsizeMode={'tail'} numberOfLines={3 } style={styles.lastMsg}>{item.lastMsg != undefined ? item.lastMsg : ''}</Text>
                                                <Text style={styles.timeStyle}>{item.timeStamp != undefined ?
                                                    '   ' + moment(item.timeStamp).fromNow(true)
                                                        .replace('a few seconds', "few sec")
                                                        .replace('seconds', "few sec")
                                                        .replace('a minute', "1m")
                                                        .replace('minutes', "m")
                                                        .replace('an hour', "1h")
                                                        .replace('hours', "h")
                                                        .replace('a day', "1d")
                                                        .replace('days', "d")
                                                        .replace('a month', "1 month")
                                                        .replace('months', "month")
                                                        .replace('a year', "1y")
                                                        .replace('years', "y")
                                                    : ''
                                                    }</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {item.msgCounter === 0 || item.msgCounter === undefined ? null :
                                        <View style={styles.msgCont}>
                                            <Text style={{ color: 'white', fontSize: 12, fontFamily: Font.Bold }}>{item.msgCounter}</Text>
                                        </View>
                                    }
                                </TouchableOpacity >
                            )
                        }}
                    />
                </View>

                {this.state.loading === true &&
                    <View style={{
                        height: '100%',
                        width: width,
                        position: 'absolute',
                        backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.5,
                        zIndex: 1000
                    }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                resizeMode={'contain'}
                                style={{ width: 50, height: 50 }}
                                source={require('./../../assets/Images/load.gif')}
                            />
                        </View>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    inputContainer: {
        width: '100%',
        height: '100%',
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
        width: '100%',
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    listPicture: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#E0E0E0'
    },
    titleStyle: {
        fontSize: 18,
        color: '#2F3034',
        fontFamily: Font.Bold
    },
    lastMsg: {
        color: '#2F3034',
        fontSize: 14,
        width: '68%',
        // backgroundColor: 'red',
        fontFamily: Font.Regular
    },
    timeStyle: {
        color: '#B7BABF',
        fontSize: 14,
        width: '32%',
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
    emptyMessageStyle: {
        fontFamily: Font.Regular,
        fontSize: 20,
        fontWeight: '700',
        alignSelf: 'center',
        position: 'absolute'
    }
});

