(() => {
  const root = document.documentElement;
  const languageButton = document.querySelector('[data-language-toggle]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const expandButton = document.querySelector('[data-expand-all]');
  const brandLink = document.querySelector('.brand');
  const lessons = [...document.querySelectorAll('.lesson')];
  const savedTheme = localStorage.getItem('field-guide-theme');
  const preferredTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let currentLanguage = requestedLanguage === 'vi' || (requestedLanguage !== 'en' && localStorage.getItem('manners-language') === 'vi') ? 'vi' : 'en';

  const vi = {
    "m001": "Chuyển thẳng đến nội dung chính",
    "m002": "cẩm nang kỹ năng",
    "m003": "Khéo léo trong giao tiếp · mà vẫn là chính mình",
    "m004": "Cách cư xử đẹp giúp người khác cảm thấy",
    "m005": "thoải mái.",
    "m006": "Học những quy tắc giúp bạn bước vào một căn phòng, hòa nhập tại bàn ăn, nhờ hỗ trợ, xây dựng lòng tin và được mời trở lại—mà vẫn giữ phẩm giá và bản sắc của chính mình.",
    "m007": "Mục đích",
    "m008": "Phép lịch sự không phải là sự phục tùng những quy tắc tùy tiện. Khi được thực hành đúng nghĩa, đó là",
    "m009": "sự quan tâm, tôn trọng và chân thành",
    "m010": "được thể hiện ra bên ngoài.",
    "m011": "Nói rõ điều thường bị né tránh",
    "m012": "Phép tắc có thể trở thành dấu hiệu phân tầng xã hội tại Mỹ.",
    "m013": "Mọi người thường nhầm việc quen thuộc với những quy tắc ngầm của một nhóm—cách nói, ăn mặc, dùng bữa, giới thiệu, đúng giờ và sự tự tin—với năng lực hoặc xuất thân “được giáo dưỡng.” Các nhà xã hội học gọi những lợi thế học được này là một dạng",
    "m014": "vốn văn hóa",
    "m015": "Điều đó có thể ảnh hưởng đến ai cảm thấy thoải mái, ai được giới thiệu và ai được mời bước vào cơ hội tiếp theo. Hiểu quy tắc có thể giảm những trở ngại không cần thiết. Nhưng điều đó",
    "m016": "không",
    "m017": "khiến bất kỳ ai thông minh, đạo đức, tinh tế hoặc xứng đáng hơn một người chưa từng được dạy những quy tắc ấy.",
    "m018": "Mục tiêu hữu ích:",
    "m019": "hiểu căn phòng đủ rõ để tự chọn cách mình tham gia—không phải để tôn sùng căn phòng hay coi thường người đứng ngoài nó.",
    "m020": "Cotillion kiểu Pháp · ứng dụng vào đời sống hiện đại",
    "m021": "Rèn sự duyên dáng trước khi tình huống trở nên phức tạp.",
    "m022": "Cotillion khởi đầu là một điệu nhảy giao tiếp gắn với nước Pháp thế kỷ XVIII, rồi trở thành một phần của văn hóa khiêu vũ tại Mỹ. Các chương trình cotillion hiện đại ở Mỹ thường kết hợp khiêu vũ với cách giới thiệu, dùng bữa, ăn mặc và ứng xử khi làm khách.",
    "m023": "Quan sát",
    "m024": "Đọc kỹ lời mời, quy định trang phục, không khí căn phòng và mức độ thoải mái của người khác.",
    "m025": "Tiếp cận",
    "m026": "Bước vào bình tĩnh, chào chủ nhà, tự giới thiệu và chủ động kết nối người khác.",
    "m027": "Tham gia",
    "m028": "Lắng nghe, trò chuyện, dùng bữa, khiêu vũ hoặc quan sát mà không biến mình thành trung tâm của cả sự kiện.",
    "m029": "Kết thúc",
    "m030": "Cảm ơn chủ nhà, ra về đúng lúc và gửi lời hỏi thăm hoặc cảm ơn sau đó.",
    "m031": "Phiên bản một phút",
    "m032": "Cẩm nang cấp tốc về phép lịch sự trên bàn ăn",
    "m033": "Bạn không cần thể hiện sự hoàn hảo. Hãy giúp bữa ăn thoải mái với mọi người, theo tín hiệu của chủ nhà và xử lý những lỗi nhỏ nhẹ nhàng mà không làm chúng thành chuyện lớn.",
    "m034": "Khăn ăn trước tiên",
    "m035": "Sau khi ngồi, mở khăn và đặt lên đùi. Chấm nhẹ—không chà—khi lau miệng.",
    "m036": "Chờ tín hiệu bắt đầu",
    "m037": "Bắt đầu khi chủ nhà bắt đầu hoặc mời mọi người dùng bữa. Ở bàn lớn, hãy làm theo hướng dẫn của chủ nhà khi món nóng đang được phục vụ.",
    "m038": "Bánh mì bên trái, đồ uống bên phải",
    "m039": "Đĩa bánh mì thường ở bên trái. Ly nước và các loại ly khác thường ở bên phải.",
    "m040": "Dùng từ ngoài vào trong",
    "m041": "Dùng dụng cụ ngoài cùng phù hợp với món đầu tiên, rồi lần lượt tiến vào trong. Nếu chưa chắc, hãy kín đáo quan sát chủ nhà.",
    "m042": "Ăn từng miếng nhỏ",
    "m043": "Nhai khép miệng, nuốt xong trước khi nói và giữ nhịp ăn gần với mọi người trên bàn.",
    "m044": "Chuyền giúp; đừng với tay",
    "m045": "Nhờ người khác chuyền món ở xa, tiếp tục chuyền theo hướng đang có và luôn chuyền muối cùng tiêu.",
    "m046": "Giữ bàn ăn gọn gàng",
    "m047": "Cất điện thoại. Nếu cần rời bàn, chỉ cần nói “Xin phép” mà không cần thông báo chuyện riêng tư.",
    "m048": "Kết thúc lịch thiệp",
    "m049": "Khi ăn xong, đặt các dụng cụ cạnh nhau trên đĩa. Để khăn ăn nhẹ nhàng bên cạnh đĩa—không gấp lại như chưa dùng.",
    "m050": "Khi chưa chắc:",
    "m051": "hãy dừng lại, quan sát, hỏi nhỏ và ưu tiên sự quan tâm đến người khác hơn việc đúng kỹ thuật tuyệt đối.",
    "m052": "Mở bài đầy đủ về tiệc trang trọng ↓",
    "m053": "Nguyên tắc đằng sau các quy tắc",
    "m054": "Ba nguyên tắc có ích hơn một trăm phép tắc học thuộc lòng.",
    "m055": "Sự quan tâm",
    "m056": "Để ý cách lựa chọn của bạn ảnh hưởng đến người xung quanh. Hãy làm cho việc tham gia trở nên dễ dàng hơn, không nặng nề hơn.",
    "m057": "Sự tôn trọng",
    "m058": "Tôn trọng thời gian, ranh giới, tên gọi, nhà cửa, văn hóa, người làm dịch vụ và từ “không.” Đồng thời hãy tôn trọng chính mình.",
    "m059": "Sự chân thành",
    "m060": "Hãy chân thành và khéo léo. Lịch sự thiếu sự thật sẽ thành diễn xuất; sự thật thiếu quan tâm sẽ thành tàn nhẫn.",
    "m061": "Cẩm nang thực hành",
    "m062": "Tám tình huống đáng để luyện trước.",
    "m063": "Chạm vào một bài để mở chi tiết",
    "m064": "Trước sự kiện",
    "m065": "Lời mời, xác nhận tham dự và quy định trang phục",
    "m066": "Trả lời trước hạn—kể cả khi câu trả lời là không tham dự.",
    "m067": "Không dẫn theo khách, trẻ em hoặc thú cưng khi chưa được mời. Hãy hỏi riêng nếu lời mời chưa rõ.",
    "m068": "Tôn trọng quy định trang phục. Khi chưa chắc, hãy hỏi chủ nhà hoặc chọn phương án chỉn chu hơn một chút.",
    "m069": "Báo sớm cho chủ nhà về nhu cầu ăn uống hoặc hỗ trợ tiếp cận quan trọng; đừng yêu cầu thay đổi toàn bộ sự kiện ngay tại cửa.",
    "m070": "Nếu kế hoạch thay đổi, báo ngay cho chủ nhà. Một lời hủy chân thành tốt hơn việc im lặng biến mất.",
    "m071": "Vì sao quan trọng:",
    "m072": "một câu trả lời đúng lúc giúp người khác sắp xếp không gian, đồ ăn, chỗ ngồi, chi phí và cả tâm sức.",
    "m073": "Khi bước vào phòng",
    "m074": "Đến nơi và giới thiệu",
    "m075": "Đến trong khoảng thời gian được mong đợi. Lời mời ăn tối không giống một buổi mở cửa tự do.",
    "m076": "Chào chủ nhà trước khi hòa vào căn phòng.",
    "m077": "Dùng tên mà người đó giới thiệu. Nếu quên, cứ hỏi lại một cách bình thường.",
    "m078": "Thêm một câu ngắn tạo bối cảnh: “Maya, đây là Daniel—chúng tôi từng làm cùng nhau ở thư viện.”",
    "m079": "Hãy để ý người đang đứng một mình. Chủ động giúp ai đó hòa nhập là một trong những hành động tinh tế nhất.",
    "m080": "Câu gợi ý",
    "m081": "“Hình như chúng ta chưa gặp nhau. Tôi là ____. Bạn quen chủ nhà như thế nào?”",
    "m082": "Trò chuyện",
    "m083": "Hãy thật sự quan tâm, đừng chỉ cố gây ấn tượng",
    "m084": "Nên làm",
    "m085": "Đặt câu hỏi mở và lắng nghe câu trả lời.",
    "m086": "Chia sẻ cơ hội nói chuyện với mọi người.",
    "m087": "Giới thiệu chuyên môn của người ít nói hơn.",
    "m088": "Đổi chủ đề khi ai đó có vẻ không thoải mái.",
    "m089": "Nên tránh",
    "m090": "Tra hỏi về thu nhập, cơ thể, sinh sản, tình trạng nhập cư hoặc các mối quan hệ.",
    "m091": "Sửa những chi tiết vô hại chỉ để thể hiện hiểu biết.",
    "m092": "Buôn chuyện dựa trên việc làm nhục người khác.",
    "m093": "Kết nối như thể mỗi con người chỉ là một giao dịch.",
    "m094": "Rời cuộc trò chuyện khéo léo",
    "m095": "“Rất vui được gặp bạn. Tôi sẽ qua chào chủ nhà trước khi về—chúc bạn một buổi tối vui vẻ.”",
    "m096": "Tại bàn ăn",
    "m097": "Dùng tiệc trang trọng mà không hoảng",
    "m098": "Chờ",
    "m099": "Chờ tín hiệu của chủ nhà trước khi bắt đầu. Đặt khăn ăn lên đùi.",
    "m100": "Dùng dần vào trong",
    "m101": "Khi có nhiều dụng cụ, bắt đầu với món ngoài cùng phù hợp.",
    "m102": "Đĩa bánh mì thường ở bên trái; các ly ở bên phải.",
    "m103": "Chuyền cùng nhau",
    "m104": "Khi muối và tiêu đi thành cặp, hãy chuyền cả hai. Chuyền đồ dùng chung thay vì với tay qua người khác.",
    "m105": "Tạm dừng kín đáo",
    "m106": "Ăn miếng nhỏ, nhai khép miệng và cất điện thoại khỏi bàn.",
    "m107": "Xử lý lỗi nhẹ nhàng",
    "m108": "Làm rơi nĩa chỉ có nghĩa là cần xin chiếc khác—không phải một tình huống khẩn cấp.",
    "m109": "Phong tục khác nhau theo quốc gia, gia đình, tôn giáo và dịp lễ. Hãy quan sát chủ nhà, hỏi khi cần và ưu tiên sự thoải mái của người khác hơn việc chứng minh mình đúng kỹ thuật.",
    "m110": "Khi làm khách hoặc chủ nhà",
    "m111": "Đóng góp mà không lấn át",
    "m112": "Một vị khách tinh tế",
    "m113": "Mang đúng những gì đã thống nhất.",
    "m114": "Đề nghị giúp một lần theo cách hữu ích, rồi tôn trọng câu trả lời.",
    "m115": "Trân trọng ngôi nhà và đối xử tử tế với nhân viên.",
    "m116": "Ra về trước khi chủ nhà buộc phải kết thúc buổi tối.",
    "m117": "Một chủ nhà tinh tế",
    "m118": "Cung cấp rõ thời gian, địa chỉ, trang phục và thông tin hỗ trợ tiếp cận.",
    "m119": "Giới thiệu mọi người và quan tâm đến khách đang bị đứng ngoài.",
    "m120": "Cung cấp lựa chọn không cồn mà không bình phẩm.",
    "m121": "Không làm khách xấu hổ vì một lỗi vô hại.",
    "m122": "Nhờ giúp đỡ và kết nối",
    "m123": "Nhờ theo cách khiến câu trả lời “đồng ý” dễ dàng hơn",
    "m124": "Xây dựng mối quan hệ thay vì biến mọi tương tác thành một lời nhờ vả.",
    "m125": "Nói cụ thể: bạn cần gì, vì sao tìm đến họ và hạn chót thật sự là khi nào.",
    "m126": "Để người khác có thể từ chối thoải mái: “Không sao nếu bạn không có thời gian hoặc không biết đúng người.”",
    "m127": "Tự chuẩn bị trước. Đừng đẩy cho người khác phần việc bạn hoàn toàn có thể tự làm.",
    "m128": "Cảm ơn họ, báo lại kết quả và sẵn sàng giúp lại mà không tính toán hơn thua.",
    "m129": "Lời nhờ giới thiệu",
    "m130": "“Bạn có thấy thoải mái khi giới thiệu tôi với __ không? Tôi muốn hỏi họ hai câu về __. Tôi có thể gửi một lời nhắn ngắn để bạn chuyển tiếp, và hoàn toàn hiểu nếu việc này không phù hợp.”",
    "m131": "Phép lịch sự không bảo đảm bạn sẽ có cơ hội. Nó cho thấy việc giúp bạn ít có khả năng gây khó xử, thêm việc hoặc rủi ro danh tiếng cho người khác.",
    "m132": "Sau sự kiện",
    "m133": "Lời cảm ơn, tin nhắn và việc giữ lời",
    "m134": "Cảm ơn chủ nhà trước khi về và gửi một lời nhắn ngắn sau khi nhận được sự tiếp đón hoặc giúp đỡ đáng quý.",
    "m135": "Nói cụ thể điều bạn trân trọng.",
    "m136": "Không đăng hình nhà riêng, con người, trẻ em hoặc cuộc trò chuyện khi chưa được phép.",
    "m137": "Hoàn thành điều đã hứa. Sự đáng tin được nhớ lâu hơn một lá thư cảm ơn hoàn hảo.",
    "m138": "Lời nhắn đơn giản",
    "m139": "“Cảm ơn bạn đã mời tôi tối qua. Tôi đặc biệt thích __. Bạn đã tạo cảm giác rất thân thiện, và tôi rất biết ơn vì được có mặt.”",
    "m140": "Khi có chuyện không ổn",
    "m141": "Sửa chữa tốt hơn phòng thủ",
    "m142": "Nói rõ việc đã xảy ra:",
    "m143": "“Tôi đã ngắt lời bạn.”",
    "m144": "Nhận trách nhiệm về tác động:",
    "m145": "“Việc đó khiến ý kiến của bạn bị xem nhẹ.”",
    "m146": "Xin lỗi mà không biện hộ dài dòng:",
    "m147": "“Tôi xin lỗi.”",
    "m148": "Sửa lại:",
    "m149": "“Bạn nói tiếp đi—tôi muốn nghe hết ý của bạn.”",
    "m150": "Người tự tin nhất trong giao tiếp thường là người có thể sửa sai mà không suy sụp, đổ lỗi hoặc buộc mọi người phải quay sang an ủi mình.",
    "m151": "Bài cotillion mười phút",
    "m152": "Luyện trước khi bạn thật sự cần.",
    "m153": "Đọc một lời mời mẫu và xác định mọi hướng dẫn.",
    "m154": "Luyện lời chào, tự giới thiệu và giới thiệu hai người với nhau.",
    "m155": "Bày một chỗ ngồi gồm khăn ăn, đĩa, nĩa, dao, muỗng, bánh mì và ly.",
    "m156": "Đặt một câu hỏi mở, lắng nghe, rồi mời người thứ hai cùng tham gia chủ đề.",
    "m157": "Luyện cách nhờ giúp và tạo điều kiện để người khác từ chối thoải mái.",
    "m158": "Viết một lời cảm ơn gồm ba câu.",
    "m159": "Sự thanh lịch thật sự trông như thế nào",
    "m160": "Hãy để người khác giữ được nhiều phẩm giá hơn khi bạn rời đi.",
    "m161": "Hiểu quy tắc trang trọng khi nó hữu ích. Hãy linh hoạt khi văn hóa, khả năng tiếp cận, khuyết tật, an toàn hoặc lòng tử tế đòi hỏi điều khác. Con người quan trọng hơn chiếc nĩa.",
    "m162": "Trở lại tất cả cẩm nang",
    "m163": "Nguồn tham khảo và đọc thêm",
    "m164": "Phong tục lịch sử và kỳ vọng xã hội luôn thay đổi. Các liên kết này hỗ trợ cách nhìn ở trên; chúng không phải quy luật áp dụng cho mọi nơi.",
    "m165": "Emily Post Institute · Các nguyên tắc của phép lịch sự",
    "m166": "Thư viện Quốc hội Hoa Kỳ · Khiêu vũ giao tiếp thế kỷ XIX",
    "m167": "Mount Vernon của George Washington · Các điệu nhảy thời thuộc địa Mỹ",
    "m168": "Lamont & Lareau · Vốn văn hóa",
    "m169": "Holbrook, Weiss & Habich · Phân tầng giai cấp trong thị hiếu văn hóa Mỹ",
    "m170": "Trở về đầu trang ↑"
  };

  const translatedNodes = [...document.querySelectorAll('[data-i18n]')].map((node) => [
    node,
    node.dataset.i18n,
    node.textContent
  ]);

  const applyTheme = (theme) => {
    const dark = theme === 'dark';
    const vietnamese = currentLanguage === 'vi';
    root.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('field-guide-theme', root.dataset.theme);
    themeButton?.setAttribute('aria-pressed', String(dark));
    themeButton?.setAttribute('aria-label', vietnamese ? `Chuyển sang giao diện ${dark ? 'sáng' : 'tối'}` : `Switch to ${dark ? 'light' : 'dark'} mode`);
    if (themeButton) themeButton.innerHTML = `<span aria-hidden="true">${dark ? '☀' : '☾'}</span><b>${vietnamese ? (dark ? 'Sáng' : 'Tối') : (dark ? 'Light' : 'Dark')}</b>`;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#130f11' : '#f6efe7');
  };

  const syncExpandButton = () => {
    if (!expandButton) return;
    const allOpen = lessons.length > 0 && lessons.every((lesson) => lesson.open);
    const vietnamese = currentLanguage === 'vi';
    expandButton.setAttribute('aria-pressed', String(allOpen));
    expandButton.setAttribute('aria-label', vietnamese ? `${allOpen ? 'Thu gọn' : 'Mở rộng'} tất cả các bài` : `${allOpen ? 'Collapse' : 'Expand'} all lessons`);
    expandButton.innerHTML = `<span aria-hidden="true">${allOpen ? '−' : '＋'}</span><b>${vietnamese ? (allOpen ? 'Thu gọn hết' : 'Mở rộng hết') : (allOpen ? 'Collapse all' : 'Expand all')}</b>`;
  };

  const setLanguage = (language) => {
    currentLanguage = language === 'vi' ? 'vi' : 'en';
    const vietnamese = currentLanguage === 'vi';
    translatedNodes.forEach(([node, key, english]) => {
      node.textContent = vietnamese ? (vi[key] ?? english) : english;
    });
    root.lang = currentLanguage;
    root.dataset.language = currentLanguage;
    document.title = vietnamese ? 'Phép lịch sự — Cẩm nang kỹ năng thực tế' : 'Manners — A Practical Field Guide';
    document.querySelector('meta[name="description"]')?.setAttribute('content', vietnamese
      ? 'Cẩm nang thực tế về phép lịch sự, lời mời, dùng tiệc trang trọng, sự tự tin trong giao tiếp và các dấu hiệu giai cấp ẩn trong văn hóa Mỹ.'
      : 'A practical guide to manners, invitations, formal dining, social confidence, and the class signals hidden inside American etiquette.');
    languageButton?.setAttribute('aria-label', vietnamese ? 'Chuyển sang tiếng Anh' : 'Đọc bằng tiếng Việt');
    if (languageButton) languageButton.innerHTML = `<span aria-hidden="true">${vietnamese ? 'EN' : 'VI'}</span><b>${vietnamese ? 'Tiếng Anh' : 'Tiếng Việt'}</b>`;
    brandLink?.setAttribute('aria-label', vietnamese ? 'Quay lại cẩm nang kỹ năng' : 'Back to the field guide');
    applyTheme(root.dataset.theme || savedTheme || preferredTheme);
    syncExpandButton();
  };

  applyTheme(savedTheme || preferredTheme);
  setLanguage(currentLanguage);
  languageButton?.addEventListener('click', () => {
    setLanguage(currentLanguage === 'en' ? 'vi' : 'en');
    localStorage.setItem('manners-language', currentLanguage);
  });
  themeButton?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  expandButton?.addEventListener('click', () => {
    const shouldOpen = !lessons.every((lesson) => lesson.open);
    lessons.forEach((lesson) => { lesson.open = shouldOpen; });
    syncExpandButton();
  });
  lessons.forEach((lesson) => lesson.addEventListener('toggle', syncExpandButton));

  const openLinkedLesson = () => {
    const linkedLesson = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (linkedLesson?.matches('.lesson')) linkedLesson.open = true;
  };
  openLinkedLesson();
  addEventListener('hashchange', openLinkedLesson);
})();
