import 'react-native-gesture-handler'
import React ,{useState,useEffect}from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import {Colors} from './Utils/Colors'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import {AppContextProvider, AppConsumer} from './Context/Appcontext'
import {useSelector} from 'react-redux'

const CalculationsScreen =({navigation,route}) => {


  const camDet = useSelector(state=>state.cameraDetails.camera)

  const [shutter500,setShutter500] = useState('')
  const [shutterNPF,setShutterNPF] = useState('')

  const [aperture,setAperture] = useState('')
  const [focalLength,setFocalLength] = useState('')
  const [showRules,setShowRules] = useState(false)
 
 useEffect(()=>{
 
   console.log('Camera Model=>>',camDet.Model)
  
  
 },[camDet])
 

  const get500Rule = () =>{

    

    const x=(focalLength*camDet.Crop_factor)

    var res=500/x
    res=res.toFixed(1)
    setShutter500(res)

    console.log('500Rule=>>',shutter500)
  }

  const getNpfRule = () => {
   
 
    const sensorCut=camDet.Sensor_size
    const senseIndex1=sensorCut.indexOf('~')+2
    const senseIndex2=sensorCut.indexOf('x')-1
    const sensorWidth=sensorCut.substring(senseIndex1,senseIndex2)
    
    //get Image width from string
    const resolutionCut=camDet.Max_image_resolution
    const resindex2=resolutionCut.indexOf(" ")
    const imageWidth = resolutionCut.substring(0,resindex2)  

    const convertSenseWidth = parseFloat(sensorWidth)
    const convertImageWidth = parseInt(imageWidth)

    const pixelPitch= (convertSenseWidth / convertImageWidth) * 1000

    var res = ((35 * aperture) + (30 * pixelPitch)) / focalLength
    res=res.toFixed(1)

    setShutterNPF(res)

  console.log('NPF = >>',shutterNPF) 
  }

  const fireRuleCalcs = () => {

    if(focalLength==''){
      alert('Enter Focal Length')
    }
    else if(aperture == ''){
      alert('Enter Aperture')
    }
    else{
       get500Rule()
        getNpfRule()
        setShowRules(true)
    }
  }
    return (
      <AppConsumer>
        {appConsumer => (
          <ScrollView
            style={{backgroundColor: appConsumer.theme.colors.background}}>
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
                onPress={() => navigation.navigate('Main')}
              />

              <Text
                style={[
                  styles.HeadingStyle,
                  {color: appConsumer.theme.colors.FontColor},
                ]}>
                Perfect Stars
              </Text>

              <View style={styles.LGCView}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    appConsumer.theme.colors.Communitygrad1,
                    appConsumer.theme.colors.Communitygrad2,
                    appConsumer.theme.colors.Communitygrad3,
                  ]}
                  style={styles.LinearGradientContainer}>
                  <View style={styles.subLGC}>
                    <Text
                      style={[
                        styles.LGCtext,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      Camera:
                    </Text>

                    <TouchableOpacity onPress={()=>navigation.navigate('CameraScreen')}>
                      <LinearGradient
                        colors={[
                          appConsumer.theme.colors.Communitygrad2,
                          Colors.Gradient2,
                        ]}
                        style={styles.chooseContainer}>
                        <Text
                          style={[
                            styles.subLGCtext,
                            {color: appConsumer.theme.colors.FontColor},
                          ]}>
                          {camDet.Model}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.subLGC}>
                    <Text
                      style={[
                        styles.LGCtext,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      Focal Length:
                    </Text>

                    <TouchableOpacity>
                      <LinearGradient
                        colors={[
                          appConsumer.theme.colors.Communitygrad2,
                          Colors.Gradient2,
                        ]}
                        style={styles.chooseContainer}>
                        <TextInput
                          style={[
                            styles.subLGCtext,
                            {color: appConsumer.theme.colors.FontColor},
                          ]}
                          onChangeText={text=>setFocalLength(text)}
                          value={focalLength}
                          placeholder='Type'
                          placeholderTextColor={
                            appConsumer.theme.colors.FontColor
                          }
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.subLGC}>
                    <Text
                      style={[
                        styles.LGCtext,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      Aperture:
                    </Text>

                    <TouchableOpacity>
                      <LinearGradient
                        colors={[
                          appConsumer.theme.colors.Communitygrad2,
                          Colors.Gradient2,
                        ]}
                        style={styles.chooseContainer}>
                        <TextInput
                          style={[
                            styles.subLGCtext,
                            {color: appConsumer.theme.colors.FontColor},
                          ]}
                           onChangeText={text=>setAperture(text)}
                           value={aperture}
                          placeholder='Type'
                          placeholderTextColor={
                            appConsumer.theme.colors.FontColor
                          }
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.subLGC}>
                    <Text
                      style={[
                        styles.LGCtext,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      Minimum{'\n'}Declination:
                    </Text>

                    <TouchableOpacity>
                      <LinearGradient
                        colors={[
                          appConsumer.theme.colors.Communitygrad2,
                          Colors.Gradient2,
                        ]}
                        style={[styles.chooseContainer,{height:60}]}>
                        <TextInput
                          style={[
                            styles.subLGCtext,
                            {color: appConsumer.theme.colors.FontColor},
                          ]}

                          onChangeText={()=>fireRuleCalcs()}
                          placeholder='Type'
                          placeholderTextColor={
                            appConsumer.theme.colors.FontColor
                          }
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>

       
              <View style={{height: 300}}>
                <View
                  style={{
                    marginTop: '3%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    borderColor: Colors.FontColor,
                    borderBottomWidth: 1,
                    height: 100,
                  }}>
                  <View>
                    <Text
                      style={[
                        styles.HeadingStyle,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      NPF Rule
                    </Text>
                    <Text
                      style={[
                        styles.LGCtext,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      More Accurate
                    </Text>
                  </View>

               {showRules ? 
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#181818', '#282828', '#3a3a3a']}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 120,
                      height: 50,
                      borderRadius: 15,
                      marginTop:2,
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: appConsumer.theme.colors.FontColor,
                      }}>
                      {shutterNPF}s
                    </Text>
                  </LinearGradient>
                  : null}
                </View>

                <View
                  style={{
                    marginTop: '3%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    height: 100,
                  }}>
                  <View>
                    <Text
                      style={[
                        styles.HeadingStyle,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      500 Rule
                    </Text>
                    <Text
                      style={[
                        styles.LGCtext,
                        {color: appConsumer.theme.colors.FontColor},
                      ]}>
                      Less Accurate
                    </Text>
                  </View>

                  {showRules ? 
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#181818', '#282828', '#3a3a3a']}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 120,
                      height: 50,
                      borderRadius: 15,
                      marginTop:2,
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: appConsumer.theme.colors.FontColor,
                      }}>
                      {shutter500}s
                    </Text>
                  </LinearGradient>
                  :null}
                </View>
              
              </View>
              
            </View>
          </ScrollView>
        )}
      </AppConsumer>
    )
  
}

export default CalculationsScreen

const styles = StyleSheet.create({
  MainContainer: {
    padding: 15,
    paddingTop: 40,
    height: '100%',
  },

  HeadingStyle: {
    fontSize: 35,
    fontWeight: 'bold',
  },

  LGCView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '5%',
    borderBottomWidth: 2,
    borderColor: Colors.FontColor,
    width: '100%',
    height: '45%',
  },

  LinearGradientContainer: {
    width: '100%',
    height: '90%',
    padding: 15,
    paddingTop: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
  },

  subLGC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  LGCtext: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:8,
  },

  subLGCtext: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  chooseContainer: {
    width: 190,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    paddingLeft: 10,
  },
})
