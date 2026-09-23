(function () {
  var input = document.getElementById('searchInput');
  var results = document.getElementById('searchResults');
  var status = document.getElementById('searchStatus');
  if (!input || !results) return;

  var DATA = null;

  function catIcon(cat) {
    if (cat === 'ギア') return '⛺';
    if (cat === 'キャンプ場') return '🏕';
    return '📖';
  }

  function render(list, query) {
    if (!query) {
      results.innerHTML = '';
      status.textContent = '';
      return;
    }
    if (list.length === 0) {
      results.innerHTML = '';
      status.textContent = '「' + query + '」に一致する記事は見つかりませんでした。';
      return;
    }
    status.textContent = '「' + query + '」の検索結果：' + list.length + '件';
    results.innerHTML = list.map(function (item) {
      return '<a class="card" href="' + item.url + '">' +
        '<div class="thumb"><div class="guide-icon-wrap"><div class="guide-icon">' + catIcon(item.cat) + '</div></div></div>' +
        '<div class="body">' +
        '<span class="cat">' + item.cat + '</span>' +
        '<h3>' + item.title.split('｜')[0].split('|')[0] + '</h3>' +
        '<p class="card-desc">' + item.desc.slice(0, 60) + '</p>' +
        '<div class="readmore">記事を見る →</div>' +
        '</div></a>';
    }).join('');
  }

  function doSearch(query) {
    if (!DATA) return;
    var q = query.trim().toLowerCase();
    if (!q) { render([], ''); return; }
    var hits = DATA.filter(function (item) {
      var hay = (item.title + ' ' + item.desc + ' ' + item.cat).toLowerCase();
      return hay.indexOf(q) !== -1;
    }).slice(0, 30);
    render(hits, query.trim());
  }

  fetch('/search-index.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      DATA = data;
      var params = new URLSearchParams(window.location.search);
      var q = params.get('q');
      if (q) {
        input.value = q;
        doSearch(q);
      }
    })
    .catch(function () {
      status.textContent = '検索データの読み込みに失敗しました。';
    });

  input.addEventListener('input', function () {
    doSearch(input.value);
  });
})();
