import { notes } from './script.js';

// Load KaTeX for math rendering
const katexCSS = document.createElement('link');
katexCSS.rel = 'stylesheet';
katexCSS.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
document.head.appendChild(katexCSS);

const katexJS = document.createElement('script');
katexJS.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
katexJS.onload = () => {
  const autoRender = document.createElement('script');
  autoRender.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js';
  autoRender.onload = renderNotes;
  document.head.appendChild(autoRender);
};
document.head.appendChild(katexJS);

const notesContainer = document.getElementById('notesContainer');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');

// Theme handling
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

function renderNotes() {
  notesContainer.innerHTML = '';
  notes.forEach(note => {
    const noteEl = document.createElement('div');
    noteEl.className = 'note-card';
    noteEl.innerHTML = `
      <h2>${note.title}</h2>
      <div class="content">${note.content}</div>
    `;
    notesContainer.appendChild(noteEl);
  });
  
  // Render LaTeX
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ]
    });
  }
}

// Search functionality
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const allNotes = document.querySelectorAll('.note-card');
  
  allNotes.forEach(note => {
    const text = note.textContent.toLowerCase();
    note.style.display = text.includes(query) ? 'block' : 'none';
  });
});

// Initial render if KaTeX fails to load
if (!window.katex) {
  renderNotes();
                }
