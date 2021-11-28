export const searchFood = async (searchText, nextSeachToken, searchRadius) => {
    const api_key = 'AIzaSyD04YJ0VgpRx9tQNqFC_-AwxYph1e9h-1s';
    const types = 'food';
    const radius = searchRadius; // 1 = 1 meters
    const location = '13.831002,100.557490';
    const name = `&name=${searchText}`;
    const language = 'th'
    const pagetoken = `&pagetoken=${nextSeachToken}`;
    let query_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&types=${types}&language=${language}&key=${api_key}`
    if (searchText) query_url = query_url + name;
    if (nextSeachToken) query_url = query_url + pagetoken;
    try {
        let res = await fetch(`${query_url}`, {
            method: 'GET',
        }).catch((e) => console.error("_SearchFood error", e))
        return await res.json();
    } catch (error) {
        console.error("_SearchFood catch", error);
        return { message: error }
    }
}