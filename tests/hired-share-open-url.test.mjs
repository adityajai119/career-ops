import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { buildIssueUrl, openInBrowser } from '../hired-share.mjs';

test('cmd hands start the whole prefilled issue URL', { skip: process.platform !== 'win32' && 'cmd is Windows-only' }, () => {
  const url = buildIssueUrl({ role: 'Staff Engineer', companyType: 'Startup', story: 'Two weeks & one offer', anonymity: 'count' });
  let echoed = '';
  // The opener's own command line, with echo in place of start: no browser opens.
  const exec = (cmd, args) => {
    echoed = execFileSync(cmd, args.map((arg) => (arg === 'start' ? 'echo' : arg)), { encoding: 'utf8' });
  };

  assert.equal(openInBrowser(url, exec), true);
  assert.equal(echoed.trim(), `"" ${url}`);
});
