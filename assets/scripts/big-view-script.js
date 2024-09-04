// FETCH AND DISPLAY QUERY PARAMS
// Function to fetch query parameters
function getQueryParams() {
  const queryString = window.location.search;
  console.log(Object.fromEntries(new URLSearchParams(queryString)));
  return Object.fromEntries(new URLSearchParams(queryString));
}

// Function to create the HTML structure based on the query params
function createDynamicContent(params) {
  // Create the main content div
  const contentDiv = document.getElementById('content-container');

  // Create the big-view container
  const bigViewDiv = document.createElement('div');
  bigViewDiv.className = 'big-view';

  // Create the image container
  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';
  imageContainer.id = 'main-image-container';

  // Main image
  const mainImage = document.createElement('img');
  mainImage.src = `assets/images/gallery/${params['item-number']}/main-img.png`; // Image path based on item number
  mainImage.alt = params['item-number'];
  mainImage.id = 'main-image';
  imageContainer.appendChild(mainImage);

  // Create the extra images container
  const extraImagesContainer = document.createElement('div');
  extraImagesContainer.className = 'extra-images-container';

  // Create the text container
  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';

  // Add extra images based on total-subitems
  const totalSubitems = parseInt(params['total-subitems'], 10) || 0;
  if (totalSubitems > 0) {
    textContainer.className = textContainer.className + ' non-solo-main-img';

    for (let i = 1; i <= totalSubitems; i++) {
      const singleExtraImageContainer = document.createElement('div');
      singleExtraImageContainer.className = 'single-extra-image-container';

      const extraItemImage = document.createElement('img');
      extraItemImage.className = 'extra-item';
      extraItemImage.src = `assets/images/gallery/${params['item-number']}/sub-img-${i}.png`;
      extraItemImage.alt = `${params['item-number']}${i}`;
      singleExtraImageContainer.appendChild(extraItemImage);
      extraImagesContainer.appendChild(singleExtraImageContainer);
    }
  } else {
    textContainer.className = textContainer.className + ' solo-main-img';
  }

  // Fill in data from query parameters
  const nameElement = document.createElement('h2');
  nameElement.className = 'name';
  nameElement.textContent = params['item-name'] || 'No Name';

  const dateElement = document.createElement('p');
  dateElement.className = 'refence';
  dateElement.innerHTML = `<b>Date: </b>${params['item-date'] || 'No Date'}`;

  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'description';
  descriptionElement.textContent = 'no description'; // Placeholder

  // Append the text elements to the text container
  textContainer.appendChild(nameElement);
  textContainer.appendChild(dateElement);
  textContainer.appendChild(descriptionElement);

  // Append all created elements to the big-view container
  bigViewDiv.appendChild(imageContainer);
  bigViewDiv.appendChild(extraImagesContainer);
  bigViewDiv.appendChild(textContainer);

  // Append the big-view to the main content
  contentDiv.appendChild(bigViewDiv);
}

// Get the parameters and create the dynamic content
const params = getQueryParams();
createDynamicContent(params);
// ZOOMING MAIN IMAGE
const imageContainer = document.getElementById('main-image-container');
const zoomImage = document.getElementById('main-image');

imageContainer.addEventListener('mousemove', (e) => {
  const rect = imageContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Convert mouse coordinates to percentage values
  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  // Adjust transform origin based on mouse position
  zoomImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
});

// not needed, makes the transition rough
// imageContainer.addEventListener('mouseleave', () => {
//   zoomImage.style.transformOrigin = 'center center'; // Reset on mouse leave
// });

// CLICKING SECONDARY IMAGES
const mainImage = document.getElementById('main-image');
const originalSrc = mainImage.src;

const secondaryImages = document.querySelectorAll('.extra-item');

secondaryImages.forEach((secondaryImage) => {
  secondaryImage.addEventListener('click', () => {
    // swap the values of the main and secondary image
    const mainImage = document.getElementById('main-image');
    const srcSwapper = mainImage.src;
    mainImage.src = secondaryImage.src;
    secondaryImage.src = srcSwapper;
  });
});
