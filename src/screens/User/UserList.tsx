import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Loader from "../../components/Loader/Loader";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../config/constants";
import EmptyComponent from "../../components/EmptyComponent";
import UserCreate from "./UserCreate";
import UserUpdate from "./UserUpdate";
import { IUser } from "./user.model";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import userApiInstance from "../../services/user/user.service";

const User = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);

  const handleDelete = async () => {
    if (!idToDelete) return;
    setIdToDelete(null);
    try {
      const res = await userApiInstance.deleteUser(idToDelete);
      if (res?.status) {
        fetchUsers();
      }
    } catch (err: any) {
      console.error("Error deleting user:", err);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userList = await userApiInstance.getUsers();
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading}>
        <View style={styles.topBar}>
          <Text style={styles.title}>User List</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="add-circle" size={30} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* List of users */}
        <FlatList
          data={users}
          keyExtractor={(item) => item?.id?.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.leftContent}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item?.first_name?.[0] ?? ""}
                  </Text>
                </View>
                <View>
                  <Text
                    style={styles.userName}
                    numberOfLines={1} // Ensures truncation occurs after 1 line
                    ellipsizeMode="tail" // Ensures the text is truncated at the tail (end) with "..."
                  >
                    {item.first_name} {item.last_name || ""}
                  </Text>

                  <View style={styles.typeTag}>
                    <Text style={styles.typeTagText}>{item.email}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => {
                    setSelectedUser(item);
                    setUpdateModalVisible(true);
                  }}
                >
                  <Ionicons name="pencil" size={18} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setIdToDelete(item.id)}
                >
                  <Ionicons name="trash" size={18} color={colors.red} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={EmptyComponent("No users found")}
        />

        {/* Modal for adding/updating user */}
        {modalVisible && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <UserCreate
                  setUserDialog={() => {
                    setModalVisible(false);
                  }}
                  fetchUsers={fetchUsers}
                />
              </View>
            </View>
          </Modal>
        )}

        {/* Modal for updating user */}
        <Modal visible={updateModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <UserUpdate
                data={selectedUser!}
                setUserDialog={() => setUpdateModalVisible(false)}
                isEdit={true}
                fetchUsers={fetchUsers}
              />
            </View>
          </View>
        </Modal>

        {/* Confirmation modal for deletion */}
        <ConfirmDeleteModal
          visible={!!idToDelete}
          onClose={() => setIdToDelete(null)}
          onConfirm={handleDelete}
          entityName={"Animal"}
        />
      </Loader>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  listContent: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#d1eaff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
    width: 200,
  },
  typeTag: {
    backgroundColor: "#e0f7e9",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  typeTagText: {
    fontSize: 12,
    color: colors.primary,
  },
  actions: {
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: "#f4f4f4",
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  parkName: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
});

export default User;
