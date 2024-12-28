declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: string;
      role: {
        name: string;
        permissions: {
          name: string;
        }[];
      };
      permissions: string[];
    };
  }
}
