// Appコンポーネントの本体
import React from 'react';//React 17以降は、なくてもOK
import { Routes, Route } from 'react-router-dom';
import { Header } from './header/header';//名前付きだから{}が付くよ
import { PostsList } from './top/postsList';//名前付きだから{}が付くよ
import { PostsDetail } from './detail/postsDetail';//記事詳細ページのimport
import './destyle.css';

export const App = () => {
  return (
    <div>
      <Header />  {/* 共通するヘッダーだから、Routesの中には入れない */}
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/posts/:postNumber" element={<PostsDetail />} />
      </Routes>
    </div>
  );
}
// export default App;デフォルトではなく、名前付きexportで
