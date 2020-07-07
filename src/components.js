import React from 'react';

export const field = (name, label, value) => {
  return (
    <div className="row m-1 p-1">
      <label className="col-sm-2 col-form-label" htmlFor={name}>{label}</label>
      <div className="col-sm-10">
        <input type="text" className="form-control-plaintext" id={name} name={name} value={value || ''} readOnly/>
      </div>
    </div>
  );
};

export function ClickablePhoneNum(props) {
  const {number, onClick} = props;
  return <button className="link" onClick={onClick}>{number}</button>;
}
