import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { IconSearch } from "@/components/icons";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "80px 20px" }}>
        <div className="empty-state">
          <div className="icon">
            <IconSearch />
          </div>
          <h3>Halaman tidak ditemukan</h3>
          <p>Halaman yang Anda cari tidak tersedia.</p>
          <Link href="/" className="btn btn--primary mt-16">
            Kembali ke Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}