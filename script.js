const WSP_NUMBER   = "528991038598";
const whatsappLink = `https://wa.me/${WSP_NUMBER}`;

let currentFilter = "inicio";
let searchQuery   = "";

/* --------------------------------------------------------------------------
   2. DATOS — Catálogo de productos
   -------------------------------------------------------------------------- */
const products = [
  // CADENAS
  { id:1,  nombre:"Cadena Cubana Plata",       cat:"cadenas",      precio:580,  precioOld:720,  oferta:true,  favorito:false, destacado:true,  emoji:"⛓️", desc:"Acero inoxidable 316L, 60cm" },
  { id:2,  nombre:"Cadena Snake Gold",          cat:"cadenas",      precio:430,  precioOld:null, oferta:false, favorito:false,  destacado:true,  emoji:"⛓️", desc:"Chapado en oro 18k, 45cm" },
  { id:3,  nombre:"Cadena Rolo Negra",          cat:"cadenas",      precio:320,  precioOld:400,  oferta:true,  favorito:false, destacado:false, emoji:"⛓️", desc:"Acero negro mate, 55cm" },
  { id:4,  nombre:"Cadena Figaro Plata",        cat:"cadenas",      precio:490,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"⛓️", desc:"Plata 925, 50cm" },
  { id:5,  nombre:"Cadena Box Chain",           cat:"cadenas",      precio:370,  precioOld:460,  oferta:true,  favorito:false, destacado:false, emoji:"⛓️", desc:"Acero pulido, 65cm" },
  { id:6,  nombre:"Cadena Barbada XL",          cat:"cadenas",      precio:650,  precioOld:null, oferta:false, favorito:false,  destacado:true,  emoji:"⛓️", desc:"Plata gruesa, estilo urbano" },
  // ANILLOS
  { id:7,  nombre:"Anillo Calavera Plata",      cat:"anillos",      precio:280,  precioOld:350,  oferta:true,  favorito:false, destacado:true,  emoji:"💍", desc:"Plata 925, talla ajustable" },
  { id:8,  nombre:"Anillo Dragón Negro",        cat:"anillos",      precio:310,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"💍", desc:"Acero negro, grabado artesanal" },
  { id:9,  nombre:"Anillo Signet Dorado",       cat:"anillos",      precio:420,  precioOld:520,  oferta:true,  favorito:false, destacado:false, emoji:"💍", desc:"Chapado oro, tamaño universal" },
  { id:10, nombre:"Anillo Espinas",             cat:"anillos",      precio:190,  precioOld:null, oferta:false, favorito:false,  destacado:false, emoji:"💍", desc:"Acero plateado delicado" },
  { id:11, nombre:"Anillo Aro Minimalista",     cat:"anillos",      precio:150,  precioOld:200,  oferta:true,  favorito:false, destacado:false, emoji:"💍", desc:"Acero fino, apilable" },
  { id:12, nombre:"Anillo Serpiente",           cat:"anillos",      precio:260,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"💍", desc:"Wrap ring, plata oxidada" },
  // COLLARES
  { id:13, nombre:"Collar Cruz Gótica",         cat:"collares",     precio:340,  precioOld:420,  oferta:true,  favorito:false, destacado:true,  emoji:"📿", desc:"Colgante acero, cadena 60cm" },
  { id:14, nombre:"Collar Ojo de Ra",           cat:"collares",     precio:290,  precioOld:null, oferta:false, favorito:false,  destacado:true,  emoji:"📿", desc:"Chapado en oro, pendiente" },
  { id:15, nombre:"Collar Piedra Obsidiana",    cat:"collares",     precio:380,  precioOld:480,  oferta:true,  favorito:false, destacado:false, emoji:"📿", desc:"Piedra natural, cordón negro" },
  { id:16, nombre:"Collar Estrella Plata",      cat:"collares",     precio:220,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"📿", desc:"Colgante estrella 5 puntas" },
  { id:17, nombre:"Collar Tetragramaton",       cat:"collares",     precio:310,  precioOld:390,  oferta:true,  favorito:false, destacado:false, emoji:"📿", desc:"Simbología esotérica, plata" },
  { id:18, nombre:"Collar Diente Tiburón",      cat:"collares",     precio:260,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"📿", desc:"Resina + oro, surf style" },
  // CINTURONES
  { id:19, nombre:"Cinturón Hebilla Doble",     cat:"cinturones",   precio:480,  precioOld:600,  oferta:true,  favorito:false, destacado:true,  emoji:"🪢", desc:"Piel genuina, hebilla metal" },
  { id:20, nombre:"Cinturón Tachuelado",        cat:"cinturones",   precio:520,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"🪢", desc:"Cuero negro, tachuelas plata" },
  { id:21, nombre:"Cinturón Western",           cat:"cinturones",   precio:390,  precioOld:490,  oferta:true,  favorito:false, destacado:false, emoji:"🪢", desc:"Estilo vaquero, bordado" },
  { id:22, nombre:"Cinturón Minimalista",       cat:"cinturones",   precio:280,  precioOld:null, oferta:false, favorito:false,  destacado:false, emoji:"🪢", desc:"Cuero liso, hebilla simple" },
  { id:23, nombre:"Cinturón Militar",           cat:"cinturones",   precio:350,  precioOld:440,  oferta:true,  favorito:false, destacado:false, emoji:"🪢", desc:"Lona resistente, doble argolla" },
  // PULSERAS
  { id:24, nombre:"Pulsera Cuero Trenzado",     cat:"pulseras",     precio:180,  precioOld:240,  oferta:true,  favorito:false, destacado:true,  emoji:"💫", desc:"Cuero trenzado 3 hilos" },
  { id:25, nombre:"Pulsera Calaveras",          cat:"pulseras",     precio:210,  precioOld:null, oferta:false, favorito:false,  destacado:true,  emoji:"💫", desc:"Charms plata + cuero negro" },
  { id:26, nombre:"Pulsera Runa",               cat:"pulseras",     precio:160,  precioOld:200,  oferta:true,  favorito:false, destacado:false, emoji:"💫", desc:"Grabado rúnico, acero" },
  { id:27, nombre:"Pulsera Magnética",          cat:"pulseras",     precio:240,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"💫", desc:"Titanio magnético bicolor" },
  { id:28, nombre:"Pulsera Macramé",            cat:"pulseras",     precio:120,  precioOld:160,  oferta:true,  favorito:false, destacado:false, emoji:"💫", desc:"Hilo encerado, varios colores" },
  { id:29, nombre:"Pulsera Esposa Metal",       cat:"pulseras",     precio:290,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"💫", desc:"Acero rígido pulido, ajustable" },
  // BOTAS
  { id:30, nombre:"Bota Motociclista Negra",    cat:"botas",        precio:1850, precioOld:2200, oferta:true,  favorito:false, destacado:true,  emoji:"🥾", desc:"Cuero genuino, suela gruesa" },
  { id:31, nombre:"Bota Vaquera Café",          cat:"botas",        precio:2100, precioOld:null, oferta:false, favorito:false,  destacado:true,  emoji:"🥾", desc:"Punta cuadrada, tacón alto" },
  { id:32, nombre:"Bota Combat Militar",        cat:"botas",        precio:1650, precioOld:1990, oferta:true,  favorito:false, destacado:false, emoji:"🥾", desc:"Lona + cuero, suela Vibram" },
  { id:33, nombre:"Bota Chelsea Negra",         cat:"botas",        precio:1400, precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"🥾", desc:"Elástico lateral, cuero liso" },
  { id:34, nombre:"Bota Punk Metalera",         cat:"botas",        precio:1900, precioOld:2300, oferta:true,  favorito:false, destacado:false, emoji:"🥾", desc:"Hebillas laterales, plataforma" },
  { id:35, nombre:"Bota Western Punta Fina",    cat:"botas",        precio:2400, precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"🥾", desc:"Cuero exótico, bordado floral" },
  // PLAYERAS
  { id:36, nombre:"Playera Calavera Estampada", cat:"playeras",     precio:320,  precioOld:420,  oferta:true,  favorito:false, destacado:true,  emoji:"👕", desc:"100% algodón, serigrafía" },
  { id:37, nombre:"Playera Black Oversize",     cat:"playeras",     precio:280,  precioOld:null, oferta:false, favorito:false,  destacado:true,  emoji:"👕", desc:"Fit holgado, cuello redondo" },
  { id:38, nombre:"Playera Manga Larga Térmica",cat:"playeras",     precio:350,  precioOld:440,  oferta:true,  favorito:false, destacado:false, emoji:"👕", desc:"Algodón térmico, liso" },
  { id:39, nombre:"Playera Tie-Dye Punk",       cat:"playeras",     precio:310,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"👕", desc:"Teñido manual, única pieza" },
  { id:40, nombre:"Playera Crop Metal Gráfico", cat:"playeras",     precio:260,  precioOld:340,  oferta:true,  favorito:false, destacado:false, emoji:"👕", desc:"Crop fit, estampado bandas" },
  { id:41, nombre:"Playera Raglán Bicolor",     cat:"playeras",     precio:290,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"👕", desc:"Negro + gris, manga 3/4" },
  // PIERCINGS
  { id:42, nombre:"Piercing Septum Plata",      cat:"piercings",    precio:180,  precioOld:240,  oferta:true,  favorito:false, destacado:true,  emoji:"💎", desc:"Acero quirúrgico 316L" },
  { id:43, nombre:"Piercing Helix Aro",         cat:"piercings",    precio:140,  precioOld:null, oferta:false, favorito:false,  destacado:true,  emoji:"💎", desc:"Titanio grado implante" },
  { id:44, nombre:"Piercing Nariz Diamante",    cat:"piercings",    precio:220,  precioOld:280,  oferta:true,  favorito:false, destacado:false, emoji:"💎", desc:"Cristal Swarovski + acero" },
  { id:45, nombre:"Piercing Labret Flat",       cat:"piercings",    precio:160,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"💎", desc:"Acero plano, varios colores" },
  { id:46, nombre:"Piercing Industrial Barra",  cat:"piercings",    precio:190,  precioOld:240,  oferta:true,  favorito:false, destacado:false, emoji:"💎", desc:"Barra doble, acero negro" },
  { id:47, nombre:"Piercing Daith Corazón",     cat:"piercings",    precio:200,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"💎", desc:"Aro corazón, plata 925" },
  // ACCESORIOS
  { id:48, nombre:"Mochila Hello Kitty Alt",    cat:"accesorios",   precio:680,  precioOld:850,  oferta:true,  favorito:false, destacado:true,  emoji:"🎒", desc:"Edición alternativa, kawaii" },
  { id:49, nombre:"Gafas Redondas Vintage",     cat:"accesorios",   precio:420,  precioOld:null, oferta:false, favorito:false,  destacado:true,  emoji:"🕶️", desc:"Montura metálica, UV400" },
  { id:50, nombre:"Sombrero Fedora Cuero",      cat:"accesorios",   precio:550,  precioOld:690,  oferta:true,  favorito:false, destacado:false, emoji:"🎩", desc:"Cuero liso, banda tejida" },
  // HERRAMIENTAS
  { id:51, nombre:"Cuchillo Multiherramienta",  cat:"herramientas", precio:890,  precioOld:1100, oferta:true,  favorito:false, destacado:true,  emoji:"🔧", desc:"Acero inox, 12 funciones" },
  { id:52, nombre:"Linterna Táctica LED",        cat:"herramientas", precio:340,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"🔦", desc:"1000 lúmenes, zoom" },
  { id:53, nombre:"Navaja Plegable Negra",      cat:"herramientas", precio:560,  precioOld:700,  oferta:true,  favorito:false, destacado:false, emoji:"🔪", desc:"Hoja D2 steel, mango G10" },
  // ROPA
  { id:54, nombre:"Chaleco Piel Motociclista",  cat:"ropa",         precio:1800, precioOld:2200, oferta:true,  favorito:false, destacado:true,  emoji:"🧥", desc:"Cuero genuino, bolsillos" },
  { id:55, nombre:"Pantalón Cargo Oscuro",      cat:"ropa",         precio:620,  precioOld:null, oferta:false, favorito:false,  destacado:true,  emoji:"👖", desc:"Tela resistente, 6 bolsillos" },
  { id:56, nombre:"Chaqueta Denim Rasgada",     cat:"ropa",         precio:780,  precioOld:960,  oferta:true,  favorito:false, destacado:false, emoji:"🧥", desc:"Denim 100%, parches" },
  // CALZADO
  { id:57, nombre:"Tenis Chunky Blanco",        cat:"calzado",      precio:1100, precioOld:1380, oferta:true,  favorito:false, destacado:true,  emoji:"👟", desc:"Suela gruesa, estilo Y2K" },
  { id:58, nombre:"Oxford Cuero Negro",         cat:"calzado",      precio:980,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"👞", desc:"Cuero pulido, suela goma" },
  { id:59, nombre:"Sandalias Plataforma",       cat:"calzado",      precio:750,  precioOld:940,  oferta:true,  favorito:false, destacado:false, emoji:"👡", desc:"Plataforma 5cm, hebilla" },
  // STICKERS
  { id:60, nombre:"Pack Stickers Skulls x20",   cat:"stickers",     precio:80,   precioOld:120,  oferta:true,  favorito:false, destacado:true,  emoji:"🎨", desc:"Vinilo impermeable, 5cm c/u" },
  { id:61, nombre:"Sticker Holográfico Dragon", cat:"stickers",     precio:45,   precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"🎨", desc:"Holo premium, 10cm" },
  { id:62, nombre:"Pack Stickers Rúnicos x30",  cat:"stickers",     precio:95,   precioOld:130,  oferta:true,  favorito:false, destacado:false, emoji:"🎨", desc:"Vinilo UV, resistente agua" },
];

/* --------------------------------------------------------------------------
   3. ESTADO
   -------------------------------------------------------------------------- */
let favs = new Set(products.filter(p => p.favorito).map(p => p.id));

/* --------------------------------------------------------------------------
   3.5 FUNCIÓN COMPARTIDA PARA EL SCRIPT DE FAVORITOS (VINCULO CON MODAL)
   -------------------------------------------------------------------------- */
// Esta función la agregamos para que ventanaModal.js sepa si un ID es favorito en tiempo real
window.esFavorito = function(id) {
  return favs.has(id);
};

// Modificamos el trigger manual de favoritos del modal para conectarlo con el estado global de favs
document.getElementById("modal-btn-fav").addEventListener("click", function() {
  const productId = parseInt(this.getAttribute("data-product-id"));
  if (!productId) return;
  
  const isAdding = !favs.has(productId);
  favs[isAdding ? "add" : "delete"](productId);
  
  // Actualizar la interfaz del botón del modal en tiempo real
  this.setAttribute("aria-pressed", isAdding ? "true" : "false");
  this.querySelector('.product-modal__btn-fav-label').textContent = isAdding ? 'Quitar de favoritos' : 'Agregar a favoritos';
  this.querySelector('.product-modal__btn-fav-icon').textContent = isAdding ? '♥' : '♡';
  
  showToast(isAdding ? "Agregado a favoritos" : "Eliminado de favoritos");
  
  // Refrescar las grillas principales para que reflejen el cambio de corazón inmediatamente
  renderProductGrid();
});

// Función de utilidad para buscar un producto por su ID y mandarlo al modal
function abrirDetallePorId(id) {
  const item = products.find(p => p.id === id);
  if (item) {
    // Como tu JSON de datos usa "cat" en lugar de "categoria", "precioOld" en vez de "precioViejo" y "desc" por "descripcion",
    // creamos un objeto adaptado para que ventanaModal.js lo entienda sin problemas:
    const productoAdaptado = {
      id: item.id,
      nombre: item.nombre,
      categoria: item.cat,
      precio: item.precio,
      precioViejo: item.precioOld,
      descripcion: item.desc,
      stock: true, // Asumimos true por defecto
      imagen: "" // Si en el futuro agregas URLs de imágenes reales aquí van
    };
    
    // Llamamos a la función global de ventanaModal.js
    if (typeof verDetalleProducto === "function") {
      verDetalleProducto(productoAdaptado);
    }
  }
}

/* --------------------------------------------------------------------------
   4. UTILIDADES
   -------------------------------------------------------------------------- */
const formatPrice = n => "$" + n.toLocaleString("es-MX");
const pctOff      = (old, cur) => Math.round((1 - cur / old) * 100);

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function openWsp(e) {
  e.preventDefault();
  window.open(whatsappLink, "_blank");
}

function doSearch() {
  searchQuery = document.getElementById("search-input").value.trim().toLowerCase();
  renderProductGrid();
}

/* --------------------------------------------------------------------------
   5. FILTRO Y NAVEGACIÓN
   -------------------------------------------------------------------------- */
const FILTER_LABELS = {
  inicio:"Todos los productos", favoritos:"Mis favoritos", ofertas:"Ofertas",
  tendencias:"Tendencias", ropa:"Ropa", calzado:"Calzado", accesorios:"Accesorios",
  stickers:"Stickers", cadenas:"Cadenas", anillos:"Anillos", collares:"Collares",
  cinturones:"Cinturones", pulseras:"Pulseras", botas:"Botas",
  playeras:"Playeras", piercings:"Piercings", herramientas:"Herramientas",
};

function setFilter(filter, el) {
  currentFilter = filter;
  searchQuery   = "";
  document.getElementById("search-input").value = "";
  document.querySelectorAll(".sidebar-item").forEach(i => i.classList.remove("active"));
  (el || document.querySelector(`.sidebar-item[data-filter="${filter}"]`))
    ?.classList.add("active");
  renderProductGrid();
  closeSidebar();
  setTimeout(() => {
    document.getElementById("section-productos")
      ?.scrollIntoView({ behavior:"smooth", block:"start" });
  }, 100);
}

/* --------------------------------------------------------------------------
   6. SIDEBAR
   -------------------------------------------------------------------------- */
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("sidebar-overlay").classList.toggle("open");
});

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebar-overlay").classList.remove("open");
}

/* --------------------------------------------------------------------------
   7. BÚSQUEDA EN VIVO
   -------------------------------------------------------------------------- */
document.getElementById("search-input").addEventListener("input", function () {
  searchQuery = this.value.trim().toLowerCase();
  if (searchQuery && ["inicio","favoritos","ofertas","tendencias"].includes(currentFilter)) {
    currentFilter = "inicio";
  }
  renderProductGrid();
});

/* --------------------------------------------------------------------------
   8. FAVORITOS
   -------------------------------------------------------------------------- */
function toggleFav(id, btn) {
  const adding = !favs.has(id);
  favs[adding ? "add" : "delete"](id);
  btn.textContent = adding ? "♥" : "♡";
  btn.classList.toggle("faved", adding);
  showToast(adding ? "Agregado a favoritos" : "Eliminado de favoritos");
}

/* --------------------------------------------------------------------------
   9. RENDERS
   -------------------------------------------------------------------------- */

/* — Carrusel de tendencias — */
function renderCarousel() {
  document.getElementById("carousel").innerHTML = products
    .filter(p => p.destacado)
    .map(p => `
      <div class="trend-card" data-id="${p.id}" onclick="abrirDetallePorId(${p.id})">
        <div class="trend-img">
          ${p.emoji}
          ${p.oferta ? `<div class="trend-badge">OOFRETA</div>` : ""}
        </div>
        <div class="trend-info">
          <div class="trend-name">${p.nombre}</div>
          <div class="trend-price">${formatPrice(p.precio)}</div>
        </div>
      </div>`)
    .join("");
}

function scrollCarousel(dir) {
  document.getElementById("carousel").scrollBy({ left: dir * 340, behavior:"smooth" });
}

/* — Ofertas del día — */
function renderOfertas() {
  document.getElementById("oferta-grid").innerHTML = products
    .filter(p => p.oferta)
    .slice(0, 8)
    .map(p => {
      const old  = p.precioOld || Math.round(p.precio * 1.3);
      const ahorro = old - p.precio;
      return `
        <div class="oferta-card" data-id="${p.id}" onclick="abrirDetallePorId(${p.id})">
          <div class="oferta-img">
            ${p.emoji}
            <div class="badge-oferta">-${pctOff(old, p.precio)}%</div>
          </div>
          <div class="oferta-info">
            <div class="oferta-name">${p.nombre}</div>
            <div class="oferta-precio-old">${formatPrice(old)}</div>
            <div class="oferta-precio">${formatPrice(p.precio)}</div>
            <div class="oferta-descuento">↓ Ahorras ${formatPrice(ahorro)}</div>
          </div>
        </div>`;
    })
    .join("");
}

/* — Grilla principal de productos — */
function renderProductGrid() {
  // Aplicar filtros
  let list = products.filter(p => {
    if (currentFilter === "favoritos")  return favs.has(p.id);
    if (currentFilter === "ofertas")    return p.oferta;
    if (currentFilter === "tendencias") return p.destacado;
    if (currentFilter !== "inicio")     return p.cat === currentFilter;
    return true;
  });

  if (searchQuery) {
    list = list.filter(p =>
      [p.nombre, p.cat, p.desc].some(v => v?.toLowerCase().includes(searchQuery))
    );
  }

  // Actualizar encabezado
  document.getElementById("section-products-title").textContent =
    searchQuery ? `Resultados para "${searchQuery}"` : (FILTER_LABELS[currentFilter] || "Productos");
  document.getElementById("product-count").textContent =
    `${list.length} producto${list.length !== 1 ? "s" : ""}`;

  const g = document.getElementById("product-grid");

  if (!list.length) {
    g.innerHTML = `<div class="empty-state"><div>🔍</div><p>No se encontraron productos.</p></div>`;
    return;
  }

  g.innerHTML = list.map(p => {
    const faved = favs.has(p.id);
    return `
      <div class="product-card" data-id="${p.id}" onclick="abrirDetallePorId(${p.id})">
        <div class="pc-img">
          ${p.emoji}
          <button class="pc-fav-btn ${faved ? "faved" : ""}"
            onclick="event.stopPropagation();toggleFav(${p.id},this)"
            title="${faved ? "Quitar de favoritos" : "Agregar a favoritos"}">
            ${faved ? "♥" : "♡"}
          </button>
        </div>
        <div class="pc-body">
          <div class="pc-cat">${p.cat}</div>
          <div class="pc-name">${p.nombre}</div>
          <div class="pc-desc">${p.desc || ""}</div>
          <div class="pc-price">${formatPrice(p.precio)}</div>
          <div class="pc-shipping">✓ Envío disponible</div>
          <button class="pc-add-btn">
            Ver detalles
          </button>
        </div>
      </div>`;
  }).join("");
}

/* --------------------------------------------------------------------------
   10. INICIALIZACIÓN
   -------------------------------------------------------------------------- */
function renderAll() {
  renderCarousel();
  renderOfertas();
  renderProductGrid();
}

renderAll();