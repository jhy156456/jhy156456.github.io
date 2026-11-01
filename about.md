---
layout: resume
title: About Me
description: "about-me"
category: "about-me"
date: 2022-12-02 09:19:11
tags:
  - Data Scientist
  - tensorflow
  - pytorch
  - Deep Learning
  - Machine Learning
  - Android
  - Javascript
  - React
  - Node.js
  - MongoDB
  - Data Engineer
  - Sqoop
  - Spark
redirect_from:
  - /about/
---
{% assign r = site.data.resume %}
{% assign p = r.profile %}
<section class="rs-hero">
  <div class="rs-hero__main">
    <p class="rs-eyebrow">{{ p.role }}</p>
    <h1 class="rs-name">{{ p.name }} <span>{{ p.name_en }}</span></h1>
    <p class="rs-focus">{{ p.focus }}</p>
    <p class="rs-summary">{{ p.summary }}</p>
    <div class="rs-links">
      {% for l in p.links %}<a href="{{ l.url }}"{% if l.url contains 'http' %} target="_blank" rel="noopener"{% endif %}>{{ l.label }}</a>{% endfor %}
    </div>
  </div>
</section>

<section class="rs-section">
  <h2 class="rs-h2">핵심 역량</h2>
  <div class="rs-skills">
    {% for g in r.skills %}
    <div class="rs-skill">
      <h3>{{ g.group }}</h3>
      <ul class="rs-chips">{% for s in g.items %}<li>{{ s }}</li>{% endfor %}</ul>
    </div>
    {% endfor %}
  </div>
</section>

<section class="rs-section">
  <h2 class="rs-h2">경력</h2>
  {% for e in r.experience %}
  <article class="rs-exp">
    <div class="rs-exp__head"><h3>{{ e.company }}</h3><span class="rs-period">{{ e.period }}</span></div>
    <p class="rs-exp__role">{{ e.role }}</p>
    <p class="rs-exp__desc">{{ e.desc }}</p>
  </article>
  {% endfor %}
</section>

<section class="rs-section">
  <h2 class="rs-h2">프로젝트</h2>
  <ol class="rs-timeline">
    {% for pj in r.projects %}
    <li class="rs-project">
      <div class="rs-project__head">
        <h3>{{ pj.title }}</h3>
        {% if pj.period != "" %}<span class="rs-period">{{ pj.period }}</span>{% endif %}
      </div>
      {% if pj.tags.size > 0 %}<p class="rs-tags">{% for t in pj.tags %}<span>{{ t }}</span>{% endfor %}</p>{% endif %}
      {% if pj.summary %}<p class="rs-project__summary">{{ pj.summary }}</p>{% endif %}
      {% if pj.points.size > 0 %}
      <ul class="rs-points">{% for pt in pj.points %}<li>{{ pt }}</li>{% endfor %}</ul>
      {% endif %}
      {% if pj.stack.size > 0 %}<ul class="rs-chips rs-chips--sm">{% for s in pj.stack %}<li>{{ s }}</li>{% endfor %}</ul>{% endif %}
      {% if pj.shots or pj.link %}
      <div class="rs-project__actions">
        {% if pj.shots %}<button class="rs-shots-toggle" type="button" aria-expanded="false">화면 보기 <span>{{ pj.shots.size }}</span></button>{% endif %}
        {% if pj.link %}<a class="rs-project__link" href="{{ pj.link }}" target="_blank" rel="noopener">{{ pj.link_label }} ↗</a>{% endif %}
      </div>
      {% endif %}
      {% if pj.shots %}
      <div class="rs-shots" hidden>
        <div class="rs-shots__inner">
          {% for s in pj.shots %}
          <a class="rs-shot rs-shot--{{ s.kind }}" href="{{ s.src | relative_url }}" target="_blank" rel="noopener">
            <span class="rs-shot__frame"><img src="{{ s.src | relative_url }}" alt="{{ pj.title }} {{ s.caption }} 화면" loading="lazy"></span>
            <span class="rs-shot__cap">{{ s.caption }}</span>
          </a>
          {% endfor %}
        </div>
      </div>
      {% endif %}
    </li>
    {% endfor %}
  </ol>
</section>

<section class="rs-section rs-two">
  <div>
    <h2 class="rs-h2">교육 · 자격증</h2>
    <ul class="rs-list">
      {% for c in r.certifications %}<li><span class="rs-period">{{ c.date }}</span><span>{{ c.name }}</span></li>{% endfor %}
    </ul>
  </div>
  <div>
    <h2 class="rs-h2">학력</h2>
    <ul class="rs-list">
      {% for ed in r.education %}<li><span class="rs-period">{{ ed.year }}</span><span><strong>{{ ed.school }}</strong> · {{ ed.degree }}</span></li>{% endfor %}
    </ul>
  </div>
</section>

<section class="rs-section">
  <h2 class="rs-h2">논문</h2>
  {% for pub in r.publications %}
  <article class="rs-pub">
    <div class="rs-project__head"><h3>{{ pub.title }}</h3><span class="rs-period">{{ pub.date }}</span></div>
    <p class="rs-pub__ko">{{ pub.title_ko }}</p>
    <p class="rs-pub__sum">{{ pub.summary }}</p>
    <details class="rs-details">
      <summary>초록 보기</summary>
      <p>{{ pub.abstract_en }}</p>
      <p>{{ pub.abstract_ko }}</p>
    </details>
  </article>
  {% endfor %}
</section>

<script>
  // 프로젝트 "화면 보기": 카드 아래로 화면을 펼치고 접는다
  document.querySelectorAll(".rs-shots-toggle").forEach(function (btn) {
    var panel = btn.closest(".rs-project").querySelector(".rs-shots");
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.firstChild.nodeValue = open ? "화면 접기 " : "화면 보기 ";
      panel.hidden = !open;
    });
  });
</script>
