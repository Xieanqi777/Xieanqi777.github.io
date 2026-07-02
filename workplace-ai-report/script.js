const progress = document.querySelector('.progress');
const links = [...document.querySelectorAll('.toc a')];
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function updateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = height > 0 ? scrollTop / height : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;

  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top < 130) current = section.id;
  }
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.image-button').forEach(button => {
  button.addEventListener('click', () => {
    lightboxImg.src = button.dataset.full;
    lightboxImg.alt = button.querySelector('img')?.alt || '图表大图';
    lightbox.classList.add('open');
  });
});
function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}
document.querySelector('.close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});
