export interface IAuthSuccess {
  code: number;
  state: any;
}

export interface IAuthFail {
  error: string;
  state: any;
}

export interface ITokens {
  accessToken
}

export interface ITokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export interface IRefreshResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
}