import React ,{useEffect}from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'



const splashScreen = ({navigation}) => {

    useEffect(()=>{
        setTimeout(()=>{navigation.navigate('Signin')},3000)
    },[])
    return (
        <View style={{flex:1,backgroundColor:'black',alignItems:'center',justifyContent:'center'}}>
                <Image
                source={require('../Assets/Images/Nox_Sky_Logo1.png')}
                resizeMode='cover'
                style={{height:300,width:300}}
                />
        </View>
    )
}

export default splashScreen

const styles = StyleSheet.create({})
