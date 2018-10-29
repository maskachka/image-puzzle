import React from 'react';

function StatusMsg(props) {
  return (
    <p className="App__status">
      {props.statusMsg}
    </p>
  );
}

export default StatusMsg;
