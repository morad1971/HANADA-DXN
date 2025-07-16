// بيانات المنتجات كما قدمها المستخدم، مدمجة في مصفوفة واحدة
// قيمة SV (Sales Value) مقدرة هنا بنسبة 70% من سعر الموزع (DP) لأغراض التوضيح.
// يرجى تحديث قيم SV بالقيم الرسمية من قائمة أسعار DXN لضمان الدقة.
// تم إزالة خاصية 'imageUrl' من كل منتج
// تم إضافة خصائص 'uses' و 'benefits' لكل منتج (معلومات عامة، يرجى التعديل)
const productsData = [
    // Food & Beverage Series
    { 
        id: "FB001", name: "DXN قهوة لينجزي 3 في 1", category: "أغذية ومشروبات", PV: 10.00, DP: 10.20, SV: 10.20 * 0.70, 
        uses: ["مشروب يومي للطاقة والتركيز", "بديل صحي للقهوة العادية"],
        benefits: ["تعزيز الطاقة والحيوية", "دعم الجهاز المناعي بفضل فطر الريشي", "تحسين الهضم", "تقليل التوتر"]
    },
    { 
        id: "FB002", name: "عصير روسيل", category: "أغذية ومشروبات", PV: 12.00, DP: 9.25, SV: 9.25 * 0.70, 
        uses: ["مشروب منعش يومي", "مصدر للمضادات الأكسدة"],
        benefits: ["غني بفيتامين C", "مضاد للأكسدة", "يدعم صحة الجهاز الهضمي"]
    },
    { 
        id: "FB003", name: "DXN مورينزي 3.25 جرام", category: "أغذية ومشروبات", PV: 17.00, DP: 13.25, SV: 13.25 * 0.70, 
        uses: ["مشروب صحي يومي", "للتخلص من السموم"],
        benefits: ["يعزز الهضم", "يدعم الجهاز المناعي", "يساعد على إزالة السموم من الجسم"]
    },
    { 
        id: "FB004", name: "DXN كوكوزي", category: "أغذية ومشروبات", PV: 13.00, DP: 13.60, SV: 13.60 * 0.70, 
        uses: ["مشروب شوكولاتة ساخن أو بارد", "وجبة خفيفة للأطفال والكبار"],
        benefits: ["يعزز الطاقة والتركيز", "يدعم وظائف الدماغ", "غني بمضادات الأكسدة"]
    },
    { 
        id: "FB005", name: "سيريال سبيرولينا (30 كيس × 30 جرام)", category: "أغذية ومشروبات", PV: 30.00, DP: 28.00, SV: 28.00 * 0.70, 
        uses: ["وجبة إفطار صحية", "مكمل غذائي يومي"],
        benefits: ["غني بالبروتين والفيتامينات والمعادن", "يدعم الطاقة والمناعة", "يساعد في تنظيم الوزن", "غذاء متكامل"]
    },
    { 
        id: "FB006", name: "مزيج أناناس جانو", category: "أغذية ومشروبات", PV: 6.00, DP: 5.40, SV: 5.40 * 0.70, 
        uses: ["مشروب منعش", "لتحسين الهضم"],
        benefits: ["يحتوي على إنزيمات هاضمة", "منعش ومفيد للجهاز الهضمي"]
    },
    { 
        id: "FB007", name: "DXN خل", category: "أغذية ومشروبات", PV: 28.00, DP: 25.80, SV: 25.80 * 0.70, 
        uses: ["مضاف للسلطات والأطعمة", "للتنقية الداخلية"],
        benefits: ["يدعم الهضم", "يساعد في تنظيم مستويات السكر في الدم"]
    },
    { 
        id: "FB008", name: "DXN كيوي", category: "أغذية ومشروبات", PV: 22.00, DP: 18.55, SV: 18.55 * 0.70, 
        uses: ["مشروب فاكهة منعش", "مصدر للفيتامينات"],
        benefits: ["غني بفيتامين C ومضادات الأكسدة", "يدعم صحة الجهاز الهضمي"]
    },
    { 
        id: "FB009", name: "مورينزي (700 مل)", category: "أغذية ومشروبات", PV: 35.00, DP: 29.70, SV: 29.70 * 0.70, 
        uses: ["مشروب صحي يومي", "للتخلص من السموم"],
        benefits: ["يعزز الهضم والمناعة", "يساعد على إزالة السموم", "يدعم الصحة العامة", "غني بمضادات الأكسدة"]
    },
    { 
        id: "FB010", name: "DXN قهوة لينجزي 3 في 1 لايت", category: "أغذية ومشروبات", PV: 10.00, DP: 10.20, SV: 10.20 * 0.70, 
        uses: ["مشروب قهوة يومي خفيف", "بديل صحي للقهوة العادية"],
        benefits: ["نفس فوائد قهوة لينجزي 3 في 1 ولكن بنكهة أخف", "تعزيز الطاقة والمناعة"]
    },
    { 
        id: "FB011", name: "DXN كورديسيبس سيريال", category: "أغذية ومشروبات", PV: 53.00, DP: 48.65, SV: 48.65 * 0.70, 
        uses: ["وجبة إفطار أو خفيفة", "لتعزيز الطاقة والتحمل"],
        benefits: ["يدعم الجهاز التنفسي ويزيد الطاقة", "غني بالعناصر الغذائية", "يعزز القدرة على التحمل"]
    },
    { 
        id: "FB012", name: "DXN قهوة كورديسيبس 3 في 1", category: "أغذية ومشروبات", PV: 11.00, DP: 12.90, SV: 12.90 * 0.70, 
        uses: ["مشروب قهوة يومي", "لزيادة الطاقة والتركيز"],
        benefits: ["يجمع بين فوائد القهوة والكورديسبس", "يعزز الطاقة والتحمل", "يدعم وظائف الرئة"]
    },
    { 
        id: "FB013", name: "DXN قهوة الكريمة", category: "أغذية ومشروبات", PV: 11.00, DP: 10.75, SV: 10.75 * 0.70, 
        uses: ["مشروب قهوة كريمي", "بديل صحي للقهوة العادية"],
        benefits: ["نكهة غنية وكريمية", "يحتوي على فطر الجانوديرما لدعم الصحة"]
    },
    { 
        id: "FB014", name: "DXN زي منت بلس", category: "أغذية ومشروبات", PV: 28.00, DP: 25.30, SV: 25.30 * 0.70, 
        uses: ["منعش للفم والحلق", "لتهدئة السعال الخفيف"],
        benefits: ["يحتوي على فطر الجانوديرما", "منعش ومريح للجهاز التنفسي"]
    },
    { 
        id: "FB015", name: "DXN ليمونزي", category: "أغذية ومشروبات", PV: 8.00, DP: 8.80, SV: 8.80 * 0.70, 
        uses: ["مشروب شاي بالليمون", "منعش ومرطب"],
        benefits: ["منعش ومريح", "يحتوي على مكونات طبيعية"]
    },
    { 
        id: "FB016", name: "DXN جانودل", category: "أغذية ومشروبات", PV: 5.00, DP: 6.60, SV: 6.60 * 0.70, 
        uses: ["وجبة سريعة وصحية", "بديل للنودلز التقليدية"],
        benefits: ["مصنوعة من مكونات طبيعية", "خالية من الألوان الصناعية"]
    },
    { 
        id: "FB017", name: "DXN سبيرودل", category: "أغذية ومشروبات", PV: 5.00, DP: 6.60, SV: 6.60 * 0.70, 
        uses: ["وجبة سريعة وصحية", "مدعمة بالسبيرولينا"],
        benefits: ["تحتوي على السبيرولينا لتعزيز القيمة الغذائية", "خيار صحي لوجبة سريعة"]
    },
    { 
        id: "FB018", name: "DXN زيت جوز الهند العضوي البكر", category: "أغذية ومشروبات", PV: 14.00, DP: 15.30, SV: 15.30 * 0.70, 
        uses: ["للطهي", "للعناية بالبشرة والشعر"],
        benefits: ["زيت عضوي نقي", "غني بالأحماض الدهنية الصحية", "متعدد الاستخدامات"]
    },
    { 
        id: "FB019", name: "DXN ألو فيتا", category: "أغذية ومشروبات", PV: 4.00, DP: 3.55, SV: 3.55 * 0.70, 
        uses: ["مشروب مرطب ومنعش", "لصحة الجهاز الهضمي"],
        benefits: ["يحتوي على الألوفيرا المعروفة بفوائدها الهضمية", "مرطب للجسم"]
    },
    { 
        id: "FB020", name: "DXN شاي لاتيه لينجزي", category: "أغذية ومشروبات", PV: 12.00, DP: 13.60, SV: 13.60 * 0.70, 
        uses: ["مشروب شاي لاتيه", "للاسترخاء والراحة"],
        benefits: ["نكهة غنية ومريحة", "يحتوي على فطر الجانوديرما"]
    },
    { 
        id: "FB021", name: "DXN سكر (30 كيس × 5 جرام)", category: "أغذية ومشروبات", PV: 2.00, DP: 1.90, SV: 1.90 * 0.70, 
        uses: ["للتحلية اليومية"],
        benefits: ["سكر طبيعي نقي", "خيار صحي للتحلية"]
    },
    { 
        id: "FB022", name: "DXN عسل سدر طبيعي", category: "أغذية ومشروبات", PV: 28.00, DP: 29.90, SV: 29.90 * 0.70, 
        uses: ["للتحلية", "كمكمل غذائي طبيعي"],
        benefits: ["عسل سدر طبيعي نقي", "معروف بخصائصه الصحية والمغذية"]
    },

    // Health Food Supplement Series
    { 
        id: "HF001", name: "DXN فطر عرف الأسد 120 كبسولة", category: "مكملات غذائية صحية", PV: 26.00, DP: 24.10, SV: 24.10 * 0.70, 
        uses: ["لدعم صحة الدماغ والجهاز العصبي", "لتحسين الذاكرة والتركيز"],
        benefits: ["يعزز الوظائف الإدراكية", "يدعم صحة الجهاز الهضمي", "مضاد للالتهابات"]
    },
    { 
        id: "HF002", name: "DXN كورديسيبس 120 كبسولة", category: "مكملات غذائية صحية", PV: 60.00, DP: 54.95, SV: 54.95 * 0.70, 
        uses: ["لزيادة الطاقة والتحمل البدني", "لدعم صحة الجهاز التنفسي والكلى"],
        benefits: ["يعزز مستويات الطاقة والقدرة على التحمل", "يدعم وظائف الرئة والكلى", "يقوي الجهاز المناعي"]
    },
    { 
        id: "HF003", name: "DXN سبيرولينا 120 قرص", category: "مكملات غذائية صحية", PV: 20.00, DP: 16.35, SV: 16.35 * 0.70, 
        uses: ["مكمل غذائي يومي شامل", "لتعويض نقص الفيتامينات والمعادن"],
        benefits: ["غذاء سوبر غني بالبروتين والفيتامينات والمعادن", "يعزز المناعة والطاقة", "يساعد في إزالة السموم"]
    },
    { 
        id: "HF004", name: "DXN سبيرولينا 500 قرص", category: "مكملات غذائية صحية", PV: 70.00, DP: 56.85, SV: 56.85 * 0.70, 
        uses: ["مكمل غذائي يومي شامل", "لتعويض نقص الفيتامينات والمعادن"],
        benefits: ["غذاء سوبر غني بالبروتين والفيتامينات والمعادن", "يعزز المناعة والطاقة", "يساعد في إزالة السموم"]
    },
    { 
        id: "HF005", name: "DXN مايكوفيجي (115 جرام)", category: "مكملات غذائية صحية", PV: 70.00, DP: 51.65, SV: 51.65 * 0.70, 
        uses: ["لتنظيف الجهاز الهضمي", "كمصدر للألياف الغذائية"],
        benefits: ["يدعم صحة الجهاز الهضمي", "يساعد على إزالة السموم", "غني بالألياف والفيتامينات"]
    },
    { 
        id: "HF006", name: "مسحوق فطر الريشي 70 جرام", category: "مكملات غذائية صحية", PV: 70.00, DP: 53.70, SV: 53.70 * 0.70, 
        uses: ["مكمل غذائي يومي لدعم الصحة العامة", "لتعزيز المناعة"],
        benefits: ["ملك الأعشاب: يدعم المناعة", "يساعد على إزالة السموم", "يعزز التوازن في الجسم"]
    },
    { 
        id: "HF007", name: "DXN حبوب لقاح النحل 40 جرام", category: "مكملات غذائية صحية", PV: 17.00, DP: 14.10, SV: 14.10 * 0.70, 
        uses: ["مكمل غذائي طبيعي", "لزيادة الطاقة والحيوية"],
        benefits: ["غني بالفيتامينات والمعادن والبروتينات", "يعزز الطاقة والمناعة"]
    },
    // NEW PRODUCT: DXN Potenzhi 30 Capsules
    {
        id: "HF008", name: "DXN بوتنزي 30 كبسولة", category: "مكملات غذائية صحية", PV: 25.00, DP: 25.00, SV: 25.00 * 0.70,
        uses: ["لزيادة الحيوية والطاقة", "لدعم الأداء البدني", "لصحة الرجال والنساء"],
        benefits: ["يحسن الدورة الدموية", "يزيد مستويات الطاقة والقدرة على التحمل", "يتغلب على الإرهاق الذهني", "يقوي الأداء البدني", "يدعم صحة الكلى", "يخفض الكوليسترول", "يحتوي على مركبات الفلافونويد وفيتامين E"]
    },
    // NEW PRODUCT: DXN Potenzhi 90 Capsules
    {
        id: "HF009", name: "DXN بوتنزي 90 كبسولة", category: "مكملات غذائية صحية", PV: 60.00, DP: 55.00, SV: 55.00 * 0.70,
        uses: ["لزيادة الحيوية والطاقة", "لدعم الأداء البدني", "لصحة الرجال والنساء"],
        benefits: ["يحسن الدورة الدموية", "يزيد مستويات الطاقة والقدرة على التحمل", "يتغلب على الإرهاق الذهني", "يقوي الأداء البدني", "يدعم صحة الكلى", "يخفض الكوليسترول", "يحتوي على مركبات الفلافونويد وفيتامين E"]
    },

    // Personal Care Series
    { 
        id: "PC001", name: "DXN شامبو جانوزي", category: "عناية شخصية", PV: 11.00, DP: 7.80, SV: 7.80 * 0.70, 
        uses: ["تنظيف الشعر وفروة الرأس", "لشعر صحي ولامع"],
        benefits: ["يحتوي على خلاصة الجانوديرما", "يغذي فروة الرأس", "يمنح الشعر لمعاناً وحيوية"]
    },
    { 
        id: "PC002", name: "DXN جل استحمام جانوزي", category: "عناية شخصية", PV: 11.00, DP: 7.80, SV: 7.80 * 0.70, 
        uses: ["تنظيف الجسم أثناء الاستحمام", "لترطيب البشرة"],
        benefits: ["ينظف البشرة بلطف دون تجفيفها", "يحتوي على الجانوديرما لترطيب البشرة"]
    },
    { 
        id: "PC003", name: "معجون أسنان جانوزي 10 جرام", category: "عناية شخصية", PV: 6.00, DP: 5.85, SV: 5.85 * 0.70, 
        uses: ["تنظيف الأسنان يومياً", "لصحة الفم واللثة"],
        benefits: ["يحتوي على الجانوديرما والمنثول", "ينظف الأسنان بفاعلية", "يقوي اللثة ويمنح نفساً منعشاً"]
    },
    { 
        id: "PC004", name: "زيت جانو للتدليك", category: "عناية شخصية", PV: 9.00, DP: 7.60, SV: 7.60 * 0.70, 
        uses: ["للتدليك المريح", "لتهدئة العضلات والمفاصل"],
        benefits: ["يحتوي على خلاصة الجانوديرما وزيت النخيل", "يساعد على الاسترخاء وتخفيف التوتر"]
    },
    { 
        id: "PC005", name: "DXN بودرة التلك", category: "عناية شخصية", PV: 9.00, DP: 7.45, SV: 7.45 * 0.70, 
        uses: ["للحفاظ على البشرة جافة ومنتعشة", "لتقليل الاحتكاك"],
        benefits: ["يمتص الرطوبة الزائدة", "يمنح شعوراً بالانتعاش والراحة"]
    },
    { 
        id: "PC006", name: "DXN مجموعة سفر جانوزي للعناية الشخصية", category: "عناية شخصية", PV: 6.00, DP: 8.20, SV: 8.20 * 0.70, 
        uses: ["للعناية الشخصية أثناء السفر", "لتجربة منتجات جانوزي"],
        benefits: ["مجموعة عملية ومتكاملة للسفر", "تضم شامبو، جل استحمام، ومعجون أسنان"]
    },
    { 
        id: "PC007", name: "DXN معجون أسنان جانوزي بلس", category: "عناية شخصية", PV: 6.00, DP: 5.85, SV: 5.85 * 0.70, 
        uses: ["تنظيف الأسنان يومياً", "لصحة الفم واللثة"],
        benefits: ["تركيبة محسنة مع الجانوديرما", "تنظيف عميق وحماية للثة", "نفس منعش"]
    },
    { 
        id: "PC008", name: "DXN معجون أسنان جانوزي 4×40 جرام", category: "عناية شخصية", PV: 8.00, DP: 7.40, SV: 7.40 * 0.70, 
        uses: ["للاستخدام العائلي", "عبوات صغيرة عملية"],
        benefits: ["قيمة اقتصادية", "عبوات متعددة للاستخدامات المختلفة"]
    },
    { 
        id: "PC009", name: "DXN صابون جانوزي", category: "عناية شخصية", PV: 3.00, DP: 2.70, SV: 2.70 * 0.70, 
        uses: ["تنظيف البشرة يومياً", "للوجه والجسم"],
        benefits: ["ينظف ويرطب البشرة", "يحتوي على الجانوديرما وزيت النخيل", "مناسب لجميع أنواع البشرة"]
    },
    { 
        id: "PC010", name: "DXN شامبو جانوزي بلس", category: "عناية شخصية", PV: 12.00, DP: 8.20, SV: 8.20 * 0.70, 
        uses: ["تنظيف الشعر وفروة الرأس", "لشعر صحي ولامع"],
        benefits: ["تركيبة محسنة مع الجانوديرما", "يغذي الشعر ويمنحه قوة ولمعاناً"]
    },
    { 
        id: "PC011", name: "DXN فرشاة أسنان (للكبار)", category: "عناية شخصية", PV: 1.50, DP: 2.45, SV: 2.45 * 0.70, 
        uses: ["تنظيف الأسنان اليومي"],
        benefits: ["تصميم فعال لتنظيف الأسنان"]
    },
    { 
        id: "PC012", name: "DXN فرشاة أسنان (للأطفال)", category: "عناية شخصية", PV: 1.50, DP: 2.45, SV: 2.45 * 0.70, 
        uses: ["تنظيف أسنان الأطفال"],
        benefits: ["تصميم مناسب للأطفال"]
    },
    { 
        id: "PC013", name: "DXN معجون أسنان جانوزي بلس 150 جرام", category: "عناية شخصية", PV: 6.00, DP: 5.85, SV: 5.85 * 0.70, 
        uses: ["تنظيف الأسنان اليومي للعائلة"],
        benefits: ["عبوة اقتصادية", "نفس فوائد معجون جانوزي بلس"]
    },

    // Skin Care & Cosmetics Series
    { 
        id: "SC001", name: "كريم شجرة الشاي", category: "عناية بالبشرة وتجميل", PV: 6.00, DP: 5.85, SV: 5.85 * 0.70, 
        uses: ["لتهدئة البشرة المتهيجة", "للعناية بالبشرة المعرضة لحب الشباب"],
        benefits: ["يحتوي على زيت شجرة الشاي المعروف بخصائصه المطهرة والمهدئة", "يساعد على تهدئة البشرة"]
    },
    { 
        id: "SC002", name: "تونر جانوزي", category: "عناية بالبشرة وتجميل", PV: 36.00, DP: 27.65, SV: 27.65 * 0.70, 
        uses: ["لتنظيف البشرة بعد الغسول", "لتحضير البشرة للمرطب"],
        benefits: ["ينظف المسام بعمق", "يوازن درجة حموضة البشرة", "يحتوي على الجانوديرما لدعم صحة البشرة"]
    },
    { 
        id: "SC003", name: "مستحلب جانوزي المرطب", category: "عناية بالبشرة وتجميل", PV: 40.00, DP: 31.65, SV: 31.65 * 0.70, 
        uses: ["لترطيب البشرة يومياً", "للحفاظ على نضارة البشرة"],
        benefits: ["يرطب البشرة بعمق", "يساعد على الحفاظ على مرونة البشرة", "يحتوي على الجانوديرما"]
    },
    { 
        id: "SC004", name: "غسول جانوزي السائل", category: "عناية بالبشرة وتجميل", PV: 36.00, DP: 27.65, SV: 27.65 * 0.70, 
        uses: ["لتنظيف الوجه يومياً", "لإزالة الشوائب والمكياج"],
        benefits: ["ينظف البشرة بلطف وفعالية", "يترك البشرة منتعشة ونظيفة", "يحتوي على الجانوديرما"]
    },
    { 
        id: "SC005", name: "DXN زيت الأطفال", category: "عناية بالبشرة وتجميل", PV: 7.00, DP: 5.65, SV: 5.65 * 0.70, 
        uses: ["لترطيب بشرة الأطفال الحساسة", "للتدليك اللطيف"],
        benefits: ["تركيبة لطيفة ومغذية", "يحافظ على نعومة بشرة الطفل"]
    },
    { 
        id: "SC006", name: "أحمر شفاه جانوزي - كوكو ريد", category: "عناية بالبشرة وتجميل", PV: 17.00, DP: 12.40, SV: 12.40 * 0.70, 
        uses: ["لتلوين الشفاه", "لترطيب الشفاه"],
        benefits: ["ألوان جذابة", "يرطب الشفاه ويحميها", "يحتوي على الجانوديرما"]
    },
    { 
        id: "SC007", name: "أحمر شفاه جانوزي - أحمر لؤلؤي", category: "عناية بالبشرة وتجميل", PV: 17.00, DP: 12.40, SV: 12.40 * 0.70, 
        uses: ["لتلوين الشفاه", "لترطيب الشفاه"],
        benefits: ["ألوان جذابة", "يرطب الشفاه ويحميها", "يحتوي على الجانوديرما"]
    },
    { 
        id: "SC008", name: "أحمر شفاه جانوزي - وردي لؤلؤي", category: "عناية بالبشرة وتجميل", PV: 17.00, DP: 12.40, SV: 12.40 * 0.70, 
        uses: ["لتلوين الشفاه", "لترطيب الشفاه"],
        benefits: ["ألوان جذابة", "يرطب الشفاه ويحميها", "يحتوي على الجانوديرما"]
    },
    { 
        id: "SC009", name: "أحمر شفاه جانوزي - بنفسجي لؤلؤي", category: "عناية بالبشرة وتجميل", PV: 17.00, DP: 12.40, SV: 12.40 * 0.70, 
        uses: ["لتلوين الشفاه", "لترطيب الشفاه"],
        benefits: ["ألوان جذابة", "يرطب الشفاه ويحميها", "يحتوي على الجانوديرما"]
    },
    { 
        id: "SC010", name: "DXN جل الألوفيرا المنظف", category: "عناية بالبشرة وتجميل", PV: 7.00, DP: 5.65, SV: 5.65 * 0.70, 
        uses: ["لتنظيف البشرة بلطف", "لإزالة الشوائب"],
        benefits: ["ينظف البشرة دون تجفيفها", "يحتوي على الألوفيرا لتهدئة البشرة"]
    },
    { 
        id: "SC011", name: "DXN تونر الألوفيرا المرطب", category: "عناية بالبشرة وتجميل", PV: 7.00, DP: 6.10, SV: 6.10 * 0.70, 
        uses: ["لترطيب البشرة بعد التنظيف", "لتحضير البشرة للمرطب"],
        benefits: ["يرطب البشرة وينعشها", "يساعد على توازن البشرة"]
    },
    { 
        id: "SC012", name: "DXN جل الألوفيرا المائي", category: "عناية بالبشرة وتجميل", PV: 14.00, DP: 11.65, SV: 11.65 * 0.70, 
        uses: ["لترطيب البشرة الخفيف", "للبشرة الدهنية والمختلطة"],
        benefits: ["تركيبة خفيفة وسريعة الامتصاص", "يرطب البشرة بعمق دون ترك ملمس دهني"]
    },
    { 
        id: "SC013", name: "DXN كريم الألوفيرا المغذي", category: "عناية بالبشرة وتجميل", PV: 10.00, DP: 8.30, SV: 8.30 * 0.70, 
        uses: ["لتغذية البشرة الجافة والعادية", "للعناية اليومية بالبشرة"],
        benefits: ["يغذي البشرة ويمنحها النضارة", "يساعد على تحسين مرونة البشرة"]
    },
    { 
        id: "SC014", name: "DXN لوشن الألوفيرا لليدين والجسم", category: "عناية بالبشرة وتجميل", PV: 7.00, DP: 6.00, SV: 6.00 * 0.70, 
        uses: ["لترطيب اليدين والجسم يومياً", "للبشرة الجافة"],
        benefits: ["يرطب البشرة بعمق", "يترك البشرة ناعمة وملساء"]
    },
    { 
        id: "SC015", name: "DXN مجموعة جانوزي للعناية بالبشرة (للسفر)", category: "عناية بالبشرة وتجميل", PV: 34.00, DP: 23.95, SV: 23.95 * 0.70, 
        uses: ["للعناية الشخصية أثناء السفر", "لتجربة منتجات جانوزي للعناية بالبشرة"],
        benefits: ["مجموعة متكاملة للعناية بالبشرة بحجم السفر", "تضم غسول، تونر، ومرطب"]
    },
    { 
        id: "SC016", name: "DXN سكراب الألوفيرا للوجه", category: "عناية بالبشرة وتجميل", PV: 7.40, DP: 6.35, SV: 6.35 * 0.70, 
        uses: ["لتقشير الوجه بلطف", "لإزالة الخلايا الميتة"],
        benefits: ["ينظف المسام ويجدد البشرة", "يترك البشرة ناعمة ومشرقة"]
    },
    { 
        id: "SC017", name: "DXN ماسك الألوفيرا المرطب", category: "عناية بالبشرة وتجميل", PV: 9.60, DP: 8.30, SV: 8.30 * 0.70, 
        uses: ["لترطيب البشرة بعمق", "لتهدئة البشرة المتعبة"],
        benefits: ["يرطب البشرة ويغذيها", "يمنح البشرة مظهراً صحياً ومشرقاً"]
    },
    { 
        id: "SC018", name: "أحمر شفاه جانوزي - وردي مرجاني", category: "عناية بالبشرة وتجميل", PV: 17.00, DP: 12.40, SV: 12.40 * 0.70, 
        uses: ["لتلوين الشفاه", "لترطيب الشفاه"],
        benefits: ["ألوان جذابة", "يرطب الشفاه ويحميها", "يحتوي على الجانوديرما"]
    },
    { 
        id: "SC019", name: "DXN سكراب البابايا للوجه", category: "عناية بالبشرة وتجميل", PV: 8.00, DP: 8.05, SV: 8.05 * 0.70, 
        uses: ["لتقشير الوجه بلطف", "لإزالة الخلايا الميتة"],
        benefits: ["يحتوي على خلاصة البابايا لتجديد البشرة", "ينظف المسام ويمنح البشرة إشراقة"]
            },
            { 
                id: "SC020", name: "DXN زيت الأطفال 40 مل", category: "عناية بالبشرة وتجميل", PV: 2.00, DP: 1.70, SV: 1.70 * 0.70, 
                uses: ["لترطيب بشرة الأطفال الحساسة", "للتدليك اللطيف"],
                benefits: ["تركيبة لطيفة ومغذية", "يحافظ على نعومة بشرة الطفل"]
            }
        ];

        // Get DOM elements
        const calculateBtn = document.getElementById('calculateBtn');
        const budgetInput = document.getElementById('budget');
        const commissionRateInput = document.getElementById('commissionRate');
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
        const resultsSection = document.getElementById('results');
        const recommendedBundlesDiv = document.getElementById('recommendedBundles');
        const pvOverallProgressBar = document.getElementById('pvOverallProgressBar').querySelector('.pv-progress');
        const maxPossiblePvSpan = document.getElementById('maxPossiblePv');
        const messageDiv = document.getElementById('message');

        // Elements for manual bundle section
        const productSelect = document.getElementById('productSelect');
        const productQuantityInput = document.getElementById('productQuantity');
        const addProductBtn = document.getElementById('addProductBtn');
        const manualProductsTableBody = document.getElementById('manualProductsTableBody');
        const manualTotalPvSpan = document.getElementById('manualTotalPv');
        const manualTotalSvSpan = document.getElementById('manualTotalSv');
        const manualTotalCostSpan = document.getElementById('manualTotalCost');
        const manualEstimatedCommissionSpan = document.getElementById('manualEstimatedCommission');
        const printManualBundleBtn = document.getElementById('printManualBundleBtn');
        const copyManualBundleBtn = document.getElementById('copyManualBundleBtn');

        // Elements for product info section
        const productInfoListDiv = document.getElementById('productInfoList');


        // Array to hold manually added products
        let manualBundleItems = [];

        // Target PV for qualification
        const TARGET_PV = 100;

        // --- Event Listeners ---
        calculateBtn.addEventListener('click', calculateBestOptions);
        addProductBtn.addEventListener('click', addProductToManualBundle);
        commissionRateInput.addEventListener('input', updateManualBundleSummary);
        printManualBundleBtn.addEventListener('click', printManualBundle);
        copyManualBundleBtn.addEventListener('click', copyManualBundle);


        // --- Initialization ---
        populateProductSelect(); // Populate the dropdown with all products
        updateManualBundleSummary(); // Initial update for manual bundle summary
        displayProductInfo(); // Display product uses and benefits on load


        // --- Helper Functions ---

        // Populate the product dropdown in the manual bundle section
        function populateProductSelect() {
            productSelect.innerHTML = '<option value="">اختر منتج...</option>'; // Default option
            productsData.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id; // Use product ID as value
                option.textContent = `${product.name} (PV: ${product.PV}, السعر: ${product.DP.toFixed(2)} د.أ)`;
                productSelect.appendChild(option);
            });
        }

        // Add product to manual bundle
        function addProductToManualBundle() {
            const selectedProductId = productSelect.value;
            const quantity = parseInt(productQuantityInput.value);

            if (!selectedProductId || isNaN(quantity) || quantity <= 0) {
                showMessage('يرجى اختيار منتج وإدخال كمية صحيحة.', 'error');
                return;
            }

            const productToAdd = productsData.find(p => p.id === selectedProductId);
            if (!productToAdd) {
                showMessage('المنتج المختار غير موجود.', 'error');
                return;
            }

            // Check if product already exists in manual bundle, then update quantity
            const existingItemIndex = manualBundleItems.findIndex(item => item.id === selectedProductId);
            if (existingItemIndex > -1) {
                manualBundleItems[existingItemIndex].quantity += quantity;
            } else {
                manualBundleItems.push({ ...productToAdd, quantity: quantity });
            }

            updateManualBundleDisplay();
            updateManualBundleSummary();
            showMessage('تمت إضافة المنتج بنجاح إلى مجموعتك المخصصة.', 'success');
        }

        // Remove product from manual bundle
        function removeProductFromManualBundle(productId) {
            manualBundleItems = manualBundleItems.filter(item => item.id !== productId);
            updateManualBundleDisplay();
            updateManualBundleSummary();
            showMessage('تمت إزالة المنتج من مجموعتك المخصصة.', 'info');
        }

        // Update the display table for manual bundle
        function updateManualBundleDisplay() {
            manualProductsTableBody.innerHTML = ''; // Clear table
            manualBundleItems.forEach(item => {
                const row = manualProductsTableBody.insertRow();
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${(item.PV * item.quantity).toFixed(2)}</td>
                    <td>${(item.SV * item.quantity).toFixed(2)}</td>
                    <td>${(item.DP * item.quantity).toFixed(2)}</td>
                    <td><button onclick="removeProductFromManualBundle('${item.id}')">حذف</button></td>
                `;
            });
        }

        // Update the summary for manual bundle
        function updateManualBundleSummary() {
            const commissionRate = parseFloat(commissionRateInput.value);
            const bundle = createBundle(manualBundleItems, commissionRate);

            manualTotalPvSpan.textContent = bundle.totalPV.toFixed(2);
            manualTotalSvSpan.textContent = bundle.totalSV.toFixed(2);
            manualTotalCostSpan.textContent = bundle.totalCost.toFixed(2);
            manualEstimatedCommissionSpan.textContent = bundle.estimatedCommission.toFixed(2);
        }

        // Function to print the manual bundle
        function printManualBundle() {
            const printContent = document.getElementById('manualBundleDisplay').innerHTML;
            const originalBody = document.body.innerHTML;

            // Create a new window for printing
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(`
                <html>
                <head>
                    <title>مجموعتك المخصصة من DXN</title>
                    <style>
                        body { font-family: 'Inter', sans-serif; direction: rtl; text-align: right; margin: 20px; }
                        h3 { font-size: 24px; margin-bottom: 20px; text-align: center; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                        th { background-color: #f2f2f2; }
                        .summary-stats { margin-top: 20px; padding: 15px; border: 1px solid #eee; background-color: #f9f9f9; border-radius: 8px; }
                        .summary-stats p { margin-bottom: 5px; }
                        .summary-stats strong { font-weight: bold; }
                        /* Hide buttons in print view */
                        .manual-products-table button, .action-buttons { display: none; }
                    </style>
                </head>
                <body>
                    ${printContent}
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }

        // Function to copy the manual bundle summary to clipboard
        function copyManualBundle() {
            const totalPv = manualTotalPvSpan.textContent;
            const totalSv = manualTotalSvSpan.textContent;
            const totalCost = manualTotalCostSpan.textContent;
            const estimatedCommission = manualEstimatedCommissionSpan.textContent;

            let textSummary = `ملخص مجموعتك المخصصة من DXN:\n\n`;
            textSummary += `المنتجات:\n`;
            manualBundleItems.forEach(item => {
                textSummary += `- ${item.name} (الكمية: ${item.quantity}) - PV: ${(item.PV * item.quantity).toFixed(2)}, SV: ${(item.SV * item.quantity).toFixed(2)}, السعر: ${(item.DP * item.quantity).toFixed(2)} د.أ\n`;
            });
            textSummary += `\nإجمالي النقاط (PV): ${totalPv}\n`;
            textSummary += `إجمالي قيمة المبيعات (SV): ${totalSv}\n`;
            textSummary += `إجمالي التكلفة: ${totalCost} د.أ\n`;
            textSummary += `العمولة الشهرية التقديرية: ${estimatedCommission} د.أ\n`;
            textSummary += `\nملاحظة: العمولة التقديرية تُحسب فقط إذا تجاوزت المجموعة 100 نقطة PV.\n`;
            textSummary += `\nللمزيد من التفاصيل أو لطلب المنتجات، يرجى التواصل معي.`; // يمكنك إضافة رابط هنا

            // Use document.execCommand('copy') as it's more reliable in sandboxed environments
            const textarea = document.createElement('textarea');
            textarea.value = textSummary;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showMessage('تم نسخ ملخص المجموعة إلى الحافظة بنجاح!', 'success');
            } catch (err) {
                console.error('فشل نسخ الملخص باستخدام document.execCommand("copy"): ', err);
                showMessage('فشل نسخ الملخص. يرجى المحاولة يدوياً.', 'error');
            }
            document.body.removeChild(textarea);
        }


        // Helper function to create a bundle object (used by both auto and manual)
        function createBundle(items, commissionRate) {
            let totalPV = 0;
            let totalCost = 0;
            let totalSV = 0;
            items.forEach(item => {
                totalPV += item.PV * item.quantity;
                totalCost += item.DP * item.quantity;
                totalSV += item.SV * item.quantity;
            });
            // Calculate estimated commission based on total SV and commission rate
            // Commission is only earned if 100 PV is achieved
            const estimatedCommission = (totalPV >= TARGET_PV) ? (totalSV * (commissionRate / 100)) : 0;
            return { items, totalPV, totalCost, totalSV, estimatedCommission };
        }

        // Function to generate a bundle based on a specific strategy
        function generateBundle(products, budget, targetPV, commissionRate, strategy = 'efficiency') {
            let currentBundleMap = new Map();
            let currentPV = 0;
            let currentCost = 0;
            let currentSV = 0;
            let tempBudget = budget;

            let sortedProducts = [...products];

            if (strategy === 'efficiency') { // Maximize PV per JOD
                sortedProducts.sort((a, b) => (b.PV / b.DP) - (a.PV / a.DP));
            } else if (strategy === 'cost_per_pv') { // Minimize JOD per PV
                sortedProducts.sort((a, b) => (a.DP / a.PV) - (b.DP / b.PV));
            } else if (strategy === 'highest_pv') { // Prioritize highest PV products
                sortedProducts.sort((a, b) => b.PV - a.PV);
            } else if (strategy === 'lowest_cost') { // Prioritize lowest cost products
                sortedProducts.sort((a, b) => a.DP - b.DP);
            }

            // First pass: add one unit of each product, prioritizing by strategy
            for (const product of sortedProducts) {
                if (tempBudget >= product.DP) {
                    currentBundleMap.set(product.name, { ...product, quantity: 1 });
                    currentPV += product.PV;
                    currentCost += product.DP;
                    currentSV += product.SV;
                    tempBudget -= product.DP;

                    if (currentPV >= targetPV) {
                        break;
                    }
                }
            }

            // Second pass: try to add more units to reach target PV or exhaust budget
            let hasAddedMoreInPass = true;
            while (currentPV < targetPV && tempBudget > 0 && hasAddedMoreInPass) {
                hasAddedMoreInPass = false;
                for (const product of sortedProducts) {
                    if (currentPV >= targetPV || tempBudget < product.DP) continue;
                    
                    const existingBundleItem = currentBundleMap.get(product.name);
                    if (existingBundleItem) {
                        if (tempBudget >= product.DP) {
                            existingBundleItem.quantity++; 
                            currentPV += product.PV;
                            currentCost += product.DP;
                            currentSV += product.SV;
                            tempBudget -= product.DP;
                            hasAddedMoreInPass = true;
                        }
                    } else if (tempBudget >= product.DP) {
                        currentBundleMap.set(product.name, { ...product, quantity: 1 });
                        currentPV += product.PV;
                        currentCost += product.DP;
                        currentSV += product.SV;
                        tempBudget -= product.DP;
                        hasAddedMoreInPass = true;
                    }
                }
            }

            const itemsArray = []; // Explicitly initialize itemsArray
            currentBundleMap.forEach(item => itemsArray.push(item)); // Populate itemsArray

            // Calculate estimated commission for this bundle
            const estimatedCommission = (currentPV >= TARGET_PV) ? (currentSV * (commissionRate / 100)) : 0;

            return { items: itemsArray, totalPV: currentPV, totalCost: currentCost, totalSV: currentSV, estimatedCommission };
        }

        // Main calculation logic for auto-generated bundles
        function calculateBestOptions() {
            const budget = parseFloat(budgetInput.value);
            const commissionRate = parseFloat(commissionRateInput.value);
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            // Input validation
            if (isNaN(budget) || budget <= 0) {
                showMessage('يرجى إدخال ميزانية شهرية صحيحة وموجبة.', 'error');
                resultsSection.classList.add('hidden');
                return;
            }
            if (isNaN(commissionRate) || commissionRate < 6 || commissionRate > 37) {
                showMessage('يرجى إدخال نسبة عمولة صحيحة (بين 6% و 37%).', 'error');
                resultsSection.classList.add('hidden');
                return;
            }
            if (selectedCategories.length === 0) {
                showMessage('يرجى اختيار فئة واحدة على الأقل من المنتجات.', 'error');
                resultsSection.classList.add('hidden');
                return;
            }

            let filteredProducts = productsData.filter(product =>
                selectedCategories.includes(product.category)
            );

            if (filteredProducts.length === 0) {
                showMessage('عذراً، لا توجد منتجات في الفئات المختارة.', 'info');
                resultsSection.classList.add('hidden');
                return;
            }

            let allCandidateBundles = [];

            // Generate bundles using different strategies
            allCandidateBundles.push(generateBundle(filteredProducts, budget, TARGET_PV, commissionRate, 'efficiency'));
            allCandidateBundles.push(generateBundle(filteredProducts, budget, TARGET_PV, commissionRate, 'cost_per_pv'));
            allCandidateBundles.push(generateBundle(filteredProducts, budget, TARGET_PV, commissionRate, 'highest_pv'));
            allCandidateBundles.push(generateBundle(filteredProducts, budget, TARGET_PV, commissionRate, 'lowest_cost'));
            // Can add more strategies here for more diversity

            // Filter out invalid bundles
            let validBundles = allCandidateBundles.filter(b => b.items.length > 0 && b.totalCost <= budget);

            // Remove duplicate bundles
            const uniqueBundles = new Map(); // Use Map to store unique bundles by key
            validBundles.forEach(bundle => {
                const bundleKey = bundle.items.map(item => `${item.name}:${item.quantity}`).sort().join(';');
                // Only add if not already seen, or if this bundle is "better" (e.g., higher PV)
                if (!uniqueBundles.has(bundleKey) || uniqueBundles.get(bundleKey).totalPV < bundle.totalPV) {
                    uniqueBundles.set(bundleKey, bundle);
                }
            });
            validBundles = Array.from(uniqueBundles.values());


            // Sort valid bundles to find the "best" ones
            validBundles.sort((a, b) => {
                const diffA = Math.abs(a.totalPV - TARGET_PV);
                const diffB = Math.abs(b.totalPV - TARGET_PV);
                if (diffA !== diffB) {
                    return diffA - diffB;
                }
                if (a.totalCost !== b.totalCost) {
                    return a.totalCost - b.totalCost;
                }
                return b.totalPV - a.totalPV;
            });

            const topNBundles = validBundles.slice(0, 5); // Display up to 5 best options

            displayResults(topNBundles, budget);
        }

        // Function to display results in the UI
        function displayResults(bundles, budget) {
            resultsSection.classList.remove('hidden');
            recommendedBundlesDiv.innerHTML = ''; // Clear previous results
            messageDiv.innerHTML = ''; // Clear previous messages

            if (bundles.length === 0) {
                showMessage('عذراً، لم نتمكن من العثور على مجموعات منتجات مناسبة ضمن ميزانيتك والفئات المختارة.', 'info');
                pvOverallProgressBar.style.width = '0%';
                pvOverallProgressBar.textContent = '0 PV';
                maxPossiblePvSpan.textContent = '0';
                return;
            }

            let maxAchievedPv = 0;
            let anyBundleReachedTarget = false;

            // Display each recommended bundle
            bundles.forEach((bundle, index) => {
                const optionCard = document.createElement('div');
                optionCard.className = 'option-card';
                optionCard.innerHTML = `
                    <h3 class="mb-4">الخيار رقم ${index + 1}</h3>
                    <div class="summary-stats mb-4">
                        <p>إجمالي النقاط (PV): <strong>${bundle.totalPV.toFixed(2)}</strong></p>
                        <p>إجمالي قيمة المبيعات (SV): <strong>${bundle.totalSV.toFixed(2)}</strong></p>
                        <p>إجمالي التكلفة (دينار أردني): <strong>${bundle.totalCost.toFixed(2)}</strong></p>
                        <p>العمولة الشهرية التقديرية: <strong>${bundle.estimatedCommission.toFixed(2)}</strong> دينار أردني</p>
                        <p>الميزانية المتبقية: <strong>${(budget - bundle.totalCost).toFixed(2)}</strong> دينار أردني</p>
                    </div>
                    <div class="pv-progress-bar mb-4">
                        <div class="pv-progress" style="width: ${Math.min((bundle.totalPV / TARGET_PV) * 100, 100)}%;">
                            ${bundle.totalPV.toFixed(2)} PV
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 mb-2">المنتجات في هذه المجموعة:</p>
                    <div class="product-list">
                        ${bundle.items.map(item => `
                            <div class="product-item">
                                <span>${item.name}</span>
                                <span>الكمية: <strong>${item.quantity}</strong> | PV: <strong>${(item.PV * item.quantity).toFixed(2)}</strong> | SV: <strong>${(item.SV * item.quantity).toFixed(2)}</strong> | السعر: <strong>${(item.DP * item.quantity).toFixed(2)}</strong></span>
                            </div>
                        `).join('')}
                    </div>
                `;
                recommendedBundlesDiv.appendChild(optionCard);

                if (bundle.totalPV > maxAchievedPv) {
                    maxAchievedPv = bundle.totalPV;
                }
                if (bundle.totalPV >= TARGET_PV) {
                    anyBundleReachedTarget = true;
                }
            });

            // تحديث شريط التقدم العام وأقصى PV ممكن
            const overallPvPercentage = Math.min((maxAchievedPv / TARGET_PV) * 100, 100);
            pvOverallProgressBar.style.width = `${overallPvPercentage}%`;
            pvOverallProgressBar.textContent = `${maxAchievedPv.toFixed(2)} PV`;
            if (maxAchievedPv >= TARGET_PV) {
                pvOverallProgressBar.style.backgroundColor = '#10b981'; // أخضر للنجاح
            } else {
                pvOverallProgressBar.style.backgroundColor = '#3b82f6'; // أزرق
            }
            maxPossiblePvSpan.textContent = maxAchievedPv.toFixed(2);

            // عرض الرسائل النهائية
            if (anyBundleReachedTarget) {
                showMessage('تهانينا! تم العثور على خيارات تحقق 100 نقطة (PV) أو أكثر ضمن ميزانيتك.', 'success');
            } else if (maxAchievedPv > 0) {
                showMessage(`لم يتم تحقيق 100 نقطة (PV) في أي من الخيارات. أعلى نقاط يمكن تحقيقها هي ${maxAchievedPv.toFixed(2)} PV ضمن ميزانيتك.`, 'info');
            } else {
                showMessage('عذراً، لم نتمكن من العثور على أي مجموعات منتجات مناسبة ضمن ميزانيتك والفئات المختارة.', 'info');
            }
        }

        // وظيفة مساعدة لعرض الرسائل (خطأ، معلومات، نجاح)
        function showMessage(msg, type) {
            messageDiv.innerHTML = `<div class="${type}-message">${msg}</div>`;
        }

        // وظيفة لعرض معلومات المنتجات (الاستخدامات والمزايا)
        function displayProductInfo() {
            const productInfoListDiv = document.getElementById('productInfoList');
            productInfoListDiv.innerHTML = ''; // مسح المحتوى السابق

            // Group products by category
            const productsByCategory = productsData.reduce((acc, product) => {
                if (!acc[product.category]) {
                    acc[product.category] = [];
                }
                acc[product.category].push(product);
                return acc;
            }, {});

            for (const category in productsByCategory) {
                const categoryDetails = document.createElement('details');
                categoryDetails.className = 'product-info-item bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4';
                
                const categorySummary = document.createElement('summary');
                categorySummary.className = 'text-xl font-bold text-gray-800 cursor-pointer py-2';
                categorySummary.textContent = category;
                categoryDetails.appendChild(categorySummary);

                const categoryContentContainer = document.createElement('div'); // Container for products within this category
                categoryContentContainer.className = 'mt-3 space-y-3';

                productsByCategory[category].forEach(product => {
                    const productDetails = document.createElement('details');
                    productDetails.className = 'bg-gray-50 p-3 rounded-lg border border-gray-200';

                    const productSummary = document.createElement('summary');
                    productSummary.className = 'text-lg font-medium text-gray-700 cursor-pointer flex justify-content-between items-center';
                    productSummary.innerHTML = `
                        <span>${product.name}</span>
                    `;

                    // Create productContent div for each product
                    const productContent = document.createElement('div'); 
                    productContent.className = 'mt-2 text-gray-600';
                    productContent.innerHTML = `
                        ${product.uses && product.uses.length > 0 ? `<p class="font-semibold mb-1">الاستخدامات:</p><ul class="list-disc pr-5 mb-2">${product.uses.map(use => `<li>${use}</li>`).join('')}</ul>` : ''}
                        ${product.benefits && product.benefits.length > 0 ? `<p class="font-semibold mb-1">المزايا:</p><ul class="list-disc pr-5">${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>` : ''}
                    `;
                    
                    productDetails.appendChild(productSummary);
                    productDetails.appendChild(productContent); // Append the product-specific content
                    categoryContentContainer.appendChild(productDetails); // Append the product details to the category container
                });
                categoryDetails.appendChild(categoryContentContainer); // Append the category container to the category details
                productInfoListDiv.appendChild(categoryDetails);
            }
        }


        // تنفيذ الحساب الأولي وعرض معلومات المنتجات عند تحميل الصفحة
        calculateBestOptions();
        displayProductInfo();
    </script>
</body>
</html>
