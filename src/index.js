// 最初の呼び出される起動ファイル（エントリーポイント）
import React from 'react';//省くとエラーになる。→React 17以前の構文に依存しているルールがESLint設定に含まれているため
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
//Reactアプリケーションのルート要素を作成し、その要素にReactコンポーネントをレンダリングするために使用される。

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
