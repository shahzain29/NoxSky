import React, {Component, useState,useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Back from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from './Utils/Colors';
import {AppContextProvider, AppConsumer} from './Context/Appcontext';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {addCommunityAPI} from '../API/Methods/userApi';
import {useSelector} from 'react-redux';
import Loader from '../Assets/Components/Loader';

const UploadImageScreen = ({navigation, route}) => {

  const [loader, setLoader] = useState(false);
  const [filePath, setFilePath] = useState();
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState();
  const [showText, setShowText] = useState(true);
  const [showImg, setShowImg] = useState(false);
  const [region, setRegion] = useState({});
  const [imgURI, setImgURI] = useState();

  useEffect(()=>{
   
  },[])

  const userData = useSelector(state => state.userId.userId);


  const onAddCommunityPress = async () => {
    
    // setRegion(route.params.mapRegion);

    const region=route.params.mapRegion


    try {
      setLoader(true);
      const formData = new FormData();

      formData.append('Latitude', region.latitude);
      formData.append('Longitude', region.longitude);
      formData.append('image', {uri: imgURI, name: fileName, type: fileType});
      formData.append('pin_location', 'gujranwala');
      formData.append('user_id', userData.id);
      formData.append('user_name', userData.name);

      const response = await addCommunityAPI(formData);
      setLoader(false);
      console.log('addCommunityAPI-status-', response.status);
      console.log('addCommunityAPI- data', response.data);
      alert('Image added Successfully');
      navigation.navigate('Community');
    } catch (error) {
      setLoader(false);
      console.log('addCommunityAPI-error-', error);
    }
  };

  const chooseFile = () => {
    let options = {
      // title: 'Select Image',
      // customButtons: [
      //   {
      //     name: 'customOptionKey',
      //     title: 'Choose Photo from Custom Option'
      //   },
      // ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = {uri: response.assets[0].uri};
        // let source = {
        //   uri: 'data:image/jpg;base64,' + response.data
        // };
        setShowText(false);
        setFilePath(source);
        setShowImg(true);
        setFileName(response.assets[0].fileName);
        setFileType(response.assets[0].type);
        setImgURI(response.assets[0].uri);
      }
    });
  };

  return (
    <AppConsumer>
      {appConsumer => (
        <View
          style={[
            styles.mainContainer,
            {backgroundColor: appConsumer.theme.colors.background},
          ]}>
          <Back
            name="arrowleft"
            size={40}
            color={appConsumer.theme.colors.FontColor}
            style={{
              backgroundColor: '#303030',
              padding: 15,
              borderRadius: 40,
              width: 70,
              height: 70,
            }}
            onPress={() => navigation.navigate('CommunityMap')}
          />
          <Text
            style={[
              styles.headingStyle,
              {color: appConsumer.theme.colors.FontColor},
            ]}>
            Share Your Image
          </Text>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-evenly',
              height: '80%',
            }}>
            <TouchableOpacity
              placeHolder={'Uploadimage'}
              style={{width: '100%'}}
              onPress={chooseFile}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[Colors.Gradient1, Colors.Gradient2, Colors.Gradient3]}
                style={styles.LGcontainer}>
                {showText ? (
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 'bold',
                      color: appConsumer.theme.colors.FontColor,
                    }}>
                    Upload Image...
                  </Text>
                ) : null}
                {showImg ? (
                  <Image
                    source={filePath}
                    style={{height: '100%', width: '100%', borderRadius: 20}}
                  />
                ) : null}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => navigation.navigate('MapsScreen')}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[Colors.Gradient1, Colors.Gradient2, Colors.Gradient3]}
                style={styles.LGbtn}>
                <Text
                  style={[
                    styles.btnText,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Pin Location of Image on Map
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{width: '100%'}}
              onPress={onAddCommunityPress}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[Colors.Grad3, Colors.Grad2, Colors.Grad1]}
                style={styles.LGbtn2}>
                <Text
                  style={[
                    styles.btnText,
                    {color: appConsumer.theme.colors.FontColor},
                  ]}>
                  Share With the World!
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Loader loading={loader} isShowIndicator={true} />
        </View>
      )}
    </AppConsumer>
  );
};

export default UploadImageScreen;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    paddingTop: 40,
    height: '100%',
  },

  LGcontainer: {
    width: '100%',
    height: 350,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headingStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom:8,
  },
  btnText: {
    fontSize: 25,

    fontWeight: 'bold',
  },

  LGbtn: {
    width: '100%',
    height: 90,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 15,
    marginTop: '5%',
    justifyContent: 'center',
  },

  LGbtn2: {
    width: '100%',
    height: 70,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    paddingLeft: 15,
    marginTop: '10%',
  },
});
