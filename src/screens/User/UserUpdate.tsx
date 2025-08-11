import { useForm } from "react-hook-form";
import UserForm from "./UserForm";
import { IUpdateUser, IUser } from "./user.model";
import userApiInstance from "../../services/user/user.service";
import { setApiErrorsToForm, showToast } from "../../library/utilities/message";

const UserUpdate = (props: IUpdateUser) => {
  const { data, setUserDialog, isEdit, onUpdated } = props;
  const initialValues = {
    first_name: data?.first_name ?? "",
    last_name: data?.last_name ?? null,
    email: data?.email ?? null,
    mobile: data?.mobile ?? null,
  };

  const methods = useForm({
    values: initialValues,
  });

  const onSubmit = async (formData: IUser) => {
    try {
      const updatedData = {
        ...formData,
        id: data.id,
      };
      const res = await userApiInstance.updateUser(updatedData);

      if (res?.status) {
        const updated: IUser = (res?.data as IUser) ?? {
          ...data,
          ...formData,
          id: data.id,
        };
        methods.reset();
        showToast("info", "User updated successfully.");
        setUserDialog(false);
        onUpdated(updated);
      }
    } catch (err: any) {
      setApiErrorsToForm(err?.response, methods);
    }
  };

  const handleClose = () => {
    setUserDialog(false);
    methods.reset();
  };

  return (
    <UserForm
      methods={methods}
      onSubmit={onSubmit}
      handleClose={handleClose}
      isEdit={isEdit}
    />
  );
};

export default UserUpdate;
