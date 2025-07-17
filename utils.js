// رسالة لتأكيد تحميل الملف
console.log("utils.js loaded successfully.");

// تعريف النقاط المستهدفة للتأهيل (100 نقطة)
const TARGET_PV = 100;

// وظيفة مساعدة لعرض الرسائل (خطأ، معلومات، نجاح)
function showMessage(msg, type) {
    const messageDiv = document.getElementById('message'); // تأكد من وجود عنصر div بـ id="message" في HTML
    if (messageDiv) {
        messageDiv.innerHTML = `<div class="${type}-message p-3 rounded-lg mt-4 font-semibold">${msg}</div>`;
        // إزالة الرسالة بعد 5 ثوانٍ (اختياري)
        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 5000);
    } else {
        console.warn('Element with id "message" not found to display message:', msg);
    }
}

// وظيفة مساعدة لإنشاء كائن حزمة (Bundle)
// تستقبل مصفوفة من عناصر المنتج (كل عنصر يحتوي على المنتج والكمية) ونسبة العمولة
function createBundle(items, commissionRate) {
    let totalPV = 0;
    let totalCost = 0;
    let totalSV = 0;
    items.forEach(item => {
        totalPV += item.PV * item.quantity;
        totalCost += item.DP * item.quantity;
        totalSV += item.SV * item.quantity;
    });
    // حساب العمولة التقديرية بناءً على إجمالي SV ونسبة العمولة
    // العمولة تُكتسب فقط إذا تم تحقيق 100 PV أو أكثر
    const estimatedCommission = (totalPV >= TARGET_PV) ? (totalSV * (commissionRate / 100)) : 0;
    return { items, totalPV, totalCost, totalSV, estimatedCommission };
}

// وظيفة لتوليد حزمة بناءً على استراتيجية محددة
// تستخدم نهجاً جشعاً (Greedy Algorithm) لمحاولة تحقيق TARGET_PV ضمن الميزانية
function generateBundle(products, budget, targetPV, commissionRate, strategy = 'efficiency') {
    let currentBundleMap = new Map(); // Map لتخزين المنتجات المختارة وكمياتها
    let currentPV = 0;
    let currentCost = 0;
    let currentSV = 0;
    let tempBudget = budget; // ميزانية مؤقتة لتتبع الإنفاق

    let sortedProducts = [...products]; // استنساخ مصفوفة المنتجات لتجنب تعديل الأصل

    // فرز المنتجات بناءً على الاستراتيجية المختارة
    if (strategy === 'efficiency') { // تعظيم النقاط لكل دينار (PV/DP)
        sortedProducts.sort((a, b) => (b.PV / b.DP) - (a.PV / a.DP));
    } else if (strategy === 'cost_per_pv') { // تقليل التكلفة لكل نقطة (DP/PV)
        sortedProducts.sort((a, b) => (a.DP / a.PV) - (b.DP / b.PV));
    } else if (strategy === 'highest_pv') { // إعطاء الأولوية للمنتجات ذات النقاط الأعلى
        sortedProducts.sort((a, b) => b.PV - a.PV);
    } else if (strategy === 'lowest_cost') { // إعطاء الأولوية للمنتجات الأقل تكلفة
        sortedProducts.sort((a, b) => a.DP - b.DP);
    }

    // المرور الأول: إضافة وحدة واحدة من كل منتج، مع إعطاء الأولوية حسب الاستراتيجية
    for (const product of sortedProducts) {
        if (tempBudget >= product.DP) {
            currentBundleMap.set(product.name, { ...product, quantity: 1 });
            currentPV += product.PV;
            currentCost += product.DP;
            currentSV += product.SV;
            tempBudget -= product.DP;

            if (currentPV >= targetPV) {
                break; // إذا تم تحقيق الهدف، نوقف الإضافة الأولية
            }
        }
    }

    // المرور الثاني: محاولة إضافة المزيد من الوحدات للمنتجات الموجودة في الحزمة
    // أو إضافة منتجات جديدة (إذا لم تكن موجودة) للوصول إلى الـ PV المستهدف أو استنفاد الميزانية.
    let hasAddedMoreInPass = true;
    while (currentPV < targetPV && tempBudget > 0 && hasAddedMoreInPass) {
        hasAddedMoreInPass = false; // نفترض عدم وجود إضافات أخرى لهذه الدورة
        for (const product of sortedProducts) { // التكرار عبر القائمة المفرزة مرة أخرى
            if (currentPV >= targetPV || tempBudget < product.DP) continue; // تخطي إذا تم تحقيق الهدف أو لا يمكن تحمل تكلفة المنتج
            
            const existingBundleItem = currentBundleMap.get(product.name);
            if (existingBundleItem) {
                // إذا كان المنتج موجوداً بالفعل، حاول زيادة كميته
                if (tempBudget >= product.DP) {
                    existingBundleItem.quantity++; 
                    currentPV += product.PV;
                    currentCost += product.DP;
                    currentSV += product.SV;
                    tempBudget -= product.DP;
                    hasAddedMoreInPass = true; // تم إضافة شيء، لذا نستمر في التكرار
                }
            } else if (tempBudget >= product.DP) {
                // إذا لم يكن المنتج في الحزمة، ولدينا ميزانية متبقية، أضفه كعنصر جديد
                currentBundleMap.set(product.name, { ...product, quantity: 1 });
                currentPV += product.PV;
                currentCost += product.DP;
                currentSV += product.SV;
                tempBudget -= product.DP;
                hasAddedMoreInPass = true; // تم إضافة شيء، لذا نستمر في التكرار
            }
        }
    }

    const itemsArray = []; // تهيئة مصفوفة المنتجات في الحزمة
    currentBundleMap.forEach(item => itemsArray.push(item)); // تعبئة المصفوفة

    // حساب العمولة التقديرية لهذه الحزمة
    const estimatedCommission = (currentPV >= targetPV) ? (totalSV * (commissionRate / 100)) : 0;

    return { items: itemsArray, totalPV: currentPV, totalCost: currentCost, totalSV: currentSV, estimatedCommission };
}

// وظيفة مساعدة لإنشاء شريط التنقل (Navbar)
// تم جعلها متاحة عالمياً
window.createNavbar = function(currentPageId) {
    const navItems = [
        { id: "index-page", text: "الرئيسية", href: "index.html" },
        { id: "idea-page", text: "الفكرة الأساسية", href: "idea.html" },
        { id: "mlm-page", text: "فرصة العمل", href: "mlm.html" },
        { id: "products-page", text: "المنتجات", href: "products.html" },
        { id: "commissions-page", text: "العمولات", href: "commissions.html" },
        { id: "budget-planner-page", text: "خطط ميزانيتك", href: "budget-planner.html" },
        { id: "manual-bundle-page", text: "مجموعتك الخاصة", href: "manual-bundle.html" },
        { id: "general-info-page", text: "معلومات الريشي", href: "general-info.html" },
        { id: "resources-page", text: "مصادر إضافية", href: "resources.html" }
    ];

    let navbarHtml = '<nav class="navbar">';
    navItems.forEach(item => {
        const isActive = (item.id === currentPageId) ? 'bg-blue-700' : ''; // Highlight active page
        navbarHtml += `<a href="${item.href}" class="${isActive}">${item.text}</a>`;
    });
    navbarHtml += '</nav>';
    document.body.insertAdjacentHTML('afterbegin', navbarHtml);
};
