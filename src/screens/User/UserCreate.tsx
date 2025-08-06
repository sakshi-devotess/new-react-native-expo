import { useForm } from "react-hook-form";
import UserForm from "./UserForm";
import { ICreateUser, IUser } from "./user.model";
import userApiInstance from "../../services/user/user.service";
import { setApiErrorsToForm, showToast } from "../../library/utilities/message";

const UserCreate = (props: ICreateUser) => {
  const { setUserDialog, fetchUsers } = props;
  const methods = useForm<IUser>({
    defaultValues: {
      first_name: null,
      last_name: null,
      email: null,
      mobile: null,
    },
  });

  const onSubmit = async (formData: IUser) => {
    try {
      const res = await userApiInstance.createUser(formData);
      if (res?.status) {
        methods.reset();
        showToast("info", "User created successfully.");
        setUserDialog(false);
        fetchUsers();
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
    <UserForm methods={methods} onSubmit={onSubmit} handleClose={handleClose} />
  );
};

export default UserCreate;
