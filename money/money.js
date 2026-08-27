(() => {
  const root = document.documentElement;
  const languageButton = document.querySelector('[data-language-toggle]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const expandButton = document.querySelector('[data-expand-all]');
  const brandLink = document.querySelector('.brand');
  const topics = [...document.querySelectorAll('.topic')];
  const savedTheme = localStorage.getItem('money-theme');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let currentLanguage = requestedLanguage === 'vi' || (requestedLanguage !== 'en' && localStorage.getItem('money-language') === 'vi') ? 'vi' : 'en';

  const vi = {
    "Skip to main content": "Chuyển thẳng đến nội dung chính",
    "Financial literacy · clear and practical": "Kiến thức tài chính · rõ ràng và thực tế",
    "Make your money work as hard as": "Hãy để tiền của bạn làm việc chăm chỉ như",
    "you do.": "chính bạn.",
    "If not more.": "Thậm chí còn hơn.",
    "A compact field guide for keeping more, growing it earlier, and understanding what your money is doing.": "Cẩm nang thực tế, ngắn gọn giúp bạn giữ lại nhiều tiền hơn, bắt đầu làm tiền sinh lời sớm hơn và hiểu rõ tiền của mình đang đi đâu, làm gì.",
    "Try the calculators": "Thử các công cụ tính",
    "Stylized art · exact equivalencies below.": "Hình minh họa cách điệu · các cách quy đổi chính xác nằm bên dưới.",
    "Start with one dollar": "Bắt đầu từ một đô la",
    "Same value. Different pieces.": "Cùng một giá trị. Nhiều cách ghép khác nhau.",
    "pennies": "đồng 1 xu",
    "nickels": "đồng 5 xu",
    "dimes": "đồng 10 xu",
    "quarters": "đồng 25 xu",
    "dollar": "đô la",
    "The main rule": "Nguyên tắc quan trọng nhất",
    "Give every dollar a job:": "Hãy giao cho mỗi đồng tiền một nhiệm vụ:",
    "spend, protect, or grow.": "chi tiêu, bảo vệ hoặc làm sinh lời.",
    "If it has no job, it tends to disappear.": "Tiền không được phân bổ rõ ràng thường sẽ hết lúc nào không hay.",
    "A sensible order": "Một trình tự hợp lý",
    "Build the floor before the ceiling.": "Xây nền móng vững trước khi nghĩ đến tầng cao.",
    "This is a starter sequence, not a law. Your debts, benefits, dependents, health, and income stability can change the order.": "Đây là trình tự gợi ý để bắt đầu, không phải quy tắc cứng nhắc. Tình trạng nợ, phúc lợi, người phụ thuộc, sức khỏe và mức độ ổn định của thu nhập có thể khiến bạn cần đổi thứ tự.",
    "Cover essentials": "Trang trải các nhu cầu thiết yếu",
    "Housing, food, health, transport, minimum payments.": "Nhà ở, thực phẩm, chăm sóc sức khỏe, đi lại và các khoản thanh toán tối thiểu.",
    "Build a starter buffer": "Lập khoản dự phòng ban đầu",
    "Even a small cash reserve can stop a surprise from becoming debt.": "Ngay cả một khoản tiền mặt dự phòng nhỏ cũng có thể ngăn chi phí bất ngờ biến thành nợ.",
    "Capture the match": "Nhận trọn khoản công ty đóng góp đối ứng",
    "If your employer matches a 401(k), learn the rules and collect the full benefit.": "Nếu công ty có đóng góp đối ứng cho 401(k), hãy tìm hiểu quy định và đóng góp đủ để nhận trọn quyền lợi.",
    "Attack costly debt": "Ưu tiên trả nợ lãi suất cao",
    "High interest can compound against you faster than investments grow for you.": "Lãi kép trên khoản nợ lãi suất cao có thể phình ra nhanh hơn tốc độ khoản đầu tư của bạn tăng trưởng.",
    "Strengthen the emergency fund": "Củng cố quỹ khẩn cấp",
    "Keep it safe, separate, and easy to reach.": "Giữ quỹ an toàn, tách riêng và dễ tiếp cận khi cần.",
    "Invest for the long term": "Đầu tư cho mục tiêu dài hạn",
    "Use tax-advantaged accounts where they fit, automate, and start early.": "Tận dụng tài khoản được ưu đãi thuế khi phù hợp, tự động hóa việc đóng góp và bắt đầu sớm.",
    "Run the numbers": "Tự tính thử",
    "Four calculators. Zero data leaves your device.": "Bốn công cụ tính. Dữ liệu của bạn không rời khỏi thiết bị.",
    "Change any input and the answer updates instantly. Results are educational estimates—especially the federal tax tool.": "Thay đổi bất kỳ số liệu nào, kết quả sẽ cập nhật ngay. Các kết quả chỉ là ước tính để tham khảo và học tập—đặc biệt là công cụ tính thuế liên bang.",
    "Interest & growth": "Lãi kép & tăng trưởng",
    "See what time and repeat contributions can do.": "Xem thời gian và việc đóng góp đều đặn có thể giúp tiền tăng trưởng ra sao.",
    "Starting amount": "Số tiền ban đầu",
    "Monthly contribution": "Khoản đóng góp hằng tháng",
    "Annual rate": "Lãi suất / lợi suất hằng năm",
    "Years": "Số năm",
    "Estimated ending balance": "Số dư cuối kỳ ước tính",
    "You put in": "Tổng tiền bạn đã bỏ vào",
    "Growth": "Phần lãi / sinh lời",
    "Growth over time": "Tăng trưởng theo thời gian",
    "Projected balance and contributions over time": "Số dư dự kiến và tổng tiền đóng góp theo thời gian",
    "Balance": "Số dư",
    "Contributions": "Tiền đóng góp",
    "Assumes monthly compounding and contributions at month-end. Investment returns are not guaranteed; bank APYs can change.": "Giả định lãi được nhập gốc hằng tháng và khoản đóng góp được thực hiện vào cuối mỗi tháng. Lợi nhuận đầu tư không được bảo đảm; APY của tài khoản ngân hàng có thể thay đổi.",
    "Sales tax": "Thuế bán hàng",
    "Turn a sticker price into the checkout total.": "Từ giá niêm yết, tính ra tổng số tiền phải thanh toán.",
    "Price": "Đơn giá",
    "Quantity": "Số lượng",
    "Sales-tax rate": "Thuế suất bán hàng",
    "San Jose default: 10.000% effective July 1, 2026. Verify by address.": "Mức mặc định tại San Jose: 10%, có hiệu lực từ ngày 1 tháng 7 năm 2026. Hãy xác minh theo địa chỉ cụ thể.",
    "Total after tax": "Tổng tiền sau thuế",
    "Subtotal": "Tạm tính",
    "Tax": "Tiền thuế",
    "Inflation": "Lạm phát",
    "See the future price—and what idle cash may buy.": "Xem giá có thể tăng ra sao trong tương lai—và sức mua của tiền mặt để yên sẽ giảm thế nào.",
    "Amount today": "Số tiền hiện tại",
    "Annual inflation": "Tỷ lệ lạm phát hằng năm",
    "Future cost of the same basket": "Chi phí tương lai cho cùng một giỏ hàng",
    "Your $ today may feel like": "Về sau, số tiền hôm nay chỉ còn sức mua tương đương",
    "Buying power lost": "Sức mua bị hao hụt",
    "2026 federal tax estimate": "Ước tính thuế liên bang năm 2026",
    "W-2 wages, sole-proprietor profit, or both.": "Thu nhập W-2, lợi nhuận tự kinh doanh hoặc cả hai.",
    "Income type": "Loại thu nhập",
    "W-2 only": "Chỉ có W-2",
    "Sole proprietor": "Tự kinh doanh",
    "Both": "Cả hai",
    "Filing status": "Tình trạng khai thuế",
    "Single": "Độc thân",
    "Married filing jointly": "Vợ chồng khai thuế chung",
    "Head of household": "Chủ hộ gia đình",
    "Married filing separately": "Vợ chồng khai thuế riêng",
    "W-2 pay format": "Cách nhập thu nhập W-2",
    "Yearly salary": "Lương theo năm",
    "Hourly pay": "Lương theo giờ",
    "Yearly W-2 wages": "Tổng thu nhập W-2 trong năm",
    "Hourly rate": "Mức lương mỗi giờ",
    "Hours each week": "Số giờ làm mỗi tuần",
    "Holiday days per year": "Số ngày nghỉ lễ mỗi năm",
    "Set the number of holidays your employer observes.": "Nhập số ngày nghỉ lễ mà công ty của bạn áp dụng.",
    "Holiday pay": "Lương trong ngày nghỉ lễ",
    "Holidays are paid": "Được trả lương ngày lễ",
    "When this is off, the calculator subtracts the configured holiday days. Private employers choose their own holiday policies.": "Khi tắt tùy chọn này, công cụ sẽ trừ số ngày nghỉ lễ bạn đã nhập. Mỗi doanh nghiệp tư nhân tự quyết định chính sách nghỉ lễ và trả lương.",
    "Business revenue": "Tổng doanh thu kinh doanh",
    "Business expenses": "Chi phí kinh doanh",
    "Eligible pre-tax deductions": "Các khoản khấu trừ trước thuế đủ điều kiện",
    "Example: eligible pre-tax retirement contributions. Deductibility varies.": "Ví dụ: một số khoản đóng góp hưu trí trước thuế. Việc có được khấu trừ hay không tùy từng trường hợp.",
    "Federal withholding + estimates": "Thuế liên bang đã khấu lưu + thuế ước tính đã nộp",
    "Estimated annual W-2 wages": "Thu nhập W-2 hằng năm ước tính",
    "Estimated total federal tax": "Tổng thuế liên bang ước tính",
    "Income tax": "Thuế thu nhập liên bang",
    "W-2 payroll tax": "Thuế FICA trên lương W-2",
    "Self-employment tax": "Thuế tự doanh",
    "Effective rate": "Tỷ lệ thuế thực tế",
    "After payments": "Sau khi trừ số thuế đã nộp",
    "What this estimate includes": "Ước tính này tính những gì?",
    "Uses 2026 federal brackets and standard deductions, employee Social Security and Medicare, and self-employment tax on 92.35% of eligible net profit. W-2 wages reduce the Social Security wage base available to self-employment earnings.": "Áp dụng các bậc thuế và mức khấu trừ tiêu chuẩn liên bang năm 2026; phần thuế An sinh Xã hội và Medicare của người lao động; cùng thuế tự doanh trên 92.35% lợi nhuận ròng đủ điều kiện. Thu nhập W-2 làm giảm phần còn lại của mức trần thu nhập chịu thuế An sinh Xã hội áp dụng cho thu nhập tự doanh.",
    "Hourly wages use 52 weeks. Turning holiday pay off subtracts the holiday count entered above based on a five-day workweek. Actual schedules and employer benefits vary.": "Thu nhập theo giờ được quy đổi dựa trên 52 tuần. Nếu tắt tùy chọn trả lương ngày lễ, công cụ sẽ trừ số ngày lễ đã nhập, dựa trên tuần làm việc 5 ngày. Lịch làm việc và phúc lợi thực tế tùy từng nơi.",
    "It excludes California income tax, credits, itemized deductions, the qualified-business-income deduction, Additional Medicare Tax, special capital-gain rates, dependents, and many other rules. It is not tax advice or a return.": "Không tính thuế thu nhập California, các khoản tín dụng thuế, khấu trừ theo từng khoản, khoản khấu trừ thu nhập kinh doanh đủ điều kiện (QBI), Thuế Medicare Bổ sung, thuế suất riêng cho lãi vốn, người phụ thuộc và nhiều quy định khác. Đây không phải tư vấn thuế và cũng không phải tờ khai thuế.",
    "Two savings targets": "Hai mục tiêu tiết kiệm",
    "Save what remains—before it finds a reason to leave.": "Hãy dành phần còn lại để tiết kiệm—trước khi bạn tìm ra lý do để tiêu nó.",
    "These percentages apply": "Các tỷ lệ này được tính",
    "after essential expenses": "trên phần tiền còn lại sau chi phí thiết yếu",
    ", not to total income. Pick a target that is demanding but sustainable.": ", chứ không phải trên tổng thu nhập. Hãy chọn một mục tiêu đủ thử thách nhưng vẫn có thể duy trì lâu dài.",
    "Strong target": "Mục tiêu cao",
    "Save half of what remains.": "Tiết kiệm một nửa số tiền còn lại.",
    "An ambitious benchmark that still leaves room for life today.": "Một mức chuẩn đầy tham vọng nhưng vẫn chừa chỗ cho cuộc sống hiện tại.",
    "Maximum savings target": "Mục tiêu tiết kiệm tối đa",
    "Save or invest almost all of what remains.": "Tiết kiệm hoặc đầu tư gần như toàn bộ số tiền còn lại.",
    "Plan optional spending later in the year so safe cash can earn interest longer. Money needed soon belongs in cash or an HYSA—not a volatile investment.": "Dời các khoản chi không thiết yếu về cuối năm để tiền mặt an toàn có thêm thời gian sinh lãi. Khoản tiền sắp cần dùng nên được giữ bằng tiền mặt hoặc trong HYSA, không nên bỏ vào tài sản có giá biến động mạnh.",
    "Money in plain English": "Tài chính nói theo cách dễ hiểu",
    "What, why, and when.": "Là gì, vì sao quan trọng và khi nào nên dùng.",
    "Open the lesson you need. Each one is deliberately short.": "Mở đúng chủ đề bạn cần. Mỗi bài đều được viết ngắn gọn có chủ đích.",
    "Tap a topic to open it": "Nhấn vào một chủ đề để mở",
    "Prices move": "Giá cả luôn thay đổi",
    "Inflation—and inflationary spending": "Lạm phát—và chi tiêu vì dự đoán giá sẽ tăng",
    "ELI5:": "Nói thật đơn giản:",
    "inflation means the same money buys fewer things. If a snack rises from $1 to $1.10, your dollar did not shrink—the menu did.": "lạm phát nghĩa là cùng một số tiền nhưng mua được ít hơn. Nếu món ăn vặt tăng từ $1 lên $1.10, đồng đô la của bạn không nhỏ đi—giá món ăn đã tăng.",
    "What": "Là gì",
    "A broad rise in prices over time.": "Mặt bằng giá nói chung tăng lên theo thời gian.",
    "Why it matters": "Vì sao quan trọng",
    "Cash that earns less than inflation loses buying power.": "Tiền mặt có lãi suất thấp hơn lạm phát sẽ mất dần sức mua.",
    "Inflationary spending": "Chi tiêu vì dự đoán giá sẽ tăng",
    "If people expect higher prices and rush to buy now, today’s demand can push prices higher still. Wages and prices do not always rise together.": "Khi mọi người dự đoán giá sẽ tăng và đổ xô mua sớm, nhu cầu tăng ngay hôm nay có thể đẩy giá lên thêm. Tiền lương và giá cả không phải lúc nào cũng tăng cùng nhịp.",
    "Safe cash": "Tiền mặt an toàn",
    "A high-yield savings account: ordinary savings with a more competitive variable rate.": "Tài khoản tiết kiệm lãi suất cao (HYSA): về cơ bản là tài khoản tiết kiệm thông thường nhưng có lãi suất thả nổi cạnh tranh hơn.",
    "Why": "Vì sao",
    "Your short-term cash earns interest while remaining available.": "Tiền dành cho mục tiêu ngắn hạn vẫn sinh lãi mà vẫn sẵn sàng khi bạn cần dùng.",
    "When": "Khi nào",
    "Emergency savings and money needed in roughly the next few years.": "Phù hợp với quỹ khẩn cấp và khoản tiền dự kiến dùng trong vài năm tới.",
    "Check the APY, fees, withdrawal access, and that the bank is FDIC-insured. Deposit insurance is generally automatic up to at least $250,000 per depositor, per insured bank, per ownership category.": "Hãy kiểm tra APY, các loại phí, cách rút tiền và xác nhận ngân hàng được FDIC bảo hiểm. Bảo hiểm tiền gửi thường được áp dụng tự động, với hạn mức ít nhất $250,000 cho mỗi người gửi tiền, tại mỗi ngân hàng được bảo hiểm, theo từng loại hình sở hữu tài khoản.",
    "Protect the plan": "Bảo vệ kế hoạch tài chính",
    "Emergency savings": "Quỹ khẩn cấp",
    "A dedicated cash reserve keeps a car repair, medical bill, or income gap from automatically becoming expensive debt. Start with a reachable buffer; then build toward the amount your own risks require. Keep it safe, accessible, separate, and boring.": "Một quỹ tiền mặt riêng giúp chi phí sửa xe, hóa đơn y tế hoặc khoảng thời gian thu nhập bị gián đoạn không tự động biến thành khoản nợ lãi cao. Hãy bắt đầu với một mức dự phòng trong tầm tay, rồi tăng dần theo rủi ro thực tế của bạn. Giữ quỹ này an toàn, dễ tiếp cận, tách riêng và càng “nhàm chán” càng tốt.",
    "There is no universal perfect number. Irregular income, dependents, health needs, and job risk usually call for a larger cushion.": "Không có một con số hoàn hảo cho tất cả mọi người. Thu nhập không ổn định, người phụ thuộc, nhu cầu y tế và rủi ro mất việc thường đòi hỏi quỹ dự phòng lớn hơn.",
    "Get help": "Nhờ hỗ trợ khi cần",
    "Automated and managed planning": "Lập kế hoạch tự động và dịch vụ quản lý đầu tư",
    "is a robo-advisory account: answer questions, fund it, and Fidelity selects and rebalances a portfolio. As of August 2026, there is no minimum to open, investing starts at $10, the advisory fee is $0 below $25,000 and 0.35% a year at $25,000 or more.": "là dịch vụ cố vấn đầu tư tự động: bạn trả lời một số câu hỏi, nạp tiền vào tài khoản, rồi Fidelity chọn và tái cân bằng danh mục. Tính đến tháng 8 năm 2026, không có mức tối thiểu để mở tài khoản; có thể bắt đầu đầu tư với $10; phí tư vấn là $0 nếu số dư dưới $25,000 và 0.35% mỗi năm nếu từ $25,000 trở lên.",
    "is a broader human-advice relationship for more complex needs and generally larger balances. Compare services, fees, minimums, conflicts, and whether you really need ongoing management before choosing any provider.": "là dịch vụ tư vấn trực tiếp với chuyên gia, dành cho nhu cầu phức tạp hơn và thường phù hợp với số dư lớn hơn. Trước khi chọn bất kỳ nhà cung cấp nào, hãy so sánh phạm vi dịch vụ, phí, mức tài sản tối thiểu, xung đột lợi ích và xem bạn có thật sự cần được quản lý liên tục hay không.",
    "A managed account can simplify decisions; it cannot remove market risk or guarantee returns.": "Tài khoản được quản lý có thể giúp việc ra quyết định đơn giản hơn, nhưng không loại bỏ rủi ro thị trường và không bảo đảm lợi nhuận.",
    "Retirement choice": "Lựa chọn tài khoản hưu trí",
    "Roth vs. traditional IRA": "Roth IRA và IRA truyền thống",
    "Traditional IRA": "IRA truyền thống",
    "Contribute after-tax money. Qualified withdrawals can be tax-free. Often attractive when your tax rate is lower now, but income limits apply.": "Bạn đóng góp bằng tiền đã nộp thuế. Các khoản rút đáp ứng điều kiện có thể được miễn thuế. Roth thường đáng cân nhắc khi thuế suất hiện tại thấp hơn mức bạn dự kiến trong tương lai, nhưng có giới hạn thu nhập.",
    "Contributions may be deductible now; withdrawals are generally taxable later. Deductibility can depend on income and workplace-plan coverage.": "Khoản đóng góp có thể được khấu trừ thuế ngay bây giờ; tiền rút về sau thường phải chịu thuế. Việc có được khấu trừ hay không có thể phụ thuộc vào thu nhập và việc bạn có tham gia chương trình hưu trí tại nơi làm việc hay không.",
    "The combined 2026 IRA contribution limit is $7,500, plus a $1,100 catch-up at age 50+. “Roth or traditional?” is often answered with tax rates, eligibility, flexibility, and a mix—not ideology.": "Tổng mức đóng góp cho tất cả IRA trong năm 2026 là $7,500; người từ 50 tuổi trở lên được đóng góp bổ sung $1,100. Việc chọn Roth, IRA truyền thống hay kết hợp cả hai nên dựa trên thuế suất, điều kiện tham gia và nhu cầu linh hoạt—không phải quan điểm cứng nhắc.",
    "Workplace investing": "Đầu tư hưu trí qua nơi làm việc",
    "A retirement account offered through work. Contributions can be traditional (tax break now) or Roth (qualified withdrawals tax-free later), depending on the plan.": "Tài khoản hưu trí do nơi làm việc cung cấp. Tùy chương trình, khoản đóng góp có thể là truyền thống (được ưu đãi thuế ngay bây giờ) hoặc Roth (khoản rút đáp ứng điều kiện được miễn thuế về sau).",
    "Company matching": "Khoản công ty đóng góp đối ứng",
    "Your employer may add money when you contribute, according to the plan’s formula and vesting rules.": "Khi bạn đóng góp, công ty có thể góp thêm theo công thức đối ứng và quy định về thời điểm bạn được sở hữu trọn vẹn khoản tiền đó (vesting).",
    "Get the full match": "Nhận trọn khoản đối ứng",
    "If applicable, contribute enough each pay period to receive the full company match.": "Nếu chương trình có đối ứng, hãy đóng góp đủ ở mỗi kỳ lương để nhận trọn phần công ty đóng thêm.",
    "The 2026 employee contribution limit is $24,500. Age 50+ catch-up is generally $8,000; ages 60–63 may have an $11,250 catch-up. Limits and eligibility can change.": "Mức đóng góp tối đa của người lao động năm 2026 là $24,500. Người từ 50 tuổi trở lên thường được đóng thêm $8,000; người từ 60 đến 63 tuổi có thể được đóng thêm $11,250. Giới hạn và điều kiện có thể thay đổi.",
    "Use time": "Tận dụng thời gian",
    "Front-load investing": "Đầu tư sớm khi tiền đã sẵn sàng",
    "If money is already available for a long-term goal, investing earlier gives it more time in the market. Vanguard research found lump-sum investing historically beat temporarily holding cash and averaging in roughly two-thirds of the time.": "Nếu khoản tiền dành cho mục tiêu dài hạn đã sẵn sàng, đầu tư sớm giúp tiền có nhiều thời gian hơn trên thị trường. Nghiên cứu của Vanguard cho thấy, xét theo dữ liệu lịch sử, đầu tư một lần thường tốt hơn việc tạm giữ tiền mặt rồi chia nhỏ đầu tư trong khoảng hai phần ba số trường hợp.",
    "But sequence matters:": "Nhưng phải làm đúng thứ tự:",
    "first protect essentials, avoid high-interest debt traps, and keep near-term money safe. Investing can fall. If a 401(k) match is paid per paycheck, maxing out too early may also miss later matching dollars unless the plan has a true-up.": "trước hết, hãy bảo đảm các nhu cầu thiết yếu, tránh bẫy nợ lãi suất cao và giữ an toàn cho tiền cần dùng sớm. Giá trị đầu tư có thể giảm. Nếu công ty đối ứng 401(k) theo từng kỳ lương, đóng tối đa quá sớm cũng có thể khiến bạn bỏ lỡ tiền đối ứng ở các kỳ sau, trừ khi chương trình có cơ chế điều chỉnh cuối năm (true-up).",
    "Front-loading is not predicting the market. It is giving long-term money more time—while accepting that earlier exposure also means earlier risk.": "Đầu tư sớm không phải là đoán thị trường. Đó là cho tiền dài hạn thêm thời gian để tăng trưởng, đồng thời chấp nhận rằng tham gia sớm cũng khiến bạn chịu rủi ro sớm hơn.",
    "The quiet advantage": "Lợi thế âm thầm",
    "Earn. Keep. Protect. Grow. Repeat.": "Kiếm. Giữ. Bảo vệ. Tăng trưởng. Lặp lại.",
    "You do not need to master finance in one day. Make one good money decision easier to repeat, then let consistency and time help.": "Bạn không cần hiểu hết tài chính chỉ trong một ngày. Hãy biến một quyết định tài chính tốt thành thói quen dễ lặp lại, rồi để sự kiên trì và thời gian phát huy tác dụng.",
    "Run your numbers again ↑": "Tính lại các con số của bạn ↑",
    "Sources & limits": "Nguồn tham khảo & giới hạn",
    "Updated August 27, 2026. Educational only—not individualized tax, legal, or investment advice. Product fees, limits, rates, and laws can change.": "Cập nhật ngày 27 tháng 8 năm 2026. Nội dung chỉ nhằm mục đích giáo dục, không phải tư vấn thuế, pháp lý hoặc đầu tư dành riêng cho từng cá nhân. Phí, giới hạn, lãi suất và luật có thể thay đổi.",
    "Back to top ↑": "Trở về đầu trang ↑",
    "IRS · 2026 brackets and standard deduction": "IRS · Bậc thuế và mức khấu trừ tiêu chuẩn năm 2026",
    "IRS · self-employment tax": "IRS · Thuế tự doanh",
    "IRS · 2026 retirement limits": "IRS · Giới hạn đóng góp hưu trí năm 2026",
    "SSA · 2026 Social Security wage base": "SSA · Trần tiền lương chịu thuế An sinh Xã hội năm 2026",
    "CDTFA · California sales-tax rates": "CDTFA · Thuế suất bán hàng tại California",
    "BLS · CPI and inflation": "BLS · Chỉ số CPI và lạm phát",
    "CFPB · emergency funds": "CFPB · Quỹ khẩn cấp",
    "FDIC · deposit insurance": "FDIC · Bảo hiểm tiền gửi",
    "Vanguard · lump sum vs. cost averaging": "Vanguard · Đầu tư một lần so với chia nhỏ đầu tư",
    "Fidelity · Fidelity Go": "Fidelity · Fidelity Go",
    "Fidelity · 401(k) match and true-up": "Fidelity · Đối ứng 401(k) và điều chỉnh cuối năm",
    "U.S. DOL · private holiday-pay rules": "Bộ Lao động Hoa Kỳ · Quy định trả lương ngày lễ của doanh nghiệp tư nhân",
    "OPM · 2026 federal holiday schedule": "OPM · Lịch nghỉ lễ liên bang năm 2026",
  };

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  const preciseMoney = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const skipText = '[data-language-toggle], [data-theme-toggle], [data-expand-all]';
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement.closest(skipText) || !node.nodeValue.trim()
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push([walker.currentNode, walker.currentNode.nodeValue]);

  const value = (form, name) => Math.max(0, Number(form.elements[name]?.value) || 0);
  const setText = (selector, text) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('money-theme', theme);
    const dark = theme === 'dark';
    const vietnamese = currentLanguage === 'vi';
    themeButton?.setAttribute('aria-pressed', String(dark));
    themeButton?.setAttribute('aria-label', vietnamese ? `Chuyển sang giao diện ${dark ? 'sáng' : 'tối'}` : `Switch to ${dark ? 'light' : 'dark'} mode`);
    if (themeButton) themeButton.innerHTML = `<span aria-hidden="true">${dark ? '☀' : '☾'}</span><b>${vietnamese ? (dark ? 'Sáng' : 'Tối') : (dark ? 'Light' : 'Dark')}</b>`;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0f1713' : '#f4f0e5');
  };

  const syncExpandButton = () => {
    if (!expandButton) return;
    const allOpen = topics.length > 0 && topics.every((topic) => topic.open);
    const vietnamese = currentLanguage === 'vi';
    expandButton.setAttribute('aria-pressed', String(allOpen));
    expandButton.setAttribute('aria-label', vietnamese ? `${allOpen ? 'Thu gọn' : 'Mở rộng'} tất cả các bài học` : `${allOpen ? 'Collapse' : 'Expand'} all lessons`);
    expandButton.innerHTML = `<span aria-hidden="true">${allOpen ? '−' : '＋'}</span><b>${vietnamese ? (allOpen ? 'Thu gọn tất cả' : 'Mở rộng tất cả') : (allOpen ? 'Collapse all' : 'Expand all')}</b>`;
  };
  topics.forEach((topic) => topic.addEventListener('toggle', syncExpandButton));
  expandButton?.addEventListener('click', () => {
    const shouldOpen = !topics.every((topic) => topic.open);
    topics.forEach((topic) => { topic.open = shouldOpen; });
    syncExpandButton();
  });

  const interestForm = document.querySelector('[data-interest-form]');
  const chart = document.querySelector('[data-interest-chart]');
  const renderInterestChart = (points, years) => {
    if (!chart || !points.length) return;
    const width = 544;
    const height = 162;
    const left = 8;
    const bottom = 190;
    const maximum = Math.max(1, ...points.map((point) => point.balance));
    const denominator = Math.max(1, points.length - 1);
    const coordinate = (point, index, key) => {
      const x = left + index / denominator * width;
      const y = bottom - point[key] / maximum * height;
      return [x, y];
    };
    const pathFor = (key) => points.map((point, index) => {
      const [x, y] = coordinate(point, index, key);
      return `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' ');
    const balancePath = pathFor('balance');
    const contributionPath = pathFor('contributed');
    const first = coordinate(points[0], 0, 'balance');
    const lastBalance = coordinate(points.at(-1), points.length - 1, 'balance');
    const lastContribution = coordinate(points.at(-1), points.length - 1, 'contributed');
    chart.querySelector('[data-chart-area]')?.setAttribute('d', `M${first[0]} ${bottom} ${balancePath.replace(/^M/, 'L')} L${lastBalance[0]} ${bottom} Z`);
    chart.querySelector('[data-chart-balance]')?.setAttribute('d', balancePath);
    chart.querySelector('[data-chart-contributions]')?.setAttribute('d', contributionPath);
    const placeDot = (selector, coordinates) => {
      const dot = chart.querySelector(selector);
      dot?.setAttribute('cx', coordinates[0].toFixed(2));
      dot?.setAttribute('cy', coordinates[1].toFixed(2));
    };
    placeDot('[data-chart-balance-dot]', lastBalance);
    placeDot('[data-chart-contributions-dot]', lastContribution);
    const vietnamese = currentLanguage === 'vi';
    const yearLabel = years === 1
      ? (vietnamese ? '1 năm' : '1 year')
      : `${years} ${vietnamese ? 'năm' : 'years'}`;
    setText('[data-chart-range]', yearLabel);
    setText('[data-chart-maximum]', money.format(maximum));
    setText('[data-chart-start]', vietnamese ? 'Bây giờ' : 'Now');
    setText('[data-chart-end]', vietnamese ? `${years} năm` : `${years} yr`);
    const finalPoint = points.at(-1);
    setText('[data-interest-chart-summary]', vietnamese
      ? `Sau ${yearLabel}, số dư dự kiến là ${money.format(finalPoint.balance)}, gồm ${money.format(finalPoint.contributed)} tiền đã đóng góp.`
      : `After ${yearLabel}, the projected balance is ${money.format(finalPoint.balance)}, including ${money.format(finalPoint.contributed)} in contributions.`);
  };
  const calculateInterest = () => {
    if (!interestForm) return;
    const principal = value(interestForm, 'principal');
    const monthly = value(interestForm, 'monthly');
    const annualRate = value(interestForm, 'rate') / 100;
    const months = Math.round(value(interestForm, 'years') * 12);
    const monthlyRate = annualRate / 12;
    let total = principal;
    const points = [{ balance: principal, contributed: principal }];
    for (let month = 0; month < months; month += 1) {
      total = total * (1 + monthlyRate) + monthly;
      points.push({ balance: total, contributed: principal + monthly * (month + 1) });
    }
    const contributed = principal + monthly * months;
    setText('[data-interest-total]', money.format(total));
    setText('[data-interest-contributed]', money.format(contributed));
    setText('[data-interest-earned]', money.format(total - contributed));
    renderInterestChart(points, months / 12);
  };

  const salesForm = document.querySelector('[data-sales-form]');
  const calculateSales = () => {
    if (!salesForm) return;
    const subtotal = value(salesForm, 'price') * value(salesForm, 'quantity');
    const tax = subtotal * value(salesForm, 'salesRate') / 100;
    setText('[data-sales-subtotal]', preciseMoney.format(subtotal));
    setText('[data-sales-tax]', preciseMoney.format(tax));
    setText('[data-sales-total]', preciseMoney.format(subtotal + tax));
  };

  const inflationForm = document.querySelector('[data-inflation-form]');
  const calculateInflation = () => {
    if (!inflationForm) return;
    const amount = value(inflationForm, 'amount');
    const rawRate = Number(inflationForm.elements.inflationRate.value) || 0;
    const rate = Math.max(-99.99, rawRate) / 100;
    const years = value(inflationForm, 'inflationYears');
    const factor = (1 + rate) ** years;
    const future = amount * factor;
    const power = factor > 0 ? amount / factor : 0;
    setText('[data-inflation-future]', money.format(future));
    setText('[data-inflation-power]', money.format(power));
    setText('[data-inflation-loss]', money.format(amount - power));
  };

  const TAX = {
    standardDeductions: { single: 16100, mfj: 32200, hoh: 24150, mfs: 16100 },
    brackets: {
      single: [[12400, .10], [50400, .12], [105700, .22], [201775, .24], [256225, .32], [640600, .35], [Infinity, .37]],
      mfj: [[24800, .10], [100800, .12], [211400, .22], [403550, .24], [512450, .32], [768700, .35], [Infinity, .37]],
      hoh: [[17700, .10], [67450, .12], [105700, .22], [201750, .24], [256200, .32], [640600, .35], [Infinity, .37]],
      mfs: [[12400, .10], [50400, .12], [105700, .22], [201775, .24], [256225, .32], [384350, .35], [Infinity, .37]],
    },
    socialSecurityBase: 184500,
  };

  const progressiveTax = (taxableIncome, brackets) => {
    let tax = 0;
    let floor = 0;
    for (const [ceiling, rate] of brackets) {
      if (taxableIncome <= floor) break;
      tax += (Math.min(taxableIncome, ceiling) - floor) * rate;
      floor = ceiling;
    }
    return tax;
  };

  const taxForm = document.querySelector('[data-tax-form]');
  const calculateTax = () => {
    if (!taxForm) return;
    const mode = taxForm.elements.incomeMode.value;
    const hasW2 = mode === 'w2' || mode === 'both';
    const hasSole = mode === 'sole' || mode === 'both';
    const payBasis = taxForm.elements.payBasis.value;
    const hourlyW2 = hasW2 && payBasis === 'hourly';
    document.querySelectorAll('[data-w2-control]').forEach((field) => { field.hidden = !hasW2; });
    document.querySelectorAll('[data-w2-yearly]').forEach((field) => { field.hidden = !hasW2 || hourlyW2; });
    document.querySelectorAll('[data-w2-hourly]').forEach((field) => { field.hidden = !hourlyW2; });
    document.querySelectorAll('[data-sole-field]').forEach((field) => { field.hidden = !hasSole; });
    document.querySelectorAll('[data-w2-estimate-wrap]').forEach((field) => { field.hidden = !hourlyW2; });

    const status = taxForm.elements.filingStatus.value;
    const hourlyRate = value(taxForm, 'hourlyRate');
    const weeklyHours = value(taxForm, 'weeklyHours');
    const holidayDays = value(taxForm, 'holidayDays');
    const paidHolidays = taxForm.elements.paidHolidays.checked;
    const scheduledHours = weeklyHours * 52;
    const unpaidHolidayHours = paidHolidays ? 0 : weeklyHours / 5 * holidayDays;
    const hourlyAnnualWages = hourlyRate * Math.max(0, scheduledHours - unpaidHolidayHours);
    const w2 = hasW2 ? (hourlyW2 ? hourlyAnnualWages : value(taxForm, 'w2Income')) : 0;
    const revenue = hasSole ? value(taxForm, 'businessRevenue') : 0;
    const expenses = hasSole ? value(taxForm, 'businessExpenses') : 0;
    const netProfit = Math.max(0, revenue - expenses);
    const seEarnings = netProfit >= 400 ? netProfit * .9235 : 0;
    const w2SocialSecurity = Math.min(w2, TAX.socialSecurityBase) * .062;
    const w2Medicare = w2 * .0145;
    const remainingSocialSecurityBase = Math.max(0, TAX.socialSecurityBase - Math.min(w2, TAX.socialSecurityBase));
    const seSocialSecurity = Math.min(seEarnings, remainingSocialSecurityBase) * .124;
    const seMedicare = seEarnings * .029;
    const seTax = seSocialSecurity + seMedicare;
    const adjustedIncome = Math.max(0, w2 + netProfit - seTax / 2 - value(taxForm, 'pretaxDeductions'));
    const taxableIncome = Math.max(0, adjustedIncome - TAX.standardDeductions[status]);
    const incomeTax = progressiveTax(taxableIncome, TAX.brackets[status]);
    const payrollTax = w2SocialSecurity + w2Medicare;
    const totalTax = incomeTax + payrollTax + seTax;
    const economicIncome = w2 + netProfit;
    const payments = value(taxForm, 'payments');
    const balance = totalTax - payments;

    setText('[data-tax-total]', money.format(totalTax));
    setText('[data-w2-estimate]', money.format(w2));
    setText('[data-income-tax]', money.format(incomeTax));
    setText('[data-payroll-tax]', money.format(payrollTax));
    setText('[data-se-tax]', money.format(seTax));
    setText('[data-effective-rate]', economicIncome ? `${(totalTax / economicIncome * 100).toFixed(1)}%` : '0.0%');
    const balanceLabel = currentLanguage === 'vi'
      ? (balance >= 0 ? 'còn phải nộp' : 'đã nộp dư')
      : (balance >= 0 ? 'due' : 'overpaid');
    setText('[data-tax-balance]', `${money.format(Math.abs(balance))} ${balanceLabel}`);
  };

  const connect = (form, calculate) => {
    if (!form) return;
    form.addEventListener('input', calculate);
    form.addEventListener('change', calculate);
    calculate();
  };
  connect(interestForm, calculateInterest);
  connect(salesForm, calculateSales);
  connect(inflationForm, calculateInflation);
  connect(taxForm, calculateTax);

  const linkedTopic = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  if (linkedTopic?.matches('.topic')) linkedTopic.open = true;

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
    document.title = vietnamese ? 'Để tiền làm việc cho bạn — Cẩm nang tài chính thực tế' : 'Make Your Money Work — A Practical Money Guide';
    document.querySelector('meta[name="description"]')?.setAttribute('content', vietnamese
      ? 'Cẩm nang ngắn gọn, thực tế về tiết kiệm, thuế, đầu tư, lạm phát và các quyết định tài chính hằng ngày.'
      : 'A concise, practical guide to saving, taxes, investing, inflation, and everyday money decisions.');
    languageButton?.setAttribute('aria-label', vietnamese ? 'Chuyển sang tiếng Anh' : 'Đọc bằng tiếng Việt');
    if (languageButton) languageButton.innerHTML = `<span aria-hidden="true">${vietnamese ? 'EN' : 'VI'}</span><b>${vietnamese ? 'Tiếng Anh' : 'Tiếng Việt'}</b>`;
    brandLink?.setAttribute('aria-label', vietnamese ? 'Quay lại cẩm nang kỹ năng' : 'Back to the field guide');
    document.querySelector('.hero-art img')?.setAttribute('alt', vietnamese
      ? 'Những hàng biểu tượng đồng xu cách điệu, cùng tạo thành giá trị một đô la'
      : 'Stylized rows of coin-inspired tokens building toward one dollar');
    document.querySelector('.equivalency ol')?.setAttribute('aria-label', vietnamese
      ? 'Các cách ghép tiền xu thành một đô la'
      : 'Ways to make one dollar');
    applyTheme(root.dataset.theme || savedTheme || (prefersDark ? 'dark' : 'light'));
    syncExpandButton();
    calculateInterest();
    calculateSales();
    calculateInflation();
    calculateTax();
  };

  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  setLanguage(currentLanguage);

  languageButton?.addEventListener('click', () => {
    setLanguage(currentLanguage === 'en' ? 'vi' : 'en');
    localStorage.setItem('money-language', currentLanguage);
  });
  themeButton?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
})();
