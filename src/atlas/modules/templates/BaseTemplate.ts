type TemplateFlags = {
  noOverwrite: boolean;
  requireAll: boolean;
  partial: boolean;
  sanitiseBigInts: boolean;
};

export class BaseTemplate<Schema extends Record<string, any>> {
  // @ts-ignore - this shouldnt be throwing an error
  protected _data: Schema = {};
  // protected _flags: TemplateFlags = {}
  constructor(/* flags: TemplateFlags */) {
    // this._flags = flags;
  }

  public pushValue<K extends keyof Schema>(key: K, value: Schema[K]): this {
    this._data[key].push(value);
    return this;
  }

  public setValue<K extends keyof Schema>(key: K, value: Schema[K]): this {
    this._data[key] = value;
    return this;
  }

  public getValue<K extends keyof Schema>(key: K): Schema[K] {
    return this._data[key];
  }

  public toJSON() {
    return JSON.stringify(this._data);
  }

  public JSON() {
    return this._data;
  }
}
