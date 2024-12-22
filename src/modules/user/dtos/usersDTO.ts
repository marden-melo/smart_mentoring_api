export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  roleId: string;
  planId?: string;
  testStartDate?: Date;
  isActive?: boolean;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  roleId?: string;
  planId?: string;
  testStartDate?: Date;
  isActive?: boolean;
}

export interface UserDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string;
  roleId: string;
  planId: string | null;
  testStartDate: Date | null;
  isActive: boolean;
}
