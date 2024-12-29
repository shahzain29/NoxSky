import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Back from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {CheckBox} from 'react-native-elements';
import {Colors} from './Utils/Colors';

import {AppContextProvider, AppConsumer} from './Context/Appcontext';

import {registrationAPI} from '../API/Methods/userApi';

const SignupScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [instagram, setInstagram] = useState('')

  const checkpass = () => {
    if (userName === '') {
      alert('Username is required');
    } else if (password === '') {
      alert('Enter Password');
    } else if (confirmPassword === '') {
      alert('Enter Password again');
    } else if (email === '') {
      alert('Enter Email');
    } else if (
      /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email.trim()) ==
      false
    ) {
      alert('Email format is invalid');
    } else if (toggleCheckBox === false) {
      alert('Please Agree to the Terms and Conditions');
    } else {
      onSignUpPress();
    }
  };

  const onSignUpPress = async () => {
    try {
      const formData = new FormData();

      formData.append('user_name', userName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmpassword', confirmPassword);
      formData.append('instagram',instagram)
      const response = await registrationAPI(formData);
      console.log('onSignUpPress-status', response.status);
      console.log('onSignUpPress-data-response', response.data);

      if (response.status === 200) navigation.navigate('Signin');
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.log('onSignUpPress-error', error);
    }
  };

  const back = '../Assets/Images/BackArrow.png';
  return (
    <AppConsumer>
      {appConsumer => (
        <ScrollView
          style={{backgroundColor: appConsumer.theme.colors.background}}>
          <View
            style={[
              styles.container,
              {backgroundColor: appConsumer.theme.colors.background},
            ]}>
            <View style={{height: 100}}>
              <Back
                name="arrowleft"
                size={40}
                color={appConsumer.theme.colors.FontColor}
                style={{
                  backgroundColor: '#303030',
                  padding: 15,
                  marginTop: '8%',
                  borderColor: '#c2c2c2',
                  borderRadius: 40,
                  width: '19%',
                  height: '70%',
                }}
                onPress={() => navigation.goBack()}
              />
            </View>

            <Text
              style={[
                styles.heading,
                {color: appConsumer.theme.colors.FontColor},
              ]}>
              Sign Up
            </Text>

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
                Email
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
                  onChangeText={text => setEmail(text)}
                  value={email}
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
              <Text
                style={[
                  styles.Labelstyle,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Confirm Password
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
                  onChangeText={text => setConfirmPassword(text)}
                  value={confirmPassword}
                  secureTextEntry={true}
                />
              </LinearGradient>
            </View>

            <View style={styles.innerContainer}>
              <Text
                style={[
                  styles.Labelstyle,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Instagram
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
                  onChangeText={text => setInstagram(text)}
                  value={instagram}
                  
                />
              </LinearGradient>
            </View>

            <View style={styles.innerContainer}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: '4%',
                  color: appConsumer.theme.colors.FontColor,
                }}>
                Agree to{' '}
              </Text>

                <TouchableOpacity style={{justifyContent:'center',height:38}} onPress={()=>navigation.navigate('TermsConditions')}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: '4%',
                  marginRight: '10%',
                  textDecorationLine: 'underline',
                  color: '#83aae5',
                }}>
                Terms and Conditions
              </Text>
              </TouchableOpacity>

              <CheckBox
                containerStyle={styles.checkboxstyle}
                checked={toggleCheckBox}
                onPress={() => setToggleCheckBox(!toggleCheckBox)}
                checkedColor={appConsumer.theme.colors.FontColor}
              />
            </View>

            <View
              style={{
                marginTop: '10%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{width: 100, alignItems: 'center'}}
                onPress={checkpass}>
                <LinearGradient
                  colors={[Colors.btnGrad1, Colors.btnGrad2, Colors.btnGrad3]}
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
          </View>
        </ScrollView>
      )}
    </AppConsumer>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: Colors.background,
    height: '100%',
  },

  innerContainer: {
    flexDirection: 'row',
    padding: 10,
  },

  inputstyle: {
    marginLeft: '5%',
    backgroundColor: 'transparent',
    fontSize: 18,
    fontWeight: 'bold',
  },

  Labelstyle: {
    marginTop: '2%',
    fontSize: 22,
    fontWeight: 'bold',
    width: '40%',
    color: Colors.FontColor,
  },

  checkboxstyle: {
    marginRight: '15%',
    height: 45,
    width: 45,
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },

  heading: {
    marginRight: '20%',
    marginBottom: '10%',
    marginTop: '3%',
    color: Colors.FontColor,
    fontSize: 35,
    fontWeight: 'bold',
  },

  buttonstyle: {
    height: 55,
    width: 220,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  linearGradient: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: '60%',
    height: 55,
    paddingTop: 8,
  },
});
