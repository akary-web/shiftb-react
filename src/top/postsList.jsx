import React from 'react';//React 17以降は、なくてもOK
import { useState, useEffect } from 'react'; // useStateとuseEffectをインポート
// import { posts } from '../data/posts'; // 記事データをimport。名前付きimportだから{}が付くよ
import styles from './postsList.module.css'; // CSS Modulesをインポート
import { Link } from 'react-router-dom';//リンクを作成するためにLinkコンポーネントをインポート

export const PostsList = () => {

  const [posts, setPosts] = useState([])//初期値がからの配列[]。APIから投稿データを取得するまで、postsは空の状態ってこと

  // APIでpostsを取得する処理をuseEffectで実行。by bube
  useEffect(() => {
    const fetcher = async () => {//fetcherという名前の非同期関数を定義。asyncを関数の前に付けることで、その関数は非同期関数になる
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")//暗記
      const data = await res.json()//暗記
      setPosts(data.posts)// APIから取得したデータ（data.posts）をpostsの状態に設定
    }

    fetcher()// fetcher関数を実行すると、APIからデータが取得され、取得したデータがpostsに保存される。
    //useEffectフック内で定義されているため、コンポーネントがマウントされた時（または依存関係が変更された時）に一度呼び出される。
  }, [])//第二引数の依存配列を空配列`[]`とすることで、コンポーネントのレンダリング時に一度だけ処理を発火。ページ読込時にデータ取得したい時に用いる手法。by bube

  return (
    <div className={styles.post_container}>
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}> {/* keyをLinkに移動 */}
          <div className={styles.post_list} >
            <div className={styles.post_info}>
              <p className={styles.post_date}>{new Date(post.createdAt).toLocaleDateString()}</p>
              <ul className={styles.post_cate}>
                {post.categories.map((cate, index) => (
                  <li className={styles.cate_item} key={index}>{cate}</li>
                ))}
              </ul>
            </div>
            <h2 className={styles.post_title}>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </Link>
      ))}
    </div>
  )
};

//メモ
//key属性：map()を使ってリスト要素をレンダリングする際に使用。重要：データの一意な識別子を使うのが一般駅（idなど）by chatGPT
//カテ：インデックスがなくてもリストは作成できるが、keyがユニークであることを確認することが重要。リスト内に重複する要素がない場合は、インデックスは省略できる。by chatGPT
//toLocaleDateString()ローカライズされた日付を返すDateオブジェクトに関するメソッド 
//<p>{post.content}</p> では<br>がそのまま表示されてしまう。cssで処理できない
// dangerouslySetInnerHTML={{ __html: post.content }}を提案される　by chatGPT
//書籍にも記述あるが、使うシーンがいまいち想定できていない

// export default PostsList;　デフォルトではなく、名前付きexportにしている