// Generated from private avrea-core; edit the source template there.
'use strict';

const { spawn } = require('node:child_process');
const binary = process.env.AVREA_ACTIONS_BIN || (process.platform === 'win32'
  ? 'C:\\avrea\\avrea-actions.exe' : '/opt/avrea/bin/avrea-actions');
let child;
const forwardInterrupt = () => child.kill('SIGINT');
const forwardTerminate = () => child.kill('SIGTERM');
process.on('SIGINT', forwardInterrupt);
process.on('SIGTERM', forwardTerminate);
child = spawn(binary, ["artifact","upload"], { stdio: 'inherit', env: { ...process.env, AVREA_ACTIONS_NODE: process.execPath } });
let failed = false;
child.once('error', () => {
  failed = true;
  console.log('::error::avrea-com/upload-artifact requires an Avrea runner with a working avrea-actions binary');
});
child.once('close', (code, signal) => {
  if (signal) console.log('::error::avrea-com/upload-artifact native action was terminated');
  process.exitCode = failed ? 1 : (code === null || code < 0 ? 1 : code);
});
