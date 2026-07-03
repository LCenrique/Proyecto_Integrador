/* ==========================================================================
   1. CONTROL DE ACCESO (CANDADO)
   ========================================================================== */
const estadoSesion = localStorage.getItem("isLoggedIn");
const rolUsuario = localStorage.getItem("userRole");

// Si no ha iniciado sesión o no es admin, redirige al index
if (estadoSesion !== "true" || rolUsuario !== "admin") {
    alert("Acceso denegado. No tienes permisos de administrador.");
    window.location.href = "index.html";
}

/* ==========================================================================
   2. CARGA DE DATOS SINCRONIZADA
   ========================================================================== */
// Leemos exactamente la misma clave que usa tu script.js principal
let products = JSON.parse(localStorage.getItem("streetSideProducts"));

// Si por alguna razón está vacío, cargamos exactamente tu base de datos de 44 productos
if (!products || products.length === 0) {
    products = [
        // CADENAS
        { id:1,  nombre:"Cadena Cubana Plata",       cat:"cadenas",      precio:580,  precioOld:720,  oferta:true,  favorito:false, destacado:true,  emoji:"⛓️", desc:"Acero inoxidable 316L, 60cm" },
        { id:2,  nombre:"Cadena Snake Gold",          cat:"cadenas",      precio:430,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"⛓️", desc:"Chapado en oro 18k, 45cm" },
        { id:3,  nombre:"Cadena Rolo Negra",          cat:"cadenas",      precio:320,  precioOld:400,  oferta:true,  favorito:false, destacado:false, emoji:"⛓️", desc:"Acero negro mate, 55cm" },
        { id:4,  nombre:"Cadena Figaro Plata",        cat:"cadenas",      precio:490,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"⛓️", desc:"Plata 925, 50cm" },
        // ANILLOS
        { id:5,  nombre:"Anillo Calavera Plata",      cat:"anillos",      precio:280,  precioOld:350,  oferta:true,  favorito:false, destacado:true,  emoji:"💍", desc:"Plata 925, talla ajustable" },
        { id:6,  nombre:"Anillo Dragón Negro",        cat:"anillos",      precio:310,  precioOld:null, oferta:false, favorito:false, destacado:true, source:"Images/anillo_DN.jpeg", desc:"Acero negro, grabado artesanal" },
        { id:7,  nombre:"Anillo Aro Minimalista",     cat:"anillos",      precio:150,  precioOld:200,  oferta:true,  favorito:false, destacado:false, emoji:"💍", desc:"Acero fino, apilable" },
        { id:8,  nombre:"Anillo Serpiente",           cat:"anillos",      precio:260,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"💍", desc:"Wrap ring, plata oxidada" },
        // COLLARES
        { id:9,  nombre:"Collar Cruz Gótica",         cat:"collares",     precio:340,  precioOld:420,  oferta:true,  favorito:false, destacado:true,  emoji:"📿", desc:"Colgante acero, cadena 60cm" },
        { id:10, nombre:"Collar Ojo de Ra",           cat:"collares",     precio:290,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"📿", desc:"Chapado en oro, pendiente" },
        { id:11, nombre:"Collar Piedra Obsidiana",    cat:"collares",     precio:380,  precioOld:480,  oferta:false, favorito:false, destacado:false, emoji:"📿", desc:"Piedra natural, cordón negro" },
        { id:12, nombre:"Collar Diente Tiburón",      cat:"collares",     precio:260,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"📿", desc:"Resina + oro, surf style" },
        // CINTURONES
        { id:13, nombre:"Cinturón Hebilla Doble",     cat:"cinturones",   precio:480,  precioOld:600,  oferta:true,  favorito:false, destacado:true,  emoji:"🪢", desc:"Piel genuina, hebilla metal" },
        { id:14, nombre:"Cinturón Tachuelado",        cat:"cinturones",   precio:520,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"🪢", desc:"Cuero negro, tachuelas plata" },
        { id:15, nombre:"Cinturón Minimalista",       cat:"cinturones",   precio:280,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"🪢", desc:"Cuero liso, hebilla simple" },
        { id:16, nombre:"Cinturón Militar",           cat:"cinturones",   precio:350,  precioOld:440,  oferta:true,  favorito:false, destacado:false, emoji:"🪢", desc:"Lona resistente, doble argolla" },
        // PULSERAS
        { id:17, nombre:"Pulsera Cuero Trenzado",     cat:"pulseras",     precio:180,  precioOld:240,  oferta:true,  favorito:false, destacado:true,  emoji:"💫", desc:"Cuero trenzado 3 hilos" },
        { id:18, nombre:"Pulsera Calaveras",          cat:"pulseras",     precio:210,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"💫", desc:"Charms plata + cuero negro" },
        { id:19, nombre:"Pulsera Runa",               cat:"pulseras",     precio:160,  precioOld:200,  oferta:true,  favorito:false, destacado:false, emoji:"💫", desc:"Grabado rúnico, acero" },
        { id:20, nombre:"Pulsera Esposa Metal",       cat:"pulseras",     precio:290,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"💫", desc:"Acero rígido pulido, ajustable" },
        // BOTAS
        { id:21, nombre:"Bota Motociclista Negra",    cat:"botas",        precio:1850, precioOld:2200, oferta:true,  favorito:false, destacado:true,  emoji:"🥾", desc:"Cuero genuino, suela gruesa" },
        { id:22, nombre:"Bota Combat Militar",        cat:"botas",        precio:1650, precioOld:1990, oferta:true,  favorito:false, destacado:false, emoji:"🥾", desc:"Lona + cuero, suela Vibram" },
        { id:23, nombre:"Bota Western Punta Fina",    cat:"botas",        precio:2400, precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"🥾", desc:"Cuero exótico, bordado floral" },
        // PLAYERAS
        { id:24, nombre:"Playera Calavera Estampada", cat:"playeras",     precio:320,  precioOld:420,  oferta:true,  favorito:false, destacado:true,  emoji:"👕", desc:"100% algodón, serigrafía" },
        { id:25, nombre:"Playera Manga Larga Térmica",cat:"playeras",     precio:350,  precioOld:440,  oferta:true,  favorito:false, destacado:false, emoji:"👕", desc:"Algodón térmico, liso" },
        { id:26, nombre:"Playera Crop Metal Gráfico", cat:"playeras",     precio:260,  precioOld:340,  oferta:true,  favorito:false, destacado:false, emoji:"👕", desc:"Crop fit, estampado bandas" },
        { id:27, nombre:"Playera Raglán Bicolor",     cat:"playeras",     precio:290,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"👕", desc:"Negro + gris, manga 3/4" },
        // PIERCINGS
        { id:28, nombre:"Piercing Septum Plata",      cat:"piercings",    precio:180,  precioOld:240,  oferta:true,  favorito:false, destacado:true,  emoji:"💎", desc:"Acero quirúrgico 316L" },
        { id:29, nombre:"Piercing Helix Aro",          cat:"piercings",    precio:140,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"💎", desc:"Titanio grado implante" },
        { id:30, nombre:"Piercing Nariz Diamante",    cat:"piercings",    precio:220,  precioOld:280,  oferta:true,  favorito:false, destacado:false, emoji:"💎", desc:"Cristal Swarovski + acero" },
        { id:31, nombre:"Piercing Daith Corazón",     cat:"piercings",    precio:200,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"💎", desc:"Aro corazón, plata 925" },
        // ACCESORIOS
        { id:32, nombre:"Mochila Hello Kitty Alt",    cat:"accesorios",   precio:680,  precioOld:850,  oferta:false, favorito:false, destacado:true,  emoji:"🎒", desc:"Edición alternativa, kawaii" },
        { id:33, nombre:"Gafas Redondas Vintage",     cat:"accesorios",   precio:420,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"🕶️", desc:"Montura metálica, UV400" },
        { id:34, nombre:"Sombrero Fedora Cuero",      cat:"accesorios",   precio:550,  precioOld:690,  oferta:true,  favorito:false, destacado:false, emoji:"🎩", desc:"Cuero liso, banda tejida" },
        // HERRAMIENTAS
        { id:35, nombre:"Cuchillo Multiherramienta",  cat:"herramientas", precio:890,  precioOld:1100, oferta:true,  favorito:false, destacado:true,  emoji:"🔧", desc:"Acero inox, 12 funciones" },
        { id:36, nombre:"Linterna Táctica LED",       cat:"herramientas", precio:340,  precioOld:null, oferta:false, favorito:false, destacado:false, emoji:"🔦", desc:"1000 lúmenes, zoom" },
        { id:37, nombre:"Navaja Plegable Negra",      cat:"herramientas", precio:560,  precioOld:700,  oferta:true,  favorito:false, destacado:false, emoji:"🔪", desc:"Hoja D2 steel, mango G10" },
        // ROPA
        { id:38, nombre:"Chaleco Piel Motociclista",  cat:"ropa",         precio:1800, precioOld:2200, oferta:false, favorito:false, destacado:true,  emoji:"🧥", desc:"Cuero genuino, bolsillos" },
        { id:39, nombre:"Pantalón Cargo Oscuro",      cat:"ropa",         precio:620,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"👖", desc:"Tela resistente, 6 bolsillos" },
        // CALZADO
        { id:40, nombre:"Tenis Chunky Blanco",        cat:"calzado",      precio:1100, precioOld:1380, oferta:true,  favorito:false, destacado:true,  emoji:"Sneakers", desc:"Suela gruesa, estilo Y2K" },
        { id:41, nombre:"Oxford Cuero Negro",         cat:"calzado",      precio:980,  precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"👞", desc:"Cuero pulido, suela goma" },
        { id:42, nombre:"Sandalias Plataforma",       cat:"calzado",      precio:750,  precioOld:940,  oferta:true,  favorito:false, destacado:false, emoji:"👡", desc:"Plataforma 5cm, hebilla" },
        // STICKERS
        { id:43, nombre:"Pack Stickers Skulls x20",   cat:"stickers",     precio:80,   precioOld:120,  oferta:true,  favorito:false, destacado:true,  emoji:"🎨", desc:"Vinilo impermeable, 5cm c/u" },
        { id:44, nombre:"Sticker Holográfico Dragon", cat:"stickers",     precio:45,   precioOld:null, oferta:false, favorito:false, destacado:true,  emoji:"🎨", desc:"Holo premium, 10cm" }
    ];
    guardarEnStorage();
}

function guardarEnStorage() {
    localStorage.setItem("streetSideProducts", JSON.stringify(products));
}

/* ==========================================================================
   3. FORMATOS Y RENDERIZADO DE TABLA
   ========================================================================== */
const formatPrice = n => "$" + n.toLocaleString("es-MX");

function showToast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200);
}

function renderAdminTable() {
    const tbody = document.getElementById("admin-tbody");
    
    // Calcular paneles informativos
    document.getElementById("stat-total").textContent = products.length;
    document.getElementById("stat-ofertas").textContent = products.filter(p => p.oferta).length;
    document.getElementById("stat-destacados").textContent = products.filter(p => p.destacado).length;

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:#A1A1A1;">No hay productos en el catálogo.</td></tr>`;
        return;
    }

    tbody.innerHTML = products.map(p => `
        <tr>
            <td style="color:#A1A1A1">#${p.id}</td>
            <td><strong>${p.nombre}</strong></td>
            <td><span class="tag-cat">${p.cat}</span></td>
            <td>${formatPrice(p.precio)}</td>
            <td>
                <div style="display:flex; gap:4px; flex-wrap:wrap">
                    ${p.oferta ? `<span class="tag-badge tag-oferta">oferta</span>` : ""}
                    ${p.destacado ? `<span class="tag-badge tag-dest">⭐ dest.</span>` : ""}
                </div>
            </td>
            <td>
                <div class="admin-actions">
                    <button class="btn-edit" onclick="showToast('Edición disponible próximamente')">Editar</button>
                    <button class="btn-del" onclick="eliminarProducto(${p.id})">Eliminar</button>
                </div>
            </td>
        </tr>
    `).join("");
}

/* ==========================================================================
   4. LOGICA DE BORRADO REAL
   ========================================================================== */
function eliminarProducto(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto de forma permanente?")) {
        // Filtramos el arreglo para quitar el producto seleccionado
        products = products.filter(p => p.id !== id);
        // Guardamos los cambios en el LocalStorage afectando directamente la base compartida
        guardarEnStorage(); 
        // Volvemos a pintar la tabla del administrador
        renderAdminTable(); 
        showToast("🗑️ Producto eliminado correctamente");
    }
}

// Botón de salida voluntaria de la consola
document.getElementById("btn-logout-admin").addEventListener("click", () => {
    window.location.href = "index.html";
});

/* ==========================================================================
   5. INICIALIZACIÓN
   ========================================================================== */
renderAdminTable();

document.getElementById("open-modal-add").addEventListener("click", () => {
    showToast("🛠️ Formulario de alta listo para conectarse");
});