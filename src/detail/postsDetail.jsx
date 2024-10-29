import React from "react";
import { useParams } from 'react-router-dom';//
import { posts } from "../data/posts";
import styles from './postsDetail.module.css'; // CSS Modulesをインポート

export const PostsDetail = () => {
  const params = useParams(); /// URLからパラメーターを取得
  // console.log(params)//テスト：params 変数に格納された URL パラメーターの内容をコンソールに出力して確認してみる
  const detailPost = posts.find((postItem) => postItem.id === parseInt(params.postNumber)); // posts配列の各要素（投稿オブジェクト）のプロパティのひとつIDと一致する投稿を検索
  // 分割代入で記述↓うーん、よくわからない
  // const { postNumber } = useParams(); // URLからnumberを取得
  // const detailPost = posts.find((postItem) => postItem.id === parseInt(postNumber)); // 取得したnumberを使って投稿を検索
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
