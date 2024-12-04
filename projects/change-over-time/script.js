function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  const page1Button = document.getElementById('page-1');
  const page2Button = document.getElementById('page-2');

  if (pageId === 'drawing-page') {
    page1Button.style.display = 'none';
    page2Button.style.display = 'inline';
  } else if (pageId === 'writing-page') {
    page1Button.style.display = 'inline';
    page2Button.style.display = 'none';
  }
}

// TOOLTIP!!!
const boundingBoxes = document.querySelectorAll('.bounding-box');

boundingBoxes.forEach(box => {
  const tooltip = box.querySelector('.tooltip');
  const canvas = box.querySelector('canvas');
  const offsetX = 10;
  const offsetY = 10;

  box.addEventListener('mousemove', (e) => {
    const rect = box.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      const canvasX = e.clientX - canvasRect.left;
      const canvasY = e.clientY - canvasRect.top;

      console.log('Canvas Coordinates:', canvasX, canvasY);
    }

    tooltip.style.left = `${x + offsetX}px`;
    tooltip.style.top = `${y + offsetY}px`;
  });

  box.addEventListener('mouseleave', () => {
    tooltip.style.visibility = 'hidden';
  });

  box.addEventListener('mouseenter', () => {
    tooltip.style.visibility = 'visible';
  });
});

// savveeeee
function saveDrawing() {
  const dataURL = canvas.toDataURL('image/png');
  uploadImage(dataURL);
}

function uploadImage(imageData) {
  fetch('/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imageData }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Image uploaded successfully:', data);
  })
  .catch(error => {
    console.error('Error uploading image:', error);
  });
}

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' })); 

app.post('/upload', (req, res) => {
  const { image } = req.body;

  const base64Data = image.replace(/^data:image\/png;base64,/, '');

  const filePath = path.join(__dirname, 'uploads', Date.now() + '.png');

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to save the image.' });
    }

    res.status(200).json({ message: 'Image uploaded successfully', path: filePath });
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get('/gallery', (req, res) => {
  const galleryFolderPath = path.join(__dirname, 'uploads');
  
  fs.readdir(galleryFolderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve images.' });
    }

    const images = files.map(file => '/uploads/' + file);
    res.json({ images });
  });
});

function loadGallery() {
  fetch('/gallery')
    .then(response => response.json())
    .then(data => {
      const galleryContainer = document.getElementById('gallery-container');
      galleryContainer.innerHTML = '';

      data.images.forEach(imagePath => {
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'User Drawing';
        img.classList.add('gallery-image');
        galleryContainer.appendChild(img);
      });
    })
    .catch(error => {
      console.error('Error loading gallery:', error);
    });
}
