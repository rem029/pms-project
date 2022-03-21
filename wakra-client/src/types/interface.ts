export interface UserInfo {
  Usr_Id: string;
  Usr_Name: string;
  Usr_Email: string;

  IsAdmin: number;
  IsActive: number;
  Usr_pwd: string;
  IsAdd: number;
  IsEdit: number;
  IsCancel: number;
  IsDelete: number;
}

export interface Token {
  token: string;
  expiresIn: string;
}
