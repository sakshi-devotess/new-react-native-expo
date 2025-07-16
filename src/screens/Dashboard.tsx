import { SafeAreaView, Text, View } from "react-native";
import AppButton from "../components/Button";
import { deleteUser } from "../library/utilities/secureStore";

const Dashboard = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome to the Dashboard</Text>
        <AppButton
          text="Logout"
          onPress={async () => {
            await deleteUser();
          }}
        />
        {/* Additional dashboard content can go here */}
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
