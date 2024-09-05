export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  profileImage?: string;
  age?: number;
  phone?: string;
  address?: Address;
  createdAt?: Date;
  updatedAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export interface Address {
  country?: string;
  city?: string;
  street?: string;
}

export function getDefaultUser(): User {
  return {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileImage: '',
    age: 0,
    phone: '',
    address: {
      country: '',
      city: '',
      street: ''
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    resetPasswordToken: '',
    resetPasswordExpires: new Date()
  };
}

