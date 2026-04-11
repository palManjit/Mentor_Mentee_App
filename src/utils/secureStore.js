import * as SecureStore from "expo-secure-store";

const USER_ID_KEY = "userId";
const TOKEN_KEY = "token";
const USER_KEY = "user";

// ✅ save token
export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, String(token));
  } catch (error) {
    console.log("Token not saved");
  }
};

// ✅ get token
export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.log("Token not fetched");
  }
};

// ✅ save userId
export const saveUserId = async (id) => {
  try {
    await SecureStore.setItemAsync(USER_ID_KEY, String(id));
  } catch (error) {
    console.log("UserId not saved");
  }
};

// ✅ get userId
export const getUserId = async () => {
  try {
    return await SecureStore.getItemAsync(USER_ID_KEY);
  } catch (error) {
    console.log("UserId not fetched");
  }
};

// 🔥 NEW: save full user
export const saveUser = async (user) => {
  try {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.log("User not saved");
  }
};

// 🔥 NEW: get full user
export const getUser = async () => {
  try {
    const user = await SecureStore.getItemAsync(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.log("User not fetched");
  }
};