"use client";

import { useCars } from "@/lib/data-context";
import { IconCar, IconMoney, IconShield, IconWhatsapp } from "@/components/icons";

const CARD_ICONS = [IconShield, IconCar, IconMoney, IconWhatsapp];

export default function AboutSection() {
  const { settings } = useCars();

  const cards = settings
    ? [
        { title: settings.about_card1_title, desc: settings.about_card1_desc },
        { title: settings.about_card2_title, desc: settings.about_card2_desc },
        { title: settings.about_card3_title, desc: settings.about_card3_desc },
        { title: settings.about_card4_title, desc: settings.about_card4_desc },
      ]
    : [];

  return (
    <section className="section" id="tentang">
      <div className="container">
        <div className="section-head">
          <span className="kicker">{settings?.about_kicker || "Kenapa Kami"}</span>
          <h2>{settings?.about_title || "Mengapa Mobil Katte?"}</h2>
          <p>
            {settings?.about_subtitle ||
              "Kami membuat jual beli mobil bekas jadi mudah, jelas, dan terpercaya."}
          </p>
        </div>
        <div className="why">
          {cards.map((c, i) => {
            const Icon = CARD_ICONS[i] ?? IconShield;
            return (
              <div className="why__item" key={i}>
                <div className="icon">
                  <Icon />
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}