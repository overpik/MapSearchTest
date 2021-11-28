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

const stroeDemoe = [
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8119326,
        "lng": 100.5621723
      },
      "viewport": {
        "northeast": {
          "lat": 13.81328287989272,
          "lng": 100.5635395298927
        },
        "southwest": {
          "lat": 13.81058322010728,
          "lng": 100.5608398701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้านอาหารตามสั่ง ช.โภชนา",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 3024,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114097762737090827262\">THAKRIT Tanghiranthana</a>"
        ],
        "photo_reference": "Aap_uEA0-dMTh3fD1E3jbOETxO2sPLrGipRO4ohsmNNn-Aa6Hxm8mBSlmiki8g0T-h3vZsTuy6An3AlKCpOa0B60XVkNcMpC8H-0apz-0wXssCd4_kPrnYAfUvRX4C-zn003D1Se5wb1kQ3Qai7qs0BMuW1gbHP5gkpUjPWlMvEL3Y2vU-1G",
        "width": 4032
      }
    ],
    "place_id": "ChIJ-_nQQUWc4jARcfrVyJAXeEI",
    "plus_code": {
      "compound_code": "RH66+QV กรุงเทพมหานคร",
      "global_code": "7P52RH66+QV"
    },
    "rating": 4.3,
    "reference": "ChIJ-_nQQUWc4jARcfrVyJAXeEI",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 13,
    "vicinity": "150/5 ถนนลาดพรัาว ซอย 4 แขวง จอมพล เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8259715,
        "lng": 100.55715
      },
      "viewport": {
        "northeast": {
          "lat": 13.82732602989272,
          "lng": 100.5585490298927
        },
        "southwest": {
          "lat": 13.82462637010728,
          "lng": 100.5558493701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้านอาหารเพลิน",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 2387,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111543616562177326424\">Chanyut Thongbaiyai</a>"
        ],
        "photo_reference": "Aap_uEBmXko6gsP1M4oYygFsbkJqkMPJ-MS95Tm348_DS_IVsJaGR7F-9s6nEgEZC2u49eLJDsHUyWQG3GBeZmB4HKxDMg6taXJYQEksN3GggboCDMoBJF-udHO8jIzgLlXfcQPd3pda5r9xE_jKxbwwm-MDFbP33tDscLrRQ70UqJySNr2r",
        "width": 2120
      }
    ],
    "place_id": "ChIJk9235fWc4jAR4YEKKmE2FOM",
    "plus_code": {
      "compound_code": "RHG4+9V กรุงเทพมหานคร",
      "global_code": "7P52RHG4+9V"
    },
    "price_level": 2,
    "rating": 4.2,
    "reference": "ChIJk9235fWc4jAR4YEKKmE2FOM",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 2390,
    "vicinity": "7/428 ถนน วิภาวดีรังสิต แขวง จตุจักร เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8169418,
        "lng": 100.5371867
      },
      "viewport": {
        "northeast": {
          "lat": 13.81831982989272,
          "lng": 100.5385304298927
        },
        "southwest": {
          "lat": 13.81562017010728,
          "lng": 100.5358307701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้านอาหาร “ Garlic ”_",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 3024,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/115360479573958059233\">Dawan Sttiyavong</a>"
        ],
        "photo_reference": "Aap_uEDKbMXwR9ZpSLGomkiX1f_1bYrCkqOuj4MJQI7T3fVYv5kCDN9fIIH7F3PwOst7f5wuEuh35AJjbFkH3s-wS6jbFnaqjNXzSiV7YGF160B8RHVhS9Q-FBfEGe4s-YWXr63wHb7OLS0lx00KjGwqK_KMmGOsFs2LinRehDgYt0uVLWrl",
        "width": 4032
      }
    ],
    "place_id": "ChIJJ5rukEWd4jARKqBADtB6K4Q",
    "plus_code": {
      "compound_code": "RG8P+QV กรุงเทพมหานคร",
      "global_code": "7P52RG8P+QV"
    },
    "rating": 4.3,
    "reference": "ChIJJ5rukEWd4jARKqBADtB6K4Q",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 569,
    "vicinity": "เลขที่ 44 ซอย โชติวัตน์ ถนน ประชาชื่น เขตบางซื่อ"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8167991,
        "lng": 100.5539027
      },
      "viewport": {
        "northeast": {
          "lat": 13.81800867989272,
          "lng": 100.5553815798927
        },
        "southwest": {
          "lat": 13.81530902010728,
          "lng": 100.5526819201073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "Krua Ta Noi Restaurant、Suan Rot Fai - ร้านอาหาร ครัวตาน้อย สวนรถไฟ",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 2048,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/115426175218863466792\">A Google User</a>"
        ],
        "photo_reference": "Aap_uECpSQKGkfpllJSefRqq0THuHoDZrZ_YbGo_c8NYXE3CqTrl3olG0DfhNXEIARLq2NPPUwIWHIAMnrupQodfGQ-7Hb0GSY4A70-svSSNrhvJ6nE5uC95hznAljdjAwuOh4QiPCW6gTEegTCv3BQz1kFMOlPi2-roz-N9eQmvqGTJ9LAB",
        "width": 2048
      }
    ],
    "place_id": "ChIJV1rnpl2c4jARyPXKBBAlWlA",
    "plus_code": {
      "compound_code": "RH83+PH กรุงเทพมหานคร",
      "global_code": "7P52RH83+PH"
    },
    "price_level": 2,
    "rating": 3.9,
    "reference": "ChIJV1rnpl2c4jARyPXKBBAlWlA",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 278,
    "vicinity": "สวนวชิรเบญจทัศ (สวนรถไฟ) สวนรถไฟ แขวง จตุจักร เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8310315,
        "lng": 100.5496052
      },
      "viewport": {
        "northeast": {
          "lat": 13.83236607989272,
          "lng": 100.5509842298927
        },
        "southwest": {
          "lat": 13.82966642010728,
          "lng": 100.5482845701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้านลมโชย",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 2988,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102134322980334048197\">Amphai Sritharathikhun</a>"
        ],
        "photo_reference": "Aap_uECs3ENivaiTGltS2Pq6u22x2_OvelDVhRxATaqRtgYiUK1GC0pFs3WwWyUwgKNn7IHjv3_3SLdCdmLtlKN1H5eyjBah2uiphSx2skq5br6wU9Frlu2fjY967DAu806CMBiecyOdAr69mVo-R0Kl-1y2-GL7cFSJuTFQfIPjhtmbeur_",
        "width": 5312
      }
    ],
    "place_id": "ChIJjabigYyc4jARiKzcB_2pj0Y",
    "plus_code": {
      "compound_code": "RGJX+CR กรุงเทพมหานคร",
      "global_code": "7P52RGJX+CR"
    },
    "price_level": 2,
    "rating": 4.2,
    "reference": "ChIJjabigYyc4jARiKzcB_2pj0Y",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 121,
    "vicinity": "113/1 ซอย รัชดาภิเษก 52 แขวง ลาดยาว เขตจ ตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8170553,
        "lng": 100.554936
      },
      "viewport": {
        "northeast": {
          "lat": 13.81843972989272,
          "lng": 100.5562609298927
        },
        "southwest": {
          "lat": 13.81574007010728,
          "lng": 100.5535612701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "พลอยนารี ริมน้ำ สวนรถไฟ",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 2268,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105076519157791562582\">Thitikorn K.</a>"
        ],
        "photo_reference": "Aap_uECHs_K0pGXuMnVG1IiyFDxDLBmyKnCxfIDNDJ64LrE6DQaMfwApof2WBAkcREimNC7BhYUnK0Dca2F155TOMKYsD6K8h677yhyhA17teYvaw3sMbgVeZ6Fck5j3LqnUbqXvZsozt3u2--sfqy6QUCH3Bmg8unggl823rh-re1iSnKYc",
        "width": 4032
      }
    ],
    "place_id": "ChIJP43UUlyc4jAR7vOhOeBngB8",
    "plus_code": {
      "compound_code": "RH83+RX กรุงเทพมหานคร",
      "global_code": "7P52RH83+RX"
    },
    "price_level": 2,
    "rating": 4,
    "reference": "ChIJP43UUlyc4jAR7vOhOeBngB8",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 143,
    "vicinity": "1-257/50 ซอย นิคมรถไฟสาย 1 แขวง จตุจักร เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.840187,
        "lng": 100.5486765
      },
      "viewport": {
        "northeast": {
          "lat": 13.84148137989272,
          "lng": 100.5500213298927
        },
        "southwest": {
          "lat": 13.83878172010728,
          "lng": 100.5473216701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้านอาหารบ้านไอซ์",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 720,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103052728263680748718\">G Crimson</a>"
        ],
        "photo_reference": "Aap_uEAH1qLzcjJpBo7SdkICBT5jgT5BOGsRyM1MXypwJ81Yy3lJHHUXqIhxve9HNaRYqEODMD7HCnG_8Sp79y7nNw3OCcFIQth9rtTrwfnI0-5U0pQbydfyi46dfrNe5RAjED0r95ivSzjFX8C8fw3rugNUf6et05rPtUvdL8zMAUCCfIs",
        "width": 960
      }
    ],
    "place_id": "ChIJV755YpCc4jARD8GcCjfpnmw",
    "plus_code": {
      "compound_code": "RGRX+3F กรุงเทพมหานคร",
      "global_code": "7P52RGRX+3F"
    },
    "price_level": 2,
    "rating": 4.3,
    "reference": "ChIJV755YpCc4jARD8GcCjfpnmw",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 514,
    "vicinity": "99/203 ถนน เทศบาลสงเคราะห์ แขวง ลาดยาว เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8180463,
        "lng": 100.5359775
      },
      "viewport": {
        "northeast": {
          "lat": 13.81938607989272,
          "lng": 100.5373748298927
        },
        "southwest": {
          "lat": 13.81668642010728,
          "lng": 100.5346751701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "เก๋า-เก๋า อาหารตามสั่ง",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 3024,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113502144503149232819\">BigS Nitiwat</a>"
        ],
        "photo_reference": "Aap_uECAsWBg8KOgeLYjIuPZXNDcnAcR-ZaLhsGNdDW683W0R7P-iHOkalFovXCw2PAd6QYgy9mzuUW3rEV2xqvOKNgTY50sUkdJtTOGdcUBFh-clT9f58k5razGFZfgVV_KHIiuR6Pz15hAoonbrf-Uioz4awHo4ZUBBEv_nPCAFRMIp9RW",
        "width": 4032
      }
    ],
    "place_id": "ChIJyXOMz3uc4jARhsYHR_Lg-o0",
    "rating": 4.2,
    "reference": "ChIJyXOMz3uc4jARhsYHR_Lg-o0",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 22,
    "vicinity": "RG9P+699 แขวง บางซื่อ เขตบางซื่อ"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.82572,
        "lng": 100.5553484
      },
      "viewport": {
        "northeast": {
          "lat": 13.82702852989272,
          "lng": 100.5567306298927
        },
        "southwest": {
          "lat": 13.82432887010728,
          "lng": 100.5540309701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้านอาหารแกงไท",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 1960,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107535983626412649351\">A Google User</a>"
        ],
        "photo_reference": "Aap_uEAQBCJfE62bUJYih75QtanJIy9-i7ICo15N7w7HJ4QR9RkSx34oP1vijUZ2izP1iLA23CYdI3uaf_A1dDbiQV17t-X223tDC0fcg4U1NB9AbjJ-FGBBy_eMtsgfVdDwSrioOV6dAQXbuQx7AJsC3IqoOADDmaZvEkM0DbJfuog18EBA",
        "width": 4032
      }
    ],
    "place_id": "ChIJexIyhfWc4jARwp-_mhOSCk8",
    "plus_code": {
      "compound_code": "RHG4+74 กรุงเทพมหานคร",
      "global_code": "7P52RHG4+74"
    },
    "rating": 4.5,
    "reference": "ChIJexIyhfWc4jARwp-_mhOSCk8",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 43,
    "vicinity": "7/555 ซ. วิภาวดีรังสิต 17 แขวง จตุจักร เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8234404,
        "lng": 100.550642
      },
      "viewport": {
        "northeast": {
          "lat": 13.82479847989272,
          "lng": 100.5519963798927
        },
        "southwest": {
          "lat": 13.82209882010728,
          "lng": 100.5492967201073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้านครัวตามใจสั่ง",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 2988,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103608049995766120705\">Piya Yves Rodvanich</a>"
        ],
        "photo_reference": "Aap_uECFpat5o9CMV7ORrvTrjHF94Ovl9Plhm5n8-_dvbjl1LOydTxf9qRzuquM3CAoJIP3L3-QCAqs8zEiEpFGRiB2iZmlPQ-Dv9nN3YyRSXytSvlC4pDTUU4fcKxOLGS_5l8qmFheeXfoWsA5AY5D8Ls0_fNKBkIozC02vyuMfEevTkuAS",
        "width": 5312
      }
    ],
    "place_id": "ChIJZyAaQmCc4jARoanZhzgAdpE",
    "plus_code": {
      "compound_code": "RHF2+97 กรุงเทพมหานคร",
      "global_code": "7P52RHF2+97"
    },
    "rating": 4.1,
    "reference": "ChIJZyAaQmCc4jARoanZhzgAdpE",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 26,
    "vicinity": "วิภาวดีรังสิต 11 แขวง จตุจักร เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8341271,
        "lng": 100.5487891
      },
      "viewport": {
        "northeast": {
          "lat": 13.83549802989272,
          "lng": 100.5501553798927
        },
        "southwest": {
          "lat": 13.83279837010728,
          "lng": 100.5474557201073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "PaN Bake & Bistro",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 2592,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103632218584532330201\">apichai passadu</a>"
        ],
        "photo_reference": "Aap_uEAZ5N3tuUZL52WD0Ah6Tcl__7P1fELw_NBhqEyEcUJbVsvAW3qILscZo1yG6y-7olKkcxsUv-e4o3TytmRAxkfr-5P3UmBv2pCHPLM1sENQKUz6fZqlLT9oSD1x0t18swUjwRSulDk4e5c0E4tZk3-Fjte9ubJHP9gOyJiwU8tZRfm6",
        "width": 4608
      }
    ],
    "place_id": "ChIJzQpcq42c4jARK88B1ECwPzU",
    "plus_code": {
      "compound_code": "RGMX+MG กรุงเทพมหานคร",
      "global_code": "7P52RGMX+MG"
    },
    "price_level": 2,
    "rating": 4.7,
    "reference": "ChIJzQpcq42c4jARK88B1ECwPzU",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "bakery",
      "cafe",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    "user_ratings_total": 107,
    "vicinity": "427 ม ประชานิเวศน์1 ซ., 13, ถนน เทศบาลนิมิตใต้ แขวง ลาดยาว เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8111789,
        "lng": 100.5405849
      },
      "viewport": {
        "northeast": {
          "lat": 13.81254752989272,
          "lng": 100.5419320798927
        },
        "southwest": {
          "lat": 13.80984787010728,
          "lng": 100.5392324201073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้านครัวริมน้ำ",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 1773,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108538028108560341245\">Chakrit Rakhuang</a>"
        ],
        "photo_reference": "Aap_uECvFIuv3rMRH85lJGXGDphxA1ZNsmEmFN7Hgk_Xtllj3974fJ-EbuY_YxDlfi2c3fRztbd1Tw_T01hcyKHmmCfyCBGow6iF7alxF64F4iLODPvP1vTZ0aPy6y2Z875x3h7J4gjdeMk8UNanVuAn1T5TEFhRCfHbCaXerBqp9nyANFM4",
        "width": 2364
      }
    ],
    "place_id": "ChIJ24Jo1HGc4jAR5qwHZXSGzQM",
    "plus_code": {
      "compound_code": "RG6R+F6 กรุงเทพมหานคร",
      "global_code": "7P52RG6R+F6"
    },
    "rating": 4.1,
    "reference": "ChIJ24Jo1HGc4jAR5qwHZXSGzQM",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 51,
    "vicinity": "ซอย ประชาชื่น 4 แยก 1-4 แขวง บางซื่อ เขตบางซื่อ"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8136986,
        "lng": 100.5622786
      },
      "viewport": {
        "northeast": {
          "lat": 13.81505852989272,
          "lng": 100.5637154798927
        },
        "southwest": {
          "lat": 13.81235887010728,
          "lng": 100.5610158201073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้าน มะชิตัง",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 5472,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109480740301445282755\">Ruxo Zheng</a>"
        ],
        "photo_reference": "Aap_uECPA8-te_Dl5CAq218gI1UnuIwhh_T-FINRmMRpd0QAGWfHLNxoKi9Si5H3eg0Ub5TWkueLFJciqRZQ3MJLG3RqNr7vbqudtIeFhw0HgjABjXiQ_jochW5UUZwcS1nR1Zk11D2_lF-L4d2yUbJDgyMChZX0sZ6ZPVRR7doh9FVz1-BA",
        "width": 7296
      }
    ],
    "place_id": "ChIJF-Gotlqc4jARxsGCDdHzAhY",
    "plus_code": {
      "compound_code": "RH76+FW กรุงเทพมหานคร",
      "global_code": "7P52RH76+FW"
    },
    "price_level": 2,
    "rating": 4.4,
    "reference": "ChIJF-Gotlqc4jARxsGCDdHzAhY",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 110,
    "vicinity": "ห้าง สรรพ สินค้า ยู เนี่ ย น มอลล์ ชั้น 4 เลข ที่ 54 ซอย ลาดพร้าว 1 แขวง จอมพล เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8399925,
        "lng": 100.5461105
      },
      "viewport": {
        "northeast": {
          "lat": 13.84138512989272,
          "lng": 100.5474599798927
        },
        "southwest": {
          "lat": 13.83868547010728,
          "lng": 100.5447603201073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    "icon_background_color": "#4B96F3",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    "name": "ร้านเก้าอี้ขาว",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 3024,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108457460470120904420\">puwit phakawanit</a>"
        ],
        "photo_reference": "Aap_uEAWV6zEJSACj9VcXeZl1zdb8qL-ywoLvQrKPj5-xSnE3NMg8HJZ5YXjjHWpRpIOyJPqoqKYy1sTXGDyH4CBTA7jaQVyTxF-yGvMDmaS8ZHH5Q5rjrfrM6vLblzlfERTy-66AxyI7nz4SFimWmjKALYn-5HHSAjDKlGo7YJN6d87iSYH",
        "width": 4032
      }
    ],
    "place_id": "ChIJ5TYEeZGc4jARr8m_a4O2kjI",
    "plus_code": {
      "compound_code": "RGQW+XC กรุงเทพมหานคร",
      "global_code": "7P52RGQW+XC"
    },
    "price_level": 2,
    "rating": 4.2,
    "reference": "ChIJ5TYEeZGc4jARr8m_a4O2kjI",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    "user_ratings_total": 294,
    "vicinity": "11, 22 ถนน เทศบาลสงเคราะห์ แขวง ลาดยาว เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8345401,
        "lng": 100.5405318
      },
      "viewport": {
        "northeast": {
          "lat": 13.83589292989272,
          "lng": 100.5418695798927
        },
        "southwest": {
          "lat": 13.83319327010728,
          "lng": 100.5391699201073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้านสุนทรี",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 960,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103787550966350736864\">Chuly Phanangam</a>"
        ],
        "photo_reference": "Aap_uEB9gbUQTT2ZHAd-sOGuvK2OFgOVlANCjDY-I5WRtJrdf_N5OhlotwrDIJn_BhDWtryqKvrq-6RMcs1spQgHDuIfbxtZ3bgeJ-5fbgfR7HuIwToQ6f3qK2_EM1G2rOiiJq3Su8PVmZRUU9H6EdFKcOKlhAxxTluBqVmnYVn9wtSNnJnk",
        "width": 960
      }
    ],
    "place_id": "ChIJBZBzYo-c4jARewQOAQu7xho",
    "plus_code": {
      "compound_code": "RGMR+R6 กรุงเทพมหานคร",
      "global_code": "7P52RGMR+R6"
    },
    "rating": 3.9,
    "reference": "ChIJBZBzYo-c4jARewQOAQu7xho",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 129,
    "vicinity": "83 7 ถนน ประชาชื่น แขวง ลาดยาว เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8445504,
        "lng": 100.542993
      },
      "viewport": {
        "northeast": {
          "lat": 13.84591982989272,
          "lng": 100.5442668298927
        },
        "southwest": {
          "lat": 13.84322017010728,
          "lng": 100.5415671701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ร้านเชฟถนอม สาขาประชาชื่น",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 3680,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106072409437197074311\">A Google User</a>"
        ],
        "photo_reference": "Aap_uEAc29zGIe6WAWd8bOtzCMoPAqn5xcprZwdq19BNZl_h902RXYdtEXGn3VbWkVNt12RVXZDR_zlB8iH-6o83uJijVoX7QslGeAezohp3-x4FeuqlhsIQfFcKfb4uOoTbgGmp7UxBiPrglS_asYYGjEbBdJv8geP-S9_lHnH-C-jgGx5g",
        "width": 5528
      }
    ],
    "place_id": "ChIJpUo4F5ec4jARfMzFGu5zRJ0",
    "plus_code": {
      "compound_code": "RGVV+R5 กรุงเทพมหานคร",
      "global_code": "7P52RGVV+R5"
    },
    "price_level": 2,
    "rating": 4.5,
    "reference": "ChIJpUo4F5ec4jARfMzFGu5zRJ0",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 61,
    "vicinity": "40 อาคารลายูนิค ถนน ถ. เทศบาลรังสรรค์เหนือ แขวง ลาดยาว เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.823685,
        "lng": 100.537355
      },
      "viewport": {
        "northeast": {
          "lat": 13.82504372989272,
          "lng": 100.5387061298927
        },
        "southwest": {
          "lat": 13.82234407010728,
          "lng": 100.5360064701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ชิมไทย",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 2976,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106139510056580617989\">mitm2001</a>"
        ],
        "photo_reference": "Aap_uEAdIDOXkwG9Gm2BoC54IBAr7kjAs8X3UGAQUaPiBYwQKv1rQlLXR6nC-iXalMLHxCDa1a7Wwhg5LDogl3CoU18oU27r9AtFbj2DdwEFmld7GRu-iuRmWtklZvVR0FXyI4z-UmJFBv2ankSVG5K4AXrKtiP86V8_v2RbwD8z8d2ZHLE_",
        "width": 3968
      }
    ],
    "place_id": "ChIJr63_r32c4jARLk5AWxLpwcE",
    "plus_code": {
      "compound_code": "RGFP+FW กรุงเทพมหานคร",
      "global_code": "7P52RGFP+FW"
    },
    "rating": 4.3,
    "reference": "ChIJr63_r32c4jARLk5AWxLpwcE",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 69,
    "vicinity": "812 21 ซอย ประชาชื่น 24 แขวง วงศ์สว่าง เขตบางซื่อ"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8131495,
        "lng": 100.5602402
      },
      "viewport": {
        "northeast": {
          "lat": 13.81454927989272,
          "lng": 100.5615098798927
        },
        "southwest": {
          "lat": 13.81184962010728,
          "lng": 100.5588102201073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ปาเต๊ะ ห้าแยกลาดพร้าว",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 1908,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109284751668220466567\">nuring ring</a>"
        ],
        "photo_reference": "Aap_uEBzs3ix1vH3tKpJHR2LO7b89OqTkI8lJ_zEq5LG2iN3n8K779c-sUW7CqiZf_oX4092LktBMwEUfxKDHMXW0hgM3rl6e9vQK9TKRyRgV59YoGIEypgjT26pl8vf8ytZbUnkGZN5U_bmyj2Zp-0gqP4mcAIae73g60x8PVMsRTdlHXiS",
        "width": 4032
      }
    ],
    "place_id": "ChIJ7TSI00Sc4jAR9DXmxyq4chI",
    "plus_code": {
      "compound_code": "RH76+73 กรุงเทพมหานคร",
      "global_code": "7P52RH76+73"
    },
    "price_level": 2,
    "rating": 4.3,
    "reference": "ChIJ7TSI00Sc4jAR9DXmxyq4chI",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 555,
    "vicinity": "1130/5 ถนน วิภาวดีรังสิต แขวง จอมพล เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8173636,
        "lng": 100.5535654
      },
      "viewport": {
        "northeast": {
          "lat": 13.81872632989272,
          "lng": 100.5547918798927
        },
        "southwest": {
          "lat": 13.81602667010728,
          "lng": 100.5520922201073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "โบกี้-รถไฟ",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 1080,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/115669908856852643497\">du du</a>"
        ],
        "photo_reference": "Aap_uEAUsdShH-JGG7yx5yadgg3GPduYQaYVLBwciV9b8rOhku2PexsB4FQpK1CW0JJDvsaizzFF6UcFXr9oQJBWEWSB-Py1MQrp6ci8cUFOp4jw-9YvY6Kg17fyvvdn26zmiehx88CeUZSlNMBxWBtXRmHjW4pz0LzVHGHGSD6vL7S5v00l",
        "width": 1920
      }
    ],
    "place_id": "ChIJ-axCvV2c4jAR2x4H5Dv50wQ",
    "rating": 3.9,
    "reference": "ChIJ-axCvV2c4jAR2x4H5Dv50wQ",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 24,
    "vicinity": "RH83+WCW แขวง จตุจักร เขตจตุจักร"
  },
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 13.8430223,
        "lng": 100.5597379
      },
      "viewport": {
        "northeast": {
          "lat": 13.84432222989272,
          "lng": 100.5611246298927
        },
        "southwest": {
          "lat": 13.84162257010728,
          "lng": 100.5584249701073
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "ใบไม้ร่าเริง",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 3024,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103302998915569269559\">Sirinapha Jongsuwan</a>"
        ],
        "photo_reference": "Aap_uECctClHSWgUuRAwi3-qxpY419T56XSXeKXCfvkbwVWUfyiex0M1oPhkBzegfW8ghPFJWhvRt26dCo6QwDkPfNAMvVJmXFDug0rqH116Oc5qNjjY6SPAssPhPsGpMdTJSv6eA60fXaHE32PeOFE0DDhdHEvLJNdZ0SfYw70wb5QfWUfA",
        "width": 4032
      }
    ],
    "place_id": "ChIJzeXAwuec4jARgM8aqHjAlFM",
    "plus_code": {
      "compound_code": "RHV5+6V กรุงเทพมหานคร",
      "global_code": "7P52RHV5+6V"
    },
    "price_level": 2,
    "rating": 3.9,
    "reference": "ChIJzeXAwuec4jARgM8aqHjAlFM",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 711,
    "vicinity": "เลขที่ 1 วิภาวดีรังสิต 48 แขวง ลาดยาว เขตจตุจักร"
  }
]
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
