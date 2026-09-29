import assert from 'node:assert/strict';
import test from 'node:test';
import { highlightPradyCode, resolvePradyError } from '../src/engine/editor-tools.js';

test('syntax highlighting preserves source text and escapes HTML', () => {
  const highlighted = highlightPradyCode('fn main() { print("<unsafe>"); }');
  assert.match(highlighted, /token-keyword">fn/);
  assert.match(highlighted, /token-function">print/);
  assert.match(highlighted, /&lt;unsafe&gt;/);
  assert.doesNotMatch(highlighted, /<unsafe>/);
});

test('syntax highlighting marks parser error lines', () => {
  assert.match(highlightPradyCode('fn main() {\n  print(1)\n}', [2]), /class="code-line has-error" data-line="2"/);
});

test('syntax highlighting does not add extra line breaks between editor lines', () => {
  const highlighted = highlightPradyCode('first\nsecond\nthird');
  assert.equal((highlighted.match(/class="code-line/g) || []).length, 3);
  assert.match(highlighted, /<\/span><span class="code-line/);
});

test('undefined names suggest matching declarations from the submitted code', () => {
  const help = resolvePradyError("Undefined variable 'coutner'", 'let counter = 0;');
  assert.match(help.steps[0], /declares 'counter'/);
});

test('known runtime failures receive targeted steps and documentation links', () => {
  const help = resolvePradyError("Method 'push_front' is not supported on target object.");
  assert.equal(help.title, 'Use a method supported by this value');
  assert.ok(help.steps.length > 0);
  assert.equal(help.docsUrl, '/docs/reference/built-in-types');
});

test('runtime assertion failures do not match the parser syntax fallback', () => {
  const help = resolvePradyError('Assertion failed: expected true');
  assert.equal(help.title, 'The program assertion evaluated to false');
  assert.ok(help.steps.length > 0);
});
