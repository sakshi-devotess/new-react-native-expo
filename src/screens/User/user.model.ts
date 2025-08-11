export interface IUser {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  mobile: string | null;
}

export interface ICreateUser {
  setUserDialog: (value: boolean) => void;
  onCreated?: (user: IUser) => void;
}

export interface IUserForm {
  methods?: any;
  onSubmit?: (data: IUser) => void;
  isEdit?: boolean;
  handleClose: () => void;
}

export interface IUpdateUser {
  data: IUser;
  setUserDialog: (value: boolean) => void;
  onUpdated: (user: IUser) => void;
  isEdit?: boolean;
}
