import 'fastify'


declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUser(): Promise<{ 
      userId: string, 
      email: string, 
    }>
  }
}