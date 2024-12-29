import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, SectionList, TouchableOpacity, TextInput } from 'react-native'
import { AppContextProvider, AppConsumer } from './Context/Appcontext'
// import cameraData from '../JsonDataFiles/camerafiltereddatabase.json'
import cameraData from '../JsonDataFiles/cameraData.json'
import { useDispatch, useSelector } from 'react-redux'
import { setCamera } from '../redux/actions'


const CameraScreen = ({ navigation, route }) => {



  var filter = require('lodash.filter');
  const dispatch = useDispatch()

  const [dataFiltered, setDataFiltered] = useState(cameraData)

  const searchFilter = (text) => {

    const filteredData = cameraData.filter(
      function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.Title ?
          item.Title.toUpperCase() :
          ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }
    );

    setDataFiltered(filteredData)
    // console.log(filteredData)
  }

  const DATA = [
    {
      title: "Apple",
      data: [{ camera: "iphone13" }, { camera: "iphone13" }, { camera: "iphone13" }, { camera: "iphone13" },]
    },
    {
      title: "Samsung",
      data: [{ camera: 'galaxy13' }, { camera: 'galaxy13' }, { camera: 'galaxy13' }, { camera: 'galaxy13' },]
    }

  ];

  const setCameraInfo = (info) => {
    dispatch(setCamera(info))
    navigation.navigate('Calculations')
  }

  return (
    <AppConsumer>
      {appConsumer => (
        <View style={styles.container}>
          <View style={{ alignItems: 'center', height: 60, justifyContent: 'center' }}>
            <TextInput
              style={{ padding: 10, height: 40, width: '95%', backgroundColor: appConsumer.theme.colors.FontColor, borderRadius: 20 }}
              onChangeText={(text) => searchFilter(text)}
              placeholder='Search Company'
            />
          </View>
          <SectionList
            sections={dataFiltered}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setCameraInfo(item)}>
                <View style={{ justifyContent: 'center', margin: 2, width: '100%', height: 75, borderBottomWidth: 0.3, borderColor: appConsumer.theme.colors.FontColor }}>
                  <View style={{ flex: 1.5, justifyContent: 'center', paddingLeft: 25 }}>
                    <Text style={{ fontSize: 20, color: appConsumer.theme.colors.FontColor }}>
                      {item.Model}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', flex: 1, paddingLeft: 20 }}>
                    <Text style={[styles.camDescription, { color: appConsumer.theme.colors.FontColor }]}>sensor: {item.Sensor_size}</Text>
                    <Text style={[styles.camDescription, { color: appConsumer.theme.colors.FontColor }]}> - crop: {item.Crop_factor}</Text>
                    <Text style={[styles.camDescription, { color: appConsumer.theme.colors.FontColor }]}> - image: {item.Max_image_resolution}</Text>
                    <Text style={[styles.camDescription, { color: appConsumer.theme.colors.FontColor }]}> - {item.Megapixels} MP</Text>

                  </View>
                </View>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) =>
              <View style={{ width: '100%', backgroundColor: '#3A3A3A', paddingLeft: 20 }}>
                <Text style={{ fontSize: 25, color: appConsumer.theme.colors.FontColor, fontWeight: 'bold' }}>
                  {section.Title}
                </Text>
              </View>
            }
            keyExtractor={(item, index) => index}
          />
        </View>
      )}
    </AppConsumer>
  )
}

export default CameraScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#282828',
  },

  camDescription: {
    fontSize: 10,
    fontWeight: 'bold',
  },

})
