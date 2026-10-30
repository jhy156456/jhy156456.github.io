/* 블로그 검색 — 제목·태그·분류·본문 앞부분을 함께 찾는다.
   여러 낱말은 모두 포함하는 글만(AND), 제목에 맞으면 위로. ↑↓ 로 고르고 Enter 로 이동, Esc 로 닫기. */
$(function () {
  var $input = $('#cb-search-content');
  if (!$input.length) return;
  var $box = $input.closest('.search-box');
  var $form = $input.closest('form');
  var $panel = $('<div class="sr-panel" role="listbox" hidden></div>').appendTo($box);
  var posts = null, hits = [], cur = -1, MAX = 8;

  $('<span class="sr-icon" aria-hidden="true"></span>').insertBefore($input);
  $.getJSON('/search/cb-search.json?v=' + (window.SEARCH_V || '')).done(function (d) {
    posts = (d.data || []).map(function (p) {
      p._title = (p.title || '').toLowerCase();
      p._rest = [(p.tags || []).join(' '), p.category || '', p.text || ''].join(' ').toLowerCase();
      return p;
    });
    if ($box.closest('.navbar-search').hasClass('active')) render($input.val());
  });

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function mark(s, terms) {
    var out = esc(s);
    terms.forEach(function (t) {
      var re = new RegExp('(' + esc(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }
  function snippet(text, terms) {
    var low = text.toLowerCase(), at = -1;
    terms.some(function (t) { at = low.indexOf(t); return at >= 0; });
    if (at < 0) return text.slice(0, 90);
    var s = Math.max(0, at - 30);
    return (s > 0 ? '…' : '') + text.slice(s, s + 90) + (s + 90 < text.length ? '…' : '');
  }

  function render(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!posts) { $panel.removeAttr('hidden').html('<p class="sr-empty">불러오는 중…</p>'); return; }
    if (!terms.length) {
      hits = posts.slice(0, 5).map(function (p) { return { p: p }; }); cur = 0;
      $panel.removeAttr('hidden').html('<p class="sr-label">최근 글</p>' + hits.map(function (h, i) { return item(h.p, [], i, false); }).join('') + HINT);
      return;
    }
    hits = posts.filter(function (p) {
      return terms.every(function (t) { return p._title.indexOf(t) >= 0 || p._rest.indexOf(t) >= 0; });
    }).map(function (p) {
      var score = terms.reduce(function (a, t) { return a + (p._title.indexOf(t) >= 0 ? 2 : 0) + ((p.tags || []).join(' ').toLowerCase().indexOf(t) >= 0 ? 1 : 0); }, 0);
      return { p: p, score: score };
    }).sort(function (a, b) { return b.score - a.score || (a.p.date < b.p.date ? 1 : -1); });
    var total = hits.length;
    hits = hits.slice(0, MAX); cur = hits.length ? 0 : -1;
    if (!total) { $panel.removeAttr('hidden').html('<p class="sr-empty">‘' + esc(q) + '’에 맞는 글이 없습니다.<br>다른 낱말이나 태그로 찾아보세요.</p>' + HINT); return; }
    var html = '<p class="sr-label">검색 결과 ' + total + '개</p>' + hits.map(function (h, i) {
      var inTitle = terms.every(function (t) { return h.p._title.indexOf(t) >= 0; });
      return item(h.p, terms, i, !inTitle);
    }).join('');
    if (total > MAX) html += '<p class="sr-more">상위 ' + MAX + '개만 보여요 · 낱말을 더 넣어 좁혀 보세요</p>';
    $panel.removeAttr('hidden').html(html + HINT);
  }

  var HINT = '<div class="sr-hint"><span><kbd>↑</kbd><kbd>↓</kbd> 이동</span><span><kbd>Enter</kbd> 열기</span><span><kbd>Esc</kbd> 닫기</span><span class="sr-hint__k"><kbd>/</kbd> 어디서나 검색</span></div>';
  function item(p, terms, i, withSnippet) {
    return '<a class="sr-item' + (i === cur ? ' is-active' : '') + '" href="' + esc(p.url) + '" role="option">' +
      '<span class="sr-title">' + mark(p.title, terms) + '</span>' +
      '<span class="sr-meta"><b>' + esc(p.category || 'post') + '</b>' + esc(p.date) + '</span>' +
      (withSnippet ? '<span class="sr-snippet">' + mark(snippet(p.text || '', terms), terms) + '</span>' : '') +
      '</a>';
  }

  function move(d) {
    if (!hits.length) return;
    cur = (cur + d + hits.length) % hits.length;
    $panel.find('.sr-item').removeClass('is-active').eq(cur).addClass('is-active')[0].scrollIntoView({ block: 'nearest' });
  }

  $input.attr({ 'autocomplete': 'off', 'placeholder': '제목·태그·본문 검색' }).removeAttr('required');
  $input.on('input', function () { render(this.value); });
  // 마우스를 올린 항목이 곧 선택 항목 — 키보드 선택과 강조가 둘로 갈리지 않게
  $panel.on('mousemove', '.sr-item', function () {
    var i = $panel.find('.sr-item').index(this);
    if (i !== cur) { cur = i; $panel.find('.sr-item').removeClass('is-active').eq(cur).addClass('is-active'); }
  });
  $input.on('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (cur >= 0 && hits[cur]) window.location.href = hits[cur].p.url; }
  });
  $form.on('submit', function (e) { e.preventDefault(); });

  // 닫힐 때 결과도 비우기(foot.html 의 열고 닫기와 짝)
  new MutationObserver(function () {
    if (!$box.closest('.navbar-search').hasClass('active')) { $panel.attr('hidden', true).empty(); hits = []; }
    else render($input.val());
  }).observe($box.closest('.navbar-search')[0] || document.body, { attributes: true, attributeFilter: ['class'] });

  // 단축키: "/" 또는 ⌘K·Ctrl+K 로 검색 열기
  $(document).on('keydown', function (e) {
    var typing = /input|textarea|select/i.test((e.target.tagName || '')) || e.target.isContentEditable;
    if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      var $nav = $box.closest('.navbar-search');
      if (!$nav.hasClass('active')) $nav.find('.icon-search').trigger('click');
      setTimeout(function () { $input.focus(); }, 160);
    }
  });
});
