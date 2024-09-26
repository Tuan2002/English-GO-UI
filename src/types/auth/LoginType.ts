export interface ILoginRequestData {
  email: string;
  password: string;
  isRememberMe: boolean;
}

export interface ILoginResponseData {
  accessToken: {
    token: string;
    expiresAt: string;
    expiresAtUtc: string;
  };
  userInfo: {
    email: string;
    fullName: string;
    role: {
      roleName: string;
      displayName: string;
    };
    userId: string;
  };
}
