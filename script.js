$(document).ready(function() {
  $('#darkmode').click(function() {
    $('body').toggleClass('darkmode');
    $('button').toggleClass('darkmode');
  });
});


const text = document.querySelector('.dynamic-text');

const textLoad = () => {
  setTimeout(() => {
    text.textContent = 'Morning ☀️';
  }, 0);
  setTimeout(() => {
    text.textContent = 'Afternoon 🌇';
  }, 4000);
  setTimeout(() => {
    text.textContent = 'Evening 🌆';
  }, 8000);
  setTimeout(() => {
    text.textContent = 'Night 🌌';
  }, 12000);
}

textLoad();
setInterval(textLoad, 16000);


document.addEventListener('DOMContentLoaded', () => {
  const projectTitles = document.querySelectorAll('.project-title');
  const projects = document.querySelectorAll('.project');

  // Ensure all projects are hidden by default
  projects.forEach((project) => (project.style.display = 'none'));

  // Add hover event listeners
  projectTitles.forEach((title) => {
    title.addEventListener('mouseenter', () => {
      // Hide all projects
      projects.forEach((project) => (project.style.display = 'none'));

      // Show the targeted project
      const targetId = title.getAttribute('data-target');
      const targetProject = document.getElementById(targetId);
      if (targetProject) {
        targetProject.style.display = 'block';
      }
    });

    title.addEventListener('mouseleave', () => {
      // Optionally hide the project again when hover ends
      const targetId = title.getAttribute('data-target');
      const targetProject = document.getElementById(targetId);
      if (targetProject) {
        targetProject.style.display = 'none';
      }
    });
  });
});


