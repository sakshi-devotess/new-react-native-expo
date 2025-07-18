import * as SecureStore from "expo-secure-store";

export const saveUser = async (data: object) => {
  await SecureStore.setItemAsync("user", JSON.stringify(data));
};

export const getUser = async () => {
  const user = await SecureStore.getItemAsync("user");
  return user ? JSON.parse(user) : null;
};

export const deleteUser = async () => {
  await SecureStore.deleteItemAsync("user");
};

export const saveUserIdentity = async (identity: object) => {
  await SecureStore.setItemAsync("user_identity", JSON.stringify(identity));
};

export const getUserIdentity = async () => {
  const identity = await SecureStore.getItemAsync("user_identity");
  return identity ? JSON.parse(identity) : null;
};
