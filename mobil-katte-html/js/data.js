/* ============================================
   MOBIL KATTE — Data & Helper (Simulasi database)
   ============================================ */

const WA_NUMBER = "6281234567890"; // ganti dengan nomor WhatsApp Mobil Katte
const ADMIN_EMAIL = "admin@mobilkatte.com";
const ADMIN_PASSWORD = "admin123";

const BRANDS = [
  "Audi", "BMW", "BYD", "Chery", "Chevrolet", "Daihatsu", "Ford", "Honda", "Hyundai", "Isuzu", "Jeep", "Kia", "Lexus",
  "Mazda", "Mercedes-Benz", "MG", "Mini", "Mitsubishi", "Nissan",
  "Porsche", "Subaru", "Suzuki", "Toyota", "Wuling"
];

/* Foto placeholder dari Unsplash (ganti saat produksi) */
const PHOTOS = {
  avanza: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=70",
  brio: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=70",
  xpander: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=70",
  innova: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=70",
  fortuner: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=70",
  rush: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=70",
  civic: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=70",
  city: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=70",
  jazz: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&q=70",
  avanza2: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=900&q=70",
  duster: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=70",
  crv: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=70",
  other1: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=900&q=70",
  other2: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=900&q=70",
  other3: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=70",
  other4: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=70",
};

const CARS = [
  {
    id: 1, slug: "toyota-avanza-1-5-g-2022", brand: "Toyota", name: "Avanza", type: "1.5 G",
    year: 2022, price: 215000000, mileage: 35000, transmission: "Automatic", fuel: "Bensin",
    color: "Hitam", taxStatus: "Aktif", taxExpiredAt: "15 Desember 2026", condition: "Bekas",
    location: "Makassar", plate: "DD 1234 AB",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Toyota Avanza 1.5 G tahun 2022 dengan pajak aktif. Kondisi interior dan eksterior sangat terawat, masih garansi pabrik, perawatan rutin di bengkel resmi. Surat-surat lengkap dan siap balik nama.",
    status: "Tersedia", featured: true, createdAt: "2026-08-10",
    photos: [PHOTOS.avanza, PHOTOS.other1, PHOTOS.other2, PHOTOS.other3, PHOTOS.other4]
  },
  {
    id: 2, slug: "honda-brio-satya-2021", brand: "Honda", name: "Brio", type: "Satya",
    year: 2021, price: 145000000, mileage: 42000, transmission: "Manual", fuel: "Bensin",
    color: "Putih", taxStatus: "Aktif", taxExpiredAt: "20 Januari 2027", condition: "Bekas",
    location: "Makassar", plate: "DD 5678 CD",
    description: "Honda Brio Satya yang irit dan lincah. Cocok untuk penggunaan harian di dalam kota. Mesin halus, AC dingin, ban masih bagus, dan servis berkala selalu tercatat.",
    status: "Tersedia", featured: true, createdAt: "2026-08-08",
    photos: [PHOTOS.brio, PHOTOS.other1, PHOTOS.other3]
  },
  {
    id: 3, slug: "mitsubishi-xpander-ultimate-2023", brand: "Mitsubishi", name: "Xpander", type: "Ultimate",
    year: 2023, price: 278000000, mileage: 21000, transmission: "Automatic", fuel: "Bensin",
    color: "Silver", taxStatus: "Aktif", taxExpiredAt: "10 Maret 2027", condition: "Bekas",
    location: "Makassar", plate: "DD 9012 EF",
    description: "Mitsubishi Xpander Ultimate dengan fitur lengkap: head unit layar, kamera mundur, dan smart key. Mobil masih dalam kondisi prima dengan kilometer rendah.",
    status: "Tersedia", featured: true, createdAt: "2026-08-05",
    photos: [PHOTOS.xpander, PHOTOS.other2, PHOTOS.other4]
  },
  {
    id: 4, slug: "toyota-innova-venturer-2022", brand: "Toyota", name: "Innova", type: "Venturer",
    year: 2022, price: 385000000, mileage: 38000, transmission: "Automatic", fuel: "Diesel",
    color: "Putih", taxStatus: "Aktif", taxExpiredAt: "05 Juni 2027", condition: "Bekas",
    location: "Makassar", plate: "DD 3456 GH",
    description: "Toyota Innova Venturer diesel, nyaman untuk keluarga dan bisnis. Perawatan berkala rutin, jok kulit bersih, dan mesin diesel yang bertenaga namun tetap irit.",
    status: "Dipesan", featured: true, createdAt: "2026-08-02",
    photos: [PHOTOS.innova, PHOTOS.other1, PHOTOS.other2]
  },
  {
    id: 5, slug: "toyota-fortuner-grx-2021", brand: "Toyota", name: "Fortuner", type: "GRX",
    year: 2021, price: 498000000, mileage: 52000, transmission: "Automatic", fuel: "Diesel",
    color: "Hitam", taxStatus: "Aktif", taxExpiredAt: "30 September 2026", condition: "Bekas",
    location: "Makassar", plate: "DD 7890 IJ",
    description: "Toyota Fortuner GRX diesel, SUV tangguh untuk segala medan. Mesin bertenaga, suspensi empuk, dan fitur keselamatan lengkap. Pajak masih aktif.",
    status: "Tersedia", featured: false, createdAt: "2026-07-28",
    photos: [PHOTOS.fortuner, PHOTOS.other3, PHOTOS.other4]
  },
  {
    id: 6, slug: "toyota-rush-trd-2020", brand: "Toyota", name: "Rush", type: "TRD Sportivo",
    year: 2020, price: 232000000, mileage: 61000, transmission: "Automatic", fuel: "Bensin",
    color: "Abu-abu", taxStatus: "Tidak Aktif", taxExpiredAt: null, condition: "Bekas",
    location: "Makassar", plate: "DD 1122 KL",
    description: "Toyota Rush TRD Sportivo, bodi gagah dengan ground clearance tinggi. Pajak perlu diperpanjang (tidak aktif). Harga sudah disesuaikan. Surat lengkap.",
    status: "Tersedia", featured: false, createdAt: "2026-07-22",
    photos: [PHOTOS.rush, PHOTOS.other1]
  },
  {
    id: 7, slug: "honda-civic-turbo-rs-2019", brand: "Honda", name: "Civic", type: "Turbo RS",
    year: 2019, price: 325000000, mileage: 70000, transmission: "CVT", fuel: "Bensin",
    color: "Merah", taxStatus: "Aktif", taxExpiredAt: "12 November 2026", condition: "Bekas",
    location: "Makassar", plate: "DD 3344 MN",
    description: "Honda Civic Turbo RS, sedan sporty dengan performa mesin turbo yang responsif. Interior premium, audio bagus, dan perawatan terjaga.",
    status: "Terjual", featured: false, createdAt: "2026-07-15",
    photos: [PHOTOS.civic, PHOTOS.other2]
  },
  {
    id: 8, slug: "honda-city-rs-2020", brand: "Honda", name: "City", type: "RS",
    year: 2020, price: 218000000, mileage: 45000, transmission: "CVT", fuel: "Bensin",
    color: "Hitam", taxStatus: "Aktif", taxExpiredAt: "18 Agustus 2026", condition: "Bekas",
    location: "Makassar", plate: "DD 5566 OP",
    description: "Honda City RS dengan tampilan sporty dan irit bahan bakar. Cocok untuk mobilitas harian maupun perjalanan luar kota.",
    status: "Tersedia", featured: false, createdAt: "2026-07-10",
    photos: [PHOTOS.city, PHOTOS.other3]
  },
  {
    id: 9, slug: "honda-jazz-rs-2018", brand: "Honda", name: "Jazz", type: "RS",
    year: 2018, price: 178000000, mileage: 78000, transmission: "CVT", fuel: "Bensin",
    color: "Putih", taxStatus: "Aktif", taxExpiredAt: "22 Februari 2027", condition: "Bekas",
    location: "Makassar", plate: "DD 7788 QR",
    description: "Honda Jazz RS hatchback yang lincah dan praktis. Bagasi luas ala magic seat, perawatan mudah, dan suku cadang melimpah.",
    status: "Tersedia", featured: false, createdAt: "2026-07-02",
    photos: [PHOTOS.jazz, PHOTOS.other4]
  },
  {
    id: 10, slug: "toyota-avanza-veloz-2024", brand: "Toyota", name: "Avanza", type: "Veloz",
    year: 2024, price: 248000000, mileage: 12000, transmission: "Automatic", fuel: "Bensin",
    color: "Silver", taxStatus: "Aktif", taxExpiredAt: "08 Mei 2027", condition: "Bekas",
    location: "Makassar", plate: "DD 9900 ST",
    description: "Toyota Avanza Veloz terbaru dengan desain modern dan fitur keselamatan lengkap. Kilometer sangat rendah, masih seperti baru.",
    status: "Tersedia", featured: false, createdAt: "2026-06-28",
    photos: [PHOTOS.avanza2, PHOTOS.other2, PHOTOS.other4]
  },
  {
    id: 11, slug: "dacia-duster-1-6-2020", brand: "Daihatsu", name: "Duster", type: "1.6 X-Point",
    year: 2020, price: 168000000, mileage: 56000, transmission: "Manual", fuel: "Bensin",
    color: "Orange", taxStatus: "Aktif", taxExpiredAt: "14 Juli 2026", condition: "Bekas",
    location: "Makassar", plate: "DD 1213 UV",
    description: "SUV compact yang tangguh dengan harga terjangkau. Ground clearance tinggi, mesin bandel, dan konsumsi BBM cukup irit.",
    status: "Tersedia", featured: false, createdAt: "2026-06-20",
    photos: [PHOTOS.duster, PHOTOS.other1]
  },
  {
    id: 12, slug: "honda-crv-turbo-2023", brand: "Honda", name: "CR-V", type: "1.5 Turbo Prestige",
    year: 2023, price: 528000000, mileage: 18000, transmission: "CVT", fuel: "Bensin",
    color: "Hitam", taxStatus: "Aktif", taxExpiredAt: "25 April 2027", condition: "Bekas",
    location: "Makassar", plate: "DD 1415 WX",
    description: "Honda CR-V Turbo Prestige, SUV premium dengan kabin luas dan fitur Honda Sensing. Kondisi mulus, pajak aktif, garansi masih berlaku.",
    status: "Tersedia", featured: false, createdAt: "2026-06-12",
    photos: [PHOTOS.crv, PHOTOS.other3]
  }
];

/* ---------- Helper ---------- */
const MONTHS_ID = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

/* ---------- Simulasi persistence (localStorage) ---------- */
const STORE_KEY = "mk_cars";

function loadCars() {
  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) { /* ignore */ }
  return CARS;
}

function saveCars(list) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
}

function getCars() {
  return loadCars().filter(function (c) { return !c.deletedAt; });
}

function getCarsAdmin() {
  return loadCars();
}

function formatRupiah(angka) {
  return "Rp " + Math.round(angka).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatShortPrice(angka) {
  if (angka >= 1000000000) return (angka / 1000000000).toFixed(1).replace(".0", "") + " M";
  if (angka >= 1000000) return (angka / 1000000).toFixed(1).replace(".0", "") + " Juta";
  return formatRupiah(angka);
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getCarBySlug(slug) {
  return getCars().find(function (c) { return c.slug === slug; });
}

function getCarById(id) {
  return getCarsAdmin().find(function (c) { return c.id === Number(id); });
}

function getBrands() {
  return BRANDS.map(function (name) { return { name: name, slug: slugify(name) }; });
}

function taxBadgeClass(status) {
  return status === "Aktif" ? "badge--tax-active" : "badge--tax-inactive";
}

function statusBadgeClass(status) {
  switch (status) {
    case "Tersedia": return "badge--status-tersedia";
    case "Terjual": return "badge--status-terjual";
    case "Dipesan": return "badge--status-dipesan";
    default: return "badge--status-nonaktif";
  }
}

function carStatusLabel(status) {
  return status === "Terjual" ? "TERJUAL" : "";
}

/* Placeholder foto bila gambar gagal dimuat */
function photoFallback() {
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a1a1d"/><stop offset="1" stop-color="#26262a"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><text x="400" y="330" font-family="Arial" font-size="34" fill="rgba(255,255,255,.9)" text-anchor="middle">MOBIL KATTE</text></svg>'
  );
}

function setupImgFallback() {
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function handler() {
      img.removeEventListener("error", handler);
      img.src = photoFallback();
    });
  });
}

function toast(msg, type) {
  var el = document.createElement("div");
  el.className = "toast toast--" + (type || "success");
  el.innerHTML = msg;
  document.body.appendChild(el);
  requestAnimationFrame(function () { el.classList.add("show"); });
  setTimeout(function () {
    el.classList.remove("show");
    setTimeout(function () { el.remove(); }, 350);
  }, 2600);
}
