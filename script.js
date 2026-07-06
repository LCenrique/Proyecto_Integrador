/* --------------------------------------------------------------------------
   1. WHATSAPP — Conexión con el numero de contacto
  -------------------------------------------------------------------------- */
const WSP_NUMBER   = "528991038598";
const whatsappLink = `https://wa.me/${WSP_NUMBER}`;

let currentFilter = "inicio";
let searchQuery   = ""; 

/* --------------------------------------------------------------------------
   2. DATOS — Catálogo de productos
   -------------------------------------------------------------------------- */

const products = JSON.parse(localStorage.getItem("streetSideProducts")) || [
  // CADENAS
  { id:1,  nombre:"Cadena Cubana Plata",         cat:"cadenas",      precio:220,  precioOld:null, oferta:true,  favorito:false, destacado:true,  source:"Images/Cadena_CP.jpeg",   desc:"Acero inoxidable 316L de alta resistencia.", descL:"Fabricada en acero inoxidable 316L de alta resistencia, diseñada para conservar su brillo y soportar el uso diario sin perder su estilo." },
  { id:2,  nombre:"Cadena Snake Gold",           cat:"cadenas",      precio:430,  precioOld:null, oferta:false, favorito:false, destacado:true,  source:"Images/Cadena_SG.jpeg",   desc:"Acabado en oro 18K con brillo elegante.", descL:"Cadena con elegante acabado chapado en oro de 18K, perfecta para complementar cualquier outfit con un toque sofisticado y moderno."  },
  { id:3,  nombre:"Cadena Rolo Negra",           cat:"cadenas",      precio:320,  precioOld:400,  oferta:true,  favorito:false, destacado:false, source:"Images/Cadena_RN.jpeg",   desc:"Acero negro mate de estilo urbano.", descL:"Elaborada en acero negro mate con un diseño urbano y resistente, ideal para quienes buscan un estilo alternativo y versátil." },
  { id:4,  nombre:"Cadena Figaro Plata",         cat:"cadenas",      precio:490,  precioOld:null, oferta:false, favorito:false, destacado:false, source:"Images/Cadena_FP.jpeg",   desc:"Plata 925 con diseño clásico.", descL:"Fabricada en plata 925 con el clásico diseño Figaro, una pieza elegante que nunca pasa de moda y combina con cualquier ocasión." },
  // ANILLOS
  { id:5,  nombre:"Anillo Calavera Plata",       cat:"anillos",      precio:280,  precioOld:350,  oferta:true,  favorito:false, destacado:true,  source:"Images/Anillo_CLV.jpeg",  desc:"Plata 925 con ajuste adaptable.", descL:"Anillo elaborado en plata 925 con un detallado diseño de calavera y talla ajustable para brindar mayor comodidad al usarlo."  },
  { id:6,  nombre:"Anillo Dragón Negro",         cat:"anillos",      precio:310,  precioOld:null, oferta:false, favorito:false, destacado:true,  source:"Images/Anillo_DN.jpeg",   desc:"Grabado de dragón en acero negro.", descL:"Fabricado en acero negro con un impresionante grabado de dragón, pensado para destacar con un estilo único y llamativo." },
  { id:7, nombre:"Anillo Aro Minimalista",       cat:"anillos",      precio:150,  precioOld:200,  oferta:true,  favorito:false, destacado:false, source:"Images/Anillo_AM.jpeg",   desc:"Diseño minimalista para cualquier ocasión.", descL:"Diseño minimalista en acero inoxidable de excelente calidad, perfecto para usar solo o combinar con otros accesorios." },
  { id:8, nombre:"Anillo Serpiente",             cat:"anillos",      precio:260,  precioOld:null, oferta:false, favorito:false, destacado:false, source:"Images/Anillo_SRP.jpeg",  desc:"Anillo envolvente con acabado oxidado.", descL:"Anillo envolvente con diseño de serpiente y acabado en plata oxidada, ideal para quienes buscan un accesorio con personalidad." },
  // COLLARES
  { id:9, nombre:"Collar Cruz Gótica",           cat:"collares",     precio:340,  precioOld:420,  oferta:true,  favorito:false, destacado:true,  source:"Images/Collar_CG.jpeg",   desc:"Cruz de acero con estilo alternativo.", descL:"Collar con colgante de cruz elaborado en acero inoxidable, perfecto para complementar un estilo alternativo con un toque elegante." },
  { id:10, nombre:"Collar Ojo de Horus",         cat:"collares",     precio:290,  precioOld:null, oferta:false, favorito:false, destacado:true,  source:"Images/Collar_OH.jpeg",   desc:"Colgante inspirado en el Ojo de Horus.", descL:"Colgante inspirado en el Ojo de Horus con acabado dorado, símbolo de protección que destaca por su diseño moderno." },
  { id:11, nombre:"Collar Piedra Obsidiana",     cat:"collares",     precio:380,  precioOld:480,  oferta:false, favorito:false, destacado:false, source:"Images/Collar_PO.jpeg",   desc:"Obsidiana natural con cordón resistente.", descL:"Collar con auténtica piedra de obsidiana natural y cordón resistente, ideal para un estilo auténtico y sofisticado."},
  { id:12, nombre:"Collar Diente Tiburón",       cat:"collares",     precio:260,  precioOld:null, oferta:false, favorito:false, destacado:false, source:"Images/Collar_DT.jpeg",   desc:"Colgante estilo surfer con acabado dorado.", descL:"Colgante con forma de diente de tiburón y detalles dorados, inspirado en un estilo surfer moderno y juvenil."},
  // CINTURONES
  { id:13, nombre:"Cinturón Hebilla Doble",      cat:"cinturones",   precio:480,  precioOld:600,  oferta:true,  favorito:false, destacado:true,  source:"Images/Cinturon_HD.png",  desc:"Cuero genuino con doble hebilla metálica.", descL:"Fabricado en cuero genuino con doble hebilla metálica de alta resistencia, perfecto para un look casual o urbano."},
  { id:14, nombre:"Cinturón Tachuelado",         cat:"cinturones",   precio:520,  precioOld:null, oferta:false, favorito:false, destacado:true,  source:"Images/Cinturon_TCH.png", desc:"Cuero negro con detalles metálicos.", descL:"Cinturón de cuero negro decorado con tachuelas metálicas que aportan un estilo rockero, moderno y lleno de personalidad."},
  { id:15, nombre:"Cinturón Minimalista",        cat:"cinturones",   precio:280,  precioOld:null, oferta:false, favorito:false, destacado:false, source:"Images/Cinturon_MNM.png", desc:"Diseño limpio para uso diario.", descL:"Cinturón de cuero liso con hebilla sencilla, diseñado para combinar fácilmente con cualquier tipo de ropa."},
  { id:16, nombre:"Cinturón Militar",            cat:"cinturones",   precio:350,  precioOld:440,  oferta:true,  favorito:false, destacado:false, source:"Images/Cinturon_MLT.png", desc: "Lona resistente con doble argolla", descL:"Fabricado con lona de alta resistencia y doble argolla metálica que garantiza un ajuste firme y una gran durabilidad."},
  // PULSERAS
  { id:18, nombre:"Pulsera Calaveras",           cat:"pulseras",     precio:210,  precioOld:null, oferta:false, favorito:false, destacado:true,  source:"Images/Pulsera_CLV.jpeg", desc:"Detalles de calaveras y cuero negro.", descL:"Pulsera con detalles de calaveras metálicas y cuero negro que aporta un estilo alternativo con gran personalidad."},  
  { id:17, nombre:"Pulsera Cuero Trenzado",      cat:"pulseras",     precio:180,  precioOld:240,  oferta:true,  favorito:false, destacado:true,  source:"Images/Pulsera_CT.png",   desc:"Cuero trenzado con estilo casual.", descL:"Pulsera elaborada con cuero trenzado de excelente calidad, ideal para complementar un estilo casual y moderno."},
  { id:19, nombre:"Pulsera Runa",                cat:"pulseras",     precio:160,  precioOld:200,  oferta:true,  favorito:false, destacado:false, source:"Images/Pulsera_RN.png",   desc:"Grabados rúnicos sobre acero inoxidable.", descL:"Pulsera de acero inoxidable con grabados rúnicos cuidadosamente elaborados para un diseño auténtico y llamativo."},
  { id:20, nombre:"Pulsera Esposa Metal",        cat:"pulseras",     precio:290,  precioOld:null, oferta:false, favorito:false, destacado:false, source:"Images/Pulsera_EM.jpg",   desc:"Acero pulido con ajuste cómodo.", descL:"Pulsera rígida de acero pulido con diseño ajustable que ofrece comodidad, resistencia y un acabado elegante."},
  // BOTAS
  { id:21, nombre:"Bota Motociclista Negra",     cat:"botas",        precio:1850, precioOld:2200, oferta:true,  favorito:false, destacado:true,  source:"Images/Bota_MN.jpeg",     desc:"Cuero genuino con suela robusta.", descL:"Botas de cuero genuino con suela gruesa y resistente, diseñadas para ofrecer comodidad, estilo y gran durabilidad."},
  { id:22, nombre:"Bota Combat Militar",         cat:"botas",        precio:1650, precioOld:1990, oferta:true,  favorito:false, destacado:false, source:"Images/Botas_CM.jpeg",    desc:"Diseño militar con gran resistencia.", descL:"Botas de inspiración militar fabricadas con lona y cuero de alta calidad, ideales para un uso exigente y prolongado."},
  { id:23, nombre:"Bota Western Punta Fina",     cat:"botas",        precio:2400, precioOld:null, oferta:false, favorito:false, destacado:false, source:"Images/Bota_WPF.jpeg",    desc:"Estilo western con bordado exclusivo.", descL:"Botas estilo western elaboradas en cuero con finos bordados decorativos que aportan un acabado exclusivo y elegante."},
  // PLAYERAS
  { id:24, nombre:"Playera Calavera Estampada",  cat:"playeras",     precio:320,  precioOld:420,  oferta:true,  favorito:false, destacado:true,  source:"Images/Playera_CLV.jpeg", desc:"Algodón suave con estampado llamativo.", descL:"Playera confeccionada en algodón 100% con un estampado de calavera de alta calidad que mantiene sus colores por más tiempo."},
  { id:25, nombre:"Playera Manga Larga Térmica", cat:"playeras",     precio:350,  precioOld:440,  oferta:true,  favorito:false, destacado:false, source:"Images/Playera_MLT.jpeg", desc:"Comodidad y calidez para todo clima.", descL:"Playera térmica de manga larga confeccionada en algodón suave que brinda comodidad y protección durante los días frescos."},
  { id:26, nombre:"Playera Crop Metal Gráfico",  cat:"playeras",     precio:260,  precioOld:340,  oferta:true,  favorito:false, destacado:false, source:"Images/Playera_CM.jpeg",  desc:"Corte crop con diseño rockero.", descL:"Playera tipo crop con estampado inspirado en bandas de rock, ideal para crear un look moderno y auténtico."},
  { id:27, nombre:"Playera Raglán Bicolor",      cat:"playeras",     precio:290,  precioOld:null, oferta:false, favorito:false, destacado:false, source:"Images/Playera_RB.jpeg",  desc:"Diseño bicolor de estilo casual.", descL:"Playera raglán con combinación de colores y mangas 3/4, perfecta para un estilo casual y cómodo durante todo el día."},
  // PIERCINGS
  { id:28, nombre:"Piercing Septum Plata",       cat:"piercings",    precio:180,  precioOld:240,  oferta:true,  favorito:false, destacado:true,  source:"Images/Piercing_SP.jpeg", desc:"Acero quirúrgico seguro y duradero.", descL:"Piercing para septum fabricado en acero quirúrgico 316L, resistente a la corrosión y cómodo para el uso diario."},
  { id:29, nombre:"Piercing Helix Espiral ",     cat:"piercings",    precio:140,  precioOld:null, oferta:false, favorito:false, destacado:true,  source:"Images/Piercing_HE.jpeg", desc:"Titanio ligero ideal para uso diario.", descL:"Aro para helix elaborado en titanio grado implante, ligero, seguro para la piel y perfecto para uso continuo."},
  { id:30, nombre:"Piercing Nariz Diamante",     cat:"piercings",    precio:220,  precioOld:280,  oferta:true,  favorito:false, destacado:false, source:"Images/Piercing_DM.jpeg", desc:"Brillo elegante con cristal premium.", descL:"Piercing para nariz con cristal brillante y estructura de acero inoxidable que aporta un toque elegante y discreto."},
  { id:31, nombre:"Piercing Daith Corazón",      cat:"piercings",    precio:200,  precioOld:null, oferta:false, favorito:false, destacado:false, source:"Images/Piercing_CRZ.jpeg", desc:"Diseño de corazón en plata 925.", descL:"Piercing daith con delicado diseño de corazón elaborado en plata 925, ideal para complementar cualquier estilo."},
  // ACCESORIOS
  { id:32, nombre:"Mochila Hello Kitty Alt",     cat:"accesorios",   precio:680,  precioOld:850,  oferta:false, favorito:false, destacado:true,  source:"Images/Mochila_HK.jpeg", desc:"Estilo kawaii con toque alternativo", descL:"Mochila de edición alternativa con amplio espacio interior y un diseño kawaii que destaca por su originalidad."},
  { id:33, nombre:"Gafas Redondas Vintage",      cat:"accesorios",   precio:420,  precioOld:null, oferta:false, favorito:false, destacado:true,  source:"Images/Gafas_RDNS.jpeg", desc:"Protección UV400 con diseño retro.", descL:"Gafas de estilo vintage con protección UV400 y montura metálica resistente para un look clásico y moderno."},
  { id:34, nombre:"Sombrero Fedora Cuero",       cat:"accesorios",   precio:550,  precioOld:690,  oferta:true,  favorito:false, destacado:false, source:"Images/Sombrero_FDC.jpeg", desc:"Fedora de cuero con acabado premium.", descL:"Sombrero fedora elaborado en cuero con acabados premium y una banda decorativa que resalta su elegante diseño."},
  // HERRAMIENTAS
  { id:35, nombre:"Navaja Multiherramienta",     cat:"herramientas", precio:890,  precioOld:1100, oferta:true,  favorito:false, destacado:true,  source:"Images/Navaja_MH.jpeg", desc:"12 herramientas en un solo accesorio.", descL:"Multiherramienta fabricada en acero inoxidable con 12 funciones esenciales para actividades al aire libre y uso cotidiano."},
  { id:36, nombre:"Linterna Táctica LED",        cat:"herramientas", precio:340,  precioOld:null, oferta:false, favorito:false, destacado:false, source:"Images/Linterna_TCT.jpeg", desc:"Iluminación potente con zoom ajustable.", descL:"Linterna LED de alta potencia con función de zoom ajustable, diseñada para ofrecer una iluminación intensa y confiable."},
  { id:37, nombre:"Navaja Plegable Negra",       cat:"herramientas", precio:560,  precioOld:700,  oferta:true,  favorito:false, destacado:false, source:"Images/Navaja_PL.jpeg", desc:"Hoja de acero D2 ultrarresistente.", descL:"Navaja plegable con hoja de acero D2 y mango G10 ergonómico, ideal por su resistencia y precisión de corte."},
  // ROPA
  { id:38, nombre:"Chaleco Piel Motociclista",   cat:"ropa",         precio:1800, precioOld:2200, oferta:false, favorito:false, destacado:true,  source:"Images/Chaleco_MT.jpeg", desc:"Chaleco de cuero para un look biker.", descL:"Chaleco confeccionado en cuero genuino con múltiples bolsillos y un diseño inspirado en el estilo biker clásico."  },
  { id:39, nombre:"Pantalón Cargo Oscuro",       cat:"ropa",         precio:620,  precioOld:null, oferta:false, favorito:false, destacado:true,  source:"Images/Pantalon_CO.jpeg", desc:"Seis bolsillos y máxima comodidad.", descL:"Pantalón cargo elaborado con tela resistente y seis bolsillos funcionales que ofrecen comodidad y gran capacidad."},
  // CALZADO
  { id:40, nombre:"Tenis Chunky Blanco",         cat:"calzado",      precio:1100, precioOld:1380, oferta:true,  favorito:false, destacado:true,  source:"Images/Tenis_CB.jpeg", desc:"Estilo Y2K con suela de gran volumen.", descL:"Tenis de estilo Y2K con suela gruesa que proporciona comodidad, estabilidad y un diseño moderno en tendencia."  },
  { id:41, nombre:"Oxford Cuero Negro",          cat:"calzado",      precio:980,  precioOld:null, oferta:false, favorito:false, destacado:true,  source:"Images/Zapatos_OCN.jpeg", desc:"Elegancia clásica en cuero genuino.", descL:"Zapatos Oxford elaborados en cuero negro con acabado elegante y suela resistente, ideales para cualquier ocasión."  },
  { id:42, nombre:"Sandalias Plataforma",        cat:"calzado",      precio:750,  precioOld:940,  oferta:true,  favorito:false, destacado:false, source:"Images/Sandalias_PLT.jpeg", desc:"Plataforma cómoda con hebilla ajustable.", descL:"Sandalias con plataforma de 5 cm y hebilla ajustable que brindan comodidad, estabilidad y un estilo contemporáneo."  },
  // STICKERS
  { id:43, nombre:"Pack Stickers Skulls x20",    cat:"stickers",     precio:80,   precioOld:120,  oferta:true,  favorito:false, destacado:true,  source:"Images/Stickers_PKT.jpeg", desc:"20 stickers de vinilo resistentes al agua.", descL:"Paquete con 20 stickers de vinilo impermeable de alta calidad, ideales para personalizar laptops, botellas o libretas."  },
  { id:44, nombre:"Sticker Holográfico Dragon",  cat:"stickers",     precio:45,   precioOld:null, oferta:false, favorito:false, destacado:true,  source:"Images/Sticker_HD.jpeg", desc:"Acabado holográfico con efecto brillante.", descL:"Sticker holográfico con diseño de dragón y acabado brillante que cambia de color según el ángulo de la luz."  },
];


/* --------------------------------------------------------------------------
   3. ESTADO
   -------------------------------------------------------------------------- */
let favs = new Set(products.filter(p => p.favorito).map(p => p.id));

/* --------------------------------------------------------------------------
   3.5 FUNCIÓN COMPARTIDA PARA EL SCRIPT DE FAVORITOS (VINCULO CON MODAL)
   -------------------------------------------------------------------------- */
window.esFavorito = function(id) {
  return favs.has(id);
};

// --- CANDADO ADAPTADO PARA EL BOTÓN DE FAVORITOS DEL MODAL ---
document.getElementById("modal-btn-fav").addEventListener("click", function() {
  // Verificación de sesión activa
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    showToast("Inicia sesión para guardar favoritos.");
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
    return;
  }

  const productId = parseInt(this.getAttribute("data-product-id"));
  if (!productId) return;
  
  const isAdding = !favs.has(productId);
  favs[isAdding ? "add" : "delete"](productId);
  
  this.setAttribute("aria-pressed", isAdding ? "true" : "false");
  this.querySelector('.product-modal__btn-fav-label').textContent = isAdding ? 'Quitar de favoritos' : 'Agregar a favoritos';
  this.querySelector('.product-modal__btn-fav-icon').textContent = isAdding ? '♥' : '♡';
  
  showToast(isAdding ? "Agregado a favoritos" : "Eliminado de favoritos");
  
  renderProductGrid();
});

function abrirDetallePorId(id) {
  const item = products.find(p => p.id === id);
  if (item) {
    const productoAdaptado = {
      id: item.id,
      nombre: item.nombre,
      categoria: item.cat,
      precio: item.precio,
      precioViejo: item.precioOld,
      descripcion: item.descL,
      stock: true,
      imagen: item.source ? item.source : item.emoji 
    };
    
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

/* --------------------------------------------------|------------------------
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
   8. FAVORITOS (CON CANDADO DE INICIO DE SESIÓN ACTIVO)
   -------------------------------------------------------------------------- */
function toggleFav(id, btn) {
  // --- CANDADO ABSOLUTO ---
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    showToast("Inicia sesión para guardar favoritos.");
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
    return; // Detiene cualquier acción posterior
  }

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
    .map(p => {
      // Validación de imagen para el Carrusel
      const imagenRender = p.source 
        ? `<img src="${p.source}" alt="${p.nombre}" class="product-img-card" onerror="this.src='https://via.placeholder.com/150';">`
        : `${p.emoji}`;

      return `
        <div class="trend-card" data-id="${p.id}" onclick="abrirDetallePorId(${p.id})">
          <div class="trend-img">
            ${imagenRender}
            ${p.oferta ? `<div class="trend-badge">OFERTA</div>` : ""}
          </div>
          <div class="trend-info">
            <div class="trend-name">${p.nombre}</div>
            <div class="trend-price">${formatPrice(p.precio)}</div>
          </div>
        </div>`;
    })
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

      // Validación de imagen para las Ofertas
      const imagenRender = p.source 
        ? `<img src="${p.source}" alt="${p.nombre}" class="product-img-card" onerror="this.src='https://via.placeholder.com/150';">`
        : `${p.emoji}`;

      return `
        <div class="oferta-card" data-id="${p.id}" onclick="abrirDetallePorId(${p.id})">
          <div class="oferta-img">
            ${imagenRender}
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

  document.getElementById("section-products-title").textContent =
    searchQuery ? `Resultados para "${searchQuery}"` : (FILTER_LABELS[currentFilter] || "Productos");
  document.getElementById("product-count").textContent =
    `${list.length} producto${list.length !== 1 ? "s" : ""}`;

  const g = document.getElementById("product-grid");

  if (!list.length) {
    g.innerHTML = `<div class="empty-state"><div></div><p>No se encontraron productos.</p></div>`;
    return;
  }

  g.innerHTML = list.map(p => {
    const faved = favs.has(p.id);

    const imagenRender = p.source 
      ? `<img src="${p.source}" alt="${p.nombre}" class="product-img-card" onerror="this.src='https://via.placeholder.com/150';">`
      : `${p.emoji}`;

    return `
      <div class="product-card" data-id="${p.id}" onclick="abrirDetallePorId(${p.id})">
        <div class="pc-img">
          ${imagenRender}
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
          <div class="pc-shipping">Disponible</div>
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

/* --------------------------------------------------------------------------
   11. CONTROL DEL BOTÓN DE AUTENTICACIÓN (DINÁMICO EN NAVBAR)
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const btnAuth = document.getElementById('btn-auth');

  if (btnAuth) {
    // Buscamos la etiqueta <strong> que está adentro del enlace
    const strongText = btnAuth.querySelector('strong');
    const estadoSesion = localStorage.getItem('isLoggedIn');

    if (estadoSesion === 'true') {
      // SI INICIÓ SESIÓN: Cambiamos el texto de adentro del strong
      if (strongText) {
        strongText.textContent = "Cerrar Sesión";
      }

      // Desactivamos el comportamiento del enlace para que no redirija a login.html
      btnAuth.onclick = function(event) {
        event.preventDefault();
        localStorage.clear(); // Limpieza absoluta de la sesión fantasma
        window.location.reload(); // Recarga la misma página al instante
      };

    } else {
      // SI ES INVITADO: Aseguramos que diga Iniciar Sesión de forma normal
      if (strongText) {
        strongText.textContent = "Iniciar sesión";
      }
      btnAuth.style.color = "";
      
      btnAuth.onclick = null; 
    }
  }
});