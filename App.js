import 'react-native-gesture-handler'
import React from 'react'
import {StyleSheet, StatusBar} from 'react-native'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import signupscreen from './Screens/Signupscreen'
import signinscreen from './Screens/Signinscreen'
import mainscreen from './Screens/MainScreen'
import communityscreen from './Screens/CommunityScreen'
import futureeventsscreen from './Screens/FutureeventsScreen'
import calculationsscreen from './Screens/CalculationsScreen'
import aurorascreen from './Screens/AuroraScreen'
import forgotpasswordscreen from './Screens/ForgotPasswordScreen'
import profilescreen from './Screens/ProfileScreen'
import networkscreen from './Screens/NetworkScreen'
import postyourtripscreen from './Screens/PostYourTripScreen'
import findatripscreen from './Screens/FindaTripScreen'
import settingsscreen from './Screens/SettingsScreen'
import latestscreen from './Screens/LatestScreen'
import communitymapscreen from './Screens/CommunityMapScreen'
import uploadimagescreen from './Screens/UploadImageScreen'
import changepasswordscreen from './Screens/ChangePasswordScreen'
import changeemailscreen from './Screens/ChangeEmailScreen'
import lightmapscreen from './Screens/LightMapScreen'
import imageprofilescreen from './Screens/ImageProfileScreen'
import userscreen from './Screens/UserScreen'
import messagesscreen from './Screens/MessagesScreen'
import chatscreen from './Screens/ChatScreen'
import mapsscreen from './Screens/MapsScreen'
import camerascreen from './Screens/CameraScreen'
import lightmapweb from './Screens/LightMapWeb'
import privacypolicy from './Screens/privacyPolicy'
import termsconditions from './Screens/termsConditions'
import findtripcities from './Screens/findTripCities'
import editProfile from './Screens/editProfile'
import LatestOtherUserScreen from './Screens/LatestOtherUserScreen'
import splashScreen from './Screens/splashScreen'

import {Provider} from 'react-redux'
import {store} from './redux/store'
import {AppContextProvider, AppConsumer} from './Screens/Context/Appcontext'

const Stack = createStackNavigator()


export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
      <AppContextProvider>
        <NavigationContainer>
          <StatusBar
            barStyle='light-content'
            hidden={false}
            backgroundColor='black'
            translucent={true}
          />

          <Stack.Navigator>


            <Stack.Screen
            name='splashScreen'
            component={splashScreen}
            options={{header: ()=> null}}
            />
            <Stack.Screen
              name='Signin'
              component={signinscreen}
              options={{header: () => null}}
            />

            <Stack.Screen
              name='Signup'
              component={signupscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Main'
              component={mainscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Community'
              component={communityscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Futureevents'
              component={futureeventsscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Calculations'
              component={calculationsscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Aurora'
              component={aurorascreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='ForgotPassword'
              component={forgotpasswordscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Profile'
              component={profilescreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Network'
              component={networkscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='PostYourTrip'
              component={postyourtripscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='FindaTrip'
              component={findatripscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Settings'
              component={settingsscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Latest'
              component={latestscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='CommunityMap'
              component={communitymapscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='UploadImage'
              component={uploadimagescreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Change Password'
              component={changepasswordscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Change Email'
              component={changeemailscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Light Map'
              component={lightmapscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Image Profile'
              component={imageprofilescreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='User'
              component={userscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Messages'
              component={messagesscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='Chat'
              component={chatscreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name='MapsScreen'
              component={mapsscreen}
              

            />

            <Stack.Screen
              name='CameraScreen'
              component = {camerascreen}
            />

            <Stack.Screen
              name = 'LightMapWeb'
              component = {lightmapweb} 
              options={{
                header:()=>null
              }}
            />
            <Stack.Screen
              name= 'PrivacyPolicy'
              component = {privacypolicy}
              options={{
                header: () => null
              }}
            />

             <Stack.Screen
              name= 'TermsConditions'
              component = {termsconditions}
               options={{
                header: () => null
              }}
            />

            <Stack.Screen
            name = 'FindTripCities'
            component = {findtripcities}
            />
            <Stack.Screen
            name = 'editProfile'
            component = {editProfile}
            options={{
              header: ()=> null
            }} />

            <Stack.Screen
            name='LatestOtherUserScreen'
            component = {LatestOtherUserScreen}
            options={{
              header:()=>null
            }}
            />


          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>
      </Provider>
    )
  }
}
