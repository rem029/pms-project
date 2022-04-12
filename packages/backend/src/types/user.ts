export interface UserInfo {
	Usr_Id: string;
	Usr_Name: string;
	Usr_Email: string;
	Usr_Ph: string;
	IsAdmin: number; //if full access = 1
	IsActive: number; //If account is activated = 1
	IsAdd: number; //can create new entries
	IsEdit: number;
	IsCancel: number;
	IsDelete: number;
}
