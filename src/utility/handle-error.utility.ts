import { BadRequestException, InternalServerErrorException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';

export function handleError(err: Error): undefined {
  const error = err.message?.split('\n');
  const lastErrLine = error[error.length - 1]?.trim();

  if (!lastErrLine) {
    console.error(err);
  }

  throw new UnprocessableEntityException(
    lastErrLine || 'Algum erro ocorreu ao executar a operação',
  );

}

export function BadRequest(err: Error): undefined {
  const error = err.message?.split('\n');
  const lastErrLine = error[error.length - 1]?.trim();

  if (!lastErrLine) {
    console.error(err);
  }

  throw new BadRequestException(
    lastErrLine || 'Algum erro ocorreu ao executar a operação',
  );

}

export function Unauthorized(err: Error): undefined {
  const error = err.message?.split('\n');
  const lastErrLine = error[error.length - 1]?.trim();

  if (!lastErrLine) {
    console.error(err);
  }

  throw new UnauthorizedException(
    lastErrLine || 'Algum erro ocorreu ao executar a operação',
  );

}

export function NotFound(err: Error): undefined {
  const error = err.message?.split('\n');
  const lastErrLine = error[error.length - 1]?.trim();

  if (!lastErrLine) {
    console.error(err);
  }

  throw new NotFoundException(
    lastErrLine || 'Algum erro ocorreu ao executar a operação',
  );

}

export function ServerError(err: Error): undefined {
  const error = err.message?.split('\n');
  const lastErrLine = error[error.length - 1]?.trim();

  if (!lastErrLine) {
    console.error(err);
  }

  throw new InternalServerErrorException(
    lastErrLine || 'Algum erro ocorreu ao executar a operação',
  );

}
