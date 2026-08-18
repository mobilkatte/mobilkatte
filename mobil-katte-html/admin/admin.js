/* ============================================
   MOBIL KATTE — Admin Dashboard
   ============================================ */

const ADMIN_PER_PAGE = 6;

/* ---------- Auth ---------- */
function requireAuth() {
  if (!localStorage.getItem("mk_admin")) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem("mk_admin");
  window.location.href = "login.html";
}

/* ---------- Sidebar ---------- */
function adminNavHTML(active) {
  var items = [
    { key: "dashboard", label: "Dashboard", href: "dashboard.html", icon: "dashboard" },
    { key: "cars", label: "Data Mobil", href: "cars.html", icon: "car2" },
    { key: "car-form", label: "Tambah Mobil", href: "car-form.html", icon: "plus" },
    { key: "brands", label: "Brand", href: "brands.html", icon: "brand" },
    { key: "photos", label: "Foto Mobil", href: "cars.html", icon: "image" },
    { key: "settings", label: "Pengaturan", href: "#", icon: "settings" }
  ];
  var html = items.map(function (it) {
    return '<a href="' + it.href + '"' + (it.key === active ? ' class="active"' : "") + ">" +
      Icons[it.icon] + " " + it.label + "</a>";
  }).join("");
  return '<aside class="admin-sidebar" id="adminNav">' +
    '<div class="brand"><img src="../assets/logo.png" alt="Mobil Katte" class="brand-logo"><span>MOBIL KATTE</span></div>' +
    '<nav class="admin-nav">' + html + "</nav>" +
    '<div class="logout"><button class="btn btn--outline btn--block" style="color:#cbd5e1;border-color:rgba(255,255,255,.2);" onclick="logout()">' +
      Icons.logout + " Logout</button></div>" +
  "</aside>";
}

function toggleAdminNav() {
  document.getElementById("adminNav").classList.toggle("open");
}

function mountAdmin(active) {
  document.getElementById("adminSidebar").innerHTML = adminNavHTML(active);
}

/* ---------- Ikon stat ---------- */
function setStatIcons() {
  function set(id, icon) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = icon;
  }
  set("icStatCar", Icons.car2);
  set("icStatCheck", Icons.check);
  set("icStatShield", Icons.shield);
  set("icStatX", Icons.close);
  set("icStatMoney", Icons.money);
  set("icTrash", Icons.trash);
  set("icBrand", Icons.brand);

  var s1 = document.getElementById("icSearch");
  if (s1) s1.innerHTML = Icons.search;
  var s2 = document.getElementById("icRecentSearch");
  if (s2) s2.innerHTML = Icons.search;
}

/* ---------- Dashboard ---------- */
function renderDashboard() {
  var cars = getCarsAdmin().filter(function (c) { return !c.deletedAt; });
  var total = cars.length;
  var aktif = cars.filter(function (c) { return c.status === "Tersedia" || c.status === "Dipesan"; }).length;
  var pajakAktif = cars.filter(function (c) { return c.taxStatus === "Aktif"; }).length;
  var pajakNon = cars.filter(function (c) { return c.taxStatus !== "Aktif"; }).length;
  var totalNilai = cars.reduce(function (sum, c) { return sum + c.price; }, 0);

  document.getElementById("stTotal").textContent = total;
  document.getElementById("stAktif").textContent = aktif;
  document.getElementById("stPajak").textContent = pajakAktif;
  document.getElementById("stNonPajak").textContent = pajakNon;
  document.getElementById("stNilai").textContent = formatRupiah(totalNilai);

  var recent = cars.slice().sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });

  var searchEl = document.getElementById("recentSearch");
  var kw = searchEl ? (searchEl.value || "").toLowerCase() : "";
  if (kw) {
    recent = recent.filter(function (c) {
      return (c.name + " " + c.brand + " " + c.type + " " + c.year).toLowerCase().indexOf(kw) !== -1;
    });
  }
  recent = recent.slice(0, 6);

  document.getElementById("recentRows").innerHTML = adminCarRows(recent);
  var countEl = document.getElementById("recentCount");
  if (countEl) {
    countEl.innerHTML = kw
      ? "Menampilkan <b>" + recent.length + "</b> hasil untuk \"" + searchEl.value.trim() + "\""
      : "Menampilkan 6 unit terbaru";
  }
}

/* ---------- Tabel Data Mobil ---------- */
let carsPage = 1;
let deleteTargetId = null;

function adminCarRows(list) {
  if (!list.length) return '<tr class="empty-row"><td colspan="8">Tidak ada data mobil.</td></tr>';
  return list.map(function (c) {
    var thumb = c.photos && c.photos.length ? c.photos[0] : photoFallback();
    return "<tr>" +
      '<td><img class="thumb" src="' + thumb + '" alt="' + c.name + '"></td>' +
      "<td><b>" + c.brand + " " + c.name + "</b></td>" +
      "<td>" + c.type + "</td>" +
      "<td>" + c.year + "</td>" +
      "<td>" + formatShortPrice(c.price) + "</td>" +
      '<td><span class="badge ' + taxBadgeClass(c.taxStatus) + '">' + c.taxStatus + "</span></td>" +
      '<td><span class="badge ' + statusBadgeClass(c.status) + '">' + c.status + "</span></td>" +
      '<td><div class="row-actions">' +
        '<a class="action-btn action-btn--edit" href="car-form.html?id=' + c.id + '">' + Icons.edit + " Edit</a>" +
        '<button class="action-btn action-btn--del" onclick="openDeleteModal(' + c.id + ')">' + Icons.trash + " Hapus</button>" +
      "</div></td>" +
    "</tr>";
  }).join("");
}

function renderCarsTable() {
  if (!requireAuth()) return;
  var kw = (document.getElementById("tableSearch").value || "").toLowerCase();
  var fBrand = document.getElementById("fBrand").value;
  var fTax = document.getElementById("fTax").value;
  var fStatus = document.getElementById("fStatus").value;

  var list = getCarsAdmin().filter(function (c) { return !c.deletedAt; });
  if (kw) list = list.filter(function (c) { return (c.name + " " + c.brand + " " + c.type + " " + c.year).toLowerCase().indexOf(kw) !== -1; });
  if (fBrand) list = list.filter(function (c) { return c.brand === fBrand; });
  if (fTax) list = list.filter(function (c) { return c.taxStatus === fTax; });
  if (fStatus) list = list.filter(function (c) { return c.status === fStatus; });

  var totalPages = Math.max(1, Math.ceil(list.length / ADMIN_PER_PAGE));
  if (carsPage > totalPages) carsPage = totalPages;
  var start = (carsPage - 1) * ADMIN_PER_PAGE;

  document.getElementById("carsRows").innerHTML = adminCarRows(list.slice(start, start + ADMIN_PER_PAGE));

  var pag = document.getElementById("carsPagination");
  if (totalPages <= 1) { pag.innerHTML = ""; return; }
  var html = '<button onclick="gotoCarsPage(' + (carsPage - 1) + ')" ' + (carsPage === 1 ? "disabled" : "") + ">← Sebelumnya</button>";
  for (var i = 1; i <= totalPages; i++) {
    html += '<button class="' + (i === carsPage ? "active" : "") + '" onclick="gotoCarsPage(' + i + ')">' + i + "</button>";
  }
  html += '<button onclick="gotoCarsPage(' + (carsPage + 1) + ')" ' + (carsPage === totalPages ? "disabled" : "") + ">Berikutnya →</button>";
  pag.innerHTML = html;
}

function gotoCarsPage(p) {
  carsPage = p;
  renderCarsTable();
}

/* ---------- Hapus (soft delete) ---------- */
function openDeleteModal(id) {
  deleteTargetId = id;
  document.getElementById("deleteModal").classList.add("show");
}

function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById("deleteModal").classList.remove("show");
}

function confirmDelete() {
  var list = getCarsAdmin();
  var car = list.find(function (c) { return c.id === deleteTargetId; });
  if (car) {
    car.deletedAt = new Date().toISOString();
    saveCars(list);
  }
  closeDeleteModal();
  renderCarsTable();
  toast("Kendaraan berhasil dihapus (soft delete).");
}

/* ---------- Form mobil ---------- */
const SLOT_NAMES = ["Foto Utama", "Foto Depan", "Foto Belakang", "Foto Samping", "Foto Interior", "Foto Dashboard", "Foto Mesin", "Foto Lainnya"];
let formPhotos = [];
let editingId = null;

function renderUploadSlots() {
  var grid = document.getElementById("uploadGrid");
  if (!grid) return;
  grid.innerHTML = SLOT_NAMES.map(function (name, i) {
    var photo = formPhotos[i];
    var isPrimary = i === 0;
    return '<label class="upload-slot' + (photo ? " is-primary" : "") + '">' +
      (isPrimary && photo ? '<span class="primary-tag">UTAMA</span>' : "") +
      (photo ? '<img src="' + photo + '" alt="' + name + '">' : "") +
      '<span class="tag">' + (photo ? name : "+ " + name) + "</span>" +
      '<span class="note">' + (photo ? "Klik untuk ganti" : "Klik untuk upload") + "</span>" +
      '<input type="file" accept="image/*" style="display:none;" onchange="onPhotoPick(this,' + i + ')">' +
      "</label>";
  }).join("");

  var hint = document.getElementById("uploadHint");
  if (hint) {
    var count = formPhotos.filter(function (p) { return p; }).length;
    hint.textContent = count
      ? count + " foto terpilih (" + (count === formPhotos.length ? "semua slot terisi" : count + "/" + formPhotos.length + " slot terisi") + ")"
      : "Belum ada foto terpilih";
  }
}

function openPhotoPicker() {
  document.getElementById("photoFileInput").click();
}

function onPhotosPicked(input) {
  var files = Array.prototype.slice.call(input.files);
  if (!files.length) return;
  var accepted = [];
  files.forEach(function (file) {
    if (file.size > 5 * 1024 * 1024) { toast("Foto \"" + file.name + "\" terlalu besar (maks 5 MB).", "error"); return; }
    accepted.push(file);
  });
  if (!accepted.length) return;

  var pending = accepted.length;
  var remainingSlots = SLOT_NAMES.length - formPhotos.filter(function (p) { return p; }).length;

  accepted.forEach(function (file) {
    if (remainingSlots <= 0) { toast("Slot foto sudah penuh (maks 8 foto).", "error"); return; }
    var reader = new FileReader();
    reader.onload = function (e) {
      var emptyIndex = -1;
      for (var i = 0; i < SLOT_NAMES.length; i++) { if (!formPhotos[i]) { emptyIndex = i; break; } }
      if (emptyIndex === -1) return;
      formPhotos[emptyIndex] = e.target.result;
      renderUploadSlots();
      if (--pending <= 0) toast("Foto berhasil diunggah.");
    };
    reader.readAsDataURL(file);
    remainingSlots--;
  });
  input.value = "";
}

function onPhotoPick(input, index) {
  var file = input.files && input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { toast("Ukuran foto maksimal 5 MB.", "error"); return; }
  var reader = new FileReader();
  reader.onload = function (e) {
    formPhotos[index] = e.target.result;
    renderUploadSlots();
    toast("Foto " + SLOT_NAMES[index] + " diperbarui.");
  };
  reader.readAsDataURL(file);
}

function populateBrandSelect(selected) {
  var sel = document.getElementById("fBrand");
  sel.innerHTML = '<option value="">-- Pilih Brand --</option>' + BRANDS.map(function (b) {
    return '<option' + (b === selected ? " selected" : "") + ">" + b + "</option>";
  }).join("");
}

function initCarForm() {
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  populateBrandSelect("");

  if (id) {
    var car = getCarById(id);
    if (!car) { toast("Mobil tidak ditemukan.", "error"); return; }
    editingId = car.id;
    document.getElementById("formTitle").textContent = "Edit Mobil";
    document.getElementById("pageTitle").textContent = "Edit Mobil — Mobil Katte Admin";
    document.getElementById("saveBtn").textContent = "Update Mobil";
    formPhotos = car.photos ? car.photos.slice() : [];

    document.getElementById("fBrand").value = car.brand || "";
    document.getElementById("fName").value = car.name || "";
    document.getElementById("fType").value = car.type || "";
    document.getElementById("fYear").value = car.year || "";
    document.getElementById("fPrice").value = car.price || "";
    document.getElementById("fMileage").value = car.mileage || "";
    document.getElementById("fTransmission").value = car.transmission || "Automatic";
    document.getElementById("fFuel").value = car.fuel || "Bensin";
    document.getElementById("fColor").value = car.color || "";
    document.getElementById("fCondition").value = car.condition || "Bekas";
    document.getElementById("fTax").value = car.taxStatus || "Aktif";
    document.getElementById("fTaxExpired").value = car.taxExpiredAt || "";
    document.getElementById("fPlate").value = car.plate || "";
    document.getElementById("fLocation").value = car.location || "";
    document.getElementById("fStatus").value = car.status || "Tersedia";
    document.getElementById("fVideo").value = car.videoUrl || "";
    document.getElementById("fDesc").value = car.description || "";
  } else {
    document.getElementById("fStatus").value = "Tersedia";
    document.getElementById("fCondition").value = "Bekas";
    document.getElementById("fTransmission").value = "Automatic";
    document.getElementById("fFuel").value = "Bensin";
    document.getElementById("fTax").value = "Aktif";
  }
  renderUploadSlots();
}

function saveCar() {
  var brand = document.getElementById("fBrand").value;
  var name = document.getElementById("fName").value.trim();
  var type = document.getElementById("fType").value.trim();
  var year = Number(document.getElementById("fYear").value);
  var price = Number(document.getElementById("fPrice").value);

  if (!brand || !name || !type || !year || !price) {
    toast("Mohon lengkapi field bertanda * (Brand, Nama, Type, Tahun, Harga).", "error");
    return;
  }

  var data = {
    brand: brand,
    name: name,
    type: type,
    year: year,
    price: price,
    mileage: Number(document.getElementById("fMileage").value) || 0,
    transmission: document.getElementById("fTransmission").value,
    fuel: document.getElementById("fFuel").value,
    color: document.getElementById("fColor").value.trim(),
    condition: document.getElementById("fCondition").value,
    taxStatus: document.getElementById("fTax").value,
    taxExpiredAt: document.getElementById("fTaxExpired").value.trim() || null,
    plate: document.getElementById("fPlate").value.trim(),
    location: document.getElementById("fLocation").value.trim() || "Makassar",
    status: document.getElementById("fStatus").value,
    videoUrl: document.getElementById("fVideo").value.trim(),
    description: document.getElementById("fDesc").value.trim(),
    photos: formPhotos.length ? formPhotos : [photoFallback()]
  };

  var list = getCarsAdmin();
  if (editingId) {
    var car = list.find(function (c) { return c.id === editingId; });
    if (car) Object.assign(car, data);
    saveCars(list);
    toast("Data mobil berhasil diperbarui.");
  } else {
    var newId = list.reduce(function (m, c) { return Math.max(m, c.id); }, 0) + 1;
    data.id = newId;
    data.slug = slugify(brand + " " + name + " " + type + " " + year) + "-" + newId;
    data.featured = false;
    data.createdAt = new Date().toISOString().slice(0, 10);
    list.push(data);
    saveCars(list);
    toast("Mobil baru berhasil disimpan.");
  }
  setTimeout(function () { window.location.href = "cars.html"; }, 900);
}

/* ---------- Brand ---------- */
function getBrandsList() {
  var brands = BRANDS.slice();
  getCarsAdmin().forEach(function (c) {
    if (brands.indexOf(c.brand) === -1) brands.push(c.brand);
  });
  return brands;
}

let brandEditIndex = -1;

function renderBrands() {
  var kw = (document.getElementById("brandSearch").value || "").toLowerCase();
  var brands = getBrandsList().filter(function (b) { return b.toLowerCase().indexOf(kw) !== -1; });
  document.getElementById("brandRows").innerHTML = brands.map(function (b, i) {
    var count = getCarsAdmin().filter(function (c) { return c.brand === b; }).length;
    return "<tr>" +
      "<td>" + (i + 1) + "</td>" +
      "<td><b>" + b + "</b></td>" +
      "<td>" + slugify(b) + "</td>" +
      "<td>" + count + "</td>" +
      '<td><div class="row-actions">' +
        '<button class="action-btn action-btn--edit" onclick="editBrand(' + i + ')">' + Icons.edit + " Edit</button>" +
        '<button class="action-btn action-btn--del" onclick="deleteBrand(' + i + ')">' + Icons.trash + " Hapus</button>" +
      "</div></td>" +
    "</tr>";
  }).join("") || '<tr class="empty-row"><td colspan="5">Tidak ada brand.</td></tr>';
}

function addBrandForm() {
  brandEditIndex = -1;
  document.getElementById("brandModalTitle").textContent = "Tambah Brand";
  document.getElementById("brandInput").value = "";
  document.getElementById("brandModal").classList.add("show");
}

function editBrand(i) {
  var brand = getBrandsList()[i];
  brandEditIndex = getBrandsList().indexOf(brand);
  document.getElementById("brandModalTitle").textContent = "Edit Brand";
  document.getElementById("brandInput").value = brand;
  document.getElementById("brandModal").classList.add("show");
}

function saveBrand() {
  var name = document.getElementById("brandInput").value.trim();
  if (!name) { toast("Nama brand tidak boleh kosong.", "error"); return; }
  var list = getCarsAdmin();
  if (brandEditIndex >= 0) {
    var oldName = getBrandsList()[brandEditIndex];
    list.forEach(function (c) { if (c.brand === oldName) c.brand = name; });
    saveCars(list);
  } else {
    toast("Brand " + name + " ditambahkan (simulasi — ubah di database untuk MVP).");
  }
  closeBrandModal();
  renderBrands();
}

function deleteBrand(i) {
  var name = getBrandsList()[i];
  toast("Brand " + name + " dihapus (simulasi).", "error");
  renderBrands();
}

function closeBrandModal() {
  document.getElementById("brandModal").classList.remove("show");
}

/* ---------- Bootstrap ---------- */
document.addEventListener("DOMContentLoaded", function () {
  if (!requireAuth()) return;
  setStatIcons();

  var path = window.location.pathname.split("/").pop();
  var page = path.replace(".html", "");

  if (document.getElementById("adminSidebar")) mountAdmin(page);

  if (page === "dashboard") renderDashboard();
  if (page === "cars") {
    populateBrandSelect("");
    var fBrand = document.getElementById("fBrand");
    fBrand.innerHTML = '<option value="">Semua Brand</option>' + BRANDS.map(function (b) {
      return "<option>" + b + "</option>";
    }).join("");
    renderCarsTable();
  }
  if (page === "car-form") initCarForm();
  if (page === "brands") renderBrands();
});
