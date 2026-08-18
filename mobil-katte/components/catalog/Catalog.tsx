"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CarCard from "@/components/CarCard";
import { BRANDS, slugify } from "@/lib/data";
import { useCars } from "@/lib/storage";
import { IconClose, IconSearch } from "@/components/icons";

export interface CatalogInitialParams {
  keyword: string;
  min: number | null;
  max: number | null;
  brand: string;
  page: number;
}

const PER_PAGE = 8;

const QUICK_OPTIONS = [
  { label: "Di bawah Rp100 juta", min: 0, max: 100000000 },
  { label: "Rp100–150 juta", min: 100000000, max: 150000000 },
  { label: "Rp150–200 juta", min: 150000000, max: 200000000 },
  { label: "Rp200–300 juta", min: 200000000, max: 300000000 },
  { label: "Rp300–500 juta", min: 300000000, max: 500000000 },
  { label: "Di atas Rp500 juta", min: 500000000, max: 999999999999 },
];

interface FilterState {
  keyword: string;
  min: number | null;
  max: number | null;
  quick: string;
  brands: string[];
  years: number[];
  taxes: string[];
  statuses: string[];
  sort: string;
  page: number;
}

export default function Catalog({ initialParams }: { initialParams: CatalogInitialParams }) {
  const router = useRouter();
  const { cars } = useCars();
  const [panelOpen, setPanelOpen] = useState(false);
  const [minInput, setMinInput] = useState(initialParams.min !== null ? String(initialParams.min) : "");
  const [maxInput, setMaxInput] = useState(initialParams.max !== null ? String(initialParams.max) : "");

  const [state, setState] = useState<FilterState>(() => ({
    keyword: initialParams.keyword,
    min: initialParams.min,
    max: initialParams.max,
    quick: "",
    brands: initialParams.brand ? [initialParams.brand] : [],
    years: [],
    taxes: [],
    statuses: [],
    sort: "terbaru",
    page: initialParams.page || 1,
  }));

  const update = (patch: Partial<FilterState>) =>
    setState((s) => ({ ...s, ...patch }));

  const years = useMemo(() => {
    const list: number[] = [];
    cars.forEach((c) => {
      if (list.indexOf(c.year) === -1) list.push(c.year);
    });
    return list.sort((a, b) => b - a);
  }, [cars]);

  const result = useMemo(() => {
    let list = [...cars];

    if (state.keyword) {
      const kw = state.keyword.toLowerCase();
      list = list.filter((c) =>
        (c.name + " " + c.brand + " " + c.type + " " + c.year).toLowerCase().includes(kw)
      );
    }
    const min = state.min;
    if (min !== null) list = list.filter((c) => c.price >= min);
    const max = state.max;
    if (max !== null) list = list.filter((c) => c.price <= max);
    if (state.brands.length) list = list.filter((c) => state.brands.includes(slugify(c.brand)));
    if (state.years.length) list = list.filter((c) => state.years.includes(c.year));
    if (state.taxes.length) list = list.filter((c) => state.taxes.includes(c.taxStatus));
    if (state.statuses.length) list = list.filter((c) => state.statuses.includes(c.status));

    switch (state.sort) {
      case "harga-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "harga-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "tahun-desc":
        list.sort((a, b) => b.year - a.year);
        break;
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return list;
  }, [cars, state]);

  const totalPages = Math.max(1, Math.ceil(result.length / PER_PAGE));
  const page = Math.min(state.page, totalPages);
  const start = (page - 1) * PER_PAGE;
  const pageItems = result.slice(start, start + PER_PAGE);

  const setQuick = (i: number) => {
    update({ min: QUICK_OPTIONS[i].min, max: QUICK_OPTIONS[i].max, quick: String(i), page: 1 });
  };

  const applyCustomRange = () => {
    const min = Number(minInput);
    const max = Number(maxInput);
    update({
      min: isNaN(min) || min === 0 ? null : min,
      max: isNaN(max) || max === 0 ? null : max,
      quick: "",
      page: 1,
    });
  };

  const toggleBrand = (slug: string, checked: boolean) => {
    const brands = checked && !state.brands.includes(slug)
      ? [...state.brands, slug]
      : state.brands.filter((b) => b !== slug);
    update({ brands, page: 1 });
  };

  const toggleYear = (y: number, checked: boolean) => {
    const yearsList = checked && !state.years.includes(y)
      ? [...state.years, y]
      : state.years.filter((v) => v !== y);
    update({ years: yearsList, page: 1 });
  };

  const toggleTax = (v: string, checked: boolean) => {
    const taxes = checked && !state.taxes.includes(v)
      ? [...state.taxes, v]
      : state.taxes.filter((x) => x !== v);
    update({ taxes, page: 1 });
  };

  const toggleStatus = (v: string, checked: boolean) => {
    const statuses = checked && !state.statuses.includes(v)
      ? [...state.statuses, v]
      : state.statuses.filter((x) => x !== v);
    update({ statuses, page: 1 });
  };

  const resetFilters = () => {
    setState({
      keyword: "", min: null, max: null, quick: "", brands: [], years: [],
      taxes: [], statuses: [], sort: "terbaru", page: 1,
    });
    setMinInput("");
    setMaxInput("");
  };

  const clearKeyword = () => {
    update({ keyword: "", page: 1 });
    router.replace("/mobil");
  };

  const gotoPage = (p: number) => {
    update({ page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container" style={{ paddingTop: 36 }}>
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span>Katalog Mobil</span>
      </nav>

      <div className="catalog">
        <aside className={`filter-panel${panelOpen ? " open" : ""}`} id="filterPanel">
          <h3>
            Filter Kendaraan
            <span style={{ display: "flex", gap: 8 }}>
              <button className="btn btn--sm btn--outline filter-close" onClick={() => setPanelOpen(false)}>
                <IconClose />
              </button>
              <button className="btn btn--sm btn--outline" onClick={resetFilters} style={{ padding: "4px 10px" }}>
                Reset
              </button>
            </span>
          </h3>

          <div className="filter-group">
            <h4>Rentang Harga</h4>
            <div className="price-range">
              <div>
                <label>Harga Minimum (Rp)</label>
                <input
                  type="number"
                  min={0}
                  step={1000000}
                  placeholder="150000000"
                  value={minInput}
                  onChange={(e) => setMinInput(e.target.value)}
                />
              </div>
              <div>
                <label>Harga Maksimum (Rp)</label>
                <input
                  type="number"
                  min={0}
                  step={1000000}
                  placeholder="250000000"
                  value={maxInput}
                  onChange={(e) => setMaxInput(e.target.value)}
                />
              </div>
              <button className="btn btn--primary btn--sm btn--block" onClick={applyCustomRange}>
                Terapkan Filter
              </button>
            </div>
          </div>

          <div className="filter-group">
            <h4>Pilihan Cepat</h4>
            <div id="quickPriceFilter">
              {QUICK_OPTIONS.map((o, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name="quick"
                    checked={state.min === o.min && state.max === o.max}
                    onChange={() => setQuick(i)}
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Brand</h4>
            <div id="brandFilter">
              {BRANDS.map((b) => {
                const slug = slugify(b);
                return (
                  <label key={b}>
                    <input
                      type="checkbox"
                      value={slug}
                      checked={state.brands.includes(slug)}
                      onChange={(e) => toggleBrand(slug, e.target.checked)}
                    />
                    {b}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="filter-group">
            <h4>Tahun</h4>
            <div id="yearFilter">
              {years.map((y) => (
                <label key={y}>
                  <input
                    type="checkbox"
                    value={y}
                    checked={state.years.includes(y)}
                    onChange={(e) => toggleYear(y, e.target.checked)}
                  />
                  {y}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Status Pajak</h4>
            <div id="taxFilter">
              <label>
                <input
                  type="checkbox"
                  value="Aktif"
                  checked={state.taxes.includes("Aktif")}
                  onChange={(e) => toggleTax("Aktif", e.target.checked)}
                />
                Pajak Aktif
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Tidak Aktif"
                  checked={state.taxes.includes("Tidak Aktif")}
                  onChange={(e) => toggleTax("Tidak Aktif", e.target.checked)}
                />
                Pajak Tidak Aktif
              </label>
            </div>
          </div>

          <div className="filter-group">
            <h4>Status Kendaraan</h4>
            <div id="statusFilter">
              {["Tersedia", "Dipesan", "Terjual"].map((s) => (
                <label key={s}>
                  <input
                    type="checkbox"
                    value={s}
                    checked={state.statuses.includes(s)}
                    onChange={(e) => toggleStatus(s, e.target.checked)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="catalog__main">
          <button
            className="btn btn--outline catalog__filtertoggle"
            onClick={() => setPanelOpen(true)}
          >
            Filter & Urutkan
          </button>

          <div className="catalog__toolbar">
            {state.keyword ? (
              <span className="badge badge--featured" style={{ marginRight: "auto" }}>
                Hasil untuk &quot;{state.keyword}&quot;{" "}
                <button
                  onClick={clearKeyword}
                  style={{ background: "none", border: "none", color: "inherit", fontWeight: 800, marginLeft: 4, cursor: "pointer" }}
                  aria-label="Hapus kata kunci"
                >
                  ×
                </button>
              </span>
            ) : null}
            <div className="count" id="resultCount">
              Menampilkan <b>{result.length ? start + 1 : 0}–{start + pageItems.length}</b> dari <b>{result.length}</b> kendaraan
            </div>
            <div className="catalog__sort">
              <label htmlFor="sortSelect">Urutkan:</label>
              <select
                id="sortSelect"
                value={state.sort}
                onChange={(e) => update({ sort: e.target.value, page: 1 })}
              >
                <option value="terbaru">Terbaru</option>
                <option value="harga-asc">Harga Termurah</option>
                <option value="harga-desc">Harga Termahal</option>
                <option value="tahun-desc">Tahun Terbaru</option>
              </select>
            </div>
          </div>

          {pageItems.length ? (
            <div className="grid" id="carGrid">
              {pageItems.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="grid">
              <div className="empty-state" style={{ gridColumn: "1/-1" }}>
                <div className="icon">
                  <IconSearch />
                </div>
                <h3>Tidak ada mobil ditemukan</h3>
                <p>Coba ubah kata kunci atau perlonggar filter Anda.</p>
              </div>
            </div>
          )}

          {totalPages > 1 ? (
            <div className="pagination" id="pagination">
              <button onClick={() => gotoPage(page - 1)} disabled={page === 1}>
                ← Sebelumnya
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} className={p === page ? "active" : ""} onClick={() => gotoPage(p)}>
                  {p}
                </button>
              ))}
              <button onClick={() => gotoPage(page + 1)} disabled={page === totalPages}>
                Berikutnya →
              </button>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}