import _BitField from "bitfield";

type Flags<T> = Record<keyof T, number>;

export default class BitField<F> {
  private _bitfield: _BitField;
  private _flags: Flags<F>;
  constructor(flags: Flags<F>, maxSize: number = 64) {
    this._bitfield = new _BitField(maxSize);
    this._flags = flags;
  }

  /**
   * Inverts the index to correct the fact the enum will set the LARGEST bit instead of the smallest bit
   * @param index 
   * @returns 
   */
  private correct(index: number): number {
    return this._bitfield.length - index;
  }

  private index<K extends keyof F>(flag: K): number {
    return this.correct(this._flags[flag]);
  }

  /**
   * Gets the value of a bit in the bitfield based off of the index of the flag specified
   * @param flag
   * @returns
   */
  public get<K extends keyof F>(flag: K): boolean {
    return this._bitfield.get(this.index(flag));
  }

  /**
   * Toggles a bit based off its original value
   * @param flag
   */
  public toggle<K extends keyof F>(flag: K): void {
    this._bitfield.set(this.index(flag), !this.get(flag));
  }

  public set<K extends keyof F>(flag: K, state: boolean): void {
    this._bitfield.set(this.index(flag), state);
  }

  public view(): DataView {
    return new DataView(this._bitfield.buffer.buffer)
  }
  
  public toBigInt() {
    return this.view().getBigInt64(0, false)
  }

  public toString() {
    return this.toBigInt().toString()
  }

  public toArray() {
    const flags: number[] = []
    for (const flag of this._bitfield.buffer.values()) {
      flags.push(flag)
    }
    return flags
  }
}