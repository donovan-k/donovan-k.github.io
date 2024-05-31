// script.js

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');

  // List of images (in a real scenario, you would fetch this list from the server)
  const images = [
    'pic1.jpg',
    'pic2.jpg',
    'pic3.PNG',
    'pic4.PNG',
    'pic5.PNG',
    'pic6.PNG',
    'IMG_3691.jpg',
    'IMG_3714.jpg',
    'IMG_3855.jpg',
    'IMG_3978.jpg',
    'IMG_4009.jpg',
    'IMG_4011.jpg',
    'IMG_4013.jpg',
    'IMG_4031.jpg',
    'IMG_4041.jpg',
    'IMG_4063.jpg',
    'IMG_4064.jpg',
    'IMG_4113.jpg',
    'IMG_4118.jpg',
    'IMG_4128.jpg',
    'IMG_4129.jpg',
    'IMG_4130.jpg',
    'IMG_4167.jpg'
  ];

  // Generate the HTML for each image
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = `images/${image}`;
    imgElement.alt = `Image ${image}`;

    const divElement = document.createElement('div');
    divElement.className = 'deck';
    divElement.appendChild(imgElement);

    gallery.appendChild(divElement);
  });
});