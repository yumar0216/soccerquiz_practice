'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '関西でJ1に所属しているサッカークラブは何クラブ？', c: ['3', '4', '5']},
    {q: 'ガンバ大阪が三冠達成した時の監督は？', c: ['長谷川健太', '西野朗', '宮本恒靖']},
    {q: 'ヴィッセル神戸のホームスタジアム名は？', c: ['ノエビアスタジアム', 'エディオンスタジアム', 'ヤンマースタジアム']},
    {q: 'ガンバ大阪の宇佐美貴史が今シーズン（2021）から新たに着用予定のスパイクのメーカーは？', c: ['アシックス', 'ナイキ', 'アディダス']},
    {q: '遠藤保仁が所属したことがないクラブは？', c: ['横浜FC', 'ガンバ大阪', '京都サンガ']},
    {q: '2013年のJリーグベストヤングプレーヤー賞は？', c: ['南野拓実', '井手口陽介', '柴崎岳']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}