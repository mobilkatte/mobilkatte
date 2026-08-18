"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { useAdminAuth } from "@/lib/data-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const toast = useToast();
  const { authed, login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (authed) router.replace("/admin/dashboard");
  }, [authed, router]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) {
      router.replace("/admin/dashboard");
    } else {
      setShowError(true);
      toast("Email atau password salah. Silakan coba lagi.", "error");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="logo">
          <img src="/assets/logo.png" alt="Mobil Katte" className="brand-logo" />
          <span>MOBIL KATTE</span>
        </div>
        <p className="sub">Masuk ke Administrator Dashboard</p>

        <div className={`auth-error${showError ? " show" : ""}`} id="authError">
          Email atau password salah. Silakan coba lagi.
        </div>

        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="email">Email / Username</label>
            <input
              id="email"
              type="text"
              placeholder="email@perusahaan.com"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Lupa password?
            </a>
          </div>
          <button type="submit" className="btn btn--primary btn--lg btn--block mt-16">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}