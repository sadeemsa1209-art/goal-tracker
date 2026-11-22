// 1. تحديد العناصر من صفحة الـ HTML
const goalForm = document.getElementById('goalForm');
const goalInput = document.getElementById('goalInput');
const priorityInput = document.getElementById('priorityInput');
const termInput = document.getElementById('termInput');
const goalsList = document.getElementById('goalsList');

// 2. مصفوفة لتخزين الأهداف وحفظها في المتصفح
let goals = JSON.parse(localStorage.getItem('myGoals')) || [];

// 3. دالة لعرض الأهداف على الشاشة
function renderGoals() {
  goalsList.innerHTML = '';

  goals.forEach((goal, index) => {
    const goalCard = document.createElement('div');
    goalCard.className = `goal-card priority-${goal.priority}`;
    
    goalCard.innerHTML = `
      <div style="padding: 12px; margin-top: 10px; background: #faf8f5; border-radius: 8px;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px;">${goal.title}</h3>
        <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">
          المدى: ${goal.term === 'short' ? 'قريب المدى' : 'بعيد المدى'} | التقدم: <strong>${goal.progress}</strong>
        </p>
        
        <!-- خيارات التقييم -->
        <select onchange="updateProgress(${index}, this.value)" style="padding: 4px; font-size: 12px;">
          <option value="لم يبدأ" ${goal.progress === 'لم يبدأ' ? 'selected' : ''}>⏳ لم يبدأ</option>
          <option value="ضعيف" ${goal.progress === 'ضعيف' ? 'selected' : ''}>📉 ضعيف</option>
          <option value="جيد" ${goal.progress === 'جيد' ? 'selected' : ''}>📊 جيد</option>
          <option value="ممتاز" ${goal.progress === 'ممتاز' ? 'selected' : ''}>⭐ ممتاز</option>
        </select>

        <button onclick="deleteGoal(${index})" style="background: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 8px; cursor: pointer;">حذف</button>
      </div>
    `;

    goalsList.appendChild(goalCard);
  });
}

// 4. دالة إضافة هدف جديد
goalForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const newGoal = {
    title: goalInput.value,
    priority: priorityInput.value,
    term: termInput.value,
    progress: 'لم يبدأ'
  };

  goals.push(newGoal);
  localStorage.setItem('myGoals', JSON.stringify(goals));
  
  goalInput.value = '';
  renderGoals();
});

// 5. دالة تحديث التقدم
function updateProgress(index, newProgress) {
  goals[index].progress = newProgress;
  localStorage.setItem('myGoals', JSON.stringify(goals));
  renderGoals();
}

// 6. دالة حذف الهدف
function deleteGoal(index) {
  goals.splice(index, 1);
  localStorage.setItem('myGoals', JSON.stringify(goals));
  renderGoals();
}

// تشغيل عرض الأهداف فور فتح الصفحة
renderGoals();
