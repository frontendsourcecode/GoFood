import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'api_key';
const USER_DETAILS = 'user_details';
const CART = 'cart';
const PRODUCTITEM = 'product_item';
const WISHLIST = 'wishlist';
const FIREBASE_TOKEN = 'firebase_token';

export const getApiKey = async () => {
    try {
        let apiKey = await AsyncStorage.getItem(API_KEY);
        return apiKey;
    } catch (error) {
        console.log('Error fetching', error);
        return null;
    }
};

export const setApiKey = api => {
    AsyncStorage.setItem(API_KEY, api);
};

export const getFirebaseToken = async () => {
    try {
        let firebaseToken = await AsyncStorage.getItem(FIREBASE_TOKEN);
        return firebaseToken;
    } catch (error) {
        console.log('Error fetching', error);
        return null;
    }
};

export const setFirebaseToken = token => {
    AsyncStorage.setItem(FIREBASE_TOKEN, token);
};

export const getToken = async () => {
    try {
        let userDetails = await AsyncStorage.getItem(USER_DETAILS);
        userDetails = JSON.parse(userDetails);
        return userDetails.token;
    } catch (error) {
        console.log('Error fetching', error);
        return null;
    }
};

export const getUserDetails = async () => {
    try {
        let userDetails = await AsyncStorage.getItem(USER_DETAILS);
        userDetails = JSON.parse(userDetails);
        return userDetails;
    } catch (error) {
        console.log('Error fetching', error);
        return null;
    }
};

export const setUserDetails = user => {
    AsyncStorage.setItem(USER_DETAILS, JSON.stringify(user));
};

export const getCart = async () => {
    try {
        let cartDetails = await AsyncStorage.getItem(CART);
        cartDetails = JSON.parse(cartDetails);
        return cartDetails;
    } catch (error) {
        console.log('Error fetching', error);
        return null;
    }
};

export const setCart = cart => {
    AsyncStorage.setItem(CART, JSON.stringify(cart));
};

export const getProductItem = async () => {
    try {
        let productDetails = await AsyncStorage.getItem(PRODUCTITEM);
        productDetails = JSON.parse(productDetails);
        return productDetails;
    } catch (error) {
        console.log('Error fetching', error);
        return null;
    }
};

export const setWishlist = product => {
    AsyncStorage.setItem(WISHLIST, JSON.stringify(product));
};

export const geWishlist = async () => {
    try {
        let wishlist = await AsyncStorage.getItem(WISHLIST);
        wishlist = JSON.parse(wishlist);
        return wishlist;
    } catch (error) {
        console.log('Error fetching wishlist', error);
        return null;
    }
};

export const setProductItem = productItem => {
    AsyncStorage.setItem(PRODUCTITEM, JSON.stringify(productItem));
};

export const logout = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        // clear error
    }

    console.log('Done.');
};
