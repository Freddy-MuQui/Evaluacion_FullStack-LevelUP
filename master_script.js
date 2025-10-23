document.addEventListener('DOMContentLoaded', () => {
  if (typeof allProducts === 'undefined') {
    console.error("allProducts no encontrado. Asegúrate que products.js está cargado.");
    return;
  }

  const miListaCarousel = document.getElementById('mi-lista-carousel');
  const tendenciasCarousel = document.getElementById('tendencias-carousel');

  function createCarouselItem(product) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');

    const isPurchasable = product.precio > 0;

    carouselItem.innerHTML = `
      <img class="carousel-item__img" src="${product.imagen}" alt="${product.nombre}" />
      <div class="carousel-item__details">
        <div>
          <img class="carousel-item__details--img" src="Imagenes/play-icon.png" alt="Play Icon">
          ${isPurchasable ? `
            <button class="add-to-cart-btn" aria-label="Agregar ${product.nombre} al carrito" data-product-id="${product.id}" type="button" style="background:none; border:none; padding:0; cursor:pointer;">
              <img src="Imagenes/plus-icon.png" alt="Plus Icon">
            </button>
          ` : ''}
        </div>
        <p class="carousel-item__details--title">${product.nombre}</p>
        <p class="carousel-item__details--subtitle">${product.descripcion}</p>
        ${isPurchasable ? `<p class="carousel-item__details--price">$${product.precio.toLocaleString('es-CL')} CLP</p>` : ''}
      </div>
    `;

    if (isPurchasable) {
      const addToCartButton = carouselItem.querySelector('.add-to-cart-btn');
      if (addToCartButton) {
        addToCartButton.addEventListener('click', (event) => {
          const productId = parseInt(event.currentTarget.dataset.productId);
          if (typeof addProductToCart === 'function') {
            addProductToCart(productId);
          } else {
            console.error("addProductToCart no encontrado. Asegúrate que carrito.js está cargado.");
          }
        });
      }
    }

    return carouselItem;
  }

  function renderCarousels() {
    const miListaItems = allProducts.filter(product => product.category === "Mi lista");
    miListaCarousel.innerHTML = '';
    miListaItems.forEach(product => {
      miListaCarousel.appendChild(createCarouselItem(product));
    });

    const tendenciasItems = allProducts.filter(product => product.category === "Tendencias");
    tendenciasCarousel.innerHTML = '';
    tendenciasItems.forEach(product => {
      tendenciasCarousel.appendChild(createCarouselItem(product));
    });
  }

  renderCarousels();
});