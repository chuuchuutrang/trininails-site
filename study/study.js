(() => {
  const root = document.documentElement;
  const languageButton = document.querySelector('[data-language-toggle]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const expandButton = document.querySelector('[data-expand-all]');
  const topics = [...document.querySelectorAll('.topic')];
  const savedTheme = localStorage.getItem('study-theme');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let currentLanguage = requestedLanguage === 'vi' || (requestedLanguage !== 'en' && localStorage.getItem('study-language') === 'vi') ? 'vi' : 'en';

  const vi = {
    'A practical field guide · 21 study ideas + 6 reminders + 4 core habits': 'Cẩm nang thực hành · 21 ý tưởng học tập + 6 lời nhắc + 4 thói quen cốt lõi',
    'Study': 'Học',
    'smarter.': 'thông minh hơn.',
    'A personal guide from Bitchley on how to study like a lazy person—less busywork, better memory, and proof you actually learned it.': 'Hướng dẫn cá nhân của Bitchley về cách học như một người lười—bớt làm việc thừa, nhớ tốt hơn và có bằng chứng rằng bạn thật sự đã học được.',
    'The main rule': 'Nguyên tắc chính',
    'Do not measure studying by how many hours you spend. Measure it by what you can': 'Đừng đo việc học bằng số giờ đã bỏ ra. Hãy đo bằng những gì bạn có thể',
    'explain, recall, or solve': 'giải thích, nhớ lại hoặc giải quyết',
    'without looking at your materials.': 'mà không cần nhìn tài liệu.',
    'Begin here': 'Bắt đầu tại đây',
    'Four habits that do the heavy lifting.': 'Bốn thói quen tạo ra phần lớn kết quả.',
    'Check what the class actually requires.': 'Xác định chính xác môn học yêu cầu gì.',
    'Find reliable study materials before starting from zero.': 'Tìm tài liệu đáng tin cậy trước khi bắt đầu từ con số không.',
    'Read selectively: scan, search, and skip noise.': 'Đọc có chọn lọc: quét, tìm kiếm và bỏ qua phần không cần thiết.',
    'Close your materials and retrieve from memory.': 'Đóng tài liệu và tự nhớ lại từ trí nhớ.',
    'Ready-to-use plans': 'Kế hoạch dùng ngay',
    'When you need a little structure.': 'Khi bạn cần một chút khuôn khổ.',
    'Daily': 'Hằng ngày',
    'Simple routine': 'Thói quen đơn giản',
    'After class:': 'Sau giờ học:',
    'Expand notes, write 3–5 questions, mark one confusing point, and update your cheat sheet.': 'Bổ sung ghi chú, viết 3–5 câu hỏi, đánh dấu một điểm chưa rõ và cập nhật tờ tóm tắt.',
    'Evening:': 'Buổi tối:',
    'Do one focused block, retrieve, correct, and briefly review older material.': 'Thực hiện một phiên tập trung, tự nhớ lại, sửa lỗi và ôn nhanh nội dung cũ.',
    'Weekly:': 'Hằng tuần:',
    'Take a cumulative quiz, mix chapters, update your error log, and schedule reviews.': 'Làm bài kiểm tra tổng hợp, trộn các chương, cập nhật sổ lỗi và lên lịch ôn tập.',
    '10 minutes': '10 phút',
    'Textbook sprint': 'Đọc nhanh giáo trình',
    'Preview headings, terms, diagrams, objectives, summary.': 'Xem trước tiêu đề, thuật ngữ, sơ đồ, mục tiêu và phần tóm tắt.',
    'Identify the questions you need answered.': 'Xác định những câu hỏi bạn cần trả lời.',
    'Search, scan, or skim for answers.': 'Tìm kiếm, quét hoặc đọc lướt để tìm câu trả lời.',
    'Close the book and summarize from memory.': 'Đóng sách và tóm tắt bằng trí nhớ.',
    '30 minutes': '30 phút',
    'Emergency session': 'Phiên học khẩn cấp',
    'Choose the most important target.': 'Chọn mục tiêu quan trọng nhất.',
    'Review the core concept.': 'Ôn lại khái niệm cốt lõi.',
    'Retrieve or solve from memory.': 'Nhớ lại hoặc giải bằng trí nhớ.',
    'Check and correct errors.': 'Kiểm tra và sửa lỗi.',
    'Summarize and schedule the next review.': 'Tóm tắt và lên lịch ôn lần tiếp theo.',
    'The complete field guide': 'Cẩm nang đầy đủ',
    '21 ways to learn more with less wasted effort.': '21 cách học được nhiều hơn với ít công sức lãng phí hơn.',
    'Open only what you need right now. Each topic gives you a practical technique, a reason to use it, and a way to tell whether it worked.': 'Chỉ mở phần bạn cần ngay lúc này. Mỗi chủ đề cung cấp một kỹ thuật thực tế, lý do nên dùng và cách biết nó có hiệu quả hay không.',
    'Tap a topic to open the details': 'Chạm vào một chủ đề để xem chi tiết',
    'Set direction': 'Định hướng',
    'Start with what the class requires': 'Bắt đầu từ yêu cầu của môn học',
    'Check the syllabus, slides, notes, learning objectives, study guides, homework, previous quizzes, and topics your instructor repeats. Not every textbook sentence deserves equal attention.': 'Kiểm tra đề cương, slide, ghi chú, mục tiêu học tập, hướng dẫn ôn tập, bài tập, bài kiểm tra cũ và những chủ đề giảng viên nhắc lại. Không phải câu nào trong giáo trình cũng cần được chú ý như nhau.',
    'Choose a concrete target': 'Chọn một mục tiêu cụ thể',
    'Explain cellular respiration without notes.': 'Giải thích hô hấp tế bào mà không cần ghi chú.',
    'Solve five derivative problems.': 'Giải năm bài toán đạo hàm.',
    'Memorize twenty vocabulary terms.': 'Ghi nhớ hai mươi thuật ngữ.',
    'Outline a possible essay response.': 'Lập dàn ý cho một câu trả lời tự luận.',
    'Replace “study Chapter 5” with something you can prove you completed.': 'Thay “học Chương 5” bằng một việc cụ thể mà bạn có thể chứng minh đã hoàn thành.',
    'Save time': 'Tiết kiệm thời gian',
    'Look for existing cheat sheets first': 'Tìm bản tóm tắt có sẵn trước',
    'Search course sites, shared folders, Quizlet, student platforms, department pages, public notes, publisher resources, and tutoring centers. Existing guides reveal major topics, simpler explanations, examples, and gaps.': 'Tìm trên trang môn học, thư mục chia sẻ, Quizlet, nền tảng sinh viên, trang khoa, ghi chú công khai, tài nguyên của nhà xuất bản và trung tâm gia sư. Các hướng dẫn có sẵn giúp lộ ra chủ đề chính, cách giải thích đơn giản, ví dụ và phần còn thiếu.',
    'My personal favorite is Google Images.': 'Công cụ tôi thích nhất là Google Hình ảnh.',
    'Search the subject plus “cheat sheet,” “study guide,” or “one-page summary.” Image results make it fast to scan many layouts, comparison charts, diagrams, and visual summaries before choosing the most useful sources. Start with the exact class name or course number. If that is unfruitful, search the': 'Tìm tên môn học kèm “cheat sheet”, “study guide” hoặc “one-page summary”. Kết quả hình ảnh giúp bạn nhanh chóng xem nhiều bố cục, bảng so sánh, sơ đồ và bản tóm tắt trực quan trước khi chọn nguồn hữu ích nhất. Hãy bắt đầu bằng tên lớp hoặc mã môn chính xác. Nếu không có kết quả, hãy tìm theo',
    'textbook title': 'tên giáo trình',
    ', chapter name, or broader': ', tên chương hoặc',
    'course name': 'tên môn học rộng hơn',
    'instead—for example, switch from “BIO 121 Professor Smith” to “Campbell Biology Chapter 10” or “introductory biology cellular respiration cheat sheet.”': '—ví dụ, đổi từ “BIO 121 Professor Smith” sang “Campbell Biology Chapter 10” hoặc “introductory biology cellular respiration cheat sheet”.',
    'Verify everything against your professor’s slides, syllabus, assigned readings, homework, and your own notes. Rewrite useful information in your own words.': 'Đối chiếu mọi thứ với slide, đề cương, bài đọc, bài tập và ghi chú của chính bạn. Viết lại thông tin hữu ích bằng lời của bạn.',
    'Use a cheat sheet in an exam only when it is explicitly allowed. Never use leaked exams or submit someone else’s work.': 'Chỉ dùng tờ tóm tắt trong kỳ thi khi được cho phép rõ ràng. Không bao giờ dùng đề thi bị rò rỉ hoặc nộp bài của người khác.',
    'Read strategically': 'Đọc có chiến lược',
    'How to read a textbook—or not': 'Cách đọc giáo trình — hoặc khi không cần đọc',
    'Your goal is to locate, understand, and remember what matters—not automatically read every page.': 'Mục tiêu là tìm, hiểu và nhớ điều quan trọng — không phải mặc định đọc mọi trang.',
    'Use the textbook when': 'Dùng giáo trình khi',
    'Lecture is unclear or you need another example.': 'Bài giảng chưa rõ hoặc bạn cần thêm ví dụ.',
    'A section is assigned or homework cites it.': 'Một phần được giao hoặc bài tập có dẫn chiếu.',
    'You need a definition, formula, or detailed process.': 'Bạn cần định nghĩa, công thức hoặc quy trình chi tiết.',
    'It contains material not covered in class.': 'Nó có nội dung chưa được dạy trên lớp.',
    'Use it as a reference when': 'Dùng làm tài liệu tham khảo khi',
    'Slides already explain the topic clearly.': 'Slide đã giải thích chủ đề rõ ràng.',
    'The chapter repeats material you understand.': 'Chương lặp lại nội dung bạn đã hiểu.',
    'You only need to clarify specific points.': 'Bạn chỉ cần làm rõ vài điểm cụ thể.',
    'A guide identifies the exact concepts needed.': 'Hướng dẫn đã xác định đúng các khái niệm cần thiết.',
    'Preview first': 'Xem trước',
    'Scan before you read': 'Quét trước khi đọc',
    'Preview objectives, headings, bold terms, definitions, diagrams, charts, captions, formulas, worked examples, summaries, and review questions.': 'Xem trước mục tiêu, tiêu đề, thuật ngữ in đậm, định nghĩa, sơ đồ, biểu đồ, chú thích, công thức, ví dụ mẫu, tóm tắt và câu hỏi ôn tập.',
    'For each bold term, ask': 'Với mỗi thuật ngữ in đậm, hãy hỏi',
    'What does it mean and why is it important?': 'Nó có nghĩa gì và tại sao quan trọng?',
    'How does it connect to the chapter?': 'Nó liên quan đến chương như thế nào?',
    'Could I explain it without reading the definition?': 'Tôi có thể giải thích mà không đọc định nghĩa không?',
    'Give reading a purpose': 'Đọc có mục đích',
    'Turn headings into questions': 'Biến tiêu đề thành câu hỏi',
    'Turn “The Stages of Mitosis” into “What are the stages, and what happens in each?” Turn “Causes of Inflation” into “What causes inflation, and how do the causes differ?”': 'Biến “Các giai đoạn nguyên phân” thành “Có những giai đoạn nào và điều gì xảy ra ở mỗi giai đoạn?” Biến “Nguyên nhân lạm phát” thành “Điều gì gây lạm phát và các nguyên nhân khác nhau ra sao?”',
    'Read only far enough to answer. Then close the book and answer in your own words.': 'Chỉ đọc đủ để trả lời. Sau đó đóng sách và trả lời bằng lời của bạn.',
    'Protect attention': 'Bảo vệ sự tập trung',
    'Skip the noise': 'Bỏ qua phần nhiễu',
    'Move quickly through': 'Đọc nhanh qua',
    'Repeated explanations and long introductions.': 'Giải thích lặp lại và phần mở đầu dài.',
    'Background, sidebars, and examples you understand.': 'Thông tin nền, khung phụ và ví dụ bạn đã hiểu.',
    'Material unrelated to learning objectives.': 'Nội dung không liên quan đến mục tiêu học tập.',
    'Slow down for': 'Đọc chậm lại với',
    'Definitions, formulas, diagrams, and comparisons.': 'Định nghĩa, công thức, sơ đồ và so sánh.',
    'Multi-step processes and worked problems.': 'Quy trình nhiều bước và bài giải mẫu.',
    'Emphasized ideas you cannot explain yourself.': 'Ý tưởng được nhấn mạnh mà bạn chưa tự giải thích được.',
    'Skipping noise means spending attention where it has the highest value—not avoiding difficult material.': 'Bỏ qua phần nhiễu nghĩa là dành sự chú ý cho nơi có giá trị cao nhất — không phải né tránh nội dung khó.',
    'Find the signal': 'Tìm tín hiệu chính',
    'Use search on digital material': 'Dùng tìm kiếm trong tài liệu số',
    'Use': 'Dùng',
    'on Windows or': 'trên Windows hoặc',
    'on Mac. Search lecture terms, study-guide words, assignment keywords, names, theories, formulas, dates, objectives, and homework questions.': 'trên Mac. Tìm thuật ngữ bài giảng, từ trong hướng dẫn ôn tập, từ khóa bài tập, tên, lý thuyết, công thức, ngày tháng, mục tiêu và câu hỏi bài tập.',
    'Try alternate wording, and read around each match for context.': 'Thử các cách diễn đạt khác và đọc xung quanh mỗi kết quả để hiểu ngữ cảnh.',
    'A complete study loop': 'Một chu trình học hoàn chỉnh',
    'Use short, focused study blocks': 'Dùng các phiên học ngắn, tập trung',
    '25–30 min': '25–30 phút',
    'Focus': 'Tập trung',
    'Put your phone away, close unrelated tabs, prepare materials, and choose one clear target.': 'Cất điện thoại, đóng tab không liên quan, chuẩn bị tài liệu và chọn một mục tiêu rõ ràng.',
    '5 min': '5 phút',
    'Retrieve': 'Nhớ lại',
    'Close everything. Write, explain, draw, solve, outline, or code from memory.': 'Đóng mọi thứ. Viết, giải thích, vẽ, giải bài, lập dàn ý hoặc viết mã bằng trí nhớ.',
    'Check': 'Kiểm tra',
    'Correct': 'Sửa lỗi',
    'Label your work correct, incomplete, incorrect, or blank. Study the gaps.': 'Đánh dấu bài làm là đúng, chưa đủ, sai hoặc bỏ trống. Học lại phần còn thiếu.',
    'Reset': 'Nghỉ ngắn',
    'Stand, stretch, walk, drink water, and rest your eyes. Take a longer break after two or three rounds.': 'Đứng dậy, giãn cơ, đi bộ, uống nước và cho mắt nghỉ. Nghỉ lâu hơn sau hai hoặc ba vòng.',
    'Make memory work': 'Buộc trí nhớ hoạt động',
    'Active recall': 'Chủ động nhớ lại',
    'Retrieve before looking at the answer. Use practice tests, flashcards, brain dumps, blank-page summaries, problems, teach-backs, diagrams, and outlines.': 'Tự nhớ trước khi xem đáp án. Dùng bài kiểm tra thử, thẻ ghi nhớ, viết tất cả điều nhớ được, tóm tắt trên trang trắng, bài tập, giảng lại, sơ đồ và dàn ý.',
    'Strong flashcards:': 'Thẻ ghi nhớ hiệu quả:',
    'give the full answer and explain it before flipping. The struggle to retrieve is part of learning.': 'hãy trả lời đầy đủ và giải thích trước khi lật thẻ. Nỗ lực nhớ lại chính là một phần của việc học.',
    'Remember longer': 'Nhớ lâu hơn',
    'Spaced practice': 'Ôn tập ngắt quãng',
    'Day 0': 'Ngày 0',
    'Learn': 'Học',
    'Day 1': 'Ngày 1',
    'Day 3': 'Ngày 3',
    'Review gaps': 'Ôn phần thiếu',
    'Day 7': 'Ngày 7',
    'Day 14': 'Ngày 14',
    'Test again': 'Kiểm tra lại',
    'Review weak material more often and strong material less often. Start before the night prior to the exam.': 'Ôn phần yếu thường xuyên hơn và phần vững ít hơn. Bắt đầu trước đêm ngay trước kỳ thi.',
    'Choose the method': 'Chọn phương pháp',
    'Interleaving': 'Học xen kẽ',
    'Mix related topics or problem types instead of doing one large block of identical questions. Try addition → multiplication → subtraction → division, rather than finishing every addition problem first.': 'Trộn các chủ đề hoặc dạng bài liên quan thay vì làm một khối lớn các câu giống nhau. Thử cộng → nhân → trừ → chia, thay vì hoàn thành hết bài cộng trước.',
    'It feels harder because you must decide which method applies—and that makes the practice more useful.': 'Cách này khó hơn vì bạn phải quyết định phương pháp nào phù hợp — và chính điều đó làm việc luyện tập hữu ích hơn.',
    'Expose the gaps': 'Lộ ra phần còn thiếu',
    'Teach-back method': 'Phương pháp giảng lại',
    'Explain the material to a total beginner. Answer: What is it? How does it work? Why does it matter? What is an example? What is it confused with?': 'Giải thích nội dung cho một người hoàn toàn mới. Trả lời: Nó là gì? Hoạt động ra sao? Tại sao quan trọng? Ví dụ là gì? Dễ nhầm với điều gì?',
    'Where your explanation gets fuzzy, return to the source only long enough to fill the gap. Then explain it again without looking.': 'Khi lời giải thích trở nên mơ hồ, chỉ quay lại nguồn đủ lâu để lấp chỗ trống. Sau đó giải thích lại mà không nhìn.',
    'A reading framework': 'Khuôn khổ đọc',
    'SQ3R for textbook chapters': 'SQ3R cho các chương giáo trình',
    'Survey': 'Khảo sát',
    'Preview headings, objectives, terms, diagrams, summaries, and questions.': 'Xem trước tiêu đề, mục tiêu, thuật ngữ, sơ đồ, tóm tắt và câu hỏi.',
    'Question': 'Đặt câu hỏi',
    'Turn headings into questions.': 'Biến tiêu đề thành câu hỏi.',
    'Read': 'Đọc',
    'Read to find the answers.': 'Đọc để tìm câu trả lời.',
    'Recite': 'Tự thuật lại',
    'Close the book and answer from memory.': 'Đóng sách và trả lời bằng trí nhớ.',
    'Review': 'Ôn tập',
    'Return later with spaced practice.': 'Quay lại sau bằng phương pháp ôn ngắt quãng.',
    'The most important step is recitation. Reading without retrieval is usually not enough.': 'Bước quan trọng nhất là tự thuật lại. Chỉ đọc mà không tự nhớ lại thường là chưa đủ.',
    'Build connections': 'Tạo liên kết',
    'Elaboration and examples': 'Đào sâu và ví dụ',
    'Ask why it happens, how A differs from B, what changes under a new condition, when you would use it, how it connects to earlier material, and what mistake someone might make.': 'Hỏi vì sao nó xảy ra, A khác B thế nào, điều gì thay đổi trong điều kiện mới, khi nào nên dùng, nó liên hệ với kiến thức trước ra sao và người học có thể mắc lỗi gì.',
    'Give abstract ideas concrete examples. Add diagrams to verbal explanations, then reproduce both from memory.': 'Cho ý tưởng trừu tượng những ví dụ cụ thể. Thêm sơ đồ vào lời giải thích, rồi tái tạo cả hai bằng trí nhớ.',
    'Distill the course': 'Chắt lọc môn học',
    'Create a one-page cheat sheet': 'Tạo tờ tóm tắt một trang',
    'Include essential terms, short definitions, formulas and when to use them, processes, comparisons, mistakes, hard examples, diagrams, memory tricks, and unanswered questions.': 'Bao gồm thuật ngữ cốt lõi, định nghĩa ngắn, công thức và khi nào dùng, quy trình, so sánh, lỗi sai, ví dụ khó, sơ đồ, mẹo nhớ và câu hỏi chưa trả lời.',
    'Use limited space deliberately: short phrases, arrows, personal abbreviations, diagrams, comparison charts, and numbered processes. Give the most space to what is difficult or easily confused.': 'Dùng không gian hạn chế một cách có chủ đích: cụm từ ngắn, mũi tên, viết tắt cá nhân, sơ đồ, bảng so sánh và quy trình đánh số. Dành nhiều chỗ nhất cho điều khó hoặc dễ nhầm.',
    'Keep notes alive': 'Giữ ghi chú luôn hữu ích',
    'Better note-taking workflow': 'Quy trình ghi chú tốt hơn',
    'During class': 'Trong giờ học',
    'Capture main ideas, definitions, examples, questions, emphasis, and connections—not every sentence.': 'Ghi lại ý chính, định nghĩa, ví dụ, câu hỏi, điểm nhấn và liên kết — không phải từng câu.',
    'Right after': 'Ngay sau đó',
    'Fill context, clarify wording, mark questions, make connections, and create practice prompts.': 'Bổ sung ngữ cảnh, làm rõ cách diễn đạt, đánh dấu câu hỏi, tạo liên kết và soạn câu luyện tập.',
    'Before next class': 'Trước buổi học tiếp theo',
    'Close your notes, write what you remember, then check accuracy.': 'Đóng ghi chú, viết điều bạn nhớ rồi kiểm tra độ chính xác.',
    'Fit the task': 'Phù hợp với nhiệm vụ',
    'Match technique to assignment': 'Ghép kỹ thuật với dạng bài',
    'Assignment': 'Dạng bài',
    'Best techniques': 'Kỹ thuật phù hợp',
    'Vocabulary': 'Từ vựng',
    'Flashcards, mnemonics, spaced recall': 'Thẻ ghi nhớ, mẹo nhớ, nhớ lại ngắt quãng',
    'Math / statistics': 'Toán / thống kê',
    'Mixed problems, error log, timed practice': 'Bài tập trộn, sổ lỗi, luyện có bấm giờ',
    'Programming': 'Lập trình',
    'Blank-file coding, predict output, debug': 'Viết mã từ tệp trắng, đoán đầu ra, gỡ lỗi',
    'Science': 'Khoa học',
    'Draw processes, teach aloud, compare': 'Vẽ quy trình, giảng thành tiếng, so sánh',
    'Essay exams': 'Thi tự luận',
    'Memory-built outlines, timed prompts': 'Lập dàn ý từ trí nhớ, luyện đề có giờ',
    'Research papers': 'Bài nghiên cứu',
    'Source summaries, argument maps, outlines': 'Tóm tắt nguồn, sơ đồ lập luận, dàn ý',
    'Presentations': 'Thuyết trình',
    'Keyword rehearsal, recording, likely questions': 'Tập theo từ khóa, ghi hình, dự đoán câu hỏi',
    'Multiple choice': 'Trắc nghiệm',
    'Practice and explain every answer choice': 'Luyện và giải thích mọi lựa chọn đáp án',
    'Textbook-heavy': 'Môn phụ thuộc nhiều vào giáo trình',
    'Search, scan, question, retrieve, chapter sheets': 'Tìm kiếm, quét, đặt câu hỏi, nhớ lại, tóm tắt chương',
    'Learn from misses': 'Học từ lỗi sai',
    'Keep an error log': 'Lập sổ lỗi',
    'Record the question or topic, your answer, the correct answer, why you missed it, and how you will avoid that mistake next time.': 'Ghi câu hỏi hoặc chủ đề, câu trả lời của bạn, đáp án đúng, lý do sai và cách tránh lỗi đó lần sau.',
    'Watch for misreading, forgotten formulas, confused terms, skipped steps, wrong methods, and difficulty applying something you understand. Review the log before the exam.': 'Chú ý lỗi đọc sai, quên công thức, nhầm thuật ngữ, bỏ bước, chọn sai phương pháp và khó áp dụng điều đã hiểu. Xem lại sổ trước kỳ thi.',
    'Common traps': 'Cạm bẫy thường gặp',
    'What to avoid': 'Điều cần tránh',
    'Passive rereading': 'Đọc lại thụ động',
    'Close, recall, check, correct.': 'Đóng tài liệu, nhớ lại, kiểm tra, sửa lỗi.',
    'Excessive highlighting': 'Tô màu quá nhiều',
    'Mark only key ideas, then turn them into questions.': 'Chỉ đánh dấu ý chính rồi biến chúng thành câu hỏi.',
    'Copying solved examples': 'Chép bài giải mẫu',
    'Cover the solution and reproduce it.': 'Che lời giải và tự làm lại.',
    'Cramming': 'Học nhồi nhét',
    'Use several short sessions over multiple days.': 'Dùng nhiều phiên ngắn trong nhiều ngày.',
    'Studying distracted': 'Học trong xao nhãng',
    'Remove the distraction instead of relying on willpower.': 'Loại bỏ yếu tố gây xao nhãng thay vì chỉ dựa vào ý chí.',
    'Sacrificing sleep': 'Hy sinh giấc ngủ',
    'Rest often beats one more exhausted hour.': 'Nghỉ ngơi thường tốt hơn thêm một giờ kiệt sức.',
    'Collecting resources': 'Chỉ sưu tầm tài liệu',
    'Choose one, verify it, improve it, and test yourself.': 'Chọn một nguồn, xác minh, cải thiện và tự kiểm tra.',
    'The final check': 'Kiểm tra cuối cùng',
    '“Do I really know it?”': '“Mình thật sự hiểu chưa?”',
    'You know it when you can explain it without notes, create an original example, compare it with a related idea, understand unfamiliar wording, apply it to a new problem, recall it days later, and correct a common mistake.': 'Bạn thật sự hiểu khi có thể giải thích không cần ghi chú, tự tạo ví dụ, so sánh với ý liên quan, hiểu cách diễn đạt lạ, áp dụng vào bài mới, nhớ lại sau nhiều ngày và sửa một lỗi thường gặp.',
    'Recognizing the answer when you see it is not enough.': 'Nhận ra đáp án khi nhìn thấy vẫn chưa đủ.',
    'When exams feel too short': 'Khi thời gian thi có vẻ quá ngắn',
    'Practice reading with speed and control': 'Luyện đọc nhanh nhưng có kiểm soát',
    'Reading speed is trainable. I used to read around': 'Tốc độ đọc có thể rèn luyện. Trước đây tôi đọc khoảng',
    '100 words per minute': '100 từ mỗi phút',
    '. An after-school program helped me reach up to': '. Một chương trình sau giờ học giúp tôi đạt tới',
    '1,000 WPM': '1.000 từ/phút',
    ', and about': ', và khoảng',
    '500 WPM with 90% comprehension': '500 từ/phút với mức hiểu 90%',
    '. The useful goal is not maximum speed—it is the fastest pace at which you still understand what the question is asking.': '. Mục tiêu hữu ích không phải tốc độ tối đa — mà là tốc độ nhanh nhất trong khi vẫn hiểu câu hỏi yêu cầu gì.',
    'Build speed without losing meaning': 'Tăng tốc mà không mất ý nghĩa',
    'Find your baseline': 'Xác định mức ban đầu',
    'Read a timed passage, calculate your WPM, then answer comprehension questions without looking back.': 'Đọc một đoạn có bấm giờ, tính số từ mỗi phút rồi trả lời câu hỏi đọc hiểu mà không nhìn lại.',
    'Guide your eyes': 'Dẫn mắt theo dòng',
    'Use a finger, pen, or cursor to maintain a steady pace and reduce unnecessary rereading.': 'Dùng ngón tay, bút hoặc con trỏ để giữ nhịp đều và giảm việc đọc lại không cần thiết.',
    'Read in phrases': 'Đọc theo cụm từ',
    'Practice taking in short groups of words rather than silently focusing on every word by itself.': 'Luyện tiếp nhận các cụm từ ngắn thay vì âm thầm tập trung vào từng từ riêng lẻ.',
    'Vary your speed': 'Thay đổi tốc độ',
    'Move quickly through examples and familiar context; slow down for definitions, constraints, exceptions, and unfamiliar reasoning.': 'Đi nhanh qua ví dụ và ngữ cảnh quen thuộc; chậm lại với định nghĩa, điều kiện, ngoại lệ và lập luận chưa quen.',
    'Retest comprehension': 'Kiểm tra lại mức hiểu',
    'Increase speed gradually, but lower it whenever recall or accuracy drops below your target.': 'Tăng tốc dần, nhưng giảm lại khi khả năng nhớ hoặc độ chính xác thấp hơn mục tiêu.',
    'Practice for timed exams': 'Luyện cho bài thi có giới hạn thời gian',
    'Preview the entire exam and note point values before starting.': 'Xem toàn bộ đề và ghi nhận số điểm trước khi bắt đầu.',
    'Translate the time limit into a rough time budget per section.': 'Chia giới hạn thời gian thành ngân sách thời gian gần đúng cho từng phần.',
    'Read the question first, then identify command words such as': 'Đọc câu hỏi trước rồi xác định từ chỉ dẫn như',
    'compare': 'so sánh',
    'calculate': 'tính toán',
    'explain': 'giải thích',
    'Mark difficult questions and return after collecting easier points.': 'Đánh dấu câu khó và quay lại sau khi đã lấy các điểm dễ hơn.',
    'Practice with the same format and time pressure before exam day.': 'Luyện đúng định dạng và áp lực thời gian trước ngày thi.',
    'Track two numbers:': 'Theo dõi hai con số:',
    'words per minute and comprehension percentage. Speed only counts when understanding stays high.': 'số từ mỗi phút và tỷ lệ hiểu. Tốc độ chỉ có ý nghĩa khi mức hiểu vẫn cao.',
    'When progress feels slow': 'Khi tiến bộ có vẻ chậm',
    'You can become far more capable than you are today.': 'Bạn có thể trở nên giỏi hơn hiện tại rất nhiều.',
    'Encouragement works best when it gives you something honest to do next. Start small, practice with purpose, and improve the conditions around your effort.': 'Sự động viên hiệu quả nhất khi cho bạn một việc thực tế để làm tiếp. Bắt đầu nhỏ, luyện tập có mục đích và cải thiện điều kiện xung quanh nỗ lực của mình.',
    '01 · Kaizen': '01 · Kaizen',
    'Start with one minute.': 'Bắt đầu với một phút.',
    'The Japanese idea of kaizen is commonly translated as continuous improvement.': 'Khái niệm kaizen của Nhật Bản thường được hiểu là cải tiến liên tục.',
    'Make the first change small enough to repeat. One honest minute today lowers the barrier to returning tomorrow. The win is not intensity; the win is becoming someone who starts.': 'Hãy làm thay đổi đầu tiên đủ nhỏ để có thể lặp lại. Một phút nghiêm túc hôm nay giúp ngày mai dễ quay lại hơn. Chiến thắng không nằm ở cường độ; mà ở việc trở thành người biết bắt đầu.',
    '02 · Talent': '02 · Tài năng',
    'A head start is not a destiny.': 'Khởi đầu thuận lợi không quyết định số phận.',
    'You do not need to feel talented before you begin. Natural ease may shape the first few tries; practice, feedback, curiosity, and persistence shape what comes next.': 'Bạn không cần cảm thấy mình có năng khiếu trước khi bắt đầu. Sự thuận lợi tự nhiên có thể ảnh hưởng vài lần đầu; luyện tập, phản hồi, tò mò và kiên trì sẽ định hình phần tiếp theo.',
    'Talent is not a ceiling.': 'Tài năng không phải giới hạn.',
    '03 · 500 hours': '03 · 500 giờ',
    'Focused time changes you.': 'Thời gian tập trung sẽ thay đổi bạn.',
    'Five hundred focused hours is not a magic guarantee of mastery, but it can make you remarkably capable in a defined skill. That is about': 'Năm trăm giờ tập trung không bảo đảm kỳ diệu rằng bạn sẽ thành bậc thầy, nhưng có thể giúp bạn rất giỏi một kỹ năng cụ thể. Tương đương khoảng',
    'one hour a day for sixteen months': 'một giờ mỗi ngày trong mười sáu tháng',
    '—or thirty minutes a day for nearly three years.': '— hoặc ba mươi phút mỗi ngày trong gần ba năm.',
    '04 · Outliers': '04 · Outliers',
    'Success is never talent alone.': 'Thành công không bao giờ chỉ nhờ tài năng.',
    'Outliers': 'Outliers',
    'argues that achievement is shaped by practice and also by timing, culture, opportunity, access, support, and luck. Do the work—and seek environments that give your work room to compound.': 'cho rằng thành tựu được hình thành bởi luyện tập, đồng thời bởi thời điểm, văn hóa, cơ hội, khả năng tiếp cận, hỗ trợ và may mắn. Hãy nỗ lực — và tìm môi trường giúp nỗ lực ấy tích lũy.',
    '05 · Access': '05 · Điều kiện tiếp cận',
    'Build the conditions.': 'Xây dựng điều kiện phù hợp.',
    'Ask for feedback. Find a mentor or study partner. Use libraries, office hours, free courses, borrowed tools, and communities. Barriers are real; they are not personal failure.': 'Xin phản hồi. Tìm người hướng dẫn hoặc bạn học. Sử dụng thư viện, giờ tư vấn, khóa học miễn phí, dụng cụ mượn và cộng đồng. Rào cản là có thật; chúng không phải thất bại cá nhân.',
    'Better access helps effort become progress.': 'Điều kiện tiếp cận tốt hơn giúp nỗ lực trở thành tiến bộ.',
    '06 · Possibility': '06 · Khả năng',
    'Your future is larger than today’s evidence.': 'Tương lai của bạn lớn hơn những gì hôm nay cho thấy.',
    'You cannot guarantee every outcome, but you can create more options. Begin, learn, ask, adjust, and begin again.': 'Bạn không thể bảo đảm mọi kết quả, nhưng có thể tạo thêm lựa chọn. Bắt đầu, học hỏi, đặt câu hỏi, điều chỉnh rồi bắt đầu lại.',
    'Your present skill shows where you are—not where you must stop.': 'Kỹ năng hiện tại cho biết bạn đang ở đâu — không phải nơi bạn buộc phải dừng lại.',
    'Make the hours count:': 'Hãy làm từng giờ trở nên đáng giá:',
    'focus, challenge, feedback, correction, rest, and consistency determine what practice produces.': 'sự tập trung, thử thách, phản hồi, sửa lỗi, nghỉ ngơi và nhất quán quyết định kết quả luyện tập.',
    'Keep practicing': 'Tiếp tục luyện tập',
    'A little more on learning faster.': 'Thêm một chút về cách học nhanh hơn.',
    'You don’t have to take my word for it.': 'Bạn không cần chỉ tin lời tôi.',
    'One last thing': 'Một điều cuối cùng',
    'Don’t forget to sleep.': 'Đừng quên ngủ đủ giấc.',
    'Sleep is part of learning—not time taken away from it. Rest helps your brain strengthen memories, restore attention, and make tomorrow’s practice count.': 'Giấc ngủ là một phần của việc học—không phải thời gian bị lấy mất khỏi việc học. Nghỉ ngơi giúp não củng cố ký ức, phục hồi sự tập trung và làm cho buổi luyện tập ngày mai hiệu quả hơn.',
    'Back to top ↑': 'Lên đầu trang ↑'
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
    themeButton.setAttribute('aria-label', vietnamese ? `Chuyển sang chế độ ${dark ? 'sáng' : 'tối'}` : `Switch to ${dark ? 'light' : 'dark'} mode`);
    themeButton.querySelector('span').textContent = dark ? '☀' : '☾';
    themeButton.querySelector('b').textContent = vietnamese ? (dark ? 'Sáng' : 'Tối') : (dark ? 'Light' : 'Dark');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#171a18' : '#f7f2e9';
  }

  function syncExpandButton() {
    const allOpen = topics.every((topic) => topic.open);
    const vietnamese = currentLanguage === 'vi';
    expandButton.setAttribute('aria-pressed', String(allOpen));
    expandButton.setAttribute('aria-label', vietnamese ? `${allOpen ? 'Thu gọn' : 'Mở rộng'} tất cả các phần` : `${allOpen ? 'Collapse' : 'Expand'} all sections`);
    expandButton.querySelector('span').textContent = allOpen ? '−' : '＋';
    expandButton.querySelector('b').textContent = vietnamese ? (allOpen ? 'Thu gọn' : 'Mở tất cả') : (allOpen ? 'Collapse all' : 'Expand all');
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
    document.title = vietnamese ? 'Học Thông Minh Hơn — Hướng Dẫn Khởi Đầu' : 'Study Smarter — Starter Cheat Sheet';
    document.querySelector('meta[name="description"]').content = vietnamese
      ? 'Cẩm nang thực hành giúp học thông minh hơn bằng chủ động nhớ lại, ôn tập ngắt quãng và đọc có trọng tâm.'
      : 'A practical starter cheat sheet for studying smarter with active recall, spaced practice, and focused reading.';
    languageButton.setAttribute('aria-label', vietnamese ? 'Read in English' : 'Đọc bằng tiếng Việt');
    languageButton.querySelector('span').textContent = vietnamese ? 'EN' : 'VI';
    languageButton.querySelector('b').textContent = vietnamese ? 'English' : 'Tiếng Việt';
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
