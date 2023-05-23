import React, { useState } from 'react';
import Waterfall from './Waterfall.js';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const items = [
  { height: 200 },
  { height: 300 },
  { height: 150 },
  { height: 200 },
  { height: 300 },
  { height: 150 },
  { height: 200 },
  { height: 300 },
  { height: 150 },
  { height: 200 },
  { height: 300 },
  { height: 150 },
  { height: 200 },
  { height: 300 },
  { height: 150 },
  { height: 200 },
  { height: 300 },
  { height: 150 },
  { height: 200 },
  { height: 300 },
  { height: 150 },
  // ...
];

function renderCell(item, index) {
  return <div key={index} style={{ height: item.height, background: 'yellow', margin: 10 }}>Item {index}</div>;
}

function App() {
  const [columnWidth, setColumnWidth] = useState(200);
  const changeColmn = (type) => {
    setColumnWidth(type)
  }
  return (
    <div>
      <Button type="primary" icon="align-center" style={{ marginRight: '10px' }} onClick={() => changeColmn(200)}></Button>
      <Button type="primary" icon="align-left" style={{ marginRight: 10 }} onClick={() => changeColmn(400)}></Button>
      <Button type="primary" icon="align-right" style={{ marginRight: 10 }} onClick={() => changeColmn(600)}></Button>
      <Waterfall items={items} columnWidth={columnWidth} renderCell={renderCell} />
    </div >
  );
}

export default App;
