/* ============================================
   MOBIL KATTE — Halaman Detail Kendaraan
   ============================================ */

let galleryIndex = 0;
let currentCar = null;

function renderDetail() {
  var params = new URLSearchParams(window.location.search);
  var slug = params.get("slug");
  var car = getCarBySlug(slug);

  if (!car) {
    document.getElementById("detailRoot").innerHTML =
      '<div class="empty-state"><div class="icon">' + Icons.search + "</div>" +
      "<h3>Mobil tidak ditemukan</h3><p>Mobil yang Anda cari tidak tersedia.</p>" +
      '<a href="mobil.html" class="btn btn--primary mt-16">Kembali ke Katalog</a></div>';
    return;
  }
  currentCar = car;

  document.title = car.brand + " " + car.name + " " + car.type + " " + car.year + " " +
    formatShortPrice(car.price) + " | Mobil Katte";
  document.getElementById("metaTitle").textContent = document.title;
  document.getElementById("metaDesc").setAttribute("content",
    car.brand + " " + car.name + " " + car.type + " tahun " + car.year +
    ", pajak " + car.taxStatus.toLowerCase() + ", harga " + formatRupiah(car.price) +
    ". Lihat foto dan detail kendaraan di Mobil Katte.");
  document.getElementById("ogTitle").setAttribute("content", document.title);

  var taxBadge = car.taxStatus === "Aktif"
    ? '<span class="badge badge--tax-active">' + Icons.shield + " Pajak Aktif" +
      (car.taxExpiredAt ? '<span style="font-weight:500;"> · Berlaku sampai ' + car.taxExpiredAt + "</span>" : "") + "</span>"
    : '<span class="badge badge--tax-inactive">Pajak Tidak Aktif</span>';

  var videoHTML = car.videoUrl
    ? '<a href="' + car.videoUrl + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;color:var(--accent-dark);font-weight:700;text-decoration:underline;">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.2ZM9.8 15V9l6.2 3Z"/></svg>Lihat Video Kendaraan</a>'
    : "—";

  var specs = [
    ["Brand", car.brand], ["Nama Mobil", car.name], ["Type", car.type],
    ["Tahun", car.year], ["Harga", formatRupiah(car.price)],
    ["Transmisi", car.transmission], ["Bahan Bakar", car.fuel],
    ["Kilometer", car.mileage.toLocaleString("id-ID") + " KM"], ["Warna", car.color],
    ["Pajak", car.taxStatus], ["Kondisi", car.condition], ["Plat", car.plate],
    ["Lokasi", car.location], ["Status", car.status],
    ["Video", videoHTML]
  ];
  var specRows = specs.map(function (s) {
    return "<tr><th>" + s[0] + "</th><td>" + s[1] + "</td></tr>";
  }).join("");

  var waHref = waLink(car);

  document.getElementById("detailRoot").innerHTML =
    '<nav class="breadcrumb"><a href="index.html">Home</a><span class="sep">/</span>' +
    '<a href="mobil.html">Katalog Mobil</a><span class="sep">/</span>' +
    '<span>' + car.brand + " " + car.name + "</span></nav>" +

    '<div class="detail">' +
      '<div class="gallery">' +
        '<div class="gallery__main">' +
          '<button class="gallery__nav gallery__nav--prev" onclick="navGallery(-1)">‹</button>' +
          '<button class="gallery__nav gallery__nav--next" onclick="navGallery(1)">›</button>' +
          '<span class="gallery__count" id="galleryCount"></span>' +
          '<span id="galleryMain"></span>' +
        "</div>" +
        '<div class="gallery__thumbs" id="galleryThumbs"></div>' +
      "</div>" +

      '<aside class="detail-info">' +
        '<div class="detail-info__head">' +
          '<span class="brand">' + car.brand + "</span>" +
          "<h1>" + car.brand + " " + car.name + "</h1>" +
          '<p class="type">Type: ' + car.type + ' · ' + car.year + "</p>" +
          '<div class="mt-8">' + taxBadge + "</div>" +
          '<div class="mt-8"><span class="badge ' + statusBadgeClass(car.status) + '">' + car.status + "</span></div>" +
        "</div>" +
        '<div class="detail-info__price">' +
          '<span class="label">Harga</span>' +
          '<div class="value">' + formatRupiah(car.price) + "</div>" +
        "</div>" +
        '<div class="detail-info__body">' +
          '<div class="info-list">' +
            '<div class="info-item"><span class="ic">' + Icons.calendar + '</span><span><span>Tahun</span><b>' + car.year + "</b></span></div>" +
            '<div class="info-item"><span class="ic">' + Icons.gauge + '</span><span><span>Kilometer</span><b>' + car.mileage.toLocaleString("id-ID") + " km</b></span></div>" +
            '<div class="info-item"><span class="ic">' + Icons.gear + '</span><span><span>Transmisi</span><b>' + car.transmission + "</b></span></div>" +
            '<div class="info-item"><span class="ic">' + Icons.fuel + '</span><span><span>Bahan Bakar</span><b>' + car.fuel + "</b></span></div>" +
            '<div class="info-item"><span class="ic">' + Icons.color + '</span><span><span>Warna</span><b>' + car.color + "</b></span></div>" +
            '<div class="info-item"><span class="ic">' + Icons.map + '</span><span><span>Lokasi</span><b>' + car.location + "</b></span></div>" +
          "</div>" +
        "</div>" +
        '<div class="detail-info__contact">' +
          '<a href="' + waHref + '" target="_blank" class="btn btn--green btn--lg btn--block">' +
            Icons.whatsapp + " Tanya Mobil Ini</a>" +
        "</div>" +
      "</aside>" +
    "</div>" +

    '<div class="detail-specs">' +
      "<h2>Spesifikasi Kendaraan</h2>" +
      '<table class="spec-table">' + specRows + "</table>" +
    "</div>" +

    '<div class="detail-desc"><div class="card">' +
      "<h2>Deskripsi</h2>" +
      "<p>" + car.description + "</p>" +
    "</div></div>";

  renderGallery();
  setupImgFallback();
}

function renderGallery() {
  var photos = currentCar.photos && currentCar.photos.length ? currentCar.photos : [photoFallback()];
  var main = document.getElementById("galleryMain");
  main.innerHTML = '<img src="' + photos[galleryIndex] + '" alt="Foto ' + currentCar.brand + " " + currentCar.name + '">';

  document.getElementById("galleryCount").textContent = (galleryIndex + 1) + " / " + photos.length;

  document.getElementById("galleryThumbs").innerHTML = photos.map(function (p, i) {
    return '<button class="' + (i === galleryIndex ? "active" : "") + '" onclick="setGallery(' + i + ')">' +
      '<img src="' + p + '" alt="Foto ' + (i + 1) + '"></button>';
  }).join("");
}

function setGallery(i) {
  galleryIndex = i;
  renderGallery();
}

function navGallery(dir) {
  var photos = currentCar.photos;
  var len = photos.length;
  galleryIndex = (galleryIndex + dir + len) % len;
  renderGallery();
}

document.addEventListener("DOMContentLoaded", function () {
  renderDetail();
  mountShared("");
});
