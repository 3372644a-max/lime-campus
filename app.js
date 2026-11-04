/* ==========================================================================
   青柠学园 · 智慧校园管理系统
   交互逻辑：单页应用，七个模块，全部数据本地模拟
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 基础工具 ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  function greet() {
    const h = new Date().getHours();
    if (h < 5) return '夜深了';
    if (h < 11) return '早上好';
    if (h < 14) return '中午好';
    if (h < 18) return '下午好';
    return '晚上好';
  }

  /* ---------- 图标 ---------- */
  const ICONS = {
    grid: '<rect x="3.4" y="3.4" width="7.2" height="7.2" rx="2.2"/><rect x="13.4" y="3.4" width="7.2" height="7.2" rx="2.2"/><rect x="3.4" y="13.4" width="7.2" height="7.2" rx="2.2"/><rect x="13.4" y="13.4" width="7.2" height="7.2" rx="2.2"/>',
    calendar: '<rect x="3.4" y="5" width="17.2" height="15.6" rx="3.2"/><path d="M8.2 3.2v3.4M15.8 3.2v3.4M3.4 10.2h17.2"/>',
    chart: '<path d="M3.6 20.4h16.8"/><path d="M6.6 20.4v-6.2M11.4 20.4V7.4M16.2 20.4v-9.4"/>',
    check: '<circle cx="12" cy="12" r="8.6"/><path d="M8.2 12.2l2.8 2.8 4.8-5.4"/>',
    users: '<circle cx="9.4" cy="8.6" r="3.4"/><path d="M3.4 20c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6"/><path d="M16.4 5.6a3.2 3.2 0 010 6.2"/><path d="M18 14.8c1.8.7 3 2.4 3 4.6"/>',
    bell: '<path d="M18 9.4a6 6 0 10-12 0c0 5-2.2 6.4-2.2 6.4h16.4S18 14.4 18 9.4"/><path d="M10.3 19.6a2 2 0 003.4 0"/>',
    user: '<circle cx="12" cy="8.4" r="3.9"/><path d="M4.6 20.4c0-3.9 3.3-6.6 7.4-6.6s7.4 2.7 7.4 6.6"/>',
    arrow: '<path d="M5 12h13M12.6 6.2L18.8 12l-6.2 5.8"/>',
    clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.4 2"/>',
    book: '<path d="M4 5.4c3-1.4 5.6-1.4 8 .6 2.4-2 5-2 8-.6v13c-3-1.4-5.6-1.4-8 .6-2.4-2-5-2-8-.6z"/><path d="M12 6v13"/>',
    pin: '<path d="M12 21s6.4-6 6.4-11a6.4 6.4 0 10-12.8 0C5.6 15 12 21 12 21z"/><circle cx="12" cy="10" r="2.4"/>',
    star: '<path d="M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9z"/>',
    palette: '<path d="M12 3.6a8.4 8.4 0 000 16.8c1.5 0 2-.9 1.6-2-.5-1.4.4-2.4 1.9-2.4h2.2a2.7 2.7 0 002.7-2.8A8.6 8.6 0 0012 3.6z"/><circle cx="8.4" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="12.4" cy="7.4" r="1.1" fill="currentColor" stroke="none"/><circle cx="7.4" cy="13.2" r="1.1" fill="currentColor" stroke="none"/>',
    ball: '<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4v5.2M5.4 8.6l4.6 3.2M18.6 8.6L14 11.8M7.4 20.2l1.6-6M16.6 20.2l-1.6-6"/>',
    code: '<path d="M8.6 8.2L4.4 12l4.2 3.8M15.4 8.2L19.6 12l-4.2 3.8M13.4 5.4l-2.8 13.2"/>',
    music: '<path d="M9.4 17.6V6.4l9-2v10.8"/><circle cx="7" cy="18" r="2.4"/><circle cx="16" cy="15.4" r="2.4"/>',
    camera: '<rect x="3.4" y="7" width="17.2" height="12.6" rx="3"/><circle cx="12" cy="13.2" r="3.4"/><path d="M8.6 7l1.4-2.4h4L15.4 7"/>',
    heart: '<path d="M12 20s-7.6-4.6-7.6-9.6A4.4 4.4 0 0112 7.8a4.4 4.4 0 017.6 2.6C19.6 15.4 12 20 12 20z"/>',
    mask: '<path d="M3.6 6.4h16.8v5.2c0 4-3.8 7.2-8.4 7.2S3.6 15.6 3.6 11.6z"/><path d="M7.6 10.6c.8-1.2 2.4-1.2 3.2 0M13.2 10.6c.8-1.2 2.4-1.2 3.2 0"/>',
  };
  const icon = (name, size = 18) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  /* ---------- 头像 ---------- */
  const AVATAR = `<svg viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#FFE7B8"/>
    <path d="M8 24c0-10 7-16 16-16s16 6 16 16v9c0 3-2 5-5 5H13c-3 0-5-2-5-5z" fill="#3A3040"/>
    <path d="M12 25c0-7 5-12 12-12s12 5 12 12v6c0 2-2 4-4 4H16c-2 0-4-2-4-4z" fill="#FFE0C2"/>
    <path d="M12.5 24c1.5-6 5.5-9 11.5-9s10 3 11.5 9c-3-3-6.5-4.5-11.5-4.5S15.5 21 12.5 24z" fill="#3A3040"/>
    <circle cx="19" cy="26" r="1.8" fill="#2F2A3A"/>
    <circle cx="29" cy="26" r="1.8" fill="#2F2A3A"/>
    <path d="M21.5 30.5c1.6 1.4 3.4 1.4 5 0" stroke="#2F2A3A" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="16" cy="29" r="2" fill="#FFB7C9" opacity=".85"/>
    <circle cx="32" cy="29" r="2" fill="#FFB7C9" opacity=".85"/>
    <path d="M38 12l1.6 4.4L44 18l-4.4 1.6L38 24l-1.6-4.4L32 18l4.4-1.6z" fill="#FFE08A" stroke="#2F2A3A" stroke-width="1.4"/>
  </svg>`;

  /* ---------- 英雄区插画 ---------- */
  const ART = `<svg viewBox="0 0 240 190" fill="none" aria-hidden="true">
    <g stroke="#2F2A3A" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round">
      <circle cx="196" cy="30" r="13.5" fill="#FFE08A"/>
      <path d="M196 8.5v-4M196 55.5v4M174.5 30h-4M221.5 30h4M181 15l-3-3M214 48l3 3M211 15l3-3M178 48l-3 3"/>
      <path d="M30 63c-8.5 0-15-6.6-15-14.6S21.5 33.8 30 33.8c2-8 9.5-13 17.5-11 6 1.5 10 7 10 13 7 1 12 7 12 13.5S63.5 63 56.5 63z" fill="#FFFCF5"/>
      <path d="M52 82l2.6 6.4L61 91l-6.4 2.6L52 100l-2.6-6.4L43 91l6.4-2.6z" fill="#FFE08A"/>
      <rect x="68" y="104" width="104" height="50" rx="3" fill="#A9DCF5"/>
      <path d="M58 104l62-30 62 30z" fill="#FFB7C9"/>
      <path d="M120 74V54"/>
      <path d="M120 53l16 5-16 5z" fill="#BCE8CB"/>
      <rect x="79" y="115" width="15" height="15" rx="2" fill="#FFFCF5"/>
      <rect x="102" y="115" width="15" height="15" rx="2" fill="#FFFCF5"/>
      <rect x="125" y="115" width="15" height="15" rx="2" fill="#FFFCF5"/>
      <path d="M147 154v-23c0-1.4 1.1-2.5 2.5-2.5h12c1.4 0 2.5 1.1 2.5 2.5v23z" fill="#FFC29B"/>
      <path d="M8 154c16-7 32 2 48-2s32 5 48 1 34 3 50-1 30 3 78-1v39H8z" fill="#BCE8CB"/>
      <path d="M34 154c0-6 2-9 5-11M42 154c1-5 3-7 5-8M186 152c0-5 2-8 4-9"/>
    </g>
  </svg>`;

  /* ========================================================================
     数据
     ======================================================================== */

  const NAV = [
    { id: 'overview',   label: '总览',   icon: 'grid',     tone: 'sakura' },
    { id: 'schedule',   label: '课程表', icon: 'calendar', tone: 'sky' },
    { id: 'grades',     label: '成绩单', icon: 'chart',    tone: 'mint' },
    { id: 'attendance', label: '考勤',   icon: 'check',    tone: 'lemon' },
    { id: 'clubs',      label: '社团',   icon: 'users',    tone: 'lilac' },
    { id: 'notices',    label: '通知',   icon: 'bell',     tone: 'tangerine' },
    { id: 'profile',    label: '我的',   icon: 'user',     tone: 'ink' },
  ];

  const META = {
    overview:   { title: '总览', eyebrow: '今日天气 · 晴 18°C · 空气良', tone: 'sakura' },
    schedule:   { title: '课程表', eyebrow: '2026 秋季学期 · 第 10 教学周', tone: 'sky' },
    grades:     { title: '成绩单', eyebrow: '期中考试 · 已发布', tone: 'mint' },
    attendance: { title: '考勤', eyebrow: '十月月报 · 应到 22 天', tone: 'lemon' },
    clubs:      { title: '社团', eyebrow: '本学期开放 12 个社团', tone: 'lilac' },
    notices:    { title: '通知', eyebrow: '教务 · 德育 · 后勤', tone: 'tangerine' },
    profile:    { title: '我的', eyebrow: '学号 20240317 · 高二 (3) 班', tone: 'ink' },
  };

  const SUBJECTS = {
    math:     { name: '数学', teacher: '陈立',   room: '高二(3)班',    tone: 'sky' },
    chinese:  { name: '语文', teacher: '苏敏',   room: '高二(3)班',    tone: 'tangerine' },
    english:  { name: '英语', teacher: '林嘉',   room: '高二(3)班',    tone: 'lilac' },
    physics:  { name: '物理', teacher: '周衡',   room: '实验楼 A302',  tone: 'mint' },
    chemistry:{ name: '化学', teacher: '韩雪',   room: '实验楼 B105',  tone: 'lemon' },
    biology:  { name: '生物', teacher: '万一鸣', room: '实验楼 A201',  tone: 'mint' },
    history:  { name: '历史', teacher: '沈慈',   room: '高二(3)班',    tone: 'lemon' },
    geography:{ name: '地理', teacher: '郑晓',   room: '高二(3)班',    tone: 'tangerine' },
    pe:       { name: '体育', teacher: '徐铁',   room: '东操场',       tone: 'sakura' },
    it:       { name: '信息技术', teacher: '屈子豪', room: '计算机房 2', tone: 'lilac' },
    art:      { name: '美术', teacher: '米雅',   room: '美术教室',     tone: 'tangerine' },
    meeting:  { name: '班会', teacher: '苏敏',   room: '高二(3)班',    tone: 'sakura' },
    self:     { name: '自习', teacher: '陈立',   room: '高二(3)班',    tone: 'ink' },
    club:     { name: '社团活动', teacher: '学生会', room: '综合楼',   tone: 'sakura' },
  };

  const PERIODS = [
    { n: 1, start: '08:00', end: '08:45' },
    { n: 2, start: '08:55', end: '09:40' },
    { n: 3, start: '10:00', end: '10:45' },
    { n: 4, start: '10:55', end: '11:40' },
    { n: 5, start: '13:30', end: '14:15' },
    { n: 6, start: '14:25', end: '15:10' },
  ];

  const WEEK = [
    { day: '周一', short: 'MON', today: true,  slots: ['math', 'chinese', 'english', 'physics', 'chemistry', 'pe'] },
    { day: '周二', short: 'TUE', today: false, slots: ['chinese', 'english', 'math', 'biology', 'history', 'self'] },
    { day: '周三', short: 'WED', today: false, slots: ['english', 'math', 'physics', 'chinese', 'it', 'meeting'] },
    { day: '周四', short: 'THU', today: false, slots: ['physics', 'chemistry', 'math', 'english', 'chinese', 'art'] },
    { day: '周五', short: 'FRI', today: false, slots: ['math', 'biology', 'english', 'geography', 'pe', 'club'] },
  ];

  const STATS = [
    { label: '出勤率',  value: '95.5', unit: '%',   tone: 'lemon',  icon: 'check', trend: 'up',   delta: '1.2%', note: '较上月' },
    { label: '绩点 GPA', value: '3.7',  unit: '',    tone: 'mint',   icon: 'chart', trend: 'up',   delta: '0.2',  note: '班级 4/48' },
    { label: '已修学分', value: '128',  unit: '分',  tone: 'sky',    icon: 'book',  trend: 'flat', delta: '32 分', note: '待修满' },
    { label: '待办事项', value: '3',    unit: '件',  tone: 'sakura', icon: 'clock', trend: 'down', delta: '2 件',  note: '今明到期' },
  ];

  const TREND = {
    labels: ['期初', '月考一', '期中考', '联考', '模拟考'],
    values: [82, 85, 84, 88, 91],
  };

  const GRADES = [
    { name: '语文', tone: 'tangerine', score: 92 },
    { name: '数学', tone: 'sky',       score: 88 },
    { name: '英语', tone: 'lilac',     score: 94 },
    { name: '物理', tone: 'mint',      score: 85 },
    { name: '化学', tone: 'lemon',     score: 90 },
    { name: '生物', tone: 'mint',      score: 87 },
  ];

  const CLUBS = [
    { id: 'anime', name: '动漫社「南风」', by: '指导老师 · 米雅', icon: 'palette', tone: 'sakura',
      cat: '艺术', people: 128, joined: true, desc: '每周四放学后画室集合，做同人志、看番、办小型放映会。' },
    { id: 'ball', name: '篮球社', by: '指导老师 · 徐铁', icon: 'ball', tone: 'tangerine',
      cat: '体育', people: 64, joined: false, desc: '周二、周五放学训练，秋季联赛正在报名，缺两个后卫。' },
    { id: 'astro', name: '天文社', by: '指导老师 · 周衡', icon: 'star', tone: 'sky',
      cat: '学术', people: 42, joined: false, desc: '天气好的周五晚上上天台看星星，社里有台 8 寸望远镜。' },
    { id: 'drama', name: '话剧社', by: '指导老师 · 苏敏', icon: 'mask', tone: 'lilac',
      cat: '艺术', people: 38, joined: false, desc: '校庆要排《雷雨》第四幕，缺一个周冲，欢迎来试戏。' },
    { id: 'code', name: '编程社', by: '指导老师 · 屈子豪', icon: 'code', tone: 'mint',
      cat: '学术', people: 56, joined: true, desc: '在做人脸识别的考勤小工具，也带新手从 Python 起步。' },
    { id: 'music', name: '轻音部', by: '指导老师 · 林嘉', icon: 'music', tone: 'lemon',
      cat: '艺术', people: 31, joined: false, desc: '三楼音乐教室常驻，鼓手和贝斯手都在，缺主唱。' },
    { id: 'photo', name: '摄影社', by: '指导老师 · 郑晓', icon: 'camera', tone: 'sky',
      cat: '艺术', people: 47, joined: false, desc: '每周一个街拍主题，器材可以借，胶卷自备。' },
    { id: 'vol', name: '志愿服务队', by: '指导老师 · 沈慈', icon: 'heart', tone: 'sakura',
      cat: '公益', people: 210, joined: false, desc: '周末去社区图书馆带小朋友读书，一次记 2 个志愿学时。' },
  ];

  const NOTICES = [
    { id: 'n1', day: '02', mon: '11月', tag: '教务', tone: 'mint', read: false,
      title: '期中考试成绩已发布，可在线查询',
      body: '本次期中考试六科成绩与班级排名已同步至「成绩单」，成绩单纸质版将于周三班会发放。对分数有疑问的同学，请于 11 月 6 日前到教务处登记复核。' },
    { id: 'n2', day: '01', mon: '11月', tag: '德育', tone: 'lemon', read: false,
      title: '第 10 周升旗仪式调整至周三 07:40',
      body: '因操场草坪养护，本周升旗仪式改到周三 07:40 在体育馆举行，全体同学着秋季校服，07:30 前入场完毕。' },
    { id: 'n3', day: '31', mon: '10月', tag: '社团', tone: 'lilac', read: false,
      title: '动漫社「秋日绘卷」同人展报名开启',
      body: '11 月 15 日在综合楼一层展厅开展，接受插画、四格、手书三类投稿，10 月 31 日起在社团页报名，11 月 10 日截止收稿。' },
    { id: 'n4', day: '30', mon: '10月', tag: '图书馆', tone: 'sky', read: true,
      title: '《银河系漫游指南》将于 11 月 8 日到期',
      body: '你借阅的《银河系漫游指南》索书号 I561.45/A22，应还日期 11 月 8 日。可在线续借一次，逾期每天 0.2 元。' },
    { id: 'n5', day: '29', mon: '10月', tag: '后勤', tone: 'tangerine', read: true,
      title: '教学楼 A 座 11 月 5 日停水检修',
      body: '11 月 5 日 09:00—15:00 A 座 1—4 层停水，用于更换主供水管。当日实验课调整至 B 座，请提前查看课表。' },
    { id: 'n6', day: '27', mon: '10月', tag: '安全', tone: 'sakura', read: true,
      title: '校园一卡通系统升级，请及时修改初始密码',
      body: '一卡通系统已完成升级，初始密码统一为身份证后六位。为保障账户安全，请在一周内通过校园 App 修改密码并绑定手机号。' },
  ];

  const ATT_MONTH = [
    { label: '出勤率', value: '95.5', unit: '%', tone: 'mint', icon: 'check', trend: 'up', delta: '1.2%', note: '较九月' },
    { label: '全勤天数', value: '19', unit: '天', tone: 'sky', icon: 'calendar', trend: 'flat', delta: '22 天', note: '应到' },
    { label: '迟到', value: '2', unit: '次', tone: 'lemon', icon: 'clock', trend: 'down', delta: '1 次', note: '较九月' },
    { label: '缺勤', value: '1', unit: '天', tone: 'sakura', icon: 'pin', trend: 'flat', delta: '已补假条', note: '病假' },
  ];

  const ATT_RECORDS = [
    { date: '10/30', name: '全勤 · 6 节课', note: '周五 · 无异常', tone: 'mint' },
    { date: '10/29', name: '全勤 · 6 节课', note: '周四 · 化学实验课正常', tone: 'mint' },
    { date: '10/23', name: '迟到 · 第 1 节', note: '周五 · 迟到 8 分钟，已登记', tone: 'lemon' },
    { date: '10/14', name: '缺勤 · 全天', note: '周三 · 病假，假条已提交', tone: 'sakura' },
    { date: '10/09', name: '迟到 · 第 2 节', note: '周五 · 迟到 4 分钟，已登记', tone: 'lemon' },
  ];

  const BADGES = [
    { emoji: '📚', label: '阅读达人', tone: 'sky' },
    { emoji: '✏️', label: '学习之星', tone: 'mint' },
    { emoji: '🏃', label: '运动会', tone: 'tangerine' },
    { emoji: '🎨', label: '社团活跃', tone: 'sakura' },
    { emoji: '🌱', label: '志愿服务', tone: 'lilac' },
    { emoji: '⭐', label: '全勤王', tone: 'lemon' },
  ];

  const SETTINGS = [
    { id: 'push', name: '消息推送', desc: '教务、德育通知第一时间提醒', on: true },
    { id: 'report', name: '每周成绩报告', desc: '每周日晚推送学情小结', on: true },
    { id: 'change', name: '课表变更提醒', desc: '调课、代课实时通知', on: true },
    { id: 'night', name: '夜间专注模式', desc: '22:00 后只保留紧急通知', on: false },
  ];

  const MOODS = [
    { emoji: '😊', label: '开心' },
    { emoji: '😴', label: '困' },
    { emoji: '🥳', label: '超棒' },
    { emoji: '😤', label: '有点烦' },
    { emoji: '🥲', label: '复杂' },
  ];

  const state = { page: 'overview', mood: 0, clubFilter: '全部', noticeFilter: '全部' };

  /* ========================================================================
     渲染：总览
     ======================================================================== */

  function viewOverview() {
    const today = WEEK[0];
    const unread = NOTICES.filter(n => !n.read).length;

    return `
    <div class="page page-enter">
      <section class="hero">
        <div class="hero__body">
          <p class="hero__kicker"><i></i>周一 · 第 10 教学周 · 期中家长会倒计时 5 天</p>
          <h2 class="hero__title">${greet()}，<span class="hl">林小满</span></h2>
          <p class="hero__desc">
            今天 6 节课都上完啦。明天上午第一节是<b>语文</b>，记得把《逍遥游》的默写本带上。
            另外你有 <b>${unread} 条</b>未读通知，其中一条关于同人展报名。
          </p>
          <div class="mood">
            <span class="mood__label">今天心情</span>
            <div class="mood__list" role="group" aria-label="选择今日心情">
              ${MOODS.map((m, i) => `
                <button class="mood__btn ${state.mood === i ? 'is-on' : ''}" data-act="mood" data-mood="${i}"
                        aria-pressed="${state.mood === i}" aria-label="${m.label}" title="${m.label}">${m.emoji}</button>`).join('')}
            </div>
          </div>
        </div>
        <div class="hero__art">
          ${ART}
          <div class="hero__note">数学小测 92 分<br/>比上次多了 4 分 ✿</div>
        </div>
      </section>

      ${STATS.map(s => `
        <article class="stat" data-tone="${s.tone}">
          <div class="stat__top">
            <span class="stat__label">${s.label}</span>
            <span class="stat__icon">${icon(s.icon, 15)}</span>
          </div>
          <p class="stat__num">${s.value}${s.unit ? `<small>${s.unit}</small>` : ''}</p>
          <p class="stat__foot">
            <span class="stat__trend ${s.trend === 'up' ? 'up' : s.trend === 'down' ? 'down' : ''}">
              ${s.trend === 'up' ? '↑' : s.trend === 'down' ? '↓' : '·'} ${s.delta}
            </span>
            ${s.note}
          </p>
        </article>`).join('')}

      <section class="card today" data-tone="sky">
        <div class="card__head">
          <span class="bullet"></span>
          <h3 class="card__title">今日课程</h3>
          <span class="spacer"></span>
          <span class="tag" data-tone="lemon">共 6 节</span>
        </div>
        <div class="timeline">
          ${today.slots.map((key, i) => {
            const s = SUBJECTS[key];
            const p = PERIODS[i];
            return `<div class="tl-row">
              <div class="tl-time">${p.start}<span>${p.end}</span></div>
              <button class="tl-item" data-tone="${s.tone}" data-act="lesson" data-subject="${key}" data-period="${i}">
                <span class="tl-item__dot"></span>
                <span class="tl-item__main">
                  <span class="tl-item__name">${s.name}</span>
                  <span class="tl-item__meta">${s.teacher} · ${s.room}</span>
                </span>
                ${icon('arrow', 15)}
              </button>
            </div>`;
          }).join('')}
        </div>
      </section>

      <section class="card trend" data-tone="sakura">
        <div class="card__head">
          <span class="bullet"></span>
          <h3 class="card__title">成绩走势</h3>
          <span class="spacer"></span>
          <button class="link-more" data-act="goto" data-page="grades">全部 ${icon('arrow', 12)}</button>
        </div>
        ${trendChart(TREND, 6)}
        <div class="trend__legend">
          <span><i style="background:var(--sakura-dk)"></i>六科总分均分</span>
          <span><i style="background:var(--ink-3)"></i>年级均分 78</span>
        </div>
      </section>

      <section class="card clubs-mini" data-tone="lilac">
        <div class="card__head">
          <span class="bullet"></span>
          <h3 class="card__title">社团在招新</h3>
          <span class="spacer"></span>
          <button class="link-more" data-act="goto" data-page="clubs">全部 8 个 ${icon('arrow', 12)}</button>
        </div>
        <div class="club-row">
          ${CLUBS.slice(0, 3).map(c => `
            <div class="club-line" data-tone="${c.tone}">
              <span class="club-line__icon">${icon(c.icon, 19)}</span>
              <span class="club-line__main">
                <span class="club-line__name">${c.name}</span>
                <span class="club-line__meta">${c.cat} · ${c.people} 人已加入</span>
              </span>
              <button class="btn btn--sm ${c.joined ? 'is-done' : ''}" data-act="join" data-club="${c.id}"
                      ${c.joined ? 'disabled aria-disabled="true"' : ''}>${c.joined ? '已加入' : '报名'}</button>
            </div>`).join('')}
        </div>
      </section>

      <section class="card notices-mini" data-tone="tangerine">
        <div class="card__head">
          <span class="bullet"></span>
          <h3 class="card__title">最新公告</h3>
          <span class="spacer"></span>
          <button class="link-more" data-act="goto" data-page="notices">全部 ${icon('arrow', 12)}</button>
        </div>
        ${NOTICES.slice(0, 3).map(n => `
          <button class="notice-line" data-act="notice" data-id="${n.id}">
            <span class="notice-line__top">
              ${n.read ? '' : '<span class="unread-dot" aria-label="未读"></span>'}
              <span class="tag" data-tone="${n.tone}">${n.tag}</span>
              <span class="notice-line__date">${n.mon}${n.day}日</span>
            </span>
            <span class="notice-line__title">${n.title}</span>
          </button>`).join('')}
      </section>
    </div>`;
  }

  /* ---------- 折线图 ---------- */
  function trendChart(data, compare) {
    const W = 404, H = 176, left = 30, right = 378;
    const min = 70, max = 96;
    const y = v => 130 - ((v - min) / (max - min)) * 100;
    const step = (right - left) / (data.values.length - 1);
    const pts = data.values.map((v, i) => [left + step * i, y(v)]);
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
    const area = `${line} L${right} 132 L${left} 132 Z`;

    return `<svg class="chart-svg" viewBox="0 0 ${W} ${H}" role="img"
      aria-label="成绩走势：${data.labels.map((l, i) => `${l} ${data.values[i]} 分`).join('，')}">
      ${[40, 70, 100].map(gy => `<line x1="${left}" y1="${gy}" x2="${right}" y2="${gy}"
        stroke="#DDC9A8" stroke-width="1.6" stroke-dasharray="3 6"/>`).join('')}
      <line x1="${left}" y1="${y(compare)}" x2="${right}" y2="${y(compare)}"
        stroke="#9A93A6" stroke-width="2" stroke-dasharray="7 6" stroke-linecap="round"/>
      <path d="${area}" fill="#FFB7C9" opacity=".26"/>
      <path d="${line}" class="chart-line chart-draw" stroke="#2F2A3A" stroke-width="3"/>
      ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="5.2" fill="#FFFCF5"
        stroke="#2F2A3A" stroke-width="2.4"/>`).join('')}
      ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="2" fill="#E06185"/>`).join('')}
      ${data.labels.map((l, i) => `<text x="${left + step * i}" y="152" text-anchor="middle"
        font-size="9.6" fill="#6A6379" font-family="inherit">${l}</text>`).join('')}
      <text x="${pts[pts.length - 1][0]}" y="${pts[pts.length - 1][1] - 13}" text-anchor="middle"
        font-size="12" font-weight="700" fill="#2F2A3A" font-family="inherit">${data.values[data.values.length - 1]}</text>
    </svg>`;
  }

  /* ========================================================================
     渲染：课程表
     ======================================================================== */

  function viewSchedule() {
    return `
    <div class="page page-enter">
      <div class="page-head">
        <div class="page-head__txt">
          <h2>第 10 周课程安排</h2>
          <p>点击任意课程可以查看任课教师、教室和课程备注。本周三第 5 节信息技术课调整到实验楼 B105。</p>
        </div>
        <span class="tag" data-tone="sky">高二 (3) 班 · 理科</span>
      </div>

      <section class="card schedule" data-tone="sky">
        <div class="sched-grid">
          <div class="sched-head"><small>TIME</small>节次</div>
          ${WEEK.map(d => `<div class="sched-head ${d.today ? 'is-today' : ''}">${d.day}<small>${d.short}</small></div>`).join('')}

          ${PERIODS.map((p, pi) => `
            <div class="sched-time">${p.start}<small>${p.end}</small></div>
            ${WEEK.map(d => {
              const key = d.slots[pi];
              if (!key) return `<div class="sched-cell"><div class="slot slot--empty"></div></div>`;
              const s = SUBJECTS[key];
              return `<div class="sched-cell">
                <button class="slot" data-tone="${s.tone}" data-act="lesson" data-subject="${key}" data-period="${pi}" data-day="${d.day}">
                  <span class="slot__sub">${s.name}</span>
                  <span class="slot__meta">${s.teacher}</span>
                  <span class="slot__room">${s.room}</span>
                </button>
              </div>`;
            }).join('')}
          `).join('')}
        </div>

        <div class="legend">
          ${['sky', 'tangerine', 'mint', 'lemon', 'lilac', 'sakura'].map(t => `
            <span><i data-tone="${t}"></i>${t === 'sky' ? '数学 / 信息' : t === 'tangerine' ? '语文 / 地理 / 美术' : t === 'mint' ? '物理 / 生物' : t === 'lemon' ? '化学 / 历史' : t === 'lilac' ? '英语' : '体育 / 班会 / 社团'}</span>`).join('')}
        </div>
      </section>
    </div>`;
  }

  /* ========================================================================
     渲染：成绩单
     ======================================================================== */

  function viewGrades() {
    const avg = Math.round(GRADES.reduce((a, b) => a + b.score, 0) / GRADES.length);
    return `
    <div class="page page-enter">
      <div class="grade-top">
        <section class="gpa-card">
          <p class="gpa-card__label">本学期 GPA</p>
          <p class="gpa-card__num">3.7<small>/ 4.0</small></p>
          <span class="gpa-card__rank">${icon('star', 14)} 班级第 4 名 · 年级第 27 名</span>
          <div class="gpa-card__bars">
            <div class="mini-track"><i style="width:92%"></i></div>
            <div class="mini-track"><i style="width:78%;background:var(--lemon)"></i></div>
          </div>
          <p style="font-size:11.5px;color:var(--ink-2);margin-top:8px">六科均分 ${avg} 分 · 较上学期 +3.2 分</p>
        </section>

        <section class="card" data-tone="sakura">
          <div class="card__head">
            <span class="bullet"></span>
            <h3 class="card__title">五次大考走势</h3>
            <span class="spacer"></span>
            <span class="tag" data-tone="mint">进步 9 分</span>
          </div>
          ${trendChart(TREND, 6)}
          <p style="font-size:12px;color:var(--ink-2);margin-top:10px">
            从期初 82 分到模拟考 91 分，数学和化学是主要提分科目。
          </p>
        </section>
      </div>

      <section class="card">
        <div class="card__head">
          <span class="bullet" data-tone="mint"></span>
          <h3 class="card__title">各科成绩明细</h3>
          <span class="spacer"></span>
          <span class="tag" data-tone="lemon">期中考试 · 2026.10</span>
        </div>
        <div class="subject-list">
          ${GRADES.map(g => {
            const lv = g.score >= 90 ? '优' : g.score >= 85 ? '良' : '中';
            return `<div class="subject" data-tone="${g.tone}">
              <span class="subject__name">${g.name}</span>
              <div class="track"><i style="width:${g.score}%"></i></div>
              <span class="subject__score">${g.score}</span>
              <span class="grade-pill">${lv}</span>
            </div>`;
          }).join('')}
        </div>
      </section>
    </div>`;
  }

  /* ========================================================================
     渲染：考勤
     ======================================================================== */

  function octoberCells() {
    // 2026-10-01 是周四 → 周索引 3
    const lead = 3, cells = [];
    for (let i = 0; i < lead; i++) cells.push({ blank: true, key: 'b' + i });
    for (let d = 1; d <= 31; d++) {
      const idx = (lead + d - 1) % 7;
      const weekend = idx >= 5;
      let state = weekend ? null : 'present';
      if (!weekend) {
        if (d === 9 || d === 23) state = 'late';
        if (d === 14) state = 'absent';
      }
      cells.push({ d, state, weekend, key: 'd' + d });
    }
    return cells;
  }

  const STATE_TEXT = { present: '出勤', late: '迟到', absent: '缺勤', leave: '请假' };

  function viewAttendance() {
    const cells = octoberCells();
    return `
    <div class="page page-enter">
      <div class="att-stats">
        ${ATT_MONTH.map(s => `
          <article class="stat" data-tone="${s.tone}">
            <div class="stat__top">
              <span class="stat__label">${s.label}</span>
              <span class="stat__icon">${icon(s.icon, 15)}</span>
            </div>
            <p class="stat__num">${s.value}${s.unit ? `<small>${s.unit}</small>` : ''}</p>
            <p class="stat__foot">
              <span class="stat__trend ${s.trend === 'up' ? 'up' : s.trend === 'down' ? 'down' : ''}">
                ${s.trend === 'up' ? '↑' : s.trend === 'down' ? '↓' : '·'} ${s.delta}
              </span>${s.note}
            </p>
          </article>`).join('')}
      </div>

      <div class="att-grid">
        <section class="card" data-tone="lemon">
          <div class="card__head">
            <span class="bullet"></span>
            <h3 class="card__title">十月出勤日历</h3>
            <span class="spacer"></span>
            <span class="tag" data-tone="lemon">共 22 个教学日</span>
          </div>
          <div class="cal-head">
            ${['一', '二', '三', '四', '五', '六', '日'].map(d => `<span>${d}</span>`).join('')}
          </div>
          <div class="cal-grid">
            ${cells.map(c => c.blank
              ? '<div class="cal-day is-blank"></div>'
              : `<div class="cal-day" ${c.state ? `data-state="${c.state}"` : ''}>
                   ${c.d}${c.weekend ? '<em>休</em>' : c.state ? `<em>${STATE_TEXT[c.state]}</em>` : ''}
                 </div>`).join('')}
          </div>
          <div class="cal-legend">
            <span><i style="background:var(--mint)"></i>出勤</span>
            <span><i style="background:var(--lemon)"></i>迟到</span>
            <span><i style="background:var(--sky)"></i>请假</span>
            <span><i style="background:var(--sakura)"></i>缺勤</span>
          </div>
        </section>

        <section class="card" data-tone="sky">
          <div class="card__head">
            <span class="bullet"></span>
            <h3 class="card__title">最近考勤记录</h3>
          </div>
          <div class="rec-list">
            ${ATT_RECORDS.map(r => `
              <div class="rec-row" data-tone="${r.tone}">
                <span class="rec-row__date">${r.date}</span>
                <span class="rec-row__main">${r.name}<small>${r.note}</small></span>
                <span class="tag" data-tone="${r.tone}">${r.name.split(' ')[0]}</span>
              </div>`).join('')}
          </div>
          <button class="btn btn--ghost btn--sm" style="margin-top:14px;width:100%" data-act="leave">提交请假申请</button>
        </section>
      </div>
    </div>`;
  }

  /* ========================================================================
     渲染：社团
     ======================================================================== */

  function viewClubs() {
    const cats = ['全部', '艺术', '体育', '学术', '公益'];
    const list = CLUBS.filter(c => state.clubFilter === '全部' || c.cat === state.clubFilter);

    return `
    <div class="page page-enter">
      <div class="page-head">
        <div class="page-head__txt">
          <h2>社团招新中</h2>
          <p>每人每学期最多加入 2 个社团，报名后由社长在 3 个工作日内联系。你已加入 ${CLUBS.filter(c => c.joined).length} 个。</p>
        </div>
        <span class="tag" data-tone="lilac">已加入 ${CLUBS.filter(c => c.joined).length} / 2</span>
      </div>

      <div class="chips" role="group" aria-label="社团分类">
        ${cats.map(c => `<button class="chip ${state.clubFilter === c ? 'is-on' : ''}" data-act="filter" data-cat="${c}"
          aria-pressed="${state.clubFilter === c}">${c}</button>`).join('')}
      </div>

      <div class="club-grid">
        ${list.map(c => `
          <article class="club-card" data-tone="${c.tone}">
            <div class="club-card__top">
              <span class="club-card__badge">${icon(c.icon, 23)}</span>
              <div>
                <h3 class="club-card__name">${c.name}</h3>
                <p class="club-card__by">${c.by} · ${c.cat}</p>
              </div>
            </div>
            <p class="club-card__desc">${c.desc}</p>
            <div class="club-card__foot">
              <span class="club-card__people"><b>${c.people}</b> 人已加入</span>
              <button class="btn btn--sm ${c.joined ? 'is-done' : 'btn--primary'}" data-act="join" data-club="${c.id}"
                ${c.joined ? 'disabled aria-disabled="true"' : ''}>${c.joined ? '已加入 ✓' : '报名加入'}</button>
            </div>
          </article>`).join('')}
      </div>
    </div>`;
  }

  /* ========================================================================
     渲染：通知
     ======================================================================== */

  function viewNotices() {
    const tags = ['全部', '教务', '德育', '社团', '图书馆', '后勤', '安全'];
    const list = NOTICES.filter(n => state.noticeFilter === '全部' || n.tag === state.noticeFilter);
    return `
    <div class="page page-enter">
      <div class="page-head">
        <div class="page-head__txt">
          <h2>通知公告</h2>
          <p>教务、德育、后勤等校内通知统一汇总。未读 ${NOTICES.filter(n => !n.read).length} 条，点击任意一条查看全文。</p>
        </div>
        <button class="btn btn--sm btn--ghost" data-act="read-all">全部标记已读</button>
      </div>

      <div class="chips" role="group" aria-label="通知分类">
        ${tags.map(t => `<button class="chip ${state.noticeFilter === t ? 'is-on' : ''}" data-act="nfilter" data-cat="${t}"
          aria-pressed="${state.noticeFilter === t}">${t}</button>`).join('')}
      </div>

      <div class="notice-list">
        ${list.map(n => `
          <button class="notice-item ${n.read ? '' : 'is-unread'}" data-act="notice" data-id="${n.id}">
            <span class="notice-item__date"><b>${n.day}</b>${n.mon}</span>
            <span>
              <span class="notice-item__title">
                ${n.read ? '' : '<span class="unread-dot" aria-label="未读"></span>'}
                ${n.title}
                <span class="tag" data-tone="${n.tone}">${n.tag}</span>
              </span>
              <span class="notice-item__body">${n.body}</span>
            </span>
            <span class="notice-item__arrow" aria-hidden="true">›</span>
          </button>`).join('')}
      </div>
    </div>`;
  }

  /* ========================================================================
     渲染：我的
     ======================================================================== */

  function viewProfile() {
    return `
    <div class="page page-enter">
      <div class="profile-grid">
        <section class="profile-card">
          <div class="profile-card__avatar">${AVATAR}</div>
          <h2 class="profile-card__name">林小满</h2>
          <p class="profile-card__sub">高二 (3) 班 · 理科 · 学习委员</p>
          <p class="profile-card__id">NO. 20240317</p>
          <div class="profile-meta">
            <div><span>班主任</span><b>苏敏</b></div>
            <div><span>入校时间</span><b>2024 年 9 月</b></div>
            <div><span>宿舍</span><b>3 号楼 402</b></div>
            <div><span>校园卡余额</span><b>¥ 128.50</b></div>
          </div>
        </section>

        <div style="display:grid;gap:var(--gutter);align-content:start">
          <section class="card" data-tone="lemon">
            <div class="card__head">
              <span class="bullet"></span>
              <h3 class="card__title">账号与提醒</h3>
            </div>
            <div>
              ${SETTINGS.map(s => `
                <div class="setting-row">
                  <span class="setting-row__main">
                    <span class="setting-row__name">${s.name}</span>
                    <span class="setting-row__desc">${s.desc}</span>
                  </span>
                  <button class="switch" role="switch" aria-checked="${s.on}" aria-label="${s.name}" data-act="switch" data-id="${s.id}"></button>
                </div>`).join('')}
            </div>
          </section>

          <section class="card" data-tone="sakura">
            <div class="card__head">
              <span class="bullet"></span>
              <h3 class="card__title">我的徽章</h3>
              <span class="spacer"></span>
              <span class="tag" data-tone="lemon">共 6 枚</span>
            </div>
            <div class="badges">
              ${BADGES.map(b => `<div class="badge-chip" data-tone="${b.tone}"><span>${b.emoji}</span>${b.label}</div>`).join('')}
            </div>
          </section>
        </div>
      </div>
    </div>`;
  }

  /* ========================================================================
     路由
     ======================================================================== */

  const VIEWS = {
    overview: viewOverview,
    schedule: viewSchedule,
    grades: viewGrades,
    attendance: viewAttendance,
    clubs: viewClubs,
    notices: viewNotices,
    profile: viewProfile,
  };

  function renderNav() {
    const unread = NOTICES.filter(n => !n.read).length;
    $('#rail-nav').innerHTML = NAV.map(n => {
      const badge = n.id === 'notices' && unread ? `<span class="nav-item__badge">${unread}</span>` : '';
      return `<button class="nav-item ${state.page === n.id ? 'is-active' : ''}" data-tone="${n.tone}"
        data-act="nav" data-page="${n.id}" ${state.page === n.id ? 'aria-current="page"' : ''}>
        ${icon(n.icon, 18)}<span class="nav-item__txt">${n.label}</span>${badge}
      </button>`;
    }).join('');
  }

  function go(page, opts = {}) {
    if (!VIEWS[page]) return;
    state.page = page;
    const meta = META[page];
    $('#page-title').textContent = meta.title;
    $('#page-eyebrow').textContent = meta.eyebrow;
    $('.topbar').dataset.tone = meta.tone;
    $('#view').innerHTML = VIEWS[page]();
    renderNav();
    if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    if (opts.focus) $('#view').focus({ preventScroll: true });
  }

  /* ========================================================================
     弹窗 / 抽屉 / 提示
     ======================================================================== */

  let lastFocus = null;

  function openModal(html) {
    lastFocus = document.activeElement;
    const box = $('#modal-box');
    box.innerHTML = `<button class="modal__close" data-act="close-modal" aria-label="关闭">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>${html}`;
    $('#modal').hidden = false;
    $('.modal__close').focus();
  }

  function closeModal() {
    $('#modal').hidden = true;
    $('#modal-box').innerHTML = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function lessonModal(key, pi, day) {
    const s = SUBJECTS[key];
    const p = PERIODS[pi] || PERIODS[0];
    const notes = {
      math: '今天讲导数与函数单调性，课后练习 P62 第 1—6 题。',
      chinese: '《逍遥游》第二段默写，明天课上抽查。',
      english: 'Unit 5 阅读精讲，带上听力练习册。',
      physics: '牛顿第二定律实验，两人一组，穿实验服。',
      chemistry: '酸碱中和滴定，注意护目镜。',
      pe: '男生 1000 米测试，女生 800 米，记得换运动鞋。',
      biology: '减数分裂模型制作，材料费 8 元。',
      history: '近代史专题复习，带上学案。',
      geography: '气压带与风带，随堂小测。',
      it: 'Python 循环结构，机房 2 上课。',
      art: '水彩静物写生，自带颜料。',
      meeting: '本周主题：期中总结与家长会安排。',
      self: '自主复习，班干部维持纪律。',
      club: '各社团在综合楼集中活动。',
    };
    openModal(`
      <p class="modal__kicker" data-tone="${s.tone}" style="color:var(--tone-dk)">${day || '周一'} · 第 ${p.n} 节</p>
      <h2 class="modal__title" id="modal-title">${s.name}</h2>
      <p class="modal__sub">${s.teacher} 老师 · ${s.room}</p>
      <div class="modal__rows">
        <div class="modal__row"><span>上课时间</span><b>${p.start} — ${p.end}</b></div>
        <div class="modal__row"><span>课程类型</span><b>${['自习', '社团活动', '班会'].includes(s.name) ? '活动课' : '必修'}</b></div>
        <div class="modal__row"><span>课时学分</span><b>1 课时 · 2 学分</b></div>
        <div class="modal__row"><span>本周进度</span><b>第 ${pi + 1} / 6 节</b></div>
      </div>
      <p class="modal__note" data-tone="${s.tone}"><b>课堂备注：</b>${notes[key] || '正常上课，请提前两分钟到教室。'}</p>
      <div class="modal__actions">
        <button class="btn btn--ghost" data-act="close-modal">关闭</button>
        <button class="btn btn--primary" data-act="toast" data-msg="已加入你的日程提醒">设为提醒</button>
      </div>
    `);
  }

  function noticeModal(id) {
    const n = NOTICES.find(x => x.id === id);
    if (!n) return;
    if (!n.read) { n.read = true; refreshUnread(); }
    openModal(`
      <p class="modal__kicker" data-tone="${n.tone}" style="color:var(--tone-dk)">${n.tag}通知 · ${n.mon} ${n.day} 日</p>
      <h2 class="modal__title" id="modal-title">${n.title}</h2>
      <p class="modal__sub">发布单位：青柠学园${n.tag}处</p>
      <p class="modal__note" data-tone="${n.tone}" style="margin-top:16px">${n.body}</p>
      <div class="modal__actions">
        <button class="btn btn--ghost" data-act="close-modal">知道了</button>
        <button class="btn btn--primary" data-act="toast" data-msg="已加入待办清单">加入待办</button>
      </div>
    `);
    if (state.page === 'notices' || state.page === 'overview') go(state.page, { keepScroll: true });
  }

  function refreshUnread() {
    const unread = NOTICES.filter(n => !n.read).length;
    const bell = $('#bell-btn');
    let dot = $('.icon-btn__dot', bell);
    if (unread && !dot) {
      dot = document.createElement('span');
      dot.className = 'icon-btn__dot';
      bell.appendChild(dot);
    }
    if (dot) {
      if (!unread) dot.remove();
      else dot.textContent = unread;
      bell.setAttribute('aria-label', `通知，有 ${unread} 条未读`);
    }
    renderNav();
    renderDrawer();
  }

  function renderDrawer() {
    $('#drawer-list').innerHTML = NOTICES.slice(0, 5).map(n => `
      <button class="mini-notice" data-act="notice" data-id="${n.id}">
        <span class="mini-notice__top">
          ${n.read ? '' : '<span class="unread-dot"></span>'}
          <span class="tag" data-tone="${n.tone}">${n.tag}</span>
          <span style="font-family:var(--font-hand);font-size:10.5px;color:var(--ink-3);margin-left:auto">${n.mon}${n.day}日</span>
        </span>
        <span class="mini-notice__title">${n.title}</span>
        <span class="mini-notice__body">${n.body.slice(0, 42)}…</span>
      </button>`).join('');
  }

  function openDrawer() {
    renderDrawer();
    const w = $('#notice-drawer');
    w.hidden = false;
    $('#bell-btn').setAttribute('aria-expanded', 'true');
    $('#drawer-close').focus();
  }
  function closeDrawer() {
    $('#notice-drawer').hidden = true;
    $('#bell-btn').setAttribute('aria-expanded', 'false');
    $('#bell-btn').focus();
  }

  let toastTimer;
  function toast(msg) {
    const wrap = $('#toast');
    wrap.innerHTML = `<div class="toast">✓ ${msg}</div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      const t = $('.toast');
      if (t) { t.classList.add('out'); setTimeout(() => (wrap.innerHTML = ''), 260); }
    }, 2100);
  }

  /* ========================================================================
     搜索
     ======================================================================== */

  function buildIndex() {
    const items = [];
    Object.keys(SUBJECTS).forEach(k => {
      const s = SUBJECTS[k];
      items.push({ type: '课程', label: `${s.name} · ${s.teacher}`, page: 'schedule', tone: s.tone, key: k });
    });
    CLUBS.forEach(c => items.push({ type: '社团', label: c.name, page: 'clubs', tone: c.tone, key: c.id }));
    NOTICES.forEach(n => items.push({ type: '通知', label: n.title, page: 'notices', tone: n.tone, key: n.id }));
    NAV.forEach(n => items.push({ type: '页面', label: n.label, page: n.id, tone: n.tone, key: n.id }));
    return items;
  }
  const INDEX = buildIndex();

  const input = $('#search-input');
  const drop = $('#search-drop');

  function runSearch(q) {
    const key = q.trim().toLowerCase();
    if (!key) { drop.hidden = true; drop.innerHTML = ''; return; }
    const hits = INDEX.filter(i => i.label.toLowerCase().includes(key)).slice(0, 7);
    drop.innerHTML = hits.length
      ? hits.map((h, i) => `<button data-act="hit" data-i="${INDEX.indexOf(h)}">
          <span class="sd-type" data-tone="${h.tone}">${h.type}</span>
          <span>${h.label}</span>
        </button>`).join('')
      : `<p class="sd-empty">没找到「${q}」，换个词试试？</p>`;
    drop.hidden = false;
  }

  input.addEventListener('input', e => runSearch(e.target.value));
  input.addEventListener('focus', () => { if (input.value.trim()) runSearch(input.value); });
  document.addEventListener('click', e => {
    if (!e.target.closest('.search')) drop.hidden = true;
  });

  /* ========================================================================
     事件委托
     ======================================================================== */

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-act]');
    if (!trigger) return;
    const act = trigger.dataset.act;

    switch (act) {
      case 'nav':
        go(trigger.dataset.page, { focus: true });
        break;

      case 'goto':
        go(trigger.dataset.page, { focus: true });
        break;

      case 'lesson':
        lessonModal(trigger.dataset.subject, Number(trigger.dataset.period), trigger.dataset.day);
        break;

      case 'notice':
        noticeModal(trigger.dataset.id);
        break;

      case 'mood': {
        state.mood = Number(trigger.dataset.mood);
        $$('.mood__btn').forEach((b, i) => {
          b.classList.toggle('is-on', i === state.mood);
          b.setAttribute('aria-pressed', String(i === state.mood));
        });
        toast(`心情已记录：${MOODS[state.mood].label}`);
        break;
      }

      case 'join': {
        const club = CLUBS.find(c => c.id === trigger.dataset.club);
        if (!club || club.joined) break;
        const joinedCount = CLUBS.filter(c => c.joined).length;
        if (joinedCount >= 2) { toast('每学期最多加入 2 个社团'); break; }
        club.joined = true;
        club.people += 1;
        go(state.page, { keepScroll: true });
        toast(`已报名「${club.name}」，社长会联系你`);
        break;
      }

      case 'filter':
        state.clubFilter = trigger.dataset.cat;
        go('clubs', { keepScroll: true });
        break;

      case 'nfilter':
        state.noticeFilter = trigger.dataset.cat;
        go('notices', { keepScroll: true });
        break;

      case 'read-all':
        NOTICES.forEach(n => (n.read = true));
        go('notices', { keepScroll: true });
        refreshUnread();
        toast('已全部标记为已读');
        break;

      case 'switch': {
        const on = trigger.getAttribute('aria-checked') === 'true';
        trigger.setAttribute('aria-checked', String(!on));
        toast(`${on ? '已关闭' : '已开启'}${trigger.getAttribute('aria-label')}`);
        break;
      }

      case 'leave':
        openModal(`
          <p class="modal__kicker" style="color:var(--tangerine-dk)">考勤 · 请假</p>
          <h2 class="modal__title" id="modal-title">提交请假申请</h2>
          <p class="modal__sub">申请将由班主任苏敏老师审批</p>
          <div class="modal__rows">
            <div class="modal__row"><span>请假类型</span><b>事假</b></div>
            <div class="modal__row"><span>起止时间</span><b>11/03 全天</b></div>
            <div class="modal__row"><span>审批人</span><b>苏敏（班主任）</b></div>
          </div>
          <p class="modal__note">请在一个工作日内补交纸质假条到德育处，逾期视为缺勤。</p>
          <div class="modal__actions">
            <button class="btn btn--ghost" data-act="close-modal">取消</button>
            <button class="btn btn--primary" data-act="toast" data-msg="请假申请已提交，等待审批">提交申请</button>
          </div>`);
        break;

      case 'hit': {
        const item = INDEX[Number(trigger.dataset.i)];
        drop.hidden = true;
        input.value = '';
        if (item.type === '课程') {
          const idx = WEEK[0].slots.indexOf(item.key);
          go('schedule', { focus: true });
          lessonModal(item.key, idx < 0 ? 0 : idx, '周一');
        } else if (item.type === '社团') {
          state.clubFilter = '全部';
          go('clubs', { focus: true });
          toast(`已定位到「${item.label}」`);
        } else if (item.type === '通知') {
          go('notices', { focus: true });
          noticeModal(item.key);
        } else {
          go(item.page, { focus: true });
        }
        break;
      }

      case 'toast':
        toast(trigger.dataset.msg || '已完成');
        break;

      case 'close-modal':
        closeModal();
        break;

      case 'close-drawer':
        closeDrawer();
        break;
    }
  });

  $('#bell-btn').addEventListener('click', openDrawer);
  $('#drawer-close').addEventListener('click', closeDrawer);
  $('#me-btn').addEventListener('click', () => go('profile', { focus: true }));
  $('#notice-drawer').addEventListener('click', e => {
    if (e.target.id === 'notice-drawer') closeDrawer();
  });
  $('#modal').addEventListener('click', e => {
    if (e.target.id === 'modal') closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      let closed = false;
      if (!$('#modal').hidden) { closeModal(); closed = true; }
      if (!$('#notice-drawer').hidden) { closeDrawer(); closed = true; }
      if (closed) return;
    }
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
  });

  /* ========================================================================
     启动
     ======================================================================== */

  const now = new Date();
  const stampDay = $('.stamp__day');
  const stampMon = $('.stamp__mon');
  if (stampDay && stampMon) {
    stampDay.textContent = String(now.getDate()).padStart(2, '0');
    stampMon.innerHTML = `${['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][now.getMonth()]}<br/>${weekDays[now.getDay()]}`;
    $('#date-stamp').setAttribute('aria-label',
      `今天是 ${now.getMonth() + 1} 月 ${now.getDate()} 日，${weekDays[now.getDay()]}`);
  }

  renderNav();
  go('overview');
})();
