/* ============================================
   MOBIL KATTE — Main / Shared UI
   ============================================ */

/* Kumpulan ikon SVG (Lucide-style) */
const Icons = {
  car: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
  search: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
  menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  calendar: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  gauge: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>',
  gear: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',
  fuel: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 22V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16"/><path d="M9 9h4M3 13h10"/><path d="M17 22V9l-3 3M17 5c1.5 0 3 1.5 3 4M18 2l2 2"/></svg>',
  color: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/><path d="M12 2a5 5 0 0 0 0 10 5 5 0 0 1 0 10"/></svg>',
  shield: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
  map: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  phone: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  whatsapp: '<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
  check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>',
  trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  plus: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  dashboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>',
  car2: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
  brand: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z"/><path d="M12 11 4.5 6.5M12 11l7.5-4.5M12 11v9"/></svg>',
  image: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
  settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',
  logout: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>',
  eye: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  arrowLeft: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  instagram: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  facebook: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  tiktok: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .595.045.88.13V9.4a6.34 6.34 0 0 0-1-.08A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
  money: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>'
};

/* ---------- Navbar & Footer ---------- */
function navbarHTML(active) {
  var links = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "catalog", label: "Katalog Mobil", href: "mobil.html" },
    { key: "about", label: "Tentang Kami", href: "index.html#tentang" },
    { key: "contact", label: "Kontak", href: "index.html#kontak" }
  ];
  var linksHTML = links.map(function (l) {
    return '<a href="' + l.href + '"' + (l.key === active ? ' class="active"' : "") + ">" + l.label + "</a>";
  }).join("");

  return '<header class="navbar">' +
    '<div class="container navbar__inner">' +
      '<a href="index.html" class="navbar__logo">' +
        '<img src="assets/logo.png" alt="Mobil Katte" class="brand-logo">' +
        '<span>MOBIL KATTE<small>Katalog Mobil Bekas</small></span></a>' +
      '<div class="navbar__search navbar__search--desktop">' + Icons.search +
        '<input id="navSearch" type="text" placeholder="Cari mobil, brand, atau tipe..." />' +
        '<button onclick="goSearch()">Cari</button></div>' +
      '<nav class="navbar__links" id="navLinks">' + linksHTML + '</nav>' +
      '<button class="navbar__toggle" onclick="toggleNav()" aria-label="Menu">' + Icons.menu + "</button>" +
    "</div>" +
    '<div class="container navbar__searchrow">' +
      '<div class="navbar__search navbar__search--mobile">' + Icons.search +
        '<input id="navSearchMobile" type="text" placeholder="Cari mobil, brand, atau tipe..." />' +
        '<button onclick="goSearchMobile()">Cari</button></div>' +
    "</div>" +
  "</header>";
}

function footerHTML() {
  return '<footer class="footer" id="kontak">' +
    '<div class="container footer__top">' +
      '<div>' +
        '<div class="logo"><img src="assets/logo.png" alt="Mobil Katte" class="brand-logo"><span>MOBIL KATTE</span></div>' +
        "<p>Katalog mobil bekas yang cepat, sederhana, transparan, dan mudah dihubungi. Temukan mobil bekas berkualitas dengan informasi kendaraan yang jelas.</p>" +
        '<div class="footer__social">' +
          '<a href="#" aria-label="Instagram">' + Icons.instagram + "</a>" +
          '<a href="#" aria-label="Facebook">' + Icons.facebook + "</a>" +
          '<a href="#" aria-label="TikTok">' + Icons.tiktok + "</a>" +
        "</div>" +
      "</div>" +
      "<div><h4>Menu</h4><ul>" +
        '<li><a href="index.html">Home</a></li>' +
        '<li><a href="mobil.html">Katalog Mobil</a></li>' +
        '<li><a href="index.html#tentang">Tentang Kami</a></li>' +
        '<li><a href="admin/login.html">Login Admin</a></li>' +
      "</ul></div>" +
      "<div><h4>Brand</h4><ul>" +
        '<li><a href="mobil.html?brand=toyota">Toyota</a></li>' +
        '<li><a href="mobil.html?brand=honda">Honda</a></li>' +
        '<li><a href="mobil.html?brand=mitsubishi">Mitsubishi</a></li>' +
        '<li><a href="mobil.html?brand=daihatsu">Daihatsu</a></li>' +
      "</ul></div>" +
      "<div><h4>Kontak</h4><ul>" +
        '<li style="display:flex;gap:8px;align-items:center;">' + Icons.whatsapp + '<a href="https://wa.me/' + WA_NUMBER + '" target="_blank">WhatsApp</a></li>' +
        '<li style="display:flex;gap:8px;align-items:center;">' + Icons.phone + "<span>+62 812-3456-7890</span></li>" +
        '<li style="display:flex;gap:8px;align-items:center;">' + Icons.map + "<span>Jl. Mobil Katte No. 88, Makassar</span></li>" +
      "</ul></div>" +
    "</div>" +
    '<div class="footer__bottom"><div class="container">© ' + new Date().getFullYear() + ' MOBIL KATTE — Katalog Mobil Bekas. Semua hak dilindungi.</div></div>' +
  "</footer>";
}

/* Card mobil — dipakai di katalog & homepage */
function carCardHTML(car) {
  var sold = car.status === "Terjual";
  var img = car.photos && car.photos.length ? car.photos[0] : photoFallback();
  var priceBadge = car.taxStatus === "Aktif"
    ? '<span class="badge badge--tax-active">' + Icons.shield + " Pajak Aktif</span>"
    : '<span class="badge badge--tax-inactive">Pajak Tidak Aktif</span>';

  return '<article class="car-card">' +
    '<a class="car-card__media" href="mobil-detail.html?slug=' + car.slug + '">' +
      (sold ? '<span class="badge badge--sold">TERJUAL</span>' : "") +
      '<img src="' + img + '" alt="' + car.brand + " " + car.name + " " + car.type + ' ' + car.year + '" loading="lazy">' +
      priceBadge +
    "</a>" +
    '<div class="car-card__body">' +
      '<div class="car-card__meta"><span class="car-card__brand">' + car.brand + "</span>" +
        '<span class="badge ' + statusBadgeClass(car.status) + '">' + car.status + "</span></div>" +
      '<h3 class="car-card__title"><a href="mobil-detail.html?slug=' + car.slug + '">' + car.brand + " " + car.name + "</a></h3>" +
      '<p class="car-card__type">Type: ' + car.type + "</p>" +
      '<ul class="car-card__specs">' +
        "<li>" + Icons.calendar + " " + car.year + "</li>" +
        "<li>" + Icons.gauge + " " + car.mileage.toLocaleString("id-ID") + " km</li>" +
        "<li>" + Icons.gear + " " + car.transmission + "</li>" +
      "</ul>" +
      '<div class="car-card__price">' + formatRupiah(car.price) + "</div>" +
      '<div class="car-card__footer">' +
        '<a href="mobil-detail.html?slug=' + car.slug + '" class="btn btn--primary btn--block">Lihat Detail</a>' +
      "</div>" +
    "</div>" +
  "</article>";
}

/* ---------- Interaksi global ---------- */
function toggleNav() {
  var el = document.getElementById("navLinks");
  if (!el) return;
  var open = el.classList.toggle("open");
  var btn = document.querySelector(".navbar__toggle");
  if (btn) btn.innerHTML = open ? Icons.close : Icons.menu;
}

function closeNav() {
  var el = document.getElementById("navLinks");
  if (el) el.classList.remove("open");
  var btn = document.querySelector(".navbar__toggle");
  if (btn) btn.innerHTML = Icons.menu;
}

function goSearch() {
  var input = document.getElementById("navSearch");
  var q = input ? input.value.trim() : "";
  window.location.href = "mobil.html" + (q ? "?keyword=" + encodeURIComponent(q) : "");
}

function goSearchMobile() {
  var input = document.getElementById("navSearchMobile");
  var q = input ? input.value.trim() : "";
  window.location.href = "mobil.html" + (q ? "?keyword=" + encodeURIComponent(q) : "");
}

function waLink(car, text) {
  var msg = text || "Halo Mobil Katte, saya tertarik dengan " + car.brand + " " + car.name +
    " " + car.type + " Tahun " + car.year + " dengan harga " + formatRupiah(car.price) + ".";
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
}

function mountShared(active) {
  var nav = document.getElementById("navbar");
  if (nav) nav.innerHTML = navbarHTML(active);
  var footer = document.getElementById("footer");
  if (footer) footer.innerHTML = footerHTML();

  var navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
  }
  setupImgFallback();
}

document.addEventListener("DOMContentLoaded", function () {
  setupImgFallback();
});
