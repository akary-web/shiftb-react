import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './postsDetail.module.css';

export const PostsDetail = () => {
  const { id } = useParams(); // URLから記事のIDを取得
  const [detailPost, setPost] = useState(null)//初期値が null であるため、「データがまだ存在しない」という状態を明確に表現できる。
  const [isLoading, setIsLoading] = useState(true); // 読み込み中かどうかの状態を管理

  // APIでpostsを取得する処理をuseEffectで実行 by bube
  useEffect(() => {
    const fetcher = async () => {

      setIsLoading(true);// 読み込み開始時にisLoadingをtrueに設定

      try {//エラーが出る可能性があるコード
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`)//URL内に{id}という文字列をそのまま埋め込んでいるだけになるから、テンプレートリテラルに変更
        const data = await res.json()
        setPost(data.post)
      }
      catch (error) {//エラーを出した場合、catch ブロックが実行され、エラーの詳細が error 変数に渡る。
        console.error("データの取得に失敗しました:", error);//console.errorはエラー内容を確認するためのメッセージを出力するための関数
        //console.errorは複数の引数を受け取れるよう設計されている。異なるデータやメッセージを組み合わせてログに出力できる。
      }
      finally {//tryやcatchの処理が終わった後に、必ず、実行される処理を記述するためのもの
        setIsLoading(false); // 読み込み完了後にisLoadingをfalseに設定
      }
    }

    fetcher()

  }, [id])// 依存関係にある第二引数の配列[id]が変わるたびに再取得refetchする

  if (isLoading) {
    return <div>・・・読み込み中です・・・</div>//読み込み中の表示を追加
  }

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