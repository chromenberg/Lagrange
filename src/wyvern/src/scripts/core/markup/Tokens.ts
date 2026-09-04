// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export enum TokenTypes {
  Unknown = -1,
  Generic,
  Paragraph,
  Space,
  Bold,
  Italic,
  Text,
  Header,
}
export type MarkupToken = (
  Tokens.Space | Tokens.Text
)
export type Token = MarkupToken | Tokens.Generic

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Tokens {
  
  interface TypedToken<T extends TokenTypes = TokenTypes.Generic> {
    type: T;
    raw: string;
  }
  
  export type Space = TypedToken<TokenTypes.Space>
  export interface Text extends TypedToken<TokenTypes.Text> {
    text: string
    tokens?: Token[]
    escaped?: boolean
  }
  export interface Generic {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [index: string]: any
    tokens?: Token[]
  }
}
