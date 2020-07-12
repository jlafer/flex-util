import {log} from './index';

test("log.error to always create output", () => {
  expect(log.error('foo')).toEqual(expect.stringContaining('foo'));
});
test("log.error to always create output", () => {
  log.setName('TestLog');
  expect(log.error('foo')).toEqual('TestLog foo');
});
