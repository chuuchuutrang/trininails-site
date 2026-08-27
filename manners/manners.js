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
    "Skip to main content": "Chuyển thẳng đến nội dung chính",
    "field guide": "cẩm nang kỹ năng",
    "Social fluency · without becoming fake": "Khéo léo trong giao tiếp · mà vẫn là chính mình",
    "Good manners make other people feel": "Cách cư xử đẹp giúp người khác cảm thấy",
    "at ease.": "thoải mái.",
    "Learn the codes that help you enter a room, join a table, ask for help, build trust, and be invited back—while keeping your dignity and your own voice.": "Học những quy tắc giúp bạn bước vào một căn phòng, hòa nhập tại bàn ăn, nhờ hỗ trợ, xây dựng lòng tin và được mời trở lại—mà vẫn giữ phẩm giá và bản sắc của chính mình.",
    "The purpose": "Mục đích",
    "Etiquette is not obedience to arbitrary rules. At its best, it is": "Phép lịch sự không phải là sự phục tùng những quy tắc tùy tiện. Khi được thực hành đúng nghĩa, đó là",
    "consideration, respect, and honesty": "sự quan tâm, tôn trọng và chân thành",
    "made visible.": "được thể hiện ra bên ngoài.",
    "Say the quiet part clearly": "Nói rõ điều thường bị né tránh",
    "Manners can operate as class signals in America.": "Phép tắc có thể trở thành dấu hiệu phân tầng xã hội tại Mỹ.",
    "People often mistake familiarity with a group’s unwritten codes—speech, dress, dining, introductions, timing, and confidence—for competence or “good breeding.” Sociologists describe these learned advantages as forms of": "Mọi người thường nhầm việc quen thuộc với những quy tắc ngầm của một nhóm—cách nói, ăn mặc, dùng bữa, giới thiệu, đúng giờ và sự tự tin—với năng lực hoặc xuất thân “được giáo dưỡng.” Các nhà xã hội học gọi những lợi thế học được này là một dạng",
    "cultural capital": "vốn văn hóa",
    "That can influence who feels comfortable, who receives an introduction, and who gets invited into the next room. Knowing the code can reduce avoidable friction. It does": "Điều đó có thể ảnh hưởng đến ai cảm thấy thoải mái, ai được giới thiệu và ai được mời bước vào cơ hội tiếp theo. Hiểu quy tắc có thể giảm những trở ngại không cần thiết. Nhưng điều đó",
    "not": "không",
    "make anyone more intelligent, moral, refined, or worthy than someone who was never taught it.": "khiến bất kỳ ai thông minh, đạo đức, tinh tế hoặc xứng đáng hơn một người chưa từng được dạy những quy tắc ấy.",
    "The useful goal:": "Mục tiêu hữu ích:",
    "understand the room well enough to choose how you participate—not to worship the room or look down on anyone outside it.": "hiểu căn phòng đủ rõ để tự chọn cách mình tham gia—không phải để tôn sùng căn phòng hay coi thường người đứng ngoài nó.",
    "French cotillion · translated for modern life": "Cotillion kiểu Pháp · ứng dụng vào đời sống hiện đại",
    "Practice grace before the room gets complicated.": "Rèn sự duyên dáng trước khi tình huống trở nên phức tạp.",
    "The cotillion began as a social dance associated with eighteenth-century France and later became part of American ballroom culture. Modern American cotillion programs commonly combine social dance with introductions, dining, dress, and guest etiquette.": "Cotillion khởi đầu là một điệu nhảy giao tiếp gắn với nước Pháp thế kỷ XVIII, rồi trở thành một phần của văn hóa khiêu vũ tại Mỹ. Các chương trình cotillion hiện đại ở Mỹ thường kết hợp khiêu vũ với cách giới thiệu, dùng bữa, ăn mặc và ứng xử khi làm khách.",
    "Notice": "Quan sát",
    "Read the invitation, dress code, room, and other people’s comfort.": "Đọc kỹ lời mời, quy định trang phục, không khí căn phòng và mức độ thoải mái của người khác.",
    "Approach": "Tiếp cận",
    "Enter calmly, greet the host, introduce yourself, and include others.": "Bước vào bình tĩnh, chào chủ nhà, tự giới thiệu và chủ động kết nối người khác.",
    "Participate": "Tham gia",
    "Listen, converse, dine, dance, or observe without making yourself the entire event.": "Lắng nghe, trò chuyện, dùng bữa, khiêu vũ hoặc quan sát mà không biến mình thành trung tâm của cả sự kiện.",
    "Close": "Kết thúc",
    "Thank the host, leave at an appropriate time, and follow up afterward.": "Cảm ơn chủ nhà, ra về đúng lúc và gửi lời hỏi thăm hoặc cảm ơn sau đó.",
    "The one-minute version": "Phiên bản một phút",
    "Table Manners Crash Course": "Cẩm nang cấp tốc về phép lịch sự trên bàn ăn",
    "You do not need to perform perfection. Make the meal comfortable for everyone, follow the host’s lead, and recover from small mistakes without turning them into a scene.": "Bạn không cần thể hiện sự hoàn hảo. Hãy giúp bữa ăn thoải mái với mọi người, theo tín hiệu của chủ nhà và xử lý những lỗi nhỏ nhẹ nhàng mà không làm chúng thành chuyện lớn.",
    "Napkin first": "Khăn ăn trước tiên",
    "Once seated, unfold it onto your lap. Blot—do not scrub—your mouth.": "Sau khi ngồi, mở khăn và đặt lên đùi. Chấm nhẹ—không chà—khi lau miệng.",
    "Wait for the cue": "Chờ tín hiệu bắt đầu",
    "Begin when the host begins or invites the table to eat. At a large table, follow the host’s direction while hot food is served.": "Bắt đầu khi chủ nhà bắt đầu hoặc mời mọi người dùng bữa. Ở bàn lớn, hãy làm theo hướng dẫn của chủ nhà khi món nóng đang được phục vụ.",
    "Bread left, drink right": "Bánh mì bên trái, đồ uống bên phải",
    "Your bread plate is generally on your left. Your water and other glasses are generally on your right.": "Đĩa bánh mì thường ở bên trái. Ly nước và các loại ly khác thường ở bên phải.",
    "Work from the outside in": "Dùng từ ngoài vào trong",
    "Use the outermost appropriate utensil for the first course, then move inward. If uncertain, quietly follow the host.": "Dùng dụng cụ ngoài cùng phù hợp với món đầu tiên, rồi lần lượt tiến vào trong. Nếu chưa chắc, hãy kín đáo quan sát chủ nhà.",
    "Take small bites": "Ăn từng miếng nhỏ",
    "Chew with your mouth closed, finish before speaking, and roughly match the table’s pace.": "Nhai khép miệng, nuốt xong trước khi nói và giữ nhịp ăn gần với mọi người trên bàn.",
    "Pass; do not reach": "Chuyền giúp; đừng với tay",
    "Ask for distant items, pass shared dishes in the direction already moving, and pass salt and pepper together.": "Nhờ người khác chuyền món ở xa, tiếp tục chuyền theo hướng đang có và luôn chuyền muối cùng tiêu.",
    "Keep the table clear": "Giữ bàn ăn gọn gàng",
    "Put your phone away. If you must leave, say “Excuse me” without announcing private details.": "Cất điện thoại. Nếu cần rời bàn, chỉ cần nói “Xin phép” mà không cần thông báo chuyện riêng tư.",
    "Close gracefully": "Kết thúc lịch thiệp",
    "Place utensils together on the plate when finished. Leave the napkin loosely beside the plate—not folded as if unused.": "Khi ăn xong, đặt các dụng cụ cạnh nhau trên đĩa. Để khăn ăn nhẹ nhàng bên cạnh đĩa—không gấp lại như chưa dùng.",
    "When in doubt:": "Khi chưa chắc:",
    "pause, observe, ask quietly, and prioritize consideration over technical perfection.": "hãy dừng lại, quan sát, hỏi nhỏ và ưu tiên sự quan tâm đến người khác hơn việc đúng kỹ thuật tuyệt đối.",
    "Open the fuller formal-dining lesson ↓": "Mở bài đầy đủ về tiệc trang trọng ↓",
    "The rules beneath the rules": "Nguyên tắc đằng sau các quy tắc",
    "Three principles travel better than a hundred memorized customs.": "Ba nguyên tắc có ích hơn một trăm phép tắc học thuộc lòng.",
    "Consideration": "Sự quan tâm",
    "Notice how your choices affect the people around you. Make participation easier, not heavier.": "Để ý cách lựa chọn của bạn ảnh hưởng đến người xung quanh. Hãy làm cho việc tham gia trở nên dễ dàng hơn, không nặng nề hơn.",
    "Respect": "Sự tôn trọng",
    "Honor time, boundaries, names, homes, cultures, service workers, and the word “no.” Include self-respect too.": "Tôn trọng thời gian, ranh giới, tên gọi, nhà cửa, văn hóa, người làm dịch vụ và từ “không.” Đồng thời hãy tôn trọng chính mình.",
    "Honesty": "Sự chân thành",
    "Be sincere and tactful. Politeness without truth becomes performance; truth without care becomes cruelty.": "Hãy chân thành và khéo léo. Lịch sự thiếu sự thật sẽ thành diễn xuất; sự thật thiếu quan tâm sẽ thành tàn nhẫn.",
    "The practical playbook": "Cẩm nang thực hành",
    "Eight situations worth rehearsing.": "Tám tình huống đáng để luyện trước.",
    "Tap a lesson to open the details": "Chạm vào một bài để mở chi tiết",
    "Before the event": "Trước sự kiện",
    "Invitations, RSVPs, and dress codes": "Lời mời, xác nhận tham dự và quy định trang phục",
    "Reply by the deadline—even when your answer is no.": "Trả lời trước hạn—kể cả khi câu trả lời là không tham dự.",
    "Do not bring an uninvited guest, child, or pet. Ask privately if the invitation is unclear.": "Không dẫn theo khách, trẻ em hoặc thú cưng khi chưa được mời. Hãy hỏi riêng nếu lời mời chưa rõ.",
    "Honor the stated dress code. When uncertain, ask the host or choose the slightly more polished option.": "Tôn trọng quy định trang phục. Khi chưa chắc, hãy hỏi chủ nhà hoặc chọn phương án chỉn chu hơn một chút.",
    "Tell the host about serious dietary or accessibility needs early; do not demand a redesigned event at the door.": "Báo sớm cho chủ nhà về nhu cầu ăn uống hoặc hỗ trợ tiếp cận quan trọng; đừng yêu cầu thay đổi toàn bộ sự kiện ngay tại cửa.",
    "If plans change, notify the host immediately. A sincere cancellation is better than disappearing.": "Nếu kế hoạch thay đổi, báo ngay cho chủ nhà. Một lời hủy chân thành tốt hơn việc im lặng biến mất.",
    "Why it matters:": "Vì sao quan trọng:",
    "a prompt answer helps someone plan space, food, seating, cost, and emotional energy.": "một câu trả lời đúng lúc giúp người khác sắp xếp không gian, đồ ăn, chỗ ngồi, chi phí và cả tâm sức.",
    "Entering the room": "Khi bước vào phòng",
    "Arrivals and introductions": "Đến nơi và giới thiệu",
    "Arrive within the expected window. A dinner invitation is not the same as an open house.": "Đến trong khoảng thời gian được mong đợi. Lời mời ăn tối không giống một buổi mở cửa tự do.",
    "Greet the host before disappearing into the room.": "Chào chủ nhà trước khi hòa vào căn phòng.",
    "Use the name a person gives you. If you forget, ask again without drama.": "Dùng tên mà người đó giới thiệu. Nếu quên, cứ hỏi lại một cách bình thường.",
    "Offer one sentence of context: “Maya, this is Daniel—we worked together at the library.”": "Thêm một câu ngắn tạo bối cảnh: “Maya, đây là Daniel—chúng tôi từng làm cùng nhau ở thư viện.”",
    "Look for the person standing alone. Inclusion is one of the most elegant things you can do.": "Hãy để ý người đang đứng một mình. Chủ động giúp ai đó hòa nhập là một trong những hành động tinh tế nhất.",
    "Useful line": "Câu gợi ý",
    "“I don’t think we’ve met. I’m ____. How do you know the host?”": "“Hình như chúng ta chưa gặp nhau. Tôi là ____. Bạn quen chủ nhà như thế nào?”",
    "Conversation": "Trò chuyện",
    "Be interested, not merely impressive": "Hãy thật sự quan tâm, đừng chỉ cố gây ấn tượng",
    "Do": "Nên làm",
    "Ask open questions and listen to the answer.": "Đặt câu hỏi mở và lắng nghe câu trả lời.",
    "Share the conversational floor.": "Chia sẻ cơ hội nói chuyện với mọi người.",
    "Introduce a quieter person’s expertise.": "Giới thiệu chuyên môn của người ít nói hơn.",
    "Change subjects when someone looks trapped.": "Đổi chủ đề khi ai đó có vẻ không thoải mái.",
    "Avoid": "Nên tránh",
    "Interrogating income, bodies, fertility, immigration status, or relationships.": "Tra hỏi về thu nhập, cơ thể, sinh sản, tình trạng nhập cư hoặc các mối quan hệ.",
    "Correcting harmless details to display knowledge.": "Sửa những chi tiết vô hại chỉ để thể hiện hiểu biết.",
    "Gossip that requires someone else’s humiliation.": "Buôn chuyện dựa trên việc làm nhục người khác.",
    "Networking as if every person is a transaction.": "Kết nối như thể mỗi con người chỉ là một giao dịch.",
    "Graceful exit": "Rời cuộc trò chuyện khéo léo",
    "“I’m glad we met. I’m going to say hello to the host before I leave—enjoy the evening.”": "“Rất vui được gặp bạn. Tôi sẽ qua chào chủ nhà trước khi về—chúc bạn một buổi tối vui vẻ.”",
    "At the table": "Tại bàn ăn",
    "Formal dining without panic": "Dùng tiệc trang trọng mà không hoảng",
    "Wait": "Chờ",
    "Follow the host’s cue before beginning. Place the napkin on your lap.": "Chờ tín hiệu của chủ nhà trước khi bắt đầu. Đặt khăn ăn lên đùi.",
    "Work inward": "Dùng dần vào trong",
    "When several utensils are set, begin with the outermost appropriate piece.": "Khi có nhiều dụng cụ, bắt đầu với món ngoài cùng phù hợp.",
    "Your bread plate is generally on the left; your glasses are on the right.": "Đĩa bánh mì thường ở bên trái; các ly ở bên phải.",
    "Pass together": "Chuyền cùng nhau",
    "When salt and pepper are paired, pass both. Pass shared items rather than reaching across people.": "Khi muối và tiêu đi thành cặp, hãy chuyền cả hai. Chuyền đồ dùng chung thay vì với tay qua người khác.",
    "Pause quietly": "Tạm dừng kín đáo",
    "Take small bites, chew with your mouth closed, and keep the phone away from the table.": "Ăn miếng nhỏ, nhai khép miệng và cất điện thoại khỏi bàn.",
    "Handle mistakes lightly": "Xử lý lỗi nhẹ nhàng",
    "A dropped fork is a request for a replacement—not a public emergency.": "Làm rơi nĩa chỉ có nghĩa là cần xin chiếc khác—không phải một tình huống khẩn cấp.",
    "Customs differ by country, household, religion, and occasion. Watch the host, ask when necessary, and prioritize other people’s comfort over proving technical correctness.": "Phong tục khác nhau theo quốc gia, gia đình, tôn giáo và dịp lễ. Hãy quan sát chủ nhà, hỏi khi cần và ưu tiên sự thoải mái của người khác hơn việc chứng minh mình đúng kỹ thuật.",
    "As a guest or host": "Khi làm khách hoặc chủ nhà",
    "Contribute without taking over": "Đóng góp mà không lấn át",
    "A thoughtful guest": "Một vị khách tinh tế",
    "Brings what was agreed upon.": "Mang đúng những gì đã thống nhất.",
    "Offers useful help once, then accepts the answer.": "Đề nghị giúp một lần theo cách hữu ích, rồi tôn trọng câu trả lời.",
    "Treats the home and staff carefully.": "Trân trọng ngôi nhà và đối xử tử tế với nhân viên.",
    "Leaves before the host must end the night by force.": "Ra về trước khi chủ nhà buộc phải kết thúc buổi tối.",
    "A thoughtful host": "Một chủ nhà tinh tế",
    "Provides clear timing, address, dress, and accessibility information.": "Cung cấp rõ thời gian, địa chỉ, trang phục và thông tin hỗ trợ tiếp cận.",
    "Introduces people and protects excluded guests.": "Giới thiệu mọi người và quan tâm đến khách đang bị đứng ngoài.",
    "Offers nonalcoholic choices without commentary.": "Cung cấp lựa chọn không cồn mà không bình phẩm.",
    "Never shames a guest for a harmless mistake.": "Không làm khách xấu hổ vì một lỗi vô hại.",
    "Help and connections": "Nhờ giúp đỡ và kết nối",
    "Ask in a way that makes “yes” easier": "Nhờ theo cách khiến câu trả lời “đồng ý” dễ dàng hơn",
    "Build a relationship before making every interaction a request.": "Xây dựng mối quan hệ thay vì biến mọi tương tác thành một lời nhờ vả.",
    "Ask specifically: what you need, why you chose them, and the real deadline.": "Nói cụ thể: bạn cần gì, vì sao tìm đến họ và hạn chót thật sự là khi nào.",
    "Make refusal safe: “No pressure if you don’t have the time or the right contact.”": "Để người khác có thể từ chối thoải mái: “Không sao nếu bạn không có thời gian hoặc không biết đúng người.”",
    "Do your homework first. Never outsource effort you can reasonably do yourself.": "Tự chuẩn bị trước. Đừng đẩy cho người khác phần việc bạn hoàn toàn có thể tự làm.",
    "Thank the person, report what happened, and offer help in return without keeping score.": "Cảm ơn họ, báo lại kết quả và sẵn sàng giúp lại mà không tính toán hơn thua.",
    "Introduction request": "Lời nhờ giới thiệu",
    "“Would you feel comfortable introducing me to __? I’m hoping to ask them two questions about __. I can send a short note you may forward, and I completely understand if it isn’t a fit.”": "“Bạn có thấy thoải mái khi giới thiệu tôi với __ không? Tôi muốn hỏi họ hai câu về __. Tôi có thể gửi một lời nhắn ngắn để bạn chuyển tiếp, và hoàn toàn hiểu nếu việc này không phù hợp.”",
    "Manners do not guarantee access. They signal that helping you is less likely to create embarrassment, extra labor, or reputational risk.": "Phép lịch sự không bảo đảm bạn sẽ có cơ hội. Nó cho thấy việc giúp bạn ít có khả năng gây khó xử, thêm việc hoặc rủi ro danh tiếng cho người khác.",
    "Afterward": "Sau sự kiện",
    "Thanks, messages, and follow-through": "Lời cảm ơn, tin nhắn và việc giữ lời",
    "Thank the host before leaving and send a brief follow-up after meaningful hospitality or help.": "Cảm ơn chủ nhà trước khi về và gửi một lời nhắn ngắn sau khi nhận được sự tiếp đón hoặc giúp đỡ đáng quý.",
    "Name the specific thing you appreciated.": "Nói cụ thể điều bạn trân trọng.",
    "Do not post private homes, people, children, or conversations without permission.": "Không đăng hình nhà riêng, con người, trẻ em hoặc cuộc trò chuyện khi chưa được phép.",
    "Complete what you promised. Reliability is remembered longer than a perfect thank-you note.": "Hoàn thành điều đã hứa. Sự đáng tin được nhớ lâu hơn một lá thư cảm ơn hoàn hảo.",
    "Simple note": "Lời nhắn đơn giản",
    "“Thank you for including me last night. I especially enjoyed __. You made the room feel welcoming, and I’m grateful I could be there.”": "“Cảm ơn bạn đã mời tôi tối qua. Tôi đặc biệt thích __. Bạn đã tạo cảm giác rất thân thiện, và tôi rất biết ơn vì được có mặt.”",
    "When it goes wrong": "Khi có chuyện không ổn",
    "Repair beats defensiveness": "Sửa chữa tốt hơn phòng thủ",
    "Name it:": "Nói rõ việc đã xảy ra:",
    "“I interrupted you.”": "“Tôi đã ngắt lời bạn.”",
    "Own the effect:": "Nhận trách nhiệm về tác động:",
    "“That was dismissive.”": "“Việc đó khiến ý kiến của bạn bị xem nhẹ.”",
    "Apologize without a courtroom speech:": "Xin lỗi mà không biện hộ dài dòng:",
    "“I’m sorry.”": "“Tôi xin lỗi.”",
    "Correct it:": "Sửa lại:",
    "“Please finish—I want to hear your point.”": "“Bạn nói tiếp đi—tôi muốn nghe hết ý của bạn.”",
    "The most socially confident person is often the one who can recover from a mistake without collapsing, blaming, or making everyone comfort them.": "Người tự tin nhất trong giao tiếp thường là người có thể sửa sai mà không suy sụp, đổ lỗi hoặc buộc mọi người phải quay sang an ủi mình.",
    "A ten-minute cotillion": "Bài cotillion mười phút",
    "Rehearse before you need it.": "Luyện trước khi bạn thật sự cần.",
    "Read a sample invitation and identify every instruction.": "Đọc một lời mời mẫu và xác định mọi hướng dẫn.",
    "Practice a greeting, self-introduction, and two-person introduction.": "Luyện lời chào, tự giới thiệu và giới thiệu hai người với nhau.",
    "Set one place: napkin, plate, fork, knife, spoon, bread, and glass.": "Bày một chỗ ngồi gồm khăn ăn, đĩa, nĩa, dao, muỗng, bánh mì và ly.",
    "Ask one open question, listen, then introduce a second person into the topic.": "Đặt một câu hỏi mở, lắng nghe, rồi mời người thứ hai cùng tham gia chủ đề.",
    "Practice asking for help and making refusal safe.": "Luyện cách nhờ giúp và tạo điều kiện để người khác từ chối thoải mái.",
    "Write a three-sentence thank-you message.": "Viết một lời cảm ơn gồm ba câu.",
    "What elegance actually looks like": "Sự thanh lịch thật sự trông như thế nào",
    "Leave people with more dignity than you found them.": "Hãy để người khác giữ được nhiều phẩm giá hơn khi bạn rời đi.",
    "Know the formal code when it helps. Adapt when culture, access, disability, safety, or kindness asks for something different. The person matters more than the fork.": "Hiểu quy tắc trang trọng khi nó hữu ích. Hãy linh hoạt khi văn hóa, khả năng tiếp cận, khuyết tật, an toàn hoặc lòng tử tế đòi hỏi điều khác. Con người quan trọng hơn chiếc nĩa.",
    "Return to all field guides": "Trở lại tất cả cẩm nang",
    "Sources & further reading": "Nguồn tham khảo và đọc thêm",
    "Historical customs and social expectations change. These links support the framing above; they are not universal laws.": "Phong tục lịch sử và kỳ vọng xã hội luôn thay đổi. Các liên kết này hỗ trợ cách nhìn ở trên; chúng không phải quy luật áp dụng cho mọi nơi.",
    "Emily Post Institute · The principles of etiquette": "Emily Post Institute · Các nguyên tắc của phép lịch sự",
    "Library of Congress · Nineteenth-century social dance": "Thư viện Quốc hội Hoa Kỳ · Khiêu vũ giao tiếp thế kỷ XIX",
    "George Washington’s Mount Vernon · Dances of Colonial America": "Mount Vernon của George Washington · Các điệu nhảy thời thuộc địa Mỹ",
    "Lamont & Lareau · Cultural capital": "Lamont & Lareau · Vốn văn hóa",
    "Holbrook, Weiss & Habich · Class distinctions in American cultural tastes": "Holbrook, Weiss & Habich · Phân tầng giai cấp trong thị hiếu văn hóa Mỹ",
    "Back to top ↑": "Trở về đầu trang ↑"
  };

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement.closest('[data-language-toggle], [data-theme-toggle], [data-expand-all]') || !node.nodeValue.trim()
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
