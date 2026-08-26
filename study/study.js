(() => {
  const root = document.documentElement;
  const languageButton = document.querySelector('[data-language-toggle]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const expandButton = document.querySelector('[data-expand-all]');
  const brandLink = document.querySelector('.brand');
  const videoFrame = document.querySelector('.video-frame iframe');
  const topics = [...document.querySelectorAll('.topic')];
  const savedTheme = localStorage.getItem('study-theme');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let currentLanguage = requestedLanguage === 'vi' || (requestedLanguage !== 'en' && localStorage.getItem('study-language') === 'vi') ? 'vi' : 'en';

  const vi = {
    'Skip to main content': 'Chuyển đến nội dung chính',
    'A practical field guide · 21 study ideas + 6 reminders + 4 core habits': 'Cẩm nang thực hành · 21 phương pháp học + 6 lời nhắc + 4 thói quen cốt lõi',
    'Study': 'Học',
    'smarter.': 'hiệu quả hơn.',
    'A personal guide from Bitchley on how to study like a lazy person—less busywork, better memory, and proof you actually learned it.': 'Cẩm nang cá nhân của Bitchley về cách học theo kiểu “lười mà hiệu quả” — bớt những việc tốn công vô ích, nhớ lâu hơn và có cách kiểm chứng rằng bạn đã thực sự nắm bài.',
    'The main rule': 'Nguyên tắc quan trọng nhất',
    'Do not measure studying by how many hours you spend. Measure it by what you can': 'Đừng đo hiệu quả học tập bằng số giờ đã bỏ ra. Hãy đo bằng việc bạn có thể',
    'explain, recall, or solve': 'giải thích, tự nhớ lại hoặc giải bài',
    'without looking at your materials.': 'mà không cần xem tài liệu.',
    'Begin here': 'Bắt đầu từ đây',
    'Four habits that do the heavy lifting.': 'Bốn thói quen mang lại phần lớn hiệu quả.',
    'Check what the class actually requires.': 'Xác định đúng những gì môn học yêu cầu.',
    'Find reliable study materials before starting from zero.': 'Tìm tài liệu học đáng tin cậy thay vì tự làm lại mọi thứ từ đầu.',
    'Read selectively: scan, search, and skip noise.': 'Đọc có chọn lọc: xem lướt, tìm kiếm và bỏ qua phần rườm rà.',
    'Close your materials and retrieve from memory.': 'Gấp tài liệu lại và tự tái hiện kiến thức từ trí nhớ.',
    'Ready-to-use plans': 'Kế hoạch áp dụng ngay',
    'When you need a little structure.': 'Khi bạn cần một lộ trình rõ ràng hơn.',
    'Daily': 'Hằng ngày',
    'Simple routine': 'Lịch học đơn giản',
    'After class:': 'Sau buổi học:',
    'Expand notes, write 3–5 questions, mark one confusing point, and update your cheat sheet.': 'Hoàn thiện ghi chú, viết 3–5 câu hỏi, đánh dấu một điểm còn mơ hồ và cập nhật tờ tổng hợp kiến thức.',
    'Evening:': 'Buổi tối:',
    'Do one focused block, retrieve, correct, and briefly review older material.': 'Dành một phiên học tập trung; tự gợi nhớ, sửa sai và ôn nhanh kiến thức cũ.',
    'Weekly:': 'Hằng tuần:',
    'Take a cumulative quiz, mix chapters, update your error log, and schedule reviews.': 'Làm một bài tự kiểm tra tổng hợp, xen kẽ nội dung từ nhiều chương, cập nhật nhật ký lỗi và lên lịch ôn lại.',
    '10 minutes': '10 phút',
    'Textbook sprint': 'Phiên đọc giáo trình cấp tốc',
    'Preview headings, terms, diagrams, objectives, summary.': 'Xem trước đề mục, thuật ngữ, sơ đồ, mục tiêu và phần tóm tắt.',
    'Identify the questions you need answered.': 'Xác định những câu hỏi cần tìm lời giải.',
    'Search, scan, or skim for answers.': 'Tìm kiếm, đọc quét hoặc đọc lướt để tìm câu trả lời.',
    'Close the book and summarize from memory.': 'Đóng sách lại và tự tóm tắt từ trí nhớ.',
    '30 minutes': '30 phút',
    'Emergency session': 'Phiên học nước rút',
    'Choose the most important target.': 'Chọn mục tiêu quan trọng nhất.',
    'Review the core concept.': 'Ôn nhanh khái niệm cốt lõi.',
    'Retrieve or solve from memory.': 'Tự nhớ lại kiến thức hoặc giải bài mà không xem tài liệu.',
    'Check and correct errors.': 'Đối chiếu và sửa lỗi.',
    'Summarize and schedule the next review.': 'Tóm tắt nội dung vừa học và lên lịch cho lần ôn tiếp theo.',
    'The complete field guide': 'Toàn bộ cẩm nang',
    '21 ways to learn more with less wasted effort.': '21 cách học hiệu quả hơn mà không tốn công vô ích.',
    'Open only what you need right now. Each topic gives you a practical technique, a reason to use it, and a way to tell whether it worked.': 'Chỉ mở đúng phần bạn cần lúc này. Mỗi chủ đề nêu một kỹ thuật thực tế, lý do nên dùng và cách tự kiểm tra xem kỹ thuật đó có hiệu quả hay không.',
    'Tap a topic to open the details': 'Chạm vào một chủ đề để xem chi tiết',
    'Set direction': 'Xác định trọng tâm',
    'Start with what the class requires': 'Bắt đầu từ đúng yêu cầu của môn học',
    'Check the syllabus, slides, notes, learning objectives, study guides, homework, previous quizzes, and topics your instructor repeats. Not every textbook sentence deserves equal attention.': 'Xem đề cương môn học, slide bài giảng, ghi chú, mục tiêu học tập, đề cương ôn tập, bài tập, các bài kiểm tra trước đây và những nội dung giảng viên thường xuyên nhấn mạnh. Không phải câu nào trong giáo trình cũng đáng được chú ý như nhau.',
    'Choose a concrete target': 'Đặt một mục tiêu cụ thể',
    'Explain cellular respiration without notes.': 'Giải thích quá trình hô hấp tế bào mà không xem ghi chú.',
    'Solve five derivative problems.': 'Giải năm bài tập đạo hàm.',
    'Memorize twenty vocabulary terms.': 'Học thuộc hai mươi thuật ngữ.',
    'Outline a possible essay response.': 'Lập dàn ý cho một phương án trả lời câu tự luận.',
    'Replace “study Chapter 5” with something you can prove you completed.': 'Thay mục tiêu mơ hồ “học Chương 5” bằng một nhiệm vụ cụ thể mà bạn có thể chứng minh là đã hoàn thành.',
    'Save time': 'Tiết kiệm thời gian',
    'Look for existing cheat sheets first': 'Ưu tiên tìm bản tóm tắt có sẵn',
    'Search course sites, shared folders, Quizlet, student platforms, department pages, public notes, publisher resources, and tutoring centers. Existing guides reveal major topics, simpler explanations, examples, and gaps.': 'Tìm trên trang web của môn học, thư mục chia sẻ, Quizlet, nền tảng dành cho sinh viên, trang của khoa, ghi chú công khai, tài nguyên từ nhà xuất bản và trung tâm hỗ trợ học tập. Những tài liệu có sẵn giúp bạn nhận diện trọng tâm, tìm cách giải thích dễ hiểu hơn, xem ví dụ và phát hiện phần kiến thức còn thiếu.',
    'My personal favorite is Google Images.': 'Cá nhân tôi thích dùng Google Hình ảnh nhất.',
    'Search the subject plus “cheat sheet,” “study guide,” or “one-page summary.” Image results make it fast to scan many layouts, comparison charts, diagrams, and visual summaries before choosing the most useful sources. Start with the exact class name or course number. If that is unfruitful, search the': 'Tìm tên môn học kèm các cụm “cheat sheet”, “study guide” hoặc “one-page summary”. Kết quả hình ảnh cho phép bạn nhanh chóng lướt qua nhiều bố cục, bảng so sánh, sơ đồ và bản tóm tắt trực quan trước khi chọn nguồn hữu ích nhất. Hãy bắt đầu bằng đúng tên lớp hoặc mã môn học. Nếu chưa có kết quả phù hợp, hãy thử tìm theo',
    'textbook title': 'tên giáo trình',
    ', chapter name, or broader': ', tên chương hoặc',
    'course name': 'tên môn học ở phạm vi rộng hơn',
    'instead—for example, switch from “BIO 121 Professor Smith” to “Campbell Biology Chapter 10” or “introductory biology cellular respiration cheat sheet.”': '—chẳng hạn, chuyển từ “BIO 121 Professor Smith” sang “Campbell Biology Chapter 10” hoặc “introductory biology cellular respiration cheat sheet”.',
    'Verify everything against your professor’s slides, syllabus, assigned readings, homework, and your own notes. Rewrite useful information in your own words.': 'Đối chiếu mọi thông tin với slide của giảng viên, đề cương môn học, bài đọc được giao, bài tập và ghi chú của chính bạn. Viết lại nội dung hữu ích bằng lời của mình.',
    'Use a cheat sheet in an exam only when it is explicitly allowed. Never use leaked exams or submit someone else’s work.': 'Chỉ mang tờ ghi chú tổng hợp vào phòng thi khi quy định cho phép rõ ràng. Tuyệt đối không sử dụng đề thi bị rò rỉ hoặc nộp bài của người khác.',
    'Read strategically': 'Đọc có chiến lược',
    'How to read a textbook—or not': 'Khi nào nên đọc giáo trình — và khi nào không cần',
    'Your goal is to locate, understand, and remember what matters—not automatically read every page.': 'Mục tiêu là tìm đúng thông tin, hiểu và ghi nhớ nội dung quan trọng — chứ không phải mặc định đọc hết từng trang.',
    'Use the textbook when': 'Dùng giáo trình khi',
    'Lecture is unclear or you need another example.': 'Bài giảng chưa rõ hoặc bạn cần thêm một ví dụ.',
    'A section is assigned or homework cites it.': 'Bạn được yêu cầu đọc phần đó, hoặc bài tập có nhắc đến nó.',
    'You need a definition, formula, or detailed process.': 'Bạn cần tra định nghĩa, công thức hoặc một quy trình chi tiết.',
    'It contains material not covered in class.': 'Giáo trình có nội dung chưa được trình bày trên lớp.',
    'Use it as a reference when': 'Chỉ dùng để tra cứu khi',
    'Slides already explain the topic clearly.': 'Slide bài giảng đã giải thích rõ chủ đề.',
    'The chapter repeats material you understand.': 'Chương sách lặp lại kiến thức bạn đã nắm.',
    'You only need to clarify specific points.': 'Bạn chỉ cần làm rõ một vài điểm cụ thể.',
    'A guide identifies the exact concepts needed.': 'Đề cương ôn tập đã chỉ rõ những khái niệm cần nắm.',
    'Preview first': 'Xem trước',
    'Scan before you read': 'Khảo sát trước khi đọc kỹ',
    'Preview objectives, headings, bold terms, definitions, diagrams, charts, captions, formulas, worked examples, summaries, and review questions.': 'Xem trước mục tiêu, đề mục, thuật ngữ in đậm, định nghĩa, sơ đồ, biểu đồ, chú thích, công thức, bài mẫu có lời giải, phần tóm tắt và câu hỏi ôn tập.',
    'For each bold term, ask': 'Với mỗi thuật ngữ in đậm, hãy tự hỏi',
    'What does it mean and why is it important?': 'Thuật ngữ này có nghĩa gì và vì sao nó quan trọng?',
    'How does it connect to the chapter?': 'Nó liên hệ với nội dung của chương ra sao?',
    'Could I explain it without reading the definition?': 'Mình có thể tự giải thích mà không đọc lại định nghĩa không?',
    'Give reading a purpose': 'Đọc có mục đích',
    'Turn headings into questions': 'Biến đề mục thành câu hỏi',
    'Turn “The Stages of Mitosis” into “What are the stages, and what happens in each?” Turn “Causes of Inflation” into “What causes inflation, and how do the causes differ?”': 'Biến đề mục “Các giai đoạn của nguyên phân” thành câu hỏi: “Nguyên phân gồm những giai đoạn nào và điều gì xảy ra ở từng giai đoạn?” Tương tự, biến “Nguyên nhân gây lạm phát” thành: “Những yếu tố nào gây lạm phát và chúng khác nhau ra sao?”',
    'Read only far enough to answer. Then close the book and answer in your own words.': 'Chỉ đọc đến khi đủ thông tin để trả lời. Sau đó đóng sách và diễn đạt câu trả lời bằng lời của mình.',
    'Protect attention': 'Giữ sự tập trung',
    'Skip the noise': 'Bỏ qua phần rườm rà',
    'Move quickly through': 'Đọc nhanh những phần sau',
    'Repeated explanations and long introductions.': 'Các đoạn giải thích lặp lại và phần mở đầu dài.',
    'Background, sidebars, and examples you understand.': 'Thông tin nền, ô nội dung bên lề và những ví dụ bạn đã hiểu.',
    'Material unrelated to learning objectives.': 'Nội dung không phục vụ mục tiêu học tập.',
    'Slow down for': 'Đọc chậm những phần sau',
    'Definitions, formulas, diagrams, and comparisons.': 'Định nghĩa, công thức, sơ đồ và nội dung so sánh.',
    'Multi-step processes and worked problems.': 'Quy trình nhiều bước và bài mẫu có lời giải.',
    'Emphasized ideas you cannot explain yourself.': 'Những ý được nhấn mạnh mà bạn chưa thể tự giải thích.',
    'Skipping noise means spending attention where it has the highest value—not avoiding difficult material.': 'Bỏ qua phần rườm rà nghĩa là dành sự chú ý cho những nội dung có giá trị nhất — không phải né tránh nội dung khó.',
    'Find the signal': 'Tìm đúng thông tin',
    'Use search on digital material': 'Dùng chức năng tìm kiếm trong tài liệu số',
    'Use': 'Nhấn',
    'on Windows or': 'trên Windows hoặc',
    'on Mac. Search lecture terms, study-guide words, assignment keywords, names, theories, formulas, dates, objectives, and homework questions.': 'trên Mac. Hãy tìm các thuật ngữ trong bài giảng, từ khóa trong đề cương ôn tập, từ khóa của bài tập, tên riêng, lý thuyết, công thức, ngày tháng, mục tiêu học tập và câu hỏi bài tập.',
    'Try alternate wording, and read around each match for context.': 'Thử các cách diễn đạt tương đương và đọc vài dòng trước sau mỗi kết quả để nắm ngữ cảnh.',
    'A complete study loop': 'Một chu trình học hoàn chỉnh',
    'Use short, focused study blocks': 'Học theo các phiên ngắn, tập trung',
    '25–30 min': '25–30 phút',
    'Focus': 'Tập trung',
    'Put your phone away, close unrelated tabs, prepare materials, and choose one clear target.': 'Cất điện thoại, đóng các tab không liên quan, chuẩn bị sẵn tài liệu và chọn một mục tiêu duy nhất, rõ ràng.',
    '5 min': '5 phút',
    'Retrieve': 'Tự gợi nhớ',
    'Close everything. Write, explain, draw, solve, outline, or code from memory.': 'Đóng tất cả tài liệu. Từ trí nhớ, hãy viết, giải thích, vẽ, giải bài, lập dàn ý hoặc viết mã.',
    'Check': 'Kiểm tra',
    'Correct': 'Sửa sai',
    'Label your work correct, incomplete, incorrect, or blank. Study the gaps.': 'Phân loại bài làm: đúng, chưa đầy đủ, sai hoặc bỏ trống. Sau đó học lại đúng phần còn hổng.',
    'Reset': 'Nghỉ ngắn',
    'Stand, stretch, walk, drink water, and rest your eyes. Take a longer break after two or three rounds.': 'Đứng dậy, giãn cơ, đi lại, uống nước và cho mắt nghỉ. Sau hai hoặc ba vòng, hãy nghỉ lâu hơn.',
    'Make memory work': 'Kích hoạt trí nhớ',
    'Active recall': 'Gợi nhớ chủ động',
    'Retrieve before looking at the answer. Use practice tests, flashcards, brain dumps, blank-page summaries, problems, teach-backs, diagrams, and outlines.': 'Hãy tự gợi nhớ trước khi xem đáp án. Dùng bài kiểm tra thử, thẻ ghi nhớ, viết ra toàn bộ những gì còn nhớ, tóm tắt trên trang giấy trắng, bài tập, tự giảng lại, sơ đồ và dàn ý.',
    'Strong flashcards:': 'Cách dùng thẻ ghi nhớ hiệu quả:',
    'give the full answer and explain it before flipping. The struggle to retrieve is part of learning.': 'hãy trả lời đầy đủ và tự giải thích trước khi lật thẻ. Chính nỗ lực gợi nhớ là một phần của quá trình học.',
    'Remember longer': 'Ghi nhớ lâu hơn',
    'Spaced practice': 'Ôn tập cách quãng',
    'Day 0': 'Ngày 0',
    'Learn': 'Học',
    'Day 1': 'Ngày 1',
    'Day 3': 'Ngày 3',
    'Review gaps': 'Ôn lại chỗ hổng',
    'Day 7': 'Ngày 7',
    'Day 14': 'Ngày 14',
    'Test again': 'Kiểm tra lại',
    'Review weak material more often and strong material less often. Start before the night prior to the exam.': 'Ôn phần còn yếu thường xuyên hơn và phần đã vững ít thường xuyên hơn. Đừng đợi đến đêm trước kỳ thi mới bắt đầu.',
    'Choose the method': 'Chọn đúng phương pháp',
    'Interleaving': 'Luyện tập xen kẽ',
    'Mix related topics or problem types instead of doing one large block of identical questions. Try addition → multiplication → subtraction → division, rather than finishing every addition problem first.': 'Xen kẽ các chủ đề hoặc dạng bài có liên quan thay vì làm một loạt dài các câu giống hệt nhau. Ví dụ: cộng → nhân → trừ → chia, thay vì làm hết tất cả bài cộng rồi mới chuyển dạng.',
    'It feels harder because you must decide which method applies—and that makes the practice more useful.': 'Cách này có vẻ khó hơn vì bạn phải tự xác định phương pháp phù hợp — và chính quyết định đó làm cho việc luyện tập hiệu quả hơn.',
    'Expose the gaps': 'Nhận diện chỗ hổng',
    'Teach-back method': 'Phương pháp giảng lại',
    'Explain the material to a total beginner. Answer: What is it? How does it work? Why does it matter? What is an example? What is it confused with?': 'Hãy giải thích cho một người hoàn toàn chưa biết gì về chủ đề. Trả lời: Nội dung này là gì? Hoạt động như thế nào? Vì sao quan trọng? Ví dụ cụ thể là gì? Dễ bị nhầm với khái niệm nào?',
    'Where your explanation gets fuzzy, return to the source only long enough to fill the gap. Then explain it again without looking.': 'Chỗ nào bạn giải thích còn mơ hồ, chỉ quay lại tài liệu vừa đủ để lấp chỗ hổng đó. Sau đó đóng tài liệu và giải thích lại.',
    'A reading framework': 'Khung đọc hiểu',
    'SQ3R for textbook chapters': 'Phương pháp SQ3R cho các chương giáo trình',
    'Survey': 'Khảo sát',
    'Preview headings, objectives, terms, diagrams, summaries, and questions.': 'Xem trước đề mục, mục tiêu, thuật ngữ, sơ đồ, phần tóm tắt và câu hỏi.',
    'Question': 'Đặt câu hỏi',
    'Turn headings into questions.': 'Biến đề mục thành câu hỏi.',
    'Read': 'Đọc',
    'Read to find the answers.': 'Đọc để tìm câu trả lời.',
    'Recite': 'Trình bày lại',
    'Close the book and answer from memory.': 'Đóng sách và trả lời từ trí nhớ.',
    'Review': 'Ôn tập',
    'Return later with spaced practice.': 'Quay lại ôn theo lịch cách quãng.',
    'The most important step is recitation. Reading without retrieval is usually not enough.': 'Bước quan trọng nhất là tự trình bày lại. Chỉ đọc mà không tự gợi nhớ thường chưa đủ.',
    'Build connections': 'Kết nối kiến thức',
    'Elaboration and examples': 'Đào sâu bằng câu hỏi và ví dụ',
    'Ask why it happens, how A differs from B, what changes under a new condition, when you would use it, how it connects to earlier material, and what mistake someone might make.': 'Hãy hỏi: Vì sao điều này xảy ra? A khác B ở đâu? Điều gì sẽ thay đổi nếu điều kiện khác đi? Khi nào nên áp dụng? Nó liên hệ với kiến thức trước ra sao? Người học thường mắc lỗi gì?',
    'Give abstract ideas concrete examples. Add diagrams to verbal explanations, then reproduce both from memory.': 'Biến ý tưởng trừu tượng thành ví dụ cụ thể. Kết hợp sơ đồ với lời giải thích, rồi tự tái hiện cả hai từ trí nhớ.',
    'Distill the course': 'Chắt lọc kiến thức môn học',
    'Create a one-page cheat sheet': 'Làm tờ tổng hợp kiến thức một trang',
    'Include essential terms, short definitions, formulas and when to use them, processes, comparisons, mistakes, hard examples, diagrams, memory tricks, and unanswered questions.': 'Gồm các thuật ngữ thiết yếu, định nghĩa ngắn, công thức và tình huống áp dụng, quy trình, điểm so sánh, lỗi thường gặp, ví dụ khó, sơ đồ, mẹo ghi nhớ và câu hỏi chưa giải đáp.',
    'Use limited space deliberately: short phrases, arrows, personal abbreviations, diagrams, comparison charts, and numbered processes. Give the most space to what is difficult or easily confused.': 'Hãy chủ động tận dụng không gian hạn chế: dùng cụm từ ngắn, mũi tên, cách viết tắt riêng, sơ đồ, bảng so sánh và quy trình đánh số. Dành nhiều chỗ nhất cho nội dung khó hoặc dễ nhầm.',
    'Keep notes alive': 'Biến ghi chú thành công cụ học',
    'Better note-taking workflow': 'Quy trình ghi chú hiệu quả hơn',
    'During class': 'Trong giờ học',
    'Capture main ideas, definitions, examples, questions, emphasis, and connections—not every sentence.': 'Ghi ý chính, định nghĩa, ví dụ, câu hỏi, điểm giảng viên nhấn mạnh và các mối liên hệ — không chép từng câu.',
    'Right after': 'Ngay sau buổi học',
    'Fill context, clarify wording, mark questions, make connections, and create practice prompts.': 'Bổ sung ngữ cảnh, làm rõ cách diễn đạt, đánh dấu chỗ chưa hiểu, nối các ý với nhau và tạo câu hỏi luyện tập.',
    'Before next class': 'Trước buổi học kế tiếp',
    'Close your notes, write what you remember, then check accuracy.': 'Đóng ghi chú, viết lại những gì còn nhớ rồi đối chiếu để kiểm tra độ chính xác.',
    'Fit the task': 'Chọn đúng cách cho đúng việc',
    'Match technique to assignment': 'Chọn kỹ thuật theo dạng bài',
    'Assignment': 'Dạng bài',
    'Best techniques': 'Kỹ thuật phù hợp nhất',
    'Vocabulary': 'Từ vựng',
    'Flashcards, mnemonics, spaced recall': 'Thẻ ghi nhớ, mẹo liên tưởng, gợi nhớ theo lịch cách quãng',
    'Math / statistics': 'Toán / thống kê',
    'Mixed problems, error log, timed practice': 'Bài tập xen kẽ, nhật ký lỗi, luyện tập bấm giờ',
    'Programming': 'Lập trình',
    'Blank-file coding, predict output, debug': 'Viết mã từ trang trắng, dự đoán đầu ra, gỡ lỗi',
    'Science': 'Khoa học',
    'Draw processes, teach aloud, compare': 'Vẽ quy trình, tự giảng thành tiếng, so sánh',
    'Essay exams': 'Bài thi tự luận',
    'Memory-built outlines, timed prompts': 'Lập dàn ý từ trí nhớ, luyện trả lời câu hỏi có bấm giờ',
    'Research papers': 'Bài nghiên cứu',
    'Source summaries, argument maps, outlines': 'Tóm tắt từng nguồn, sơ đồ lập luận, dàn ý',
    'Presentations': 'Bài thuyết trình',
    'Keyword rehearsal, recording, likely questions': 'Luyện nói theo từ khóa, tự ghi hình, chuẩn bị câu hỏi có thể được đặt ra',
    'Multiple choice': 'Trắc nghiệm',
    'Practice and explain every answer choice': 'Luyện đề và giải thích vì sao từng phương án đúng hoặc sai',
    'Textbook-heavy': 'Môn học chủ yếu dựa vào giáo trình',
    'Search, scan, question, retrieve, chapter sheets': 'Tìm kiếm, đọc quét, đặt câu hỏi, tự gợi nhớ, làm tờ tóm tắt từng chương',
    'Learn from misses': 'Học từ những câu làm sai',
    'Keep an error log': 'Lập nhật ký lỗi',
    'Record the question or topic, your answer, the correct answer, why you missed it, and how you will avoid that mistake next time.': 'Ghi lại câu hỏi hoặc chủ đề, câu trả lời của bạn, đáp án đúng, nguyên nhân làm sai và cách tránh lặp lại lỗi đó.',
    'Watch for misreading, forgotten formulas, confused terms, skipped steps, wrong methods, and difficulty applying something you understand. Review the log before the exam.': 'Theo dõi các kiểu lỗi: đọc sai đề, quên công thức, nhầm thuật ngữ, bỏ bước, chọn sai phương pháp hoặc không áp dụng được kiến thức dù đã hiểu. Xem lại nhật ký trước kỳ thi.',
    'Common traps': 'Những lỗi học tập thường gặp',
    'What to avoid': 'Những điều nên tránh',
    'Passive rereading': 'Đọc đi đọc lại một cách thụ động',
    'Close, recall, check, correct.': 'Đóng tài liệu, tự nhớ lại, đối chiếu và sửa sai.',
    'Excessive highlighting': 'Tô sáng quá nhiều',
    'Mark only key ideas, then turn them into questions.': 'Chỉ đánh dấu ý chính, rồi biến chúng thành câu hỏi.',
    'Copying solved examples': 'Chép lại bài mẫu đã có lời giải',
    'Cover the solution and reproduce it.': 'Che lời giải và tự làm lại từ đầu.',
    'Cramming': 'Học nhồi trước giờ thi',
    'Use several short sessions over multiple days.': 'Chia thành nhiều phiên ngắn trong vài ngày.',
    'Studying distracted': 'Học khi liên tục bị xao nhãng',
    'Remove the distraction instead of relying on willpower.': 'Loại bỏ tác nhân gây xao nhãng thay vì chỉ trông chờ vào ý chí.',
    'Sacrificing sleep': 'Cắt giảm giấc ngủ',
    'Rest often beats one more exhausted hour.': 'Nghỉ ngơi thường hiệu quả hơn việc cố học thêm một giờ khi đã kiệt sức.',
    'Collecting resources': 'Mải sưu tầm tài liệu',
    'Choose one, verify it, improve it, and test yourself.': 'Chọn một nguồn, kiểm chứng, bổ sung và dùng nó để tự kiểm tra.',
    'The final check': 'Phép thử cuối cùng',
    '“Do I really know it?”': '“Mình thật sự nắm được chưa?”',
    'You know it when you can explain it without notes, create an original example, compare it with a related idea, understand unfamiliar wording, apply it to a new problem, recall it days later, and correct a common mistake.': 'Bạn thực sự nắm bài khi có thể giải thích mà không nhìn ghi chú, tự tạo ví dụ mới, so sánh với khái niệm liên quan, hiểu nội dung dù được diễn đạt theo cách không quen, áp dụng vào vấn đề mới, nhớ lại sau nhiều ngày và sửa được một lỗi thường gặp.',
    'Recognizing the answer when you see it is not enough.': 'Chỉ nhận ra đáp án khi nhìn thấy là chưa đủ.',
    'When exams feel too short': 'Khi thời gian làm bài luôn có vẻ quá ngắn',
    'Practice reading with speed and control': 'Luyện đọc nhanh mà vẫn kiểm soát độ hiểu',
    'Reading speed is trainable. I used to read around': 'Tốc độ đọc có thể rèn luyện. Trước đây, tôi chỉ đọc được khoảng',
    '100 words per minute': '100 từ/phút',
    '. An after-school program helped me reach up to': '. Nhờ một chương trình ngoại khóa, tôi từng đạt tới',
    '1,000 WPM': '1.000 từ/phút',
    ', and about': ', đồng thời duy trì khoảng',
    '500 WPM with 90% comprehension': '500 từ/phút với độ hiểu 90%',
    '. The useful goal is not maximum speed—it is the fastest pace at which you still understand what the question is asking.': '. Mục tiêu thực tế không phải là đạt tốc độ tối đa, mà là đọc nhanh nhất có thể trong khi vẫn hiểu chính xác câu hỏi đang yêu cầu gì.',
    'Build speed without losing meaning': 'Tăng tốc mà không đánh mất ý nghĩa',
    'Find your baseline': 'Xác định tốc độ ban đầu',
    'Read a timed passage, calculate your WPM, then answer comprehension questions without looking back.': 'Bấm giờ khi đọc một đoạn văn, tính số từ mỗi phút, rồi trả lời câu hỏi đọc hiểu mà không xem lại.',
    'Guide your eyes': 'Dẫn mắt theo nhịp',
    'Use a finger, pen, or cursor to maintain a steady pace and reduce unnecessary rereading.': 'Dùng ngón tay, bút hoặc con trỏ để giữ nhịp ổn định và hạn chế quay lại đọc không cần thiết.',
    'Read in phrases': 'Đọc theo cụm',
    'Practice taking in short groups of words rather than silently focusing on every word by itself.': 'Luyện tiếp nhận các cụm từ ngắn thay vì đọc thầm và chú ý từng từ riêng lẻ.',
    'Vary your speed': 'Điều chỉnh tốc độ',
    'Move quickly through examples and familiar context; slow down for definitions, constraints, exceptions, and unfamiliar reasoning.': 'Đọc nhanh qua ví dụ và ngữ cảnh quen thuộc; chậm lại ở định nghĩa, điều kiện ràng buộc, ngoại lệ và lập luận chưa quen.',
    'Retest comprehension': 'Kiểm tra lại độ hiểu',
    'Increase speed gradually, but lower it whenever recall or accuracy drops below your target.': 'Tăng tốc từng bước, nhưng hãy giảm tốc ngay khi khả năng nhớ lại hoặc độ chính xác giảm xuống dưới mức mục tiêu.',
    'Practice for timed exams': 'Luyện cho bài thi giới hạn thời gian',
    'Preview the entire exam and note point values before starting.': 'Xem nhanh toàn bộ đề và số điểm của từng phần trước khi bắt đầu.',
    'Translate the time limit into a rough time budget per section.': 'Ước tính thời gian dành cho từng phần dựa trên tổng thời gian làm bài.',
    'Read the question first, then identify command words such as': 'Đọc câu hỏi trước, rồi xác định các động từ chỉ yêu cầu như',
    'compare': 'so sánh',
    'calculate': 'tính toán',
    ', or': ' hoặc',
    'explain': 'giải thích',
    'Mark difficult questions and return after collecting easier points.': 'Đánh dấu câu khó và quay lại sau khi đã làm xong các câu dễ để chắc điểm.',
    'Practice with the same format and time pressure before exam day.': 'Trước ngày thi, hãy luyện đúng định dạng đề và giới hạn thời gian thực tế.',
    'Track two numbers:': 'Theo dõi hai chỉ số:',
    'words per minute and comprehension percentage. Speed only counts when understanding stays high.': 'số từ mỗi phút và tỷ lệ đọc hiểu. Tốc độ chỉ có giá trị khi mức độ hiểu vẫn cao.',
    'When progress feels slow': 'Khi bạn cảm thấy tiến bộ quá chậm',
    'You can become far more capable than you are today.': 'Bạn có thể giỏi hơn hiện tại rất nhiều.',
    'Encouragement works best when it gives you something honest to do next. Start small, practice with purpose, and improve the conditions around your effort.': 'Lời động viên có ích nhất khi chỉ cho bạn một việc thiết thực để làm tiếp. Hãy bắt đầu từ việc nhỏ, luyện tập có chủ đích và tạo điều kiện tốt hơn cho nỗ lực của mình.',
    '01 · Kaizen': '01 · Kaizen',
    'Start with one minute.': 'Bắt đầu bằng một phút.',
    'The Japanese idea of kaizen is commonly translated as continuous improvement.': 'Kaizen, một khái niệm của Nhật Bản, thường được dịch là “cải tiến liên tục”.',
    'Make the first change small enough to repeat. One honest minute today lowers the barrier to returning tomorrow. The win is not intensity; the win is becoming someone who starts.': 'Hãy chọn thay đổi đầu tiên nhỏ đến mức bạn có thể lặp lại. Một phút tập trung thật sự hôm nay sẽ khiến việc quay lại vào ngày mai dễ hơn. Thành công không nằm ở cường độ; nó nằm ở việc bạn trở thành người biết bắt đầu.',
    '02 · Talent': '02 · Tài năng',
    'A head start is not a destiny.': 'Lợi thế ban đầu không quyết định đích đến.',
    'You do not need to feel talented before you begin. Natural ease may shape the first few tries; practice, feedback, curiosity, and persistence shape what comes next.': 'Bạn không cần thấy mình có năng khiếu rồi mới bắt đầu. Năng khiếu bẩm sinh có thể ảnh hưởng đến vài lần thử đầu tiên; còn luyện tập, phản hồi, óc tò mò và sự bền bỉ sẽ định hình chặng đường sau đó.',
    'Talent is not a ceiling.': 'Tài năng không phải giới hạn cuối cùng.',
    '03 · 500 hours': '03 · 500 giờ',
    'Focused time changes you.': 'Thời gian tập trung sẽ thay đổi năng lực của bạn.',
    'Five hundred focused hours is not a magic guarantee of mastery, but it can make you remarkably capable in a defined skill. That is about': 'Năm trăm giờ tập trung rèn luyện không phải lời bảo đảm thần kỳ rằng bạn sẽ thành bậc thầy, nhưng có thể giúp bạn trở nên rất thành thạo trong một kỹ năng được xác định rõ. Con số đó tương đương khoảng',
    'one hour a day for sixteen months': 'một giờ mỗi ngày trong mười sáu tháng',
    '—or thirty minutes a day for nearly three years.': '—hoặc ba mươi phút mỗi ngày trong gần ba năm.',
    '04 · Outliers': '04 · Outliers',
    'Success is never talent alone.': 'Thành công không bao giờ chỉ đến từ tài năng.',
    'Outliers': 'Outliers',
    'argues that achievement is shaped by practice and also by timing, culture, opportunity, access, support, and luck. Do the work—and seek environments that give your work room to compound.': 'cho rằng thành tựu được tạo nên không chỉ bởi luyện tập mà còn bởi thời điểm, văn hóa, cơ hội, điều kiện tiếp cận, sự hỗ trợ và may mắn. Hãy làm phần việc của mình — đồng thời tìm những môi trường cho phép nỗ lực ấy tích lũy và phát huy theo thời gian.',
    '05 · Access': '05 · Điều kiện tiếp cận',
    'Build the conditions.': 'Tạo dựng điều kiện thuận lợi.',
    'Ask for feedback. Find a mentor or study partner. Use libraries, office hours, free courses, borrowed tools, and communities. Barriers are real; they are not personal failure.': 'Chủ động xin góp ý. Tìm người hướng dẫn hoặc bạn đồng hành học tập. Tận dụng thư viện, giờ gặp giảng viên, khóa học miễn phí, dụng cụ mượn và cộng đồng. Rào cản là có thật; gặp rào cản không có nghĩa là bạn thất bại.',
    'Better access helps effort become progress.': 'Khả năng tiếp cận tốt hơn giúp biến nỗ lực thành tiến bộ.',
    '06 · Possibility': '06 · Tiềm năng',
    'Your future is larger than today’s evidence.': 'Tương lai của bạn rộng hơn những gì hiện tại đang cho thấy.',
    'You cannot guarantee every outcome, but you can create more options. Begin, learn, ask, adjust, and begin again.': 'Bạn không thể bảo đảm mọi kết quả, nhưng có thể tạo ra nhiều lựa chọn hơn. Hãy bắt đầu, học hỏi, đặt câu hỏi, điều chỉnh rồi bắt đầu lại.',
    'Your present skill shows where you are—not where you must stop.': 'Năng lực hiện tại chỉ cho biết bạn đang ở đâu — không quyết định nơi bạn phải dừng lại.',
    'Make the hours count:': 'Hãy để mỗi giờ đều có giá trị:',
    'focus, challenge, feedback, correction, rest, and consistency determine what practice produces.': 'mức độ tập trung, thử thách, phản hồi, sửa sai, nghỉ ngơi và tính nhất quán sẽ quyết định kết quả của việc luyện tập.',
    'Keep practicing': 'Tiếp tục luyện tập',
    'A little more on learning faster.': 'Tìm hiểu thêm về cách học nhanh hơn.',
    'You don’t have to take my word for it.': 'Bạn không cần tin tôi chỉ vì tôi nói vậy.',
    'One last thing': 'Một điều cuối cùng',
    'Don’t forget to sleep.': 'Đừng quên ngủ đủ.',
    'Sleep is part of learning—not time taken away from it. Rest helps your brain strengthen memories, restore attention, and make tomorrow’s practice count.': 'Giấc ngủ là một phần của quá trình học, không phải thời gian bị lãng phí. Nghỉ ngơi giúp não bộ củng cố ký ức, phục hồi khả năng tập trung và khiến buổi luyện tập ngày mai thực sự hiệu quả.',
    'Back to top ↑': 'Về đầu trang ↑'
  };

  const skipText = '[data-language-toggle], [data-theme-toggle], [data-expand-all]';
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement.closest(skipText) || !node.nodeValue.trim()
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    }
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push([walker.currentNode, walker.currentNode.nodeValue]);

  function setTheme(theme) {
    const dark = theme === 'dark';
    const vietnamese = currentLanguage === 'vi';
    root.dataset.theme = dark ? 'dark' : 'light';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', vietnamese ? `Chuyển sang giao diện ${dark ? 'sáng' : 'tối'}` : `Switch to ${dark ? 'light' : 'dark'} mode`);
    themeButton.querySelector('span').textContent = dark ? '☀' : '☾';
    themeButton.querySelector('b').textContent = vietnamese ? (dark ? 'Sáng' : 'Tối') : (dark ? 'Light' : 'Dark');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#171a18' : '#f7f2e9';
  }

  function syncExpandButton() {
    const allOpen = topics.every((topic) => topic.open);
    const vietnamese = currentLanguage === 'vi';
    expandButton.setAttribute('aria-pressed', String(allOpen));
    expandButton.setAttribute('aria-label', vietnamese ? `${allOpen ? 'Thu gọn' : 'Mở rộng'} tất cả các mục` : `${allOpen ? 'Collapse' : 'Expand'} all sections`);
    expandButton.querySelector('span').textContent = allOpen ? '−' : '＋';
    expandButton.querySelector('b').textContent = vietnamese ? (allOpen ? 'Thu gọn hết' : 'Mở rộng hết') : (allOpen ? 'Collapse all' : 'Expand all');
  }

  function setLanguage(language) {
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
    document.title = vietnamese ? 'Học hiệu quả hơn — Cẩm nang khởi đầu' : 'Study Smarter — Starter Cheat Sheet';
    document.querySelector('meta[name="description"]').content = vietnamese
      ? 'Cẩm nang thực hành giúp bạn học hiệu quả hơn bằng gợi nhớ chủ động, ôn tập cách quãng và đọc có trọng tâm.'
      : 'A practical starter cheat sheet for studying smarter with active recall, spaced practice, and focused reading.';
    languageButton.setAttribute('aria-label', vietnamese ? 'Chuyển sang tiếng Anh' : 'Đọc bằng tiếng Việt');
    languageButton.querySelector('span').textContent = vietnamese ? 'EN' : 'VI';
    languageButton.querySelector('b').textContent = vietnamese ? 'Tiếng Anh' : 'Tiếng Việt';
    brandLink?.setAttribute('aria-label', vietnamese ? 'Quay lại Trininails' : 'Back to Trininails');
    videoFrame?.setAttribute('title', vietnamese ? 'Video về cách học nhanh hơn, có bật phụ đề' : 'Learning faster video with English captions enabled');
    setTheme(root.dataset.theme || 'light');
    syncExpandButton();
  }

  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  setLanguage(currentLanguage);

  languageButton.addEventListener('click', () => {
    setLanguage(currentLanguage === 'en' ? 'vi' : 'en');
    localStorage.setItem('study-language', currentLanguage);
  });

  themeButton.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    localStorage.setItem('study-theme', theme);
  });

  expandButton.addEventListener('click', () => {
    const open = !topics.every((topic) => topic.open);
    topics.forEach((topic) => { topic.open = open; });
    syncExpandButton();
  });

  topics.forEach((topic) => topic.addEventListener('toggle', syncExpandButton));
})();
