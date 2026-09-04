// This file provides the methods and classes needed to construct a CQL Request
// Using individual tokens to ensure a set schema is followed
// This will work for now but this can be moved to GO later down the line
type OneOrMore<T> = T | T[];

function join(strings: OneOrMore<string>, joiner: string): string {
  return typeof strings === "string" ? strings : strings.join(joiner)
}
function joinArgs(joiner: string, ...args: any[]): string {
  return args.join(joiner)
}
function wrapParentheses(content: string): string {
  return `(${content})`;
}

namespace Base {
  const reduceToken = (item: RequestToken) => item.toString();
  export class RequestToken {
    constructor(
      protected name: string
    ) { };

    public toString(): string {
      return this.name;
    }
  }
  
  export class ParamToken<Name extends string> extends RequestToken {
    constructor(
      name: Name,
      protected param: string
    ) { super(name) };

    public override toString(): string {
      return joinArgs(" ", this.name, this.param);
    }
  }
  
  export class ContainerToken<Name extends string> extends RequestToken {
    constructor(
      name: Name,
      protected children: RequestToken[]
    ) { super(name) };

    public override toString(): string {
      return joinArgs(" ", this.name, this.children.map(reduceToken));
    }
  }
  
  export class ParamContainerToken<Name extends string> extends ContainerToken<Name> {
    constructor(
      name: Name,
      protected param: string,
      children: RequestToken[]
    ) { super(name, children) };

    public override toString(): string {
       return joinArgs(" ", this.name, this.param, this.children.map(reduceToken));
    }
  }

  export class TokenBeforeParamToken<Name extends string> extends ParamToken<Name> {
    constructor(
      name: Name,
      protected token: RequestToken,
      param: string,
    ) { super(name, param) };

    public override toString(): string {
       return joinArgs(" ", this.name, this.token.toString(), this.param);
    }
  }
}

namespace TypedTokens {
  export const Where  = (values: string) => new Base.ParamToken("WHERE", values);
  
  export const Select = (
    values: OneOrMore<string>,
    objects: Base.RequestToken[]
  ) => new Base.ParamContainerToken("SELECT", join(values, ", "), objects);
  
  export const From = (values: OneOrMore<string>) => new Base.ParamToken("FROM", join(values, ", "));
  export const Into = (where: string) => new Base.ParamToken("INTO", where);
  
  export const Insert = (
    where: string,
    values: OneOrMore<string>
  ) => new Base.TokenBeforeParamToken("INSERT", Into(where), wrapParentheses(join(values, ", ")));

  export const Values = (values: OneOrMore<any>) => new Base.ParamToken("VALUES", wrapParentheses(join(values, ", ")));

  export const END = ";";
}



export class RequestBuilder {
  private request: Base.RequestToken[] = [];
  constructor() { }

  public addToken(token: Base.RequestToken): this {
    this.request.push(token);
    return this;
  }

  public requestData(): Base.RequestToken[] {
    return this.request;
  }
  
  public toString(): string {
    return joinArgs(" ", this.request);
  }
}

const req = new RequestBuilder();
const req2 = new RequestBuilder();
console.log(req, req2);
console.log(TypedTokens)
const head = TypedTokens.Select(
  ["user_id", "username"],
  [TypedTokens.From("users")]
);
const head2 = TypedTokens.Insert(
  "users",
  ["username", "display_name", "email", "token"]  
)
const head2values = TypedTokens.Values(
  ["wyvern", "wyvern", "w@w.com", "aok3ggerg34.cl30ox.3rodflpzlppockv3-0ozxp"]  
)
req.addToken(head)
req2.addToken(head2)
req2.addToken(head2values)

console.log(req.requestData(), "\n", req)
console.log(req2.requestData(), "\n", req2)

console.log(req.toString(), "\n", req2.toString())
