export enum UserRole {
  ADMIN = 'admin',
  LEGAL_ANALYST = 'legal_analyst',
  REVIEWER = 'reviewer',
  VIEWER = 'viewer'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  lastLogin?: Date;
}
