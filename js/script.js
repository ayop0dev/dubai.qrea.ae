const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxS5h7EF5gA7aFMBrmNX4JdbUvcu7grLBLWTnY9RIGP945tULxLIw1gq-A0n8DulAuQBg/exec';

document.querySelector('#leadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('.submit');
  const originalText = btn.textContent;
  const errorEl = document.getElementById('formError');

  if (errorEl) errorEl.style.display = 'none';

  const lang = document.documentElement.lang;
  btn.disabled = true;
  btn.textContent = lang === 'en' ? 'Sending...' : 'جاري الإرسال...';

  const data = {
    name: form.elements['name'].value,
    phone: form.phone.value,
    email: form.email.value,
    budget: form.budget.value,
    goal: form.goal.value,
    lang: form.elements['lang'] ? form.elements['lang'].value : 'ar'
  };

  try {
    const params = new URLSearchParams();
    Object.keys(data).forEach(key => params.append(key, data[key]));

    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: params
    });

    form.style.display = 'none';
    const successEl = document.getElementById('formSuccess');
    if (successEl) successEl.style.display = 'block';

  } catch (err) {
    if (errorEl) {
      errorEl.style.display = 'block';
    }
    btn.disabled = false;
    btn.textContent = originalText;
  }
});
