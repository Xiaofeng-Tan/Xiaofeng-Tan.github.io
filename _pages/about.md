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
My research interests include RLHF, RLVR, AIGC, world models, and 3D human modeling. I am looking for <strong>Ph.D. opportunities starting in Fall 2027</strong> and welcome <strong>research collaborations</strong> in RL and AIGC. If you'd like to connect, feel free to reach out via 📧 <button type="button" class="contact-reveal" onclick="revealAndCopyContact(this, 'xiaofengtan@seu.edu.cn', 'Email')">Show email</button> or 💬 <button type="button" class="contact-reveal" onclick="revealAndCopyContact(this, 'txf_06_20', 'WeChat ID')">Show WeChat ID</button> 😊. You can find more about my background in my <a href="/assets/pdf/CV_Xiaofeng_Tan.pdf" target="_blank">CV</a> / <a href="/assets/pdf/CV_Xiaofeng_Tan_CN.pdf" target="_blank" style="font-family: 'Songti SC', 'STSong', 'SimSun', serif;">中文简历</a>.
<br><br>
I'm a <span class="doraemon-text"><a href="https://en.wikipedia.org/wiki/Doraemon" target="_blank"><em>Doraemon</em></a></span> fan 😺, as the little companions in the bottom corners suggest. Based on our long history of work-related conversations, which may not fully capture how I am outside work, GPT, Gemini, and Doubao all characterize me as an <a href="https://www.16personalities.com/intj-personality" target="_blank" rel="noopener">INTJ</a>. I hope this offers a useful starting point for understanding how I work in collaborations.
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

function revealAndCopyContact(button, text, label) {
  button.outerHTML = '<span class="copyable" onclick="copyToClipboard(\'' + text + '\', \'' + label + '\')">' + text + ' <i class="fas fa-copy"></i></span>';
  copyToClipboard(text, label);
}
</script>

{% include doraemon-pet.html %}
