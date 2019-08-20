import React, { useState } from 'react';
const styles = require("./app.module.css");

export function App() {
  const [source, setSource] = useState("");
  const [result, setResult] = useState("");

  function updateSource(value: string) {
    setSource(value);
    setResult(value);
  }

  return <div className={styles.body}>
    <h1>JSON-CSV Utility</h1>
    <div className={styles.container}>
      <div className={styles.left}><textarea value={source} onChange={e => updateSource(e.target.value)} /></div>
      <div className={styles.right}><textarea readOnly value={result} /></div>
    </div>
  </div>
}