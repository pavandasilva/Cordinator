export class Failure<FailResult, SuccessResult> {
  readonly value: FailResult;

  constructor(value: FailResult) {
    this.value = value;
  }

  isFailure(): this is Failure<FailResult, SuccessResult> {
    return true;
  }

  isSuccess(): this is Success<FailResult, SuccessResult> {
    return false;
  }
}

export class Success<FailResult, SuccessResult> {
  readonly value: SuccessResult;

  constructor(value: SuccessResult) {
    this.value = value;
  }

  isFailure(): this is Failure<FailResult, SuccessResult> {
    return false;
  }

  isSuccess(): this is Success<FailResult, SuccessResult> {
    return true;
  }
}

export type Either<F, S> = Failure<F, S> | Success<F, S>;

export const failure = <FailResult, SuccessResult>(
  data: FailResult,
): Either<FailResult, SuccessResult> => {
  return new Failure(data);
};

export const success = <FailResult, SuccessResult>(
  data: SuccessResult,
): Either<FailResult, SuccessResult> => {
  return new Success<FailResult, SuccessResult>(data);
};
