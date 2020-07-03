import {add} from 'ramda';

const plus = (a1, a2) => {
  return add(a1, a2);
};

const minus = (a1, a2) => {
  return (a1 - a2);
};

export {plus, minus};
