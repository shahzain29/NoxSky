import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import Back from 'react-native-vector-icons/AntDesign'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'

export default function termsConditions({navigation}) {
    return (
        <AppConsumer>
            {appConsumer =>(
        <View style={{flex:1,paddingTop:20}}>
           <WebView style={{flex:1}}
               source={{ uri: 'https://www.noxsky.app/terms-conditions' }}
           />

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
              position:'absolute',
              top:40,
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

