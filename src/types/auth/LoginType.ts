export interface ILoginRequestData {
  username: string;
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
    username: string;
    fullName: string;
    role: {
      roleName: string;
      displayName: string;
    };
    userId: string;
  };
}
