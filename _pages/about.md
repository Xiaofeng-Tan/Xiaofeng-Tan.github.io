---
layout: about
title: About
permalink: /
#subtitle: <a href='#'>Affiliations</a>. Address. Contacts. Motto. Etc.

profile:
  align: right
  image: prof_pic.jpg
  image_circular: True # crops the image to make it circular
  more_info:

news: true # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---


I am a final-year M.Sc. student in the [PALM Lab](https://palm.seu.edu.cn/) at [Southeast University (SEU)](https://www.seu.edu.cn/english/), advised by Prof. [Hongsong Wang](https://cs.seu.edu.cn/hongsongwang/main.htm), and expect to graduate in June 2027. I am currently a research intern at [Tencent Hunyuan](https://hunyuan.tencent.com/) and also collaborate remotely with Prof. [Ming-Hsuan Yang](https://faculty.ucmerced.edu/mhyang/) at [UC Merced](https://www.ucmerced.edu/). Previously, I interned at [Tencent's Youtu Lab](https://open.youtu.qq.com/#/open) and, before that, was a remote visiting student in the [LV LAB](https://www.lv-lab.org/SMU/index.html) at Singapore Management University (SMU), working closely with Prof. [Pan Zhou](https://panzhous.github.io/). I received dual bachelor's degrees in Computer Science (B.E.) and Mathematics (B.Sc.) from [Shenzhen University (SZU)](https://en.szu.edu.cn/) in 2024, where I began my research journey with Prof. [Can Gao](https://csse.szu.edu.cn/pages/user/index?id=953).

<div class="interest-card" markdown="0">
My research interests include RLHF, RLVR, AIGC, world models, and 3D human modeling. My papers as <strong>primary author</strong> have received <a class="scholar-badge" href="https://scholar.google.com/citations?user={{ site.scholar_userid }}" target="_blank" rel="noopener" title="Google Scholar citations of my first-author works"><span class="scholar-badge__icon"><i class="ai ai-google-scholar" aria-hidden="true"></i></span><span class="scholar-badge__count">{% first_author_citations site.scholar_userid %}</span></a> citations. I am looking for <strong>Ph.D. opportunities starting in Fall 2027</strong> and welcome <strong>research collaborations</strong> in RL and AIGC. If you'd like to connect, feel free to reach out via 📧 <span class="copyable" onclick="copyToClipboard('xiaofengtan@seu.edu.cn', 'Email')">xiaofengtan@seu.edu.cn <i class="fas fa-copy"></i></span> or 💬 <span class="copyable" onclick="copyToClipboard('txf_06_20', 'WeChat ID')">WeChat: txf_06_20 <i class="fas fa-copy"></i></span> 😊. You can find more about my background in my <a href="/assets/pdf/CV_Xiaofeng_Tan.pdf" target="_blank">CV</a> / <a href="/assets/pdf/CV_Xiaofeng_Tan_CN.pdf" target="_blank" style="font-family: 'Songti SC', 'STSong', 'SimSun', serif;">中文简历</a>.
<br><br>
I'm a <span class="doraemon-text"><a href="https://en.wikipedia.org/wiki/Doraemon" target="_blank"><em>Doraemon</em></a></span> fan 😺, as the little companions in the bottom corners suggest. As for my personality, GPT guesses <strong>INTJ</strong> with about 70% confidence based on my long-term chat history, though our mostly work-related conversations may skew that impression. I share this as a starting point for understanding each other's working styles when collaborating.
</div>

<div id="copy-toast" class="copy-toast"></div>

<script>
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(function() {
    var toast = document.getElementById('copy-toast');
    toast.textContent = '✓ ' + label + ' copied!';
    toast.classList.add('show');
    setTimeout(function() {
      toast.classList.remove('show');
    }, 2000);
  });
}
</script>

{% include doraemon-pet.html %}
