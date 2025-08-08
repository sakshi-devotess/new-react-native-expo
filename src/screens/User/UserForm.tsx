import { ScrollView, StyleSheet, Text, View } from "react-native";
import { IUserForm } from "./user.model";
import { Controller, FormProvider } from "react-hook-form";
import Input from "../../components/Form/Input/Input";
import AppButton from "../../components/Button/Button";

const UserForm = (props: IUserForm) => {
  const { methods, onSubmit, handleClose, isEdit } = props;
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.modalTitle}>User</Text>
        <FormProvider {...methods}>
          <Controller
            control={methods.control}
            name="first_name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="First Name"
                value={value}
                onChange={onChange}
                attribute="first_name"
              />
            )}
          />

          <Controller
            control={methods.control}
            name="last_name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Last Name"
                value={value}
                onChange={onChange}
                attribute="last_name"
              />
            )}
          />

          <Controller
            control={methods.control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                value={value}
                onChange={onChange}
                attribute="email"
              />
            )}
          />

          <Controller
            control={methods.control}
            name="mobile"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Mobile"
                value={value}
                onChange={onChange}
                attribute="mobile"
                keyboardType="phone-pad"
              />
            )}
          />

          <View style={styles.buttonRow}>
            <AppButton
              text={"Cancel"}
              onPress={handleClose}
              variant="cancel"
              style={{ ...styles.buttonItem, ...styles.cancelButton }}
              textStyle={{ color: "#555" }}
            />
            <AppButton
              text={isEdit ? "Edit" : "Create"}
              onPress={methods.handleSubmit(onSubmit)}
              style={styles.buttonItem}
            />
          </View>
        </FormProvider>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  closeButton: {
    alignItems: "center",
    marginTop: 10,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  fieldSpacing: {
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  buttonItem: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: "#eee",
  },
});

export default UserForm;
