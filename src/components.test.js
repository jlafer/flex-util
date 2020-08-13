import {field} from './index';

//TODO this test case is failing on the text comparison...I think it's the escapes
// that I don't have in the expected...don't even like this type of test - way too fragile
test("field creates output", () => {
  expect(field('fld1', 'Field1', 'foo')).toEqual('<div className="row m-1 p-1"><label className="col-sm-2 col-form-label" htmlFor="fld1">Field1</label><div className="col-sm-10"><input className="form-control-plaintext" id="fld1" name="fld1" readOnly={true} type="text" value="foo" /></div></div>');
}); 
