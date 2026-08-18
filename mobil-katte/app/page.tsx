import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/home/HeroSearch";
import { FeaturedGrid, NewestGrid } from "@/components/home/HomeGrids";
import { IconCar, IconMoney, IconShield, IconWhatsapp } from "@/components/icons";

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

      <section className="section" id="tentang">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Kenapa Kami</span>
            <h2>Mengapa Mobil Katte?</h2>
            <p>Kami membuat jual beli mobil bekas jadi mudah, jelas, dan terpercaya.</p>
          </div>
          <div className="why">
            <div className="why__item">
              <div className="icon">
                <IconShield />
              </div>
              <h3>Informasi Jelas</h3>
              <p>Setiap mobil dilengkapi data lengkap: tahun, pajak, kilometer, hingga kondisi kendaraan.</p>
            </div>
            <div className="why__item">
              <div className="icon">
                <IconCar />
              </div>
              <h3>Pilihan Beragam</h3>
              <p>Ratusan mobil dari 12+ brand ternama dengan berbagai tipe dan rentang harga.</p>
            </div>
            <div className="why__item">
              <div className="icon">
                <IconMoney />
              </div>
              <h3>Harga Transparan</h3>
              <p>Harga tertera jelas di setiap unit. Tanpa biaya tersembunyi, apa adanya.</p>
            </div>
            <div className="why__item">
              <div className="icon">
                <IconWhatsapp />
              </div>
              <h3>Mudah Dihubungi</h3>
              <p>Hubungi kami langsung lewat WhatsApp dengan satu klik dari halaman mobil.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>Tidak menemukan mobil yang Anda cari?</h2>
            <p>Kami bantu cari mobil bekas sesuai budget dan kebutuhan Anda. Cukup kirim pesan ke WhatsApp kami.</p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Mobil%20Katte%2C%20saya%20mencari%20mobil%20bekas..."
              target="_blank"
              className="btn btn--white btn--lg"
            >
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}