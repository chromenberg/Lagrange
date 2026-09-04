// courtesy of markedjs/marked for the rules
// will try to make as many modifications and to understand this code as possible

function regex(regex: string | RegExp, opt = "") {
  let source = typeof regex === 'string' ? regex : regex.source;
  const obj = {
    replace: (name: string | RegExp, val: string | RegExp) => {
      let valSource = typeof val === 'string' ? val : val.source;
      valSource = valSource.replace(/(^|[^[])\^/g, '$1');
      source = source.replace(name, valSource);
      return obj;
    },
    getRegex: () => {
      return new RegExp(source, opt);
    },
  };
  return obj;
}


// block stuff
const newline = /^(?:[ \t]*(?:\n|$))+/;
const fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;

const hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
const heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;

const _tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title'
  + '|tr|track|ul';

const _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/;
// i dont understand how any of this works
const createParagraph = (listInterrupt: RegExp) => regex(_paragraph)
  .replace('hr', hr)
  .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
  .replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
  .replace('|table', '')
  .replace('blockquote', ' {0,3}>')
  .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)')
  .replace('list', listInterrupt)
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
  .replace('tag', _tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

// only non-empty lists starting from 1 can interrupt paragraphs
const paragraph = createParagraph(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/);
// inside a blockquote a bare list marker (any number) starts a sibling list,
// so it must not be lazily continued as paragraph text (unlike a top level
// paragraph, where an empty list cannot interrupt)
const blockquoteParagraph = createParagraph(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/);

const blockquote = regex(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
  .replace('paragraph', blockquoteParagraph)
  .getRegex();


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const blockRules = {
  newline,
  heading,
  fences,
  paragraph,
  blockquote
}

type BlockKeys = keyof typeof blockRules

// inline stuff


export interface Rules {
  block: BlockKeys
}