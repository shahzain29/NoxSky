import React from 'react';
import { StyleSheet, View, ActivityIndicator,Text } from 'react-native';
import {AppContextProvider, AppConsumer} from '../../Screens/Context/Appcontext'

const Loader = (props) => {
    const { loading, style, containerStyle, color, size ,isText,isShowIndicator} = props

    if (loading)
        return (
            <AppConsumer>
            {appConsumer=>(
            <View style={[styles.container, containerStyle]}>
                {/* {loading && */}
                {isShowIndicator &&
                    <ActivityIndicator
                        // animating={loading}
                        animating={isShowIndicator}
                        size={size ? size : 'large'}
                        color={color ? color : '#FFFFFF'}
                        style={[{ marginLeft: 5 }, style ? style : {}]}
                    />
                }
                {isText &&
                    <Text style={{fontSize:16,fontWeight:'bold'}}>Loading</Text>
                }
            </View>
            )}
            </AppConsumer>
        )
    else return null
}

export default Loader;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: 'rgba(218, 216, 216,0.8)',
        backgroundColor:'transparent',
        // backgroundColor: (colors.white + '30'),
        alignItems: 'center',
        justifyContent: 'center',
    }
})
