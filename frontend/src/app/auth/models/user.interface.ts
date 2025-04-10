export interface User {
  id: number;
  username: string;
  password: string;
  created_at: Date;
}

export interface ConnectResponse extends User {
  jwt: string;
}
