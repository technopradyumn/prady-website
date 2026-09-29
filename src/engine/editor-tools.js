const KEYWORDS = new Set([
  'architecture', 'async', 'await', 'break', 'case', 'catch', 'class', 'cannot',
  'const', 'continue', 'contract', 'default', 'else', 'enum', 'false', 'fn',
  'for', 'foreach', 'if', 'import', 'in', 'interface', 'layer', 'let', 'match',
  'mut', 'of', 'return', 'spec', 'struct', 'switch', 'throw', 'true', 'while',
]);

const BUILTIN_TYPES = new Set([
  'Array', 'Bool', 'Char', 'Deque', 'Float', 'Graph', 'Int', 'LinkedList', 'Map',
  'MaxHeap', 'MinHeap', 'Queue', 'RedBlackTree', 'Set', 'Stack', 'String', 'Trie',
]);

const SUGGESTIONS = [
  {
    matches: /^\s*(?:expected\b|unexpected token|unexpected character|unterminated string)/i,
    title: 'Check the syntax near the reported token',
    steps: [
      'Compare the reported line with the surrounding function or block.',
      'Check that parentheses, brackets, braces, quotes, and semicolons are paired.',
      'Make sure the keyword or operator is supported by the Prady grammar.',
    ],
    docsUrl: '/docs/reference/keywords-and-syntax',
  },
  {
    matches: /undefined (?:variable|identifier|function) ['"]?([A-Za-z_]\w*)/i,
    title: 'Define the name or correct its spelling',
    steps: [],
    docsUrl: '/docs/handbook/the-basics',
  },
  {
    matches: /method ['"]?([A-Za-z_]\w*)['"]? is not supported/i,
    title: 'Use a method supported by this value',
    steps: [
      'Check the type of the value before the dot.',
      'Use the member suggestions in VS Code or consult the type reference.',
    ],
    docsUrl: '/docs/reference/built-in-types',
  },
  {
    matches: /cannot access property ['"]?([A-Za-z_]\w*)['"]? on null|null reference|undefined|null value/i,
    title: 'Check the value before accessing a member',
    steps: [
      'Initialize the value before reading its property.',
      'Guard optional or nullable values before using dot access.',
    ],
    docsUrl: '/docs/handbook/everyday-types',
  },
  {
    matches: /assertion failed/i,
    title: 'The program assertion evaluated to false',
    steps: [
      'Inspect the condition passed to assert and the values used to build it.',
      'Use the assertion message to identify the expected invariant.',
    ],
    docsUrl: '/docs/handbook/control-flow',
  },
  {
    matches: /maximum loop iteration exceeded|potential infinite loop/i,
    title: 'The loop did not finish within the safety limit',
    steps: [
      'Check that the loop condition can eventually become false.',
      'Update the loop variable on every path through the loop.',
    ],
    docsUrl: '/docs/handbook/control-flow',
  },
  {
    matches: /browser playground cannot load imports|cannot be loaded in the single-file browser playground/i,
    title: 'The browser playground runs one source file at a time',
    steps: [
      'Local project modules and external library files are not fetched by the browser playground.',
      'Open the project in VS Code or run it with the installed Prady CLI to resolve file imports.',
    ],
    docsUrl: '/docs/tooling/editor-extensions',
  },
];

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function highlightLine(line, inBlockComment) {
  let html = '';
  let index = 0;
  while (index < line.length) {
    if (inBlockComment) {
      const close = line.indexOf('*/', index);
      const end = close < 0 ? line.length : close + 2;
      html += `<span class="token-comment">${escapeHtml(line.slice(index, end))}</span>`;
      index = end;
      inBlockComment = close < 0;
      continue;
    }

    const rest = line.slice(index);
    if (rest.startsWith('//')) {
      html += `<span class="token-comment">${escapeHtml(rest)}</span>`;
      break;
    }
    if (rest.startsWith('/*')) {
      inBlockComment = true;
      continue;
    }
    if (rest[0] === '"' || rest[0] === "'") {
      const quote = rest[0];
      let end = 1;
      while (end < rest.length) {
        if (rest[end] === '\\') end += 2;
        else if (rest[end++] === quote) break;
      }
      html += `<span class="token-string">${escapeHtml(rest.slice(0, end))}</span>`;
      index += end;
      continue;
    }

    const number = rest.match(/^(?:0[xX][\da-fA-F_]+|0[bB][01_]+|\d[\d_]*(?:\.\d[\d_]*)?)/);
    if (number) {
      html += `<span class="token-number">${number[0]}</span>`;
      index += number[0].length;
      continue;
    }

    const identifier = rest.match(/^[A-Za-z_]\w*/);
    if (identifier) {
      const word = identifier[0];
      const next = rest.slice(word.length).match(/^\s*(.)/);
      const className = KEYWORDS.has(word)
        ? 'token-keyword'
        : BUILTIN_TYPES.has(word)
          ? 'token-type'
          : word === 'true' || word === 'false' || word === 'null'
            ? 'token-constant'
            : next && next[1] === '('
              ? 'token-function'
              : '';
      html += className ? `<span class="${className}">${word}</span>` : word;
      index += word.length;
      continue;
    }

    html += escapeHtml(line[index]);
    index += 1;
  }
  return { html: html || '&nbsp;', inBlockComment };
}

export function highlightPradyCode(source, errorLines = []) {
  const errors = new Set(errorLines);
  let inBlockComment = false;
  return source.split('\n').map((line, index) => {
    const highlighted = highlightLine(line, inBlockComment);
    inBlockComment = highlighted.inBlockComment;
    const lineNumber = index + 1;
    const errorClass = errors.has(lineNumber) ? ' has-error' : '';
    return `<span class="code-line${errorClass}" data-line="${lineNumber}">${highlighted.html}</span>`;
  }).join('');
}

function editDistance(left, right) {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    let diagonal = row[0];
    row[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const above = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (left[i - 1] === right[j - 1] ? 0 : 1));
      diagonal = above;
    }
  }
  return row[right.length];
}

export function resolvePradyError(errorMessage, sourceCode = '') {
  const message = String(errorMessage || '');
  const match = SUGGESTIONS.find((suggestion) => suggestion.matches.test(message));
  if (!match) {
    return {
      title: 'Review the compiler message and nearby code',
      steps: [
        'Use the line and column in the diagnostic to inspect the exact expression.',
        'Search the Prady syntax reference for the token or API named in the message.',
      ],
      docsUrl: '/docs/reference/keywords-and-syntax',
    };
  }

  const steps = [...match.steps];
  const nameMatch = message.match(match.matches);
  if (/undefined (?:variable|identifier|function)/i.test(message) && nameMatch) {
    const declarations = [...sourceCode.matchAll(/\b(?:let|const|fn|class|struct|enum)\s+(?:mut\s+)?([A-Za-z_]\w*)/g)]
      .map((declaration) => declaration[1]);
    const candidate = [...new Set(declarations)]
      .map((name) => ({ name, distance: editDistance(name.toLowerCase(), nameMatch[1].toLowerCase()) }))
      .filter(({ name, distance }) => distance <= Math.max(1, Math.floor(nameMatch[1].length * 0.3)))
      .sort((left, right) => left.distance - right.distance)[0];
    if (candidate) {
      steps.unshift(`The code declares '${candidate.name}'. Check whether '${nameMatch[1]}' is a typo.`);
    } else {
      steps.unshift(`No declaration matching '${nameMatch[1]}' was found in this source. Declare it or import its module.`);
    }
  }

  return { title: match.title, steps, docsUrl: match.docsUrl };
}
