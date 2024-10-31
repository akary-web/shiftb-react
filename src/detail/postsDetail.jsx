import React from "react";
import { useState, useEffect } from 'react'; // useStateとuseEffectをインポート
import { useParams } from 'react-router-dom';//
// import { posts } from "../data/posts";
import styles from './postsDetail.module.css'; // CSS Modulesをインポート

export const PostsDetail = () => {
  const { id } = useParams(); // URLから記事のIDを取得
  const [detailPost, setPost] = useState(null)//初期値が null であるため、「データがまだ存在しない」という状態を明確に表現できる。

  // APIでpostsを取得する処理をuseEffectで実行 by bube
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`)//URL内に{id}という文字列をそのまま埋め込んでいるだけになるから、テンプレートリテラルに変更
      const data = await res.json()
      setPost(data.post)//APIから取得したデータ（date.post）をpostの状態に設定
    }

    fetcher()

  }, [id])// 依存関係にある第二引数の配列[id]が変わるたびに再取得refetchする

  // const params = useParams(); /// URLからパラメーターを取得
  // const detailPost = posts.find((postItem) => postItem.id === parseInt(params.id)); // posts配列の各要素（投稿オブジェクト）のプロパティのひとつIDと一致する投稿を検索
  if (!detailPost) {
    return <div>投稿が見つかりませんでした。</div>; //この処理を入れておくことで、記事が見つからなかった場合のエラーを発生させず、記事が見つからないことを閲覧者に伝えることができる。
  }
  return (
    <div className={styles.detail_container} >
      <img className={styles.detail_thumbnail} src={detailPost.thumbnailUrl} alt={detailPost.title} />
      <div className={styles.detail_detail}>
        <div className={styles.detail_info}>
          <p className={styles.detail_date}>{new Date(detailPost.createdAt).toLocaleDateString()}</p>
          <ul className={styles.detail_cate}>
            {detailPost.categories.map((cate, index) => (
              <li className={styles.detail_item} key={index}>{cate}</li>
            ))}
          </ul>
        </div>
        <h2 className={styles.detail_title}>{detailPost.title}</h2>
        <div className={styles.detail_text} dangerouslySetInnerHTML={{ __html: detailPost.content }} />
      </div>
    </div>
  );
};

// console.log(params)//テスト：params 変数に格納された URL パラメーターの内容をコンソールに出力して確認してみる

// 分割代入で記述↓うーん、よくわからない
// const { postNumber } = useParams(); // URLからnumberを取得
// const detailPost = posts.find((postItem) => postItem.id === parseInt(postNumber)); // 取得したnumberを使って投稿を検索