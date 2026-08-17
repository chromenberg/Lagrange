export abstract class AbstractModule {
  protected _enabled: boolean = true;
  
  public abstract main(...args: any[]): void
  public abstract enable(): void
  public abstract disable(): void
  public abstract get enabled(): boolean
}

export class BaseModule extends AbstractModule {
  constructor() {
    super()
  }

  public override main(...args: any[]): void {
    
  }

  public override enable(): void {
    this._enabled = true
  }

  public override disable(): void {
    this._enabled = false
  }

  public override get enabled(): boolean {
    return this._enabled
  }
}