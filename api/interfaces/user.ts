
export interface Staff {
  id: string;
  staffName: string;
  email: string;
  password: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface GenerateAuthToken extends Pick<Staff, "email" | "password">{}

