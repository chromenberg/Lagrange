// -- this file should not be imported as this will cause errors, this is here for archiving -- \\
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
class MatchStore extends OffsetTextStore<MarkupMatch> {
  constructor() {
    super();
  }

  public override push(item: MarkupMatch) {
    this._offset += this.accumulateOffset(item);
    this.matches.push(item);
    this.matches = this.matches.sort(
      (a: MarkupMatch, b: MarkupMatch) => a.location - b.location,
    );
  }

  public edit(
    newContent: string,
    newStates: MarkupState[],
    content: string,
    prevStates: MarkupState[],
  ) {
    const res = this.matches.find(
      (match) =>
        match.content === content && match.matchedStates === prevStates,
    );
    if (!res) return;
    res.content = newContent;
    res.matchedStates = newStates;
  }

  protected override accumulateOffset(item: MarkupMatch): number {
    return item.matchedStates.reduce((prev, state: MarkupState) => {
      if (typeof prev !== "number")
        throw new TypeError(
          "state offset accumulator has a type of 'string' and not number",
        );
      // Add the offset value for this state to the previous number
      return ((prev as number) += markupRules[state].offset);
    }) as number;
  }

  /**
   * Calculates the offset of all items within the specified indexes
   * @param start
   * @param end
   * @returns
   */
  public override calcOffset(start: number, end?: number): number {
    // a slice of the matches array to iterate over later
    const slice = this.matches.slice(start, end);

    // could be more readable
    return slice.reduce((prev, item) => {
      return prev + this.accumulateOffset(item.matchedStates);
    }, 0);
  }
}

type MarkupRule = (typeof markupRules)[keyof typeof markupRules];

export class MarkupText {
  private text: string;
  private clone: string;
  private splits: string[][] = [];
  private offsets: number[] = [];
  private matches: MatchStore = new MatchStore();
  // private state: MarkupState = "bold";
  // private offsetIndex: number = 0;
  // private nextState: MarkupState = "bold";
  private states = {
    state: "bold",
    nextState: "bold",
    offsetIndex: -1,
  };
  constructor(text: string) {
    this.text = text;
    this.clone = text;
  }

  private get currentRule() {
    return markupRules[this.states.state];
  }

  private get nextRule() {
    return markupRules[this.states.nextState];
  }

  private get currentOffset(): number {
    return this.offsets[this.states.offsetIndex];
  }
  private set currentOffset(value: number) {
    this.offsets[this.states.offsetIndex] = value;
  }

  public match() {
    let a = this.text;
    Object.values(markupRules).forEach((rule) => {
      a = a.replace(rule.rule, rule.sub);
    });
    return a;
  }

  /**
   * Returns the first item that matches the content
   * @param content
   */
  private findMatchedItem(content: string): MarkupMatch | undefined {
    return this.matches.show().find((match) => match.content === content);
  }

  /**
   * Replaces text in the string based off of the inputted rule
   * @param rule
   */
  private _replace(rule: MarkupRule) {
    this.text = this.text.replace(rule.rule, rule.sub);
    // when we replace something
    // we need to keep track of the offset of that item
    // so we add the current rules offset value to this
    this.currentOffset += this.currentRule.offset;
  }

  private makeSlot(match: RegExpMatchArray) {
    console.log("splitting", match[0]);
    this.splits.push(this.text.split(match[0]));
  }

  /**
   * Adds 1 to the inputted number and adds the current offset to it
   * @param i
   * @returns
   */
  private applyOffset(i: number): number {
    return i + 1 + this.currentOffset;
  }

  private _insertAtIndex(match: string, index: number) {
    this.splits.splice(this.applyOffset(index), 0, match);
    this.currentOffset++;
  }

  private insertMatches(matches: RegExpMatchArray | null) {
    if (!matches) return;
    matches.forEach((match, index) => {
      this._insertAtIndex(match, index);
    });
    console.log(
      "[MatchInserting] Inserting Matches",
      this.splits,
      this.currentOffset,
    );
  }

  private replaceMatches() {
    if (!this.matches) return;
    // this.matches.forEach((match) => {});
  }

  private storeMatch(match: RegExpMatchArray) {
    const future = this.lookAhead(match);
    // if theres something in the lookahead then we dont the match this time
    if (future) return;
    this.makeSlot(match);

    this.matches.push({
      content: match[0],
      matchedStates: [this.states.state],
      location: match.index ?? -1,
    });
  }

  private recurseMatch(rule: (typeof markupRules)[keyof typeof markupRules]) {
    const matches = [];
    let match = this.text.match(rule.rule);

    while (match !== null) {
      if (match.index === undefined) {
        console.log("[Markup] Match index was undefined", match.index);
        continue;
      }

      // add the offset to the text to retain some form of order
      match.index += this.currentOffset;

      this.storeMatch(match);
      this._replace(rule);

      // add the match into the matches array and find a new match
      matches.push(match);
      match = this.text.match(rule.rule);
    }
    return matches;
  }

  private lookAhead(match: RegExpMatchArray) {
    if (this.states.nextState === "end") return undefined;
    const lookAheadMatch = match[1].match(this.nextRule.rule);
    console.log("[Lookahead]", lookAheadMatch);
    if (lookAheadMatch === null) return undefined;
    return lookAheadMatch;
  }

  private replace(rule: (typeof markupRules)[keyof typeof markupRules]) {
    // console.log("[Replacing] Text before replacement:", this.text);
    // Get all matches for the current state
    // a loop is used because /g (global) does not provide any additional
    // information like match index, or capture groups
    const matches = this.recurseMatch(rule);
    if (matches === null) return;

    // Contains the full match info for the current state
  }
  private getTokens() {
    Object.entries(markupRules).forEach(
      ([name, { rule, sub, offset }], index, arr) => {
        // initialize a new offset for the current state
        // and initialize the offsetIndex to be 0
        this.offsets.push(0);
        this.states.offsetIndex = 0;

        // console.log(arr, arr[index], arr[index+1][0])
        // initialize parsing states
        this.states.state = name;
        this.states.nextState = arr[index + 1]?.[0] ?? "end";

        console.log(this.states.state, this.states.nextState);
        console.log("[Markup] Entering new state:", this.states.state);
        console.log(
          "[StatedParse]<" + this.states.state + ">",
          this.text.match(rule),
        );
        this.replace({ rule, sub, offset });
      },
    );
  }

  private mergeSlots() {
    this.splits = this.splits.toSorted(
      (prev, curr) => prev[0].length - curr[0].length,
    );
    const merge = this.splits.reduce(
      (acc, cur) => {
        cur.splice(1, 0, "");
        // add the very last content
        acc.pop();
        acc.push(cur[0], cur[1], cur[2]);
        return acc;
      },
      [""],
    );
    console.log(merge);
  }

  public parse() {
    this.getTokens();
    this.mergeSlots();
    console.log(this.splits);
    console.log(this.matches.show());
  }
}
new MarkupText(
  "*yeah* bc *someone* doesnt go to **bed** also **this** is a *second* italics *text* to test out formatting!!! hmmm, how odd *what if i use a laaaarge message* instead and then what if i put something like *this where *i have* many* layers to it..... what about a *second* time and we enter an identical word",
).parse();
