import React from 'react';//React 17以降は、なくてもOK
import { nav } from '../data/navList'// ナビゲーションをimport。名前付きimportだから{}が付くよ
import styles from './header.module.css'; // CSS Modulesをインポート

export const Header = () => {
  return (
    <header className={styles.header}>
      {nav.map((elem) => {
        return (
          <a href={elem.href} key={elem.id}>{elem.name}</a>
        )
      })}
    </header>
  )
}
//map()でリスト要素の生成しているので、key属性を忘れない
// export default Header; デフォルトではなく、名前付きexportにしてみる