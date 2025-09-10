import { users } from './data';
import { QueryArgs } from './types';

export const resolvers = {
  Query: {
    getUser: (_parent: any, args: QueryArgs['getUser']) => {
      return users.find(user => user.id === args.id) || null;
    },
    listUsers: (_parent: any, args: QueryArgs['listUsers']) => {
      if (args.limit && args.limit > 0) {
        return users.slice(0, args.limit);
      }
      return users;
    }
  }
};
