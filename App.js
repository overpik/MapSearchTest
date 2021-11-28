/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  Alert
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView, { Camera } from 'react-native-maps';
import SearchBar from 'react-native-platform-searchbar';
import { searchFood } from './src/utils/api';
import { getStorageSearchHistory, setStorageSearchHistory } from './src/utils/storeage';
import Spinner from 'react-native-loading-spinner-overlay';

const { height, width } = Dimensions.get('window');
const foodIcon = require('./src/assets/icons/restaurant.png');
const ratingIcon = require('./src/assets/icons/star.png');
const userRateIcon = require('./src/assets/icons/rate.png');
const markerFoodIcon = require('./src/assets/icons/marker_food.png');
const leftIcon = require('./src/assets/icons/left-chevron.png');
const searchHistoryIcon = require('./src/assets/icons/history.png');

const App = () => {
  const mapRef = useRef < MapView > (null)
  const InputRef = useRef()
  const [valueSearch, setValueSearch] = useState('');
  const [stroeView, setStroeView] = useState({
    latitude: Number(0),
    longitude: Number(0)
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [storeLists, setStoreLists] = useState([]);
  const [storeListsAll, setStoreListsAll] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [myspiner, setMyspiner] = useState(false);

  const _Search = (searchText) => {
    setValueSearch(searchText)
    _SearchFood(searchText)
  }

  const _ViewDetail = (detail) => {
    const { geometry } = detail
    setStroeView({
      latitude: geometry.location.lat,
      longitude: geometry.location.lng
    })
    setModalVisible(false)
    const newCamera: Camera = {
      center: { latitude: geometry.location.lat, longitude: geometry.location.lng },
      zoom: 17,
      heading: 0,
      pitch: 0,
      altitude: 5
    }

    mapRef.current.animateCamera(newCamera, { duration: 1000 });
  }
  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const _searchStoreFoodAll = async () => {
    /** ทำการค้นหา 5 ครั้ง */
    let addLists = []
    let nextPageToken = ''
    if (storeListsAll.length > 0) return;
    setMyspiner(true)
    for (let index = 1; index < 6; index++) {
      if (nextPageToken != undefined) {
        await timeout(1000)
        let resultsSearch = await searchFood('', nextPageToken, 20000)
        let { status, results, next_page_token, error_message } = resultsSearch
        if (status === "OK") {
          nextPageToken = next_page_token
          addLists = [...results, ...addLists]
        } else {
          console.log('searchFood error', error_message)
        }
      }
    }

    setStoreListsAll(addLists)
    setMyspiner(false)
  }
  const _SearchFood = async (searchText) => {
    if (!searchText) return
    const resultsSearch = await searchFood(searchText, '', 3000)
    const { status, results, error_message, error } = resultsSearch
    if (status === "OK") {
      let filterResult = results;
      filterResult.sort(function (a, b) {
        if (a.vicinity.indexOf('จตุจักร') >= 0) { return -1; }
        if (a.vicinity.indexOf('จตุจักร') < 0) { return 1; }
        return 0;
      })
      setStoreLists(filterResult)
    } else {
      console.log(error_message ? error_message : error)
    }
  }
  const setMapReady = () => {
    if (mapRef.current) {

    }
  }
  const _showModalSearch = () => {
    getSearchHistory()
    setModalVisible(true)
    setTimeout(() => InputRef.current.focus(), 1000)
  }
  const getSearchHistory = async () => {
    let resultsHistory = await getStorageSearchHistory();
    resultsHistory = resultsHistory.reverse();
    if (resultsHistory.length > 0) setSearchHistory(resultsHistory)
  }
  const addSearchHistory = async (searchText) => {
    if (!searchText || searchHistory.includes(searchText)) return;
    let addSearchHistory = searchHistory.reverse();
    if (addSearchHistory.length > 5) addSearchHistory.shift()
    addSearchHistory.push(searchText)
    setStorageSearchHistory(addSearchHistory)
  }
  const _SetDataHistory = (textHistory) => {
    setValueSearch(textHistory);
    _SearchFood(textHistory)
  }

  useEffect(() => {

  }, []);

  return (
    <View style={styles.container}>
      <Spinner
        visible={myspiner}
        textContent={'กำลังโหลด ...'}
        // textStyle={styles.spinnerTextStyle}
      />
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        initialRegion={{
          latitude: 13.831002,
          longitude: 100.557490,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onMapReady={setMapReady}
      >
        {stroeView.latitude > 0 && stroeView.longitude > 0 ?
          <MapView.Marker
            tracksViewChanges={false}
            coordinate={stroeView}
            // image={marker.icon}
            onPress={(e) => {
            }}
          >
            <Image source={markerFoodIcon} style={styles.markerFoodIcon} />
          </MapView.Marker>
          : null
        }
        {storeListsAll.length > 0 ?
          storeListsAll.map((item, i) => (
            <MapView.Marker
              key={i}
              tracksViewChanges={false}
              coordinate={{
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng
              }}
              onPress={(e) => {
              }}
            >
              <Image source={markerFoodIcon} style={styles.markerFoodIcon} />
            </MapView.Marker>
          ))
          : null
        }
      </MapView>
      <SearchBar
        value={valueSearch}
        onChangeText={(e) => _Search(e)}
        style={styles.searchBar}
        placeholder={valueSearch ? valueSearch : 'ค้นหาร้านอาหาร'}
        inputStyle={{ color: '#000000' }}
      />
      <TouchableOpacity activeOpacity={.9} style={styles.topSearchView} onPress={() => _showModalSearch()}>

      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.9} style={styles.topStoreView} onPress={() => _searchStoreFoodAll()}>
        <Image source={markerFoodIcon} style={styles.markerFoodIconSmall} />
        <Text style={styles.textTopStoreView}>ร้านอาหารรอบเขตจตุจักร</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // statusBarTranslucent={true}
        transparent={false}
        presentationStyle="pageSheet"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
              <TouchableOpacity activeOpacity={.9} onPress={() => setModalVisible(false)}>
                <Image style={{ width: 30, height: 30 }} source={leftIcon} />
              </TouchableOpacity>

              <View style={{}}>
                <Text style={styles.foodPosition}>ตำหแน่ง</Text>
                <Text style={styles.foodArea}>ร้านอาหารรอบเขตจตุจักร</Text>
              </View>

            </View>
            <SearchBar
              ref={InputRef}
              value={valueSearch}
              onBlur={() => addSearchHistory(valueSearch)}
              onChangeText={(sText) => _Search(sText)}
              placeholder='ค้นหาร้านอาหาร'
              inputStyle={{ color: '#000000' }}
            />
            <ScrollView style={{ flex: 1, width: (width - 40) }}>
              {
                !valueSearch ?
                  searchHistory.map((text, i) => (
                    <TouchableOpacity key={i} style={styles.blockListsHistory} onPress={() => _SetDataHistory(text)}>
                      <Image style={styles.iconDetail} source={searchHistoryIcon} />
                      <Text style={styles.foodName}>{text}</Text>
                    </TouchableOpacity>
                  ))
                  : null
              }
              {
                storeLists.map((store, i) => (
                  <TouchableOpacity key={i} style={styles.blockListsResulte} onPress={() => _ViewDetail(store)}>
                    <Image style={styles.iconDetail} source={{ uri: store.icon }} />
                    <View style={styles.blockDetail}>
                      <Text style={styles.foodName}>{store.name}</Text>
                      <Text style={styles.textStyle}>{store.vicinity}</Text>
                      <View style={styles.blockRating}>
                        <Image style={styles.starIcon} source={ratingIcon} />
                        <Text style={styles.foodRating}>{store.rating}</Text>
                        {/* <Image style={styles.rateIcon} source={userRateIcon} /> */}
                        <Text style={styles.foodName}>({store.user_ratings_total})</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    height: height
  },
  containerMaps: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: (height),
    alignItems: 'center',
    position: 'relative',
  },
  blockListsResulte: {
    display: 'flex',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'silver'
  },
  blockListsHistory: {
    display: 'flex',
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    width: '100%',

  },
  containerMain: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 70 : 65,
    backgroundColor: '#ffffff',
    marginHorizontal: 10
  },
  textStyle: {
    color: '#55595a',
    fontSize: 12,
    fontFamily: 'Kanit-SemiBold',
  },
  foodName: {
    color: '#55595a',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: 'Kanit-SemiBold',
  },
  foodPosition: {
    color: '#55595a',
    fontSize: 13,
    fontFamily: 'Kanit-SemiBold'
  },
  foodArea: {
    color: '#55595a',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: 'Kanit-SemiBold',
  },
  foodRating: {
    color: '#55595a',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: 'Kanit-SemiBold',
    marginRight: 2
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: width,
    height: height,
    backgroundColor: "white",
    justifyContent: 'flex-start',
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    position: 'relative'
  },
  iconDetail: {
    width: 20,
    height: 20,
    display: 'flex',
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  blockDetail: {
    display: 'flex',
    flex: 1,
  },
  blockRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5
  },
  starIcon: {
    width: 15,
    height: 15,
    marginRight: 2
  },
  rateIcon: {
    width: 15,
    height: 15,
    marginLeft: 10,
    marginRight: 2
  },
  searchBar: {
    margin: 20
  },
  topSearchView: {
    width: (width),
    height: 50,
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    borderRadius: 10,
    zIndex: 1
  },
  topStoreView: {
    // width: (width-40),
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 30,
    backgroundColor: 'rgb(239, 239, 239)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 80,
    borderRadius: 15,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textTopStoreView: {
    color: '#55595a',
    paddingHorizontal: 10
  },
  markerFoodIcon: {
    width: 32,
    height: 32
  },
  markerFoodIconSmall: {
    width: 25,
    height: 25,
    marginLeft: 5
  },
});

export default App;
