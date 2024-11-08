import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./contactForm.module.css";

export const ContactForm = () => {
  const {
    register,//各フォームフィールドにバリデーションを設定して入力データを取得するための関数
    handleSubmit,//ォームが正しく入力された場合にonSubmit関数を呼び出す？
    formState: { errors },//各フィールドのエラーメッセージを管理する
    reset,//フォーム送信後に入力内容をクリアするための関数
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  //↑この状態管理は、フォームが送信中かどうか？を追跡し、UIの挙動（ボタンの有効・無効や入力）を制御するため


  // フォーム送信処理 //ここがわからない
  const onSubmit = async (data) => {
    setIsSubmitting(true); // 送信中はボタンや入力を無効化
    try {
      const response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      alert("送信しました"); // 送信完了のアラート
      reset(); // フォーム内容をクリア
    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false); // 送信終了後にボタンを有効化
    }
  };

  return (
    <form className={styles.wrap} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>問合わせフォーム</h1>
      <div className={styles.itemwrap}>
        <label className={styles.itemlabel}>お名前</label>
        <div className={styles.textwrap}>
          <input className={styles.input}
            type="text"
            {...register("name", {
              required: "お名前は必須です。",
              maxLength: {
                value: 30,
                message: "お名前は30文字以内で入力してください。",
              },
            })}//ここでバリデーションを

            disabled={isSubmitting}//送信中には入力やボタンを無効化する
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          {/* ↑ errors.name が存在しない場合はこの条件式が「偽（false）」になり、<p>...</p> の要素はレンダリングされない */}

        </div>
      </div>

      <div className={styles.itemwrap}>
        <label className={styles.itemlabel}>メールアドレス</label>
        <div className={styles.textwrap}>
          <input className={styles.input}
            type="email"
            {...register("email", {
              required: "メールアドレスは必須です。",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "正しいメールアドレスを入力してください。",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
      </div>

      <div className={styles.itemwrap}>
        <label className={styles.itemlabel}>本文</label>
        <div className={styles.textwrap}>
          <textarea className={styles.input} rows={8}
            {...register("message", {
              required: "本文は必須です。",
              maxLength: {
                value: 500,
                message: "本文は500文字以内で入力してください",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.message && <p className={styles.error}>{errors.message.message}</p>}
        </div>
      </div>
      <div className={styles.buttonwrap}>
        <button className={styles.send} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "送信中" : "送信"}
        </button>
        <button className={styles.clear} type="button" onClick={() => reset()} disabled={isSubmitting}>
          クリア
        </button>
      </div>
    </form>
  );
};
