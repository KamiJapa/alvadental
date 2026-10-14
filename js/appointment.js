import { WHATSAPP_NUMBER } from './config.js';
export const interests = ['Clínica geral', 'Prevenção', 'Ortodontia', 'Estética odontológica', 'Periodontia', 'Reabilitação oral', 'Ainda não sei'];
export function tomorrowISO(now = new Date()) {
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
}
export function validFutureDate(value, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d && value >= tomorrowISO(now);
}
export function formatDate(value) { return value.split('-').reverse().join('/'); }
export function composeRequest(data) {
  return `ALVA DENTAL — solicitação demonstrativa\nÁrea de interesse: ${data.interest}\nPeríodo: ${data.period}\nData de preferência: ${formatDate(data.date)}${data.firstName ? `\nPrimeiro nome: ${data.firstName}` : ''}${data.message ? `\nMensagem: ${data.message}` : ''}\nEsta é uma demonstração. Não representa agendamento ou reserva.`;
}
export function initAppointment() {
  const form = document.querySelector('#appointment-form');
  const fields = [...form.querySelectorAll('[data-step]')];
  const error = document.querySelector('#form-error');
  const status = document.querySelector('#form-status');
  const date = document.querySelector('#date');
  const request = document.querySelector('#request-text');
  const next = document.querySelector('#next');
  const back = document.querySelector('#back');
  const copy = document.querySelector('#copy');
  const whatsapp = document.querySelector('#whatsapp');
  let step = 0;
  interests.forEach((interest) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio'; input.name = 'interest'; input.value = interest;
    label.append(input, document.createTextNode(interest));
    document.querySelector('#interest-options').append(label);
  });
  const data = () => Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, String(value).trim()]));
  function review() {
    const values = data();
    const list = document.querySelector('#review'); list.replaceChildren();
    [['Área', values.interest], ['Período', values.period], ['Data', formatDate(values.date)], ['Nome', values.firstName || 'Não informado']].forEach(([label, value]) => {
      const row = document.createElement('div'); const term = document.createElement('dt'); const description = document.createElement('dd');
      term.textContent = label; description.textContent = value; row.append(term, description); list.append(row);
    });
    request.value = composeRequest(values);
    const hasNumber = /^[1-9]\d{9,14}$/.test(WHATSAPP_NUMBER);
    whatsapp.hidden = !hasNumber;
    if (hasNumber) whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(request.value)}`;
  }
  function showStep(focus = true) {
    fields.forEach((field, index) => { field.hidden = index !== step; field.disabled = false; });
    document.querySelector('#step-label').textContent = `Etapa ${step + 1} de 5`;
    document.querySelector('#progress').value = step + 1;
    back.hidden = step === 0; next.hidden = step === 4; copy.hidden = step !== 4;
    error.textContent = ''; status.textContent = ''; date.removeAttribute('aria-invalid');
    date.min = tomorrowISO();
    if (step === 4) review();
    if (focus) fields[step].querySelector('legend').focus({ preventScroll: true });
  }
  function validate() {
    const values = data(); let message = ''; let target;
    if (step === 0 && !interests.includes(values.interest)) { message = 'Selecione uma área de interesse ou “Ainda não sei”.'; target = form.querySelector('[name=interest]'); }
    if (step === 1 && !['Manhã', 'Tarde', 'Sem preferência'].includes(values.period)) { message = 'Escolha um período ou “Sem preferência”.'; target = form.querySelector('[name=period]'); }
    if (step === 2 && !validFutureDate(values.date)) { message = 'Escolha uma data válida a partir de amanhã.'; target = date; date.setAttribute('aria-invalid', 'true'); }
    if (step === 3 && (values.firstName.length > 40 || values.message.length > 300)) { message = 'Use até 40 caracteres no nome e 300 na mensagem.'; target = form.querySelector('#first-name'); }
    error.textContent = message;
    if (target) target.focus();
    return !message;
  }
  form.addEventListener('submit', (event) => { event.preventDefault(); if (step < 4 && validate()) { step++; showStep(); } });
  back.addEventListener('click', () => { step = Math.max(0, step - 1); showStep(); });
  document.querySelector('#edit-request').addEventListener('click', () => { step = 0; showStep(); });
  document.querySelector('#reset-request').addEventListener('click', () => { form.reset(); request.value = ''; document.querySelector('#review').replaceChildren(); document.querySelector('#message-count').textContent = '0 / 300 caracteres'; whatsapp.removeAttribute('href'); step = 0; showStep(); });
  form.querySelector('#message').addEventListener('input', (event) => { document.querySelector('#message-count').textContent = `${event.target.value.length} / 300 caracteres`; });
  copy.addEventListener('click', async () => {
    // Revalidate dates in case the page remained open overnight.
    if (!validFutureDate(data().date)) { step = 2; showStep(); validate(); return; }
    review();
    try { await navigator.clipboard.writeText(request.value); status.textContent = 'Solicitação copiada. Nenhuma mensagem foi enviada e nenhum agendamento foi realizado.'; }
    catch { request.focus(); request.select(); status.textContent = 'Não foi possível copiar automaticamente. O texto está selecionado: use Ctrl+C, ⌘C ou a opção Copiar do seu dispositivo.'; }
  });
  whatsapp.addEventListener('click', (event) => { if (!validFutureDate(data().date)) { event.preventDefault(); step = 2; showStep(); validate(); } });
  document.querySelector('#js-notice').hidden = true;
  form.hidden = false; showStep(false);
}
