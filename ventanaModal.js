const modalOverlay = document.getElementById('product-modal-overlay');
const modalCloseBtn = document.getElementById('modal-close-btn');

const modalImgMain = document.getElementById('modal-img-main');
const modalCategory = document.getElementById('modal-category');
const modalProductName = document.getElementById('modal-product-name');
const modalPrice = document.getElementById('modal-price');
const modalPriceOld = document.getElementById('modal-price-old');
const modalDiscount = document.getElementById('modal-discount');
const modalAvailabilityBadge = document.getElementById('modal-availability-badge');
const modalProductDescription = document.getElementById('modal-product-description');
const modalBtnWsp = document.getElementById('modal-btn-wsp');
const modalBtnFav = document.getElementById('modal-btn-fav');

/**
 * Función principal para abrir el modal e inyectar los datos del producto.
 * @param {Object} producto - Objeto con las propiedades del artículo seleccionado.
 */
function verDetalleProducto(producto) {
  if (!producto) return;

  // Inyectar Imagen Principal
  modalImgMain.src = producto.imagen || 'placeholder.jpg'; 
  modalImgMain.alt = `Imagen de ${producto.nombre}`;

  // Inyectar Textos Básicos
  modalCategory.textContent = producto.categoria || 'General';
  modalProductName.textContent = producto.nombre || 'Producto sin nombre';
  modalProductDescription.textContent = producto.descripcion || 'No hay descripción disponible para este artículo.';

  // Gestionar Precios y Descuentos
  modalPrice.textContent = `$${producto.precio}`;
  
  if (producto.precioViejo && producto.precioViejo > producto.precio) {
    modalPriceOld.textContent = `$${producto.precioViejo}`;
    modalPriceOld.style.display = 'inline';
    
    // Calcular porcentaje de descuento si no viene explícito
    const porcentaje = producto.descuento || Math.round(((producto.precioViejo - producto.precio) / producto.precioViejo) * 100);
    modalDiscount.textContent = `-${porcentaje}%`;
    modalDiscount.style.display = 'inline';
  } else {
    modalPriceOld.style.display = 'none';
    modalDiscount.style.display = 'none';
  }

  // Gestionar Disponibilidad (Badge)
  const isAvailable = producto.stock === true || producto.stock > 0;
  if (isAvailable) {
    modalAvailabilityBadge.textContent = 'Disponible';
    modalAvailabilityBadge.setAttribute('data-status', 'available');
  } else {
    modalAvailabilityBadge.textContent = 'Agotado';
    modalAvailabilityBadge.setAttribute('data-status', 'sold-out');
  }

  // Configurar enlace de WhatsApp dinámico leyendo desde localStorage
  const DEFAULT_PHONE = "528991038598";
  const currentPhone = localStorage.getItem("streetSideWhatsapp") || DEFAULT_PHONE;
  const mensajeWsp = encodeURIComponent(`Hola! Me interesa obtener más información sobre el producto: ${producto.nombre} ($${producto.precio}).`);
  
  modalBtnWsp.href = `https://wa.me/${currentPhone}?text=${mensajeWsp}`;

  // Guardar el ID del producto en el botón de favoritos
  modalBtnFav.setAttribute('data-product-id', producto.id || '');
  
  // Comprobar si el producto ya está en favoritos
  if (window.esFavorito && window.esFavorito(producto.id)) {
    modalBtnFav.setAttribute('aria-pressed', 'true');
    modalBtnFav.querySelector('.product-modal__btn-fav-label').textContent = 'Quitar de favoritos';
    modalBtnFav.querySelector('.product-modal__btn-fav-icon').textContent = '♥';
  } else {
    modalBtnFav.setAttribute('aria-pressed', 'false');
    modalBtnFav.querySelector('.product-modal__btn-fav-label').textContent = 'Agregar a favoritos';
    modalBtnFav.querySelector('.product-modal__btn-fav-icon').textContent = '♡';
  }

  // Mostrar el Modal removiendo el atributo 'hidden'
  modalOverlay.removeAttribute('hidden');
  document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
}

/**
 * Función para cerrar el modal de forma limpia
 */
function cerrarModalProducto() {
  modalOverlay.setAttribute('hidden', '');
  document.body.style.overflow = ''; // Devuelve el scroll al body
}

// 2. EVENTOS PARA CERRAR EL MODAL
modalCloseBtn.addEventListener('click', cerrarModalProducto);

modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    cerrarModalProducto();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalOverlay.hasAttribute('hidden')) {
    cerrarModalProducto();
  }
});