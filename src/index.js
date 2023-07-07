import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // li生成
  const li = document.createElement("li");

  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  //pタグ生成
  const p = document.createElement("p");
  p.innerText = text;

  // button(完了)タグ
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    const completeTarget = completeButton.closest("li");
    const addTarget = completeButton.parentNode;
    // 押された完了ボタンの親タグ(li)を未完了リストから削除
    deleteFromIncompleteList(completeTarget);

    // 完了リストに追加する要素
    const text = addTarget.firstElementChild.innerText;

    // li以下を初期化
    completeTarget.textContent = null;

    // divタグ生成
    const div = document.createElement("div");
    div.className = "list-row";

    // pタグ生成
    const p = document.createElement("p");
    p.innerText = text;

    // buttonタグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ(li)を完了リストから削除
      const deleteTarget = backButton.closest("li");
      document.getElementById("complete-list").removeChild(deleteTarget);

      // テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    // liタグの子要素に各要素を設定
    completeTarget.appendChild(div);
    div.appendChild(p);
    div.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(completeTarget);
  });

  // button(削除)タグ
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(li)を未完了リストから削除
    const deleteTarget = deleteButton.closest("li");
    deleteFromIncompleteList(deleteTarget);
  });

  // liタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document.getElementById("add-button").addEventListener("click", () => {
  onClickAdd();
});
