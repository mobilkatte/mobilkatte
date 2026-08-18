/* ============================================
   MOBIL KATTE — Halaman Katalog & Filter
   ============================================ */

const PER_PAGE = 8;
let state = {
  keyword: "",
  min: null,
  max: null,
  quick: "",
  brands: [],
  years: [],
  taxes: [],
  statuses: [],
  sort: "terbaru",
  page: 1
};

function readUrlParams() {
  var p = new URLSearchParams(window.location.search);
  state.keyword = p.get("keyword") || "";
  state.min = p.get("min") ? Number(p.get("min")) : null;
  state.max = p.get("max") ? Number(p.get("max")) : null;
  state.brands = p.get("brand") ? [p.get("brand")] : [];
  state.page = Number(p.get("page")) || 1;
}

function buildYearList() {
  var years = [];
  getCars().forEach(function (c) { if (years.indexOf(c.year) === -1) years.push(c.year); });
  years.sort(function (a, b) { return b - a; });
  return years;
}

function renderFilterSidebar() {
  var quickOptions = [
    { label: "Di bawah Rp100 juta", min: 0, max: 100000000 },
    { label: "Rp100–150 juta", min: 100000000, max: 150000000 },
    { label: "Rp150–200 juta", min: 150000000, max: 200000000 },
    { label: "Rp200–300 juta", min: 200000000, max: 300000000 },
    { label: "Rp300–500 juta", min: 300000000, max: 500000000 },
    { label: "Di atas Rp500 juta", min: 500000000, max: 999999999999 }
  ];
  document.getElementById("quickPriceFilter").innerHTML = quickOptions.map(function (o, i) {
    var active = state.min === o.min && state.max === o.max ? " checked" : "";
    return '<label><input type="radio" name="quick" value="' + i + '"' + active + ' onchange="setQuick(' + i + ')">' + o.label + "</label>";
  }).join("");

  document.getElementById("brandFilter").innerHTML = BRANDS.map(function (b) {
    var slug = slugify(b);
    var active = state.brands.indexOf(slug) !== -1 ? " checked" : "";
    return '<label><input type="checkbox" value="' + slug + '"' + active + ' onchange="toggleBrand(this)">' + b + "</label>";
  }).join("");

  document.getElementById("yearFilter").innerHTML = buildYearList().map(function (y) {
    var active = state.years.indexOf(y) !== -1 ? " checked" : "";
    return '<label><input type="checkbox" value="' + y + '"' + active + ' onchange="toggleYear(this)">' + y + "</label>";
  }).join("");

  document.getElementById("taxFilter").innerHTML =
    '<label><input type="checkbox" value="Aktif" onchange="toggleTax(this)">Pajak Aktif</label>' +
    '<label><input type="checkbox" value="Tidak Aktif" onchange="toggleTax(this)">Pajak Tidak Aktif</label>';

  document.getElementById("statusFilter").innerHTML =
    '<label><input type="checkbox" value="Tersedia" onchange="toggleStatus(this)">Tersedia</label>' +
    '<label><input type="checkbox" value="Dipesan" onchange="toggleStatus(this)">Dipesan</label>' +
    '<label><input type="checkbox" value="Terjual" onchange="toggleStatus(this)">Terjual</label>';

  document.getElementById("fMin").value = state.min !== null ? state.min : "";
  document.getElementById("fMax").value = state.max !== null ? state.max : "";
}

function setQuick(i) {
  var options = [
    { min: 0, max: 100000000 }, { min: 100000000, max: 150000000 },
    { min: 150000000, max: 200000000 }, { min: 200000000, max: 300000000 },
    { min: 300000000, max: 500000000 }, { min: 500000000, max: 999999999999 }
  ];
  state.min = options[i].min;
  state.max = options[i].max;
  state.page = 1;
  applyFilters();
}

function changeSort(el) {
  state.sort = el.value;
  state.page = 1;
  applyFilters();
}

function applyCustomRange() {
  var min = Number(document.getElementById("fMin").value);
  var max = Number(document.getElementById("fMax").value);
  state.min = isNaN(min) || min === 0 ? null : min;
  state.max = isNaN(max) || max === 0 ? null : max;
  state.quick = "";
  var radios = document.querySelectorAll('input[name="quick"]');
  radios.forEach(function (r) { r.checked = false; });
  state.page = 1;
  applyFilters();
}

function toggleBrand(el) {
  var slug = el.value;
  var i = state.brands.indexOf(slug);
  if (el.checked && i === -1) state.brands.push(slug);
  if (!el.checked && i !== -1) state.brands.splice(i, 1);
  state.page = 1;
  applyFilters();
}

function toggleYear(el) {
  var v = Number(el.value);
  var i = state.years.indexOf(v);
  if (el.checked && i === -1) state.years.push(v);
  if (!el.checked && i !== -1) state.years.splice(i, 1);
  state.page = 1;
  applyFilters();
}

function toggleTax(el) {
  var v = el.value;
  var i = state.taxes.indexOf(v);
  if (el.checked && i === -1) state.taxes.push(v);
  if (!el.checked && i !== -1) state.taxes.splice(i, 1);
  state.page = 1;
  applyFilters();
}

function toggleStatus(el) {
  var v = el.value;
  var i = state.statuses.indexOf(v);
  if (el.checked && i === -1) state.statuses.push(v);
  if (!el.checked && i !== -1) state.statuses.splice(i, 1);
  state.page = 1;
  applyFilters();
}

function resetFilters() {
  state = { keyword: "", min: null, max: null, quick: "", brands: [], years: [], taxes: [], statuses: [], sort: "terbaru", page: 1 };
  document.getElementById("sortSelect").value = "terbaru";
  renderFilterSidebar();
  applyFilters();
}

function toggleFilterPanel() {
  document.getElementById("filterPanel").classList.toggle("open");
}

function filterCars() {
  var result = getCars();

  if (state.keyword) {
    var kw = state.keyword.toLowerCase();
    result = result.filter(function (c) {
      return (c.name + " " + c.brand + " " + c.type + " " + c.year).toLowerCase().indexOf(kw) !== -1;
    });
  }
  if (state.min !== null) result = result.filter(function (c) { return c.price >= state.min; });
  if (state.max !== null) result = result.filter(function (c) { return c.price <= state.max; });
  if (state.brands.length) result = result.filter(function (c) { return state.brands.indexOf(slugify(c.brand)) !== -1; });
  if (state.years.length) result = result.filter(function (c) { return state.years.indexOf(c.year) !== -1; });
  if (state.taxes.length) result = result.filter(function (c) { return state.taxes.indexOf(c.taxStatus) !== -1; });
  if (state.statuses.length) result = result.filter(function (c) { return state.statuses.indexOf(c.status) !== -1; });

  switch (state.sort) {
    case "harga-asc": result.sort(function (a, b) { return a.price - b.price; }); break;
    case "harga-desc": result.sort(function (a, b) { return b.price - a.price; }); break;
    case "tahun-desc": result.sort(function (a, b) { return b.year - a.year; }); break;
    default: result.sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
  }
  return result;
}

function applyFilters() {
  var result = filterCars();
  var totalPages = Math.max(1, Math.ceil(result.length / PER_PAGE));
  if (state.page > totalPages) state.page = totalPages;

  var start = (state.page - 1) * PER_PAGE;
  var pageItems = result.slice(start, start + PER_PAGE);

  document.getElementById("resultCount").innerHTML =
    "Menampilkan <b>" + (start + 1) + "–" + (start + pageItems.length) + "</b> dari <b>" + result.length + "</b> kendaraan";

  var grid = document.getElementById("carGrid");
  if (!pageItems.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;">' +
      '<div class="icon">' + Icons.search + "</div>" +
      "<h3>Tidak ada mobil ditemukan</h3>" +
      "<p>Coba ubah kata kunci atau perlonggar filter Anda.</p></div>";
  } else {
    grid.innerHTML = pageItems.map(carCardHTML).join("");
  }

  renderPagination(totalPages);
  setupImgFallback();
}

function renderPagination(totalPages) {
  var el = document.getElementById("pagination");
  if (totalPages <= 1) { el.innerHTML = ""; return; }
  var html = '<button onclick="gotoPage(' + (state.page - 1) + ')" ' + (state.page === 1 ? "disabled" : "") + ">← Sebelumnya</button>";
  for (var i = 1; i <= totalPages; i++) {
    html += '<button class="' + (i === state.page ? "active" : "") + '" onclick="gotoPage(' + i + ')">' + i + "</button>";
  }
  html += '<button onclick="gotoPage(' + (state.page + 1) + ')" ' + (state.page === totalPages ? "disabled" : "") + ">Berikutnya →</button>";
  el.innerHTML = html;
}

function gotoPage(p) {
  state.page = p;
  applyFilters();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
  readUrlParams();
  renderFilterSidebar();
  applyFilters();
  mountShared("catalog");

  var q = state.keyword;
  if (q) {
    document.getElementById("resultCount").insertAdjacentHTML(
      "beforebegin",
      '<div style="margin-bottom:14px;" class="badge badge--featured">Hasil untuk "' + q + '" <button onclick="clearKeyword()" style="background:none;border:none;color:inherit;font-weight:800;margin-left:4px;">×</button></div>'
    );
  }
});

function clearKeyword() {
  state.keyword = "";
  applyFilters();
  window.history.replaceState({}, "", "mobil.html");
}
