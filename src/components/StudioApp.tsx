"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  MessageCircle,
  MoveUpRight,
  Plus,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { categoryFilters, products, type Product } from "@/data/products";
import { services } from "@/data/services";
import { getPublicProducts } from "@/lib/products";
import SafeImage from "@/components/SafeImage";

const whatsappNumber = "995555123456";
const whatsappLink = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export default function StudioApp() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [catalogProducts, setCatalogProducts] = useState(products);

  useEffect(() => {
    let active = true;
    getPublicProducts().then((remoteProducts) => {
      if (active) setCatalogProducts(remoteProducts);
    });
    return () => {
      active = false;
    };
  }, []);

  const visibleProducts = activeCategory === "all" ? catalogProducts : catalogProducts.filter((product) => product.category === activeCategory);

  const openQuote = (service = "") => {
    setQuoteOpen(true);
    if (service) window.history.replaceState(null, "", `#quote-${service}`);
  };

  return (
    <main className="studio-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="niniasamani_art მთავარი გვერდი">niniasamani<span>_</span>art</a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <a href="#catalog" onClick={() => setMenuOpen(false)}>კოლექცია</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>გადაკეთება</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>სტუდია</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>კონტაქტი</a>
        </nav>
        <a className="header-cta" href={whatsappLink("გამარჯობა, მინდა თქვენი სტუდიის შესახებ კითხვა.")} target="_blank" rel="noreferrer">
          <MessageCircle size={16} /> WhatsApp
        </a>
        <button className="menu-button" aria-label="მენიუს გახსნა" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> ოზურგეთი / საქართველო <span className="eyebrow-line" /> 2024</p>
          <h1>საგნები<br /><em>გრძნობით.</em></h1>
          <p className="hero-intro">უნიკალური ხელნაკეთი სამკაულები, ეპოქსიდის ნაკეთობები, ტექსტილის აქსესუარები (ჩანთები, საყელოები, ყაბალახი) და ტანსაცმლის/აქსესუარების გადაკეთების სერვისი ოზურგეთში.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#catalog">კოლექციის ნახვა <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#services">გადაკეთების სერვისი <MoveUpRight size={15} /></a>
          </div>
        </div>
        <div className="hero-art" aria-label="ხელნაკეთი სამკაულის კოლაჟი">
          <div className="hero-image hero-image-main" />
          <div className="hero-image hero-image-detail" />
          <span className="hero-stamp">made<br />slowly</span>
          <span className="hero-caption">01 / 04<br /><small>Natural materials</small></span>
        </div>
        <div className="hero-scroll"><span>ჩამოყევი</span><div /></div>
      </section>

      <section className="manifesto-band">
        <p>ჩვენ გვჯერა ნივთების, რომლებიც დროს უძლებს</p>
        <div className="manifesto-symbol"><Sparkles size={18} /> <span>ნინიასამანი</span></div>
        <p>და ხელების, რომლებიც მათ ახალ სიცოცხლეს აძლევს.</p>
      </section>

      <section className="section catalog-section" id="catalog">
        <div className="section-heading">
          <div><p className="section-kicker">/ 01 — კოლექცია</p><h2>შექმნილი<br /><em>დასატოვებლად.</em></h2></div>
          <p className="section-note">თითოეული ნამუშევარი არის პატარა ტირაჟის ან სრულიად უნიკალური. იპოვე ის, რაც შენს ისტორიას ეკუთვნის.</p>
        </div>
        <div className="filter-row" role="tablist" aria-label="კატეგორიები">
          {categoryFilters.map((filter) => <button key={filter.id} className={activeCategory === filter.id ? "filter active" : "filter"} onClick={() => setActiveCategory(filter.id)}>{filter.label}</button>)}
        </div>
        <motion.div layout className="product-grid">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} onSelect={() => setSelectedProduct(product)} />)}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="service-section" id="services">
        <div className="service-intro"><p className="section-kicker">/ 02 — ახალი სიცოცხლე</p><h2>შენს ნივთებსაც<br /><em>ვუსმენთ.</em></h2><p>ზოგიერთი ნივთი გადასაგდები არ არის. ფორმას ვუბრუნებთ, ვცვლით და ვტოვებთ იმას, რაც მას შენსას ხდის.</p><button className="button button-light" onClick={() => openQuote()}>მოითხოვე ფასი <ArrowUpRight size={17} /></button></div>
        <div className="service-list">
          {services.map((service, index) => <button key={service.id} className={activeService === index ? "service-item active" : "service-item"} onClick={() => setActiveService(index)}><span className="service-number">{service.number}</span><span className="service-title">{service.title}</span><span className="service-price">{service.price}</span><ChevronRight className="service-arrow" size={20} /></button>)}
          <div className="service-preview"><div className="service-preview-image" style={{ backgroundImage: `url(${services[activeService].image})` }} /><div className="service-preview-copy"><span>{services[activeService].number} / 03</span><p>{services[activeService].description}</p><button onClick={() => openQuote(services[activeService].title)}>დეტალები <ArrowUpRight size={14} /></button></div></div>
        </div>
      </section>

      <section className="process-section"><p className="section-kicker">/ მარტივი პროცესი</p><div className="process-grid">{["მოგვისმენია", "მოგვიტანე", "ვქმნით", "გიბრუნებთ"].map((step, index) => <div className="process-step" key={step}><span>0{index + 1}</span><h3>{step}</h3><p>{["მოგვითხარი რა გჭირდება და ერთად ვიპოვით ფორმას.", "მოიტანე სტუდიაში ან გამოგვიგზავნე შენი ნივთი.", "ჩვენი დრო და ხელები მის ახალ სახეს ქმნის.", "მზადაა. ახალი ამბით და ისევ შენი." ][index]}</p></div>)}</div></section>

      <section className="about-section section" id="about"><div className="about-image"><div className="about-image-inner" /><span>studio notes<br />no. 07</span></div><div className="about-copy"><p className="section-kicker">/ 03 — სტუდიის შესახებ</p><h2>სილამაზე<br /><em>ნელა მოდის.</em></h2><p>niniasamani_art არის პატარა სახელოსნო ოზურგეთში, სადაც მძივები, პრემიუმ ტექსტილი და ძველი ნივთები ახალ ფორმას პოულობენ.</p><p>ჩვენ გვიყვარს მასალა თავისი პატარა ნაკლოვანებებით, ხელის კვალი და ნივთები, რომლებიც მხოლოდ ერთი ადამიანის შეიძლება იყოს.</p><a className="text-link" href="#contact">გაიცანი სტუდია <MoveUpRight size={15} /></a></div></section>

      <section className="contact-section" id="contact"><div className="contact-main"><p className="section-kicker">/ 04 — კონტაქტი</p><h2>დავიწყოთ<br /><em>ერთად.</em></h2><a className="contact-email" href="mailto:hello@niniasamani.art">hello@niniasamani.art <ArrowUpRight size={20} /></a></div><div className="contact-details"><div><span>სტუდია</span><p>ოზურგეთი, საქართველო<br />მისამართი შეხვედრით</p></div><div><span>სამუშაო საათები</span><p>ორშ — პარ<br />11:00 — 19:00</p></div><div className="social-links"><span>გამოგვყევი</span><div><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href={whatsappLink("გამარჯობა!")} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a></div></div></div></section>

      <footer className="site-footer"><a className="brand" href="#top">niniasamani<span>_</span>art</a><p>ოზურგეთი, საქართველო · © 2024 / ყველა ნამუშევარი ხელით</p><a className="back-top" href="#top">ზემოთ <ChevronUpIcon /></a></footer>

      <AnimatePresence>{selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}</AnimatePresence>
      <AnimatePresence>{quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}</AnimatePresence>
    </main>
  );
}

function ProductCard({ product, index, onSelect }: { product: Product; index: number; onSelect: () => void }) {
  return <motion.article className={`product-card tone-${product.tone}`} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ delay: index * 0.04 }}><button className="product-image" onClick={onSelect} aria-label={`${product.title} დეტალები`}><SafeImage src={product.image} alt={product.title} fill sizes="(max-width: 430px) 88vw, (max-width: 800px) 44vw, 30vw" /><span className="product-plus"><Plus size={18} /></span></button><div className="product-info"><div><span className="product-category">{product.categoryLabel}</span><h3>{product.title}</h3></div><span className="product-price">{product.price}</span></div><div className="product-bottom"><div className="product-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button onClick={() => window.open(whatsappLink(`გამარჯობა, მაინტერესებს ნამუშევარი: ${product.title}`), "_blank")} className="inquire">მოკითხვა <ArrowUpRight size={14} /></button></div></motion.article>;
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) { return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.div className="detail-modal" initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 30 }} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="დახურვა"><X size={20} /></button><SafeImage src={product.image} alt={product.title} width={800} height={800} /><div className="modal-copy"><span className="product-category">{product.categoryLabel}</span><h2>{product.title}</h2><p>{product.description}</p><strong>{product.price}</strong><a className="button button-dark" href={whatsappLink(`გამარჯობა, მაინტერესებს ${product.title}. გთხოვთ, მომწეროთ დეტალები.`)} target="_blank" rel="noreferrer">დაკავშირება WhatsApp-ზე <ArrowUpRight size={16} /></a></div></motion.div></motion.div>; }

function QuoteModal({ onClose }: { onClose: () => void }) { const [service, setService] = useState(services[0].title); const [details, setDetails] = useState(""); const submit = (event: React.FormEvent) => { event.preventDefault(); window.open(whatsappLink(`გამარჯობა, მინდა ფასის მოთხოვნა. სერვისი: ${service}. დეტალები: ${details}`), "_blank"); }; return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.form className="quote-modal" onSubmit={submit} initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 30 }} onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={onClose} aria-label="დახურვა"><X size={20} /></button><p className="section-kicker">/ ფასის მოთხოვნა</p><h2>მომიყევი<br /><em>შენს ნივთზე.</em></h2><label>სერვისის ტიპი<select value={service} onChange={(event) => setService(event.target.value)}>{services.map((item) => <option key={item.id}>{item.title}</option>)}</select></label><label>მოკლე აღწერა<textarea required value={details} onChange={(event) => setDetails(event.target.value)} placeholder="რა გინდა შეიცვალოს?" rows={4} /></label><button className="button button-dark" type="submit">გაგზავნა WhatsApp-ზე <Send size={16} /></button></motion.form></motion.div>; }

function ChevronUpIcon() { return <ChevronDown size={15} className="rotate-up" />; }
