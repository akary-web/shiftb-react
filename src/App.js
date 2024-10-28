// Appコンポーネントの本体
import React from 'react';//React 17以降は、なくてもOK
import { Header } from './header';//名前付きだから{}が付くよ
import { PostsList } from './postsList';//名前付きだから{}が付くよ
import './destyle.css';
import './App.css';



export const App = () => {
  return (
    <div>
      <Header />
      <PostsList />
    </div>
  );
}
// export default App;デフォルトではなく、名前付きexportで
