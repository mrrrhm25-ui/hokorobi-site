// ========================================================
// 1. ヘッダーのカラー切り替え（スクロール連動）
// ========================================================
window.addEventListener('scroll', () => {
  const currentTop = window.scrollY;
  const headerCommon = document.querySelector('.site-header-common');

  // 💡 安全対策：ヘッダー要素が画面に存在するときだけ実行する
  if (headerCommon) {
    if (currentTop > 50) {
      headerCommon.classList.add('scrolled');    // 50px以上進んだらベージュ半透明に
    } else {
      headerCommon.classList.remove('scrolled'); // 最上部に戻ったら元の透明に
    }
  }
});

// ========================================================
// 2. 文字の1文字ずつフェードイン（GSAPアニメーション）
// ========================================================
const text = document.querySelector('.fade-chars');

// 🔥 修正：.fade-chars が画面内に「存在する時だけ」動くように防波堤（if文）を追加します
if (text && text.textContent) {
  text.innerHTML = text.textContent
    .split('')
    .map((c) => `<span>${c}</span>`)
    .join('');

  // GSAPが読み込まれている場合のみ実行
  if (typeof gsap !== 'undefined') {
    gsap.from('.fade-chars span', {
      opacity: 0,
      scale: 0.4,
      duration: 0.4,
      stagger: 0.06,
      ease: 'back.out(1.7)',
    });
  }
}

// ========================================================
// 3. サイト全体・スクロール連動フェードイン（Intersection Observer）
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. 画面内のフェードイン対象をすべて見つける
  const fadeTargets = document.querySelectorAll('.fade-in-target');

  // 2. 監視するルールを設定（画面の下から10%の位置に入ったら発動）
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0
  };

  // 3. 画面に入ったときの処理
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 💡 ここで opacity: 1 に戻すためのクラス（is-visible）を合体させます
        entry.target.classList.add('is-visible');
        // 一度表示されたら監視を終了してパソコンの動きを軽くする
        observer.unobserve(entry.target);
      }
    });
  };

  // 4. スクロール監視の起動
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // 5. すべての対象の監視をスタート
  fadeTargets.forEach(target => {
    observer.observe(target);
  });
});


