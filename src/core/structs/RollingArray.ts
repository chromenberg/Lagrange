export class RollingArray<T> {
  private _data: T[] = []
  constructor(private maxSize: number) {
  }
  protected get data(): T[] {
    return this._data;
  }
  public get oldest(): T {
    return this._data[0];
  }
  public get newest(): T {
    return this._data[this._data.length - 1];
  }
  public push(item: T): this {
    this._data.push(item);
    if (this._data.length >= this.maxSize) {
      this._data.shift();
    }

    return this;
  }
  public has(value: T): boolean {
    return this._data.find((item) => item === value) ? true : false;
  }
  public get history(): T[] {
    return this._data
  }
}