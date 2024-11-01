import React from 'react';
import { useState, useEffect } from 'react';
import styles from './postsList.module.css';
import { Link } from 'react-router-dom';

export const PostsList = () => {

  const [posts, setPosts] = useState([])//初期値がからの配列[]。APIから投稿データを取得するまで、postsは空の状態ってこと  
  const [isLoading, setIsLoading] = useState(true);// 読み込み中かどうかの状態を管理

  // APIでpostsを取得する処理をuseEffectで実行。by bube
  useEffect(() => {
    const fetcher = async () => {

      setIsLoading(true);// 読み込み開始時にisLoadingをtrueに設定

      try {//エラーが出る可能性があるコード
        const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
        const data = await res.json()
        setPosts(data.posts)
      }
      catch (error) {//エラーを出した場合、catch ブロックが実行され、エラーの詳細が error 変数に渡る。
        console.error("データの取得に失敗しました:", error);//console.errorはエラー内容を確認するためのメッセージを出力するための関数
      }
      finally {
        setIsLoading(false); // 読み込み完了後にisLoadingをfalseに設定
      }
    }

    fetcher()
  }, [])//第二引数の依存配列を空配列`[]`とすることで、コンポーネントのレンダリング時に一度だけ処理を発火。ページ読込時にデータ取得したい時に用いる手法。by bube

  if (isLoading) {
    return <div>・・・読み込み中です・・・</div>//読み込み中の表示を追加
  }

  if (posts.length === 0)  {//posts = [] の場合true。!posts はfalseになるので実行されない by bube
    return <div>投覧が見つかりませんでした。</div>; //この処理を入れておくことで、記事が見つからなかった場合のエラーを発生させず、記事が見つからないことを閲覧者に伝えることができる。
  }
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