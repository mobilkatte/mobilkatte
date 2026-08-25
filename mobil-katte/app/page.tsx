import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/home/HeroSearch";
import { FeaturedGrid, NewestGrid } from "@/components/home/HomeGrids";
import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import SellCarSection from "@/components/home/SellCarSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="container hero__inner">
          <h1>
            Temukan Mobil Bekas <span>Impianmu</span> di Mobil Katte
          </h1>
          <p className="hero__sub">
            Pilihan mobil bekas berkualitas dengan informasi kendaraan yang transparan. Tanpa ribet,
            langsung hubungi penjual.
          </p>

          <HeroSearch />

          <div className="hero__quick" id="quickFilters">
            <Link href="/mobil?min=0&max=100000000">Di bawah Rp100 juta</Link>
            <Link href="/mobil?min=100000000&max=150000000">Rp100–150 juta</Link>
            <Link href="/mobil?min=150000000&max=200000000">Rp150–200 juta</Link>
            <Link href="/mobil?min=200000000&max=300000000">Rp200–300 juta</Link>
            <Link href="/mobil?min=300000000&max=500000000">Rp300–500 juta</Link>
            <Link href="/mobil?min=500000000&max=999999999999">Di atas Rp500 juta</Link>
          </div>

          <div className="hero__stats">
            <div className="stat">
              <b>125+</b>
              <span>Kendaraan Tersedia</span>
            </div>
            <div className="stat">
              <b>12</b>
              <span>Brand Mobil</span>
            </div>
            <div className="stat">
              <b>100%</b>
              <span>Info Transparan</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="pilihan">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Pilihan</span>
            <h2>Mobil Pilihan</h2>
            <p>Kendaraan pilihan terbaik yang paling diminati pelanggan bulan ini.</p>
          </div>
          <FeaturedGrid />
          <div className="ta-center mt-24">
            <Link href="/mobil" className="btn btn--dark btn--lg">
              Lihat Semua Katalog →
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="terbaru">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Terbaru</span>
            <h2>Mobil Terbaru</h2>
            <p>Unit-unit terbaru yang baru saja masuk ke showroom Mobil Katte.</p>
          </div>
          <NewestGrid />
        </div>
      </section>

      <AboutSection />

      <SellCarSection />

      <CTASection />

      <Footer />
    </>
  );
}