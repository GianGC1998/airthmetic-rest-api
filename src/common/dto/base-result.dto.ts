export class BaseResultDto<T> {
  constructor(data: T[]) {
    this.data = data;
  }

  data: T[];
}
