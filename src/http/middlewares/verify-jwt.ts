import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyJwt(req: FastifyRequest, rep: FastifyReply) {
  try {
    req.jwtVerify();
  } catch (error) {
    return rep.status(401).send({ message: 'Unauthorized' });
  }
}
