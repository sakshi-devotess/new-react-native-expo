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
