(() => {
  const root = document.documentElement;
  const languageButton = document.querySelector('[data-language-toggle]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const savedTheme = localStorage.getItem('field-guide-theme');
  const preferredTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let currentLanguage = requestedLanguage === 'vi' || (requestedLanguage !== 'en' && localStorage.getItem('field-guide-language') === 'vi') ? 'vi' : 'en';
  const translatedGuideLinks = [...document.querySelectorAll('.guide-card.study, .guide-card.money, .guide-card.manners')]
    .map((link) => [link, link.getAttribute('href')]);

  const vi = {
    'Skip to the guides': 'Chuyển thẳng đến các cẩm nang',
    'field guide': 'cẩm nang kỹ năng',
    'Practical skills nobody explains clearly enough': 'Những kỹ năng thực tế hiếm khi được giải thích đủ rõ ràng',
    'Learn the rules.': 'Hiểu các quy tắc.',
    'Keep your own voice.': 'Vẫn là chính mình.',
    'Three practical field guides, plus direct doors into the Nail Studio and Print Studio. Open what you need today.': 'Ba cẩm nang kỹ năng thực tế, cùng lối tắt đến Tiệm Nail và Xưởng In. Hãy mở đúng nội dung bạn cần hôm nay.',
    'Study': 'Học tập',
    'Open the guide': 'Mở cẩm nang',
    'Learn with less wasted effort': 'Học hiệu quả hơn, bớt công sức lãng phí',
    'smarter.': 'hiệu quả hơn.',
    'Less busywork, better memory, and proof you actually learned it.': 'Bớt những việc tốn công vô ích, nhớ lâu hơn và có cách kiểm chứng rằng bạn đã thực sự nắm bài.',
    'Money': 'Tài chính',
    'Understand, protect, and grow it': 'Hiểu, bảo vệ và làm tiền sinh lời',
    'Make your money work as hard as': 'Hãy để tiền của bạn làm việc chăm chỉ như',
    'you do.': 'chính bạn.',
    'If not more.': 'Thậm chí còn hơn.',
    'Manners': 'Phép lịch sự',
    'Move through rooms with grace': 'Ứng xử tự tin và tinh tế',
    'Good manners make other people feel': 'Cách cư xử đẹp giúp người khác cảm thấy',
    'at ease.': 'thoải mái.',
    'Learn the code. Keep your dignity and your own voice.': 'Hiểu những quy tắc ngầm mà vẫn giữ phẩm giá và bản sắc của chính mình.',
    'Studio shortcuts': 'Lối tắt đến studio',
    'Back to the Nail Salon': 'Quay lại Tiệm Nail',
    'Nail Studio': 'Tiệm Nail',
    'Visit the studio': 'Ghé thăm studio',
    'San Jose · by appointment': 'San Jose · phục vụ theo lịch hẹn',
    'Nails made for your': 'Bộ nail dành cho',
    'divine era.': 'thời kỳ tỏa sáng của bạn.',
    'Soft glam, sculpted extensions, and tiny works of art—created one dreamy set at a time.': 'Phong cách lộng lẫy nhẹ nhàng, móng nối tạo dáng và những tác phẩm nghệ thuật thu nhỏ—mỗi lần là một bộ nail trong mơ.',
    'Print Studio': 'Xưởng In',
    'Open print studio': 'Mở xưởng in',
    'Approved artwork and working concepts': 'Mẫu đã duyệt và các ý tưởng đang hoàn thiện',
    'print studio.': 'xưởng in.',
    'Print-ready business cards, flyers, pricing, and promotional collateral.': 'Danh thiếp, tờ rơi, bảng giá và tài liệu quảng bá đã sẵn sàng để in.',
    'The through-line': 'Điểm chung',
    'These are not rules for proving your worth. They are tools for understanding systems, reducing avoidable friction, and creating more choices.': 'Đây không phải là những quy tắc để chứng minh giá trị của bạn. Chúng là công cụ giúp bạn hiểu các hệ thống, giảm những trở ngại có thể tránh và tạo thêm lựa chọn cho mình.',
    'This learning hub is intentionally separate from the nail-studio experience.': 'Khu cẩm nang này được tách riêng có chủ đích khỏi trải nghiệm của tiệm nail.'
  };

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement.closest('[data-language-toggle], [data-theme-toggle]') || !node.nodeValue.trim()
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    }
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push([walker.currentNode, walker.currentNode.nodeValue]);

  const applyTheme = (theme) => {
    const dark = theme === 'dark';
    const vietnamese = currentLanguage === 'vi';
    root.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('field-guide-theme', root.dataset.theme);
    themeButton?.setAttribute('aria-pressed', String(dark));
    themeButton?.setAttribute('aria-label', vietnamese ? `Chuyển sang giao diện ${dark ? 'sáng' : 'tối'}` : `Switch to ${dark ? 'light' : 'dark'} mode`);
    if (themeButton) themeButton.innerHTML = `<span aria-hidden="true">${dark ? '☀' : '☾'}</span><b>${vietnamese ? (dark ? 'Sáng' : 'Tối') : (dark ? 'Light' : 'Dark')}</b>`;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#111512' : '#f3eee3');
  };

  const setLanguage = (language) => {
    currentLanguage = language === 'vi' ? 'vi' : 'en';
    const vietnamese = currentLanguage === 'vi';
    textNodes.forEach(([node, original]) => {
      if (!vietnamese) {
        node.nodeValue = original;
        return;
      }
      const key = original.trim();
      if (vi[key]) node.nodeValue = original.replace(key, vi[key]);
    });
    root.lang = currentLanguage;
    root.dataset.language = currentLanguage;
    document.title = vietnamese ? 'Cẩm nang kỹ năng thực tế' : 'Practical Field Guides';
    document.querySelector('meta[name="description"]')?.setAttribute('content', vietnamese
      ? 'Bản đồ dẫn đến các cẩm nang thực tế về học tập, tài chính và phép lịch sự.'
      : 'A map to practical field guides for studying, money, and manners.');
    languageButton?.setAttribute('aria-label', vietnamese ? 'Chuyển sang tiếng Anh' : 'Đọc bằng tiếng Việt');
    if (languageButton) languageButton.innerHTML = `<span aria-hidden="true">${vietnamese ? 'EN' : 'VI'}</span><b>${vietnamese ? 'Tiếng Anh' : 'Tiếng Việt'}</b>`;
    document.querySelector('.guide-map:not(.studio-map)')?.setAttribute('aria-label', vietnamese ? 'Bản đồ các cẩm nang kỹ năng' : 'Site map and field guides');
    document.querySelector('.studio-map')?.setAttribute('aria-label', vietnamese ? 'Liên kết đến tiệm nail' : 'Nail salon links');
    translatedGuideLinks.forEach(([link, href]) => link.setAttribute('href', `${href}?lang=${currentLanguage}`));
    applyTheme(root.dataset.theme || savedTheme || preferredTheme);
  };

  applyTheme(savedTheme || preferredTheme);
  setLanguage(currentLanguage);
  languageButton?.addEventListener('click', () => {
    setLanguage(currentLanguage === 'en' ? 'vi' : 'en');
    localStorage.setItem('field-guide-language', currentLanguage);
  });
  themeButton?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
})();
