import { HttpErrorResponse } from "@angular/common/http";

export abstract class RemoteData<T = any> {
  get isSuccess() {
    return this instanceof Success;
  }
  get isFailure() {
    return this instanceof Failure;
  }
  get isInProgress() {
    return this instanceof InProgress;
  }

  constructor(
    public readonly data: T,
    public readonly error: HttpErrorResponse,
    public readonly inProgress: boolean
  ) {}
}

export class Success<T> extends RemoteData<T> {
  constructor(data: T) {
    super(data, null, false);
  }
}

export class Failure extends RemoteData {
  constructor(error: HttpErrorResponse) {
    super(null, error, false);
  }
}

export class InProgress extends RemoteData {
  constructor() {
    super(null, null, true);
  }
}
