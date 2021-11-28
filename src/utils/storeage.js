import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageSearchHistory = async (SearchHistory) => {
    try {
        const jsonValue = await AsyncStorage.setItem('@SearchHistory', JSON.stringify(SearchHistory))
        return jsonValue
    } catch (e) {
        return false
    }
}
export const getStorageSearchHistory = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@SearchHistory')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        return []
    }
}
