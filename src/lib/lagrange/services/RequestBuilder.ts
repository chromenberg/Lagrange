// This file provides the methods and classes needed to construct a CQL Request
// Using individual tokens to ensure a set schema is followed
// This will work for now but this can be moved to GO later down the line
type OneOrMore<T> = T | T[];

function join(strings: OneOrMore<string>): string {
  return typeof strings === "string" ? strings : strings.join(", ")
}
function wrapParentheses(content: string): string {
  return `(${content})`;
}

namespace Base {
  export class RequestToken {
    constructor(
      protected name: string
    ) { };
  }
  
  export class ParamToken<Name extends string> extends RequestToken {
    constructor(
      name: Name,
      protected param: string
    ) { super(name) };
  }
  
  export class ContainerToken<Name extends string> extends RequestToken {
    constructor(
      name: Name,
      protected children: RequestToken[]
    ) { super(name) };
  }
  
  export class ParamContainerToken<Name extends string> extends ContainerToken<Name> {
    constructor(
      name: Name,
      protected param: string,
      children: RequestToken[]
    ) { super(name, children) };
  }

  export class TokenBeforeParamToken<Name extends string> extends ParamToken<Name> {
    constructor(
      name: Name,
      protected token: RequestToken,
      param: string,
    ) { super(name, param) };
  }
}

namespace TypedTokens {
  export const Where  = (values: string) => new Base.ParamToken("WHERE", values);
  
  export const Select = (
    values: OneOrMore<string>,
    objects: Base.RequestToken[]
  ) => new Base.ParamContainerToken("SELECT", join(values), objects);
  
  export const From = (values: OneOrMore<string>) => new Base.ParamToken("FROM", join(values));
  export const Into = (where: string) => new Base.ParamToken("INTO", where);
  
  export const Insert = (
    where: string,
    values: OneOrMore<string>
  ) => new Base.TokenBeforeParamToken("INSERT", Into(where), wrapParentheses(join(values)));

  export const Values = (values: OneOrMore<any>) => new Base.ParamToken("VALUES", wrapParentheses(join(values)));

  export const END = ";";
}