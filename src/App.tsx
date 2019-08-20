import React, { useState } from 'react';
import { parse } from "json2csv";
import copyToClipboard from "copy-to-clipboard";
import download from "downloadjs";
const styles = require("./app.module.css");

export function App() {
  const [source, setSource] = useState("");
  const [result, setResult] = useState("");

  function updateSource(value: string) {
    setSource(value);
    try {
      const parsedJson = JSON.parse(value);
      const parsedCsv = parse(parsedJson);
      setResult(parsedCsv);
    }
    catch (e) {
      setResult("");
    }
  }

  function copy() {
    copyToClipboard(result);
  }

  function save() {
    download(result, "data.csv", "text/csv");
  }

  function format() {
    try {
      const parsedSource = JSON.parse(source);
      setSource(JSON.stringify(parsedSource, undefined, 3));
    }
    catch { }
  }

  return <div className={styles.body}>
    <div style={{ display: "flex", marginBottom: 10 }}>
      <div style={{ flex: 1 }}>
        <button onClick={format} disabled={result === ""}>Format JSON</button>
      </div>
      <div style={{ flex: 1, textAlign: "right" }}>
        <button onClick={copy} disabled={result === ""} style={{ marginRight: 10 }}>Copy to Clipboard</button>
        <button onClick={save} disabled={result === ""}>Save File</button>
      </div>
    </div>
    <div className={styles.container}>
      <div className={styles.left}><textarea placeholder="Paste JSON Here" value={source} onChange={e => updateSource(e.target.value)} /></div>
      <div className={styles.right}><textarea placeholder="CSV Output" value={result} onChange={() => { }} /></div>
    </div>
  </div>
}