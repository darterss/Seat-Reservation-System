import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
): void {
  console.error('Error:', error);

  if (error.statusCode) {
    reply.status(error.statusCode).send({
      error: error.message,
      statusCode: error.statusCode,
    });
  } else {
    reply.status(500).send({
      error: 'Internal Server Error',
      statusCode: 500,
    });
  }
}

export function notFoundHandler(_request: FastifyRequest, reply: FastifyReply): void {
  reply.status(404).send({
    error: 'Not Found',
    statusCode: 404,
  });
}
