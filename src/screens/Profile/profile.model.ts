export interface IUser {
  first_name: string;
  last_name: string;
  profile_picture: {
    uri: string;
    name: string;
    type: string;
  } | null;
  email: string;
}
