export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Image {
  id: string;
  url: string;
  userId: string;
  createdAt: string;
}
