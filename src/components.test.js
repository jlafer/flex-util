/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime'

import {readOnlyField, ClickablePhoneNum} from './index';

describe('readOnlyField tests', () => {
  it("creates output", () => {
    const fld = readOnlyField('fld1', 'Field1', 'foo');
    render(fld);
    //screen.debug();
    expect(screen.getByText('Field1')).toBeInTheDocument();
    expect(screen.getByLabelText('Field1')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('form-control-plaintext');
  });
})

describe('ClickablePhoneNum tests', () => {
  it("creates output", async () => {
    render(<ClickablePhoneNum number="+18005551212" />);
    //screen.debug();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('+18005551212');
  });
})
