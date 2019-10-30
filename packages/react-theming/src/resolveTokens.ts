import { ITheme } from "./theme.types";

type TokenDict = { [name: string]: Token };

interface Token {
  resolve(theme: any): void;
  value: any;
  isResolvable: boolean;
  isResolved: boolean;
}

class LiteralToken implements Token {
  public isResolvable = true;
  public isResolved = true;

  constructor(
    private tokens: TokenDict,
    public name: string,
    public value: string | number
  ) {}
  resolve(theme: any): void {}
}

class FunctionToken implements Token {
  private _isResolved: boolean = false;

  static fromFunction(tokens: TokenDict, name: string, rawToken: any): Token {
    return new FunctionToken(tokens, name, rawToken, []);
  }

  static fromObject(tokens: TokenDict, name: string, rawToken: any): Token {
    return new FunctionToken(
      tokens,
      name,
      rawToken.resolve,
      rawToken.dependsOn
    );
  }

  constructor(
    private tokens: TokenDict,
    public name: string,
    public valueFn: (theme: any, tokenVals?: any[]) => any,
    public deps: string[]
  ) {}

  public value: any;

  resolve(theme: any): void {
    this.value = this.valueFn(theme, this.deps.map(d => this.tokens[d]));
    this._isResolved = true;
  }

  get isResolvable(): boolean {
    return this.deps.every(e => this.tokens[e].isResolved);
  }

  get isResolved(): boolean {
    return this._isResolved;
  }
}

class TokenFactory {
  static from(tokens: TokenDict, rawToken: any, name: string): Token {
    switch (typeof rawToken) {
      case "string":
      case "number":
        return new LiteralToken(tokens, name, rawToken);
      case "function":
        return FunctionToken.fromFunction(tokens, name, rawToken);
      case "object":
        return FunctionToken.fromObject(tokens, name, rawToken);
      default:
        throw new Error("Unknown token type");
    }
  }
}

/**
 * resolveTokens
 * takes a set of tokens and resolves all references
 * @param componentName name of component, used to look up overrides in token
 * @param theme theme to resolve
 * @param sourceTokensSet
 * @internal
 */
export const resolveTokens = (
  componentName: string,
  theme: ITheme,
  sourceTokensSet: any[]
) => {
  const tokens: TokenDict = {};

  sourceTokensSet.forEach(sourceTokens => {
    for (let tokenName in sourceTokens) {
      tokens[tokenName] = TokenFactory.from(
        tokens,
        sourceTokens[tokenName],
        tokenName
      );
    }
  });

  if (
    theme.components[componentName] &&
    theme.components[componentName].tokens
  ) {
    const sourceTokens = theme.components[componentName].tokens;
    for (let tokenName in sourceTokens) {
      tokens[tokenName] = TokenFactory.from(
        tokens,
        sourceTokens[tokenName],
        tokenName
      );
    }
  }

  while (true) {
    let allResolved = true;
    let progressed = false;

    for (let tokenName in tokens) {
      const token = tokens[tokenName];
      if (token.isResolved) {
        continue;
      }
      allResolved = false;
      if (!token.isResolvable) {
        continue;
      }
      token.resolve(theme);
      progressed = true;
    }
    if (allResolved) {
      break;
    }
    if (!progressed) {
      throw new Error("Token deadlock");
    }
  }

  const result: any = {};
  for (let tokenName in tokens) {
    result[tokenName] = tokens[tokenName].value;
  }

  return result;
};
