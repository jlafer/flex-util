import {formatPhoneNum} from './index';

test("formatPhoneNum formats all-digits number", () => {
  expect(formatPhoneNum('8005551212')).toEqual('(800) 555-1212');
});
test("formatPhoneNum leaves pre-formatted number", () => {
  expect(formatPhoneNum('(800) 555-1212')).toEqual('(800) 555-1212');
});
test("formatPhoneNum removes leading +1 from number", () => {
  expect(formatPhoneNum('+18005551212')).toEqual('(800) 555-1212');
});
