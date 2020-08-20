'use strict';
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while(element.firstChild) { // 何かタグがある限りループ
    element.removeChild(element.firstChild);
  }
}

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  let number = 0;
for (let i = 0; i <  userName.length; i++)　{  
    number += userName.charCodeAt(i);
}
let index = number % answers.length;
return answers[index].replace(/\{userName\}/g,userName);
}

/**
 * 指定した要素に診断結果用のタグを設定する。
 * @param {HTMLElement} element HTMLの要素
 * @param {string} result 診断結果のテキスト
 */
function appendAssessmentResult(element, result) {
  // result-area に h3 タグで’診断結果’という文字を表示
  const h3 = document.createElement('h3');  // h３ タグを作る
  h3.innerText = '診断結果';　// h3タグに’診断結果’の文字列を設定
  element.appendChild(h3);　// result-area　に h３ 変数を設定

  // result-areaにpタグで診断結果を表示
  const p = document.createElement('p');
  p.innerText = result;
  element.appendChild(p);
}

/**
 * 指定した要素にツイートボタンを設定する。
 * @param {HTMLElement} element HTMLの要素
 * @param {string} message  ツイート本文
 */
function appendTweetButton(element, message) {
  // aタグを作って属性を設定する 
  const a = document.createElement('a');
  const href = 
    'https://twitter.com/intent/tweet?button_hashtag='
    +encodeURIComponent('あなたのいいところ')
    +'&ref_src=twsrc%5Etfw';
  a.setAttribute('href' , href);
  a.className = 'twitter-hashtag-button';
  a.setAttribute('data-text' , result);
  a.innerText = 'Tweet #あなたのいいところ';

  // aタグをHTMLとして追加する
  element.appendChild(a);

 　// scriptタグを作る
　 const script = document.createElement('script');
   script.setAttribute('src','https://platform.twitter.com/widgets.js');

   // scriptタグをHTMLとして追加する
   element.appendChild(script);
}

assessmentButton.onclick = () => {
  let userName = userNameInput.value;
  if(!userName) {
    // 名前の入力がなかったので処理を中断
  　return;
  }

    // 診断結果の表示 
  removeAllChildren(resultDivided);　
  const result = assessment(userName);
  appendAssessmentResult(resultDivided, result);

    // Tweetボタンの表示 
  removeAllChildren(tweetDivided);　
  appendTweetButton(tweetDivided,result)  
}

    // 入力欄でEnterキーを押したときに診断を実行
  userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
  　　　assessmentButton.onclick();
    }
};

console.assert(
  assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
