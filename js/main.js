import { initAppointment } from './appointment.js';

const $ = (selector) => document.querySelector(selector);
const menu = $('#navigation'); const toggle = $('.menu-toggle');
const mobile = matchMedia('(max-width: 767px)');
document.documentElement.classList.add('js-ready');
function setMenu(open, restore = false) {
  toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu.hidden = mobile.matches && !open;
  if (restore) toggle.focus();
}
function adaptMenu() { toggle.hidden = !mobile.matches; setMenu(false); }
adaptMenu(); mobile.addEventListener('change', adaptMenu);
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true); });
document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) setMenu(false); });
document.addEventListener('focusin', (event) => { if (mobile.matches && !event.target.closest('.site-header')) setMenu(false); });
const header = $('.site-header'); const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', updateHeader, { passive: true }); updateHeader();

// Native dialogs provide modal semantics, keyboard focus containment and Escape.
let opener;
function openDialog(dialog, origin) { opener = origin; dialog.showModal(); dialog.querySelector('.close-dialog').focus(); }
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
});
const specialtyDescriptions = [
  'A clínica geral oferece um ponto de partida para conversar sobre suas necessidades, conhecer sua saúde bucal e receber orientações. Uma avaliação individual pode indicar a necessidade de acompanhamento ou de encaminhamento para outra área da odontologia.',
  'A prevenção reúne orientações e acompanhamento voltados à manutenção da saúde bucal. Hábitos cotidianos e a frequência das avaliações são temas para conversar com um profissional, considerando as necessidades de cada pessoa.',
  'A ortodontia avalia o posicionamento dos dentes e as relações de oclusão. As possibilidades de acompanhamento, os recursos utilizados e a duração de cada abordagem dependem de avaliação profissional individualizada.',
  'O cuidado com a aparência do sorriso começa com escuta, informações claras e avaliação. Um profissional pode apresentar possibilidades e limitações de cada abordagem, respeitando a saúde bucal, as características e as expectativas de cada pessoa.',
  'A periodontia se dedica à gengiva e aos tecidos que dão suporte aos dentes. A avaliação profissional orienta quais cuidados e formas de acompanhamento são adequados a cada situação.',
  'A reabilitação oral considera as necessidades de função e de recuperação de estruturas dentárias. As possibilidades de cuidado e suas etapas são definidas a partir de uma avaliação individual, com explicações sobre alternativas e limitações.'
];
document.querySelectorAll('[data-specialty]').forEach((button) => {
  button.hidden = false;
  button.addEventListener('click', () => { $('#dialog-title').textContent = button.closest('article').querySelector('h3').textContent; $('#dialog-description').textContent = specialtyDescriptions[Number(button.dataset.specialty)]; openDialog($('#specialty-dialog'), button); });
});
$('#specialty-cta').addEventListener('click', () => { $('#specialty-dialog').close(); setTimeout(() => { const title = $('#appointment-title'); title.tabIndex = -1; title.focus({ preventScroll: true }); }, 0); });
const gallery = [...document.querySelectorAll('[data-gallery]')]; let current = 0;
function showImage(index) {
  current = (index + gallery.length) % gallery.length;
  const item = gallery[current]; $('#lightbox-image').src = item.href; $('#lightbox-image').alt = item.querySelector('img').alt;
  $('#gallery-caption').textContent = `${current + 1} / ${gallery.length} — ${item.querySelector('span').textContent.replace('↗', '').split('/').slice(1).join('/').trim()}`;
}
gallery.forEach((item, index) => item.addEventListener('click', (event) => { event.preventDefault(); showImage(index); openDialog($('#gallery-dialog'), item); }));
$('#gallery-prev').addEventListener('click', () => showImage(current - 1)); $('#gallery-next').addEventListener('click', () => showImage(current + 1));
$('#gallery-dialog').addEventListener('keydown', (event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); showImage(current + (event.key === 'ArrowRight' ? 1 : -1)); } });
initAppointment();
window.lucide?.createIcons({ attrs: { 'aria-hidden': 'true', focusable: 'false' } });
// Optional enhancements: markup remains visible without this library or JavaScript.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.hero-copy > *', { y: 18, duration: .7, stagger: .08, ease: 'power2.out', clearProps: 'all' });
    gsap.from('.hero-media', { y: 20, duration: .9, ease: 'power2.out', clearProps: 'all' });
    gsap.utils.toArray('.reveal, .timeline li').forEach((element) => gsap.from(element, { y: 22, duration: .6, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: element, start: 'top 92%', once: true } }));
  });
}
