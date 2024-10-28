import React from 'react';//React 17以降は、なくてもOK
import { posts } from './data/posts'; // 記事データをimport。名前付きimportだから{}が付くよ


export const PostsList = () => {
  return (
    <div className='post_container'>
      {posts.map((post) => (
        <div className='post_list' key={post.id} >
          <div className='post_info'>
            <p className='post_date'>{new Date(post.createdAt).toLocaleDateString()}</p>
            <ul className='post_cate'>
              {post.categories.map((cate, index) => (
                <li className='cate_item' key={index}>{cate}</li>
              ))}
            </ul>
          </div>
          <h2 className='post_title'>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
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