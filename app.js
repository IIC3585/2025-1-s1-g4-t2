// Importa el módulo WASM generado
import init, { resize, grayscale, blur, invert, brighten, flip_horizontal, rotate90 } from './img_processor/pkg/img_processor.js';

import wasmUrl from './img_processor/pkg/img_processor_bg.wasm?url'

async function main() {
  const wasmModule = await fetch(wasmUrl);
  await init(await wasmModule.arrayBuffer());

  const fileInput = document.getElementById('imageInput');
  const preview = document.getElementById('preview');
  const applyButton = document.getElementById('applyFilter');
  const filterSelect = document.getElementById('filterSelect');
  const resultCanvas = document.getElementById('resultCanvas');
  const ctx = resultCanvas.getContext('2d');

  let imageDataArray = null;
  let processedImageBlob = null;

  // Configuración básica de IndexedDB para almacenar imágenes
  let db;
  const request = window.indexedDB.open("ImageDatabase", 1);
  request.onerror = function (event) {
    console.error("IndexedDB error:", event);
  };
  request.onupgradeneeded = function (event) {
    db = event.target.result;
    db.createObjectStore("images", { autoIncrement: true });
  };
  request.onsuccess = function (event) {
    db = event.target.result;
  };

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      preview.src = url;
      preview.style.display = 'block';
      const arrayBuffer = await file.arrayBuffer();
      imageDataArray = new Uint8Array(arrayBuffer);
    }
  });

  applyButton.addEventListener('click', async () => {
    if (!imageDataArray) {
      alert('Seleccione una imagen primero.');
      return;
    }
    const filter = filterSelect.value;
    let output;
    try {
      switch (filter) {
        case 'resize':
          output = resize(imageDataArray, 200, 200);
          break;
        case 'grayscale':
          output = grayscale(imageDataArray);
          break;
        case 'blur':
          output = blur(imageDataArray, 5.0);
          break;
        case 'invert':
          output = invert(imageDataArray);
          break;
        case 'brighten':
          output = brighten(imageDataArray, 30);
          break;
        case 'flip_horizontal':
          output = flip_horizontal(imageDataArray);
          break;
        case 'rotate90':
          output = rotate90(imageDataArray);
          break;
        default:
          alert('Seleccione un filtro válido.');
          return;
      }

      const blob = new Blob([output], { type: 'image/png' });
      processedImageBlob = blob;
      const imgUrl = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = function () {
        resultCanvas.width = img.width;
        resultCanvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(imgUrl);
      };
      img.src = imgUrl;

      if (Notification.permission === 'granted') {
        new Notification('Imagen procesada', { body: 'El filtro se aplicó con éxito.' });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') {
            new Notification('Imagen procesada', { body: 'El filtro se aplicó con éxito.' });
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  });

  document.getElementById('saveImage').addEventListener('click', () => {
    if (!processedImageBlob) {
      alert('No hay imagen procesada para guardar.');
      return;
    }
    const transaction = db.transaction(["images"], "readwrite");
    const store = transaction.objectStore("images");
    const addRequest = store.add(processedImageBlob);
    addRequest.onsuccess = function () {
      alert('Imagen guardada en IndexedDB.');
    };
    addRequest.onerror = function (e) {
      console.error("Error al guardar:", e);
    };

    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(processedImageBlob);
    downloadLink.href = url;
    downloadLink.download = "processed_image.png";
    downloadLink.click();
  });


  document.getElementById('loadImage').addEventListener('click', () => {
    const imageDisplay = document.getElementById('image-display');
    const mainView = document.getElementById('mainView');

    // Toggle visibility of the title and images
    if (imageDisplay.style.display === 'block') {
      imageDisplay.style.display = 'none';
      mainView.style.display = 'block';
      return;
    }

    imageDisplay.style.display = 'block';
    mainView.style.display = 'none';

    const transaction = db.transaction(["images"], "readonly");
    const store = transaction.objectStore("images");
    const getRequest = store.getAll();
    getRequest.onsuccess = function (event) {
      const images = event.target.result;
      if (images.length > 0) {
        imageContainer.innerHTML = ''; // Clear previous images
        images.forEach((imageBlob, index) => {
          const imgUrl = URL.createObjectURL(imageBlob);
          const img = document.createElement('img');
          img.src = imgUrl;
          img.alt = `Image ${index + 1}`;
          img.style.margin = '10px';
          img.style.maxWidth = '200px';
          img.style.maxHeight = '200px';
          img.style.cursor = 'pointer';
          img.addEventListener('click', () => {
            const fileInput = document.getElementById('imageInput');
            const dataTransfer = new DataTransfer();
            const file = new File([imageBlob], `Image_${index + 1}.png`, { type: 'image/png' });
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
            fileInput.dispatchEvent(new Event('change'));

            // Reset the resultCanvas
            const resultCanvas = document.getElementById('resultCanvas');
            const ctx = resultCanvas.getContext('2d');
            resultCanvas.width = 300; // Default width
            resultCanvas.height = 150; // Default height
            ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);

            // Trigger the goBack event
            document.getElementById('goBack').click();
          });
          imageContainer.appendChild(img);
        });
      } else {
        alert('No hay imágenes guardadas.');
      }
    };
  });

  document.getElementById('goBack').addEventListener('click', () => {
    const imageDisplay = document.getElementById('image-display');
    const mainView = document.getElementById('mainView');

    // Toggle visibility of the title and images
    if (imageDisplay.style.display === 'block') {
      imageDisplay.style.display = 'none';
      mainView.style.display = 'block';
      return;
    }
    imageDisplay.style.display = 'block';
    mainView.style.display = 'none';
  }
  );
}

main();
