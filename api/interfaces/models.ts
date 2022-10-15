import { Base } from "./index";

export interface CommentAttributes extends Base {
  content: string;
}

export interface ProjectAttributes extends Base {
  id: string;
  title: string;
  status: string;
  description: string;
  staffId: number;
  taskId: number;
  commentId: number;
}

export interface StaffAttributes extends Base {
  id: string;
  staffName: string;
  email: string;
  //   password: string;
  status: string;
}

export interface TaskAttributes extends Base {
  content: string;
  status: string;
  staffId: number;
}

export interface PasswordAttributes extends Base {
  id: string;
  hash: string;
  salt: number;
  status: string;
  //   staffId: number;
}

export interface TokenAttributes extends Base {
  id: string;
  token: string;
  reason: number;
  isRevoked: string;
  staffId: number;
}

export interface ProjectStaffAttributes extends Base {
  projectId: string;
  staffId: string;
}

export interface StaffTaskAttributes extends Base {
  taskId: string;
  staffId: string;
}

export enum Status {
  Active = "Active",
  INACTIVE = "INACTIVE",
  COMPLETED = "COMPLETED",
  INCOMPLETE = "INCOMPLETE",
  INPROGRESS = "INPROGRESS",
  ONHOLD = "ONHOLD",
  TERMINATED = "TERMINATED",
  REFRESHTOKEN = "REFRESHTOKEN",
}
