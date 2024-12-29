import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import Back from 'react-native-vector-icons/AntDesign'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'

export default function LightMapWeb({navigation}) {
    return (
        <AppConsumer>
            {appConsumer =>(
        <View style={{flex:1,paddingTop:20}}>
           <WebView style={{flex:1}}
               source={{ uri: 'https://www.lightpollutionmap.info/#zoom=4.00&lat=45.8720&lon=14.5470&layers=B0FFFFFFFTFFFFFFFFFF' }}
           />

            <Back
            name='arrowleft'
            size={40}
            color={appConsumer.theme.colors.FontColor}
            style={{
              backgroundColor: 'rgba(48, 48, 48,0.9)',
              padding: 15,
              borderRadius: 40,
              width: 70,
              height: 70,
              position:'absolute',
              top:'25%',
            }}
            onPress={() => navigation.goBack()}
          />


        </View>
        )}
        </AppConsumer>
    )
}

const styles = StyleSheet.create({
    
})
