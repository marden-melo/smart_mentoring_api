export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  roleId: string;

  area?: string;
  specialization?: string;
  availableSlots?: string[];
  experience?: string;
  successStories?: string;
  certifications?: string;
  projects?: string;
  methods?: string;
  strategy?: string;
  tools?: string;
  methodologies?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  roleId?: string;

  area?: string;
  specialization?: string;
  availableSlots?: string[];
  experience?: string;
  successStories?: string;
  certifications?: string;
  projects?: string;
  methods?: string;
  strategy?: string;
  tools?: string;
  methodologies?: string;
}
