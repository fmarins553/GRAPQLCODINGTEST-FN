export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

export interface QueryArgs {
  getUser: {
    id: string;
  };
  listUsers: {
    limit?: number;
  };
}
