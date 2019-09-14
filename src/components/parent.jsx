import React from 'react';
import Child from './child.jsx';

function Parent() {
  return (
    <div data-test="parent">
      <Child text="Hello world!" />
    </div>
  );
}

export default Parent;
