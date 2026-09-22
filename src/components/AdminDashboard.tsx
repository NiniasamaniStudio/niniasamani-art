"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LogOut, Plus, Save, Trash2, Upload, X } from "lucide-react";
import type { ProductRow } from "@/lib/products";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { ProductCategory } from "@/data/products";
import SafeImage from "@/components/SafeImage";

const categoryLabels: Record<ProductCategory, string> = {
  jewelry: "სამკაულები",
  textiles: "ტექსტილი, ჩანთები & ყაბალახი",
  epoxy: "ეპოქსიდის ნაკეთობები",
};

const emptyForm = {
  title: "",
  category: "jewelry" as ProductCategory,
  description: "",
  price: "",
  image: "",
  tone: "lilac",
  tags: "",
  published: true,
  sort_order: 0,
};

type FormState = typeof emptyForm;

export default function AdminDashboard() {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from("products").select("*").order("sort_order", { ascending: true });
    if (error) setNotice(error.message);
    else setProducts((data ?? []) as ProductRow[]);
  }, []);

  const verifyAdmin = useCallback(async (currentEmail: string) => {
    if (!supabase) return;
    setCheckingAuth(true);
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      setCheckingAuth(false);
      return;
    }
    const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", user.user.id).maybeSingle();
    setAuthorized(Boolean(admin));
    setSessionEmail(admin ? currentEmail : null);
    setCheckingAuth(false);
    if (admin) await loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) void verifyAdmin(session.user.email ?? "");
      else setCheckingAuth(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (nextSession?.user) void verifyAdmin(nextSession.user.email ?? "");
      else {
        setAuthorized(false);
        setSessionEmail(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [verifyAdmin]);

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setNotice("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setNotice(error.message);
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setAuthorized(false);
    setSessionEmail(null);
    setProducts([]);
  }

  function editProduct(product: ProductRow) {
    setEditingId(product.id);
    setForm({
      title: product.title,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image,
      tone: product.tone,
      tags: product.tags.join(", "),
      published: product.published,
      sort_order: product.sort_order,
    });
    setPreviewUrl(product.image || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setPreviewUrl(null);
    setUploadProgress(null);
  }

  async function saveProduct(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setNotice("");
    const payload = {
      title: form.title.trim(),
      category: form.category,
      category_label: categoryLabels[form.category],
      description: form.description.trim(),
      price: form.price.trim(),
      image: form.image.trim(),
      tone: form.tone.trim() || "lilac",
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      published: form.published,
      sort_order: Number(form.sort_order) || 0,
    };
    const result = editingId
      ? await supabase.from("products").update(payload).eq("id", editingId)
      : await supabase.from("products").insert(payload);
    setLoading(false);
    if (result.error) {
      setNotice(result.error.message);
      return;
    }
    setNotice(editingId ? "ნამუშევარი განახლდა." : "ნამუშევარი დაემატა.");
    resetForm();
    await loadProducts();
  }

  async function deleteProduct(id: string) {
    if (!supabase || !window.confirm("ნამდვილად გსურთ ამ ნამუშევრის წაშლა?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) setNotice(error.message);
    else {
      setNotice("ნამუშევარი წაიშალა.");
      await loadProducts();
    }
  }

  async function uploadImage(file: File) {
    if (!supabase) return;
    setLoading(true);
    setUploadProgress(8);
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    const progressTimer = window.setInterval(() => {
      setUploadProgress((current) => current === null || current >= 88 ? current : current + 8);
    }, 180);
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    const path = `${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: false, contentType: file.type });
    window.clearInterval(progressTimer);
    if (error) setNotice(error.message);
    else {
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setForm((current) => ({ ...current, image: data.publicUrl }));
      setPreviewUrl(data.publicUrl);
      setUploadProgress(100);
      setNotice("სურათი აიტვირთა.");
    }
    if (error) setUploadProgress(null);
    setLoading(false);
  }

  if (!isSupabaseConfigured) return <AdminFrame><div className="admin-setup"><p className="section-kicker">/ Supabase setup</p><h1>დააკავშირე<br /><em>სტუდიის მონაცემები.</em></h1><p>შეავსე `.env.local` ფაილში Supabase anon key, შემდეგ გაუშვი პროექტი თავიდან. SQL სქემა მზად არის `supabase/schema.sql` ფაილში.</p></div></AdminFrame>;
  if (checkingAuth) return <AdminFrame><div className="admin-loading">ავტორიზაციის შემოწმება...</div></AdminFrame>;
  if (!authorized) return <AdminFrame><form className="admin-login" onSubmit={signIn}><p className="section-kicker">/ private studio</p><h1>შესვლა<br /><em>სტუდიაში.</em></h1><p>ადმინისტრატორის ანგარიშით მართე კოლექცია და ნამუშევრების სურათები.</p><label>ელფოსტა<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>პაროლი<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{notice && <p className="admin-error">{notice}</p>}<button className="button button-dark" disabled={loading}>{loading ? "მიმდინარეობს..." : "შესვლა"} <Save size={16} /></button></form></AdminFrame>;

  return <AdminFrame><div className="admin-dashboard"><header className="admin-topbar"><div><p className="section-kicker">/ content room</p><h1>სტუდიის<br /><em>კოლექცია.</em></h1></div><div className="admin-actions"><span>{sessionEmail}</span><button className="admin-icon-button" onClick={signOut} aria-label="გასვლა"><LogOut size={18} /></button></div></header><div className="admin-layout"><form className="admin-editor" onSubmit={saveProduct}><div className="admin-form-heading"><div><span className="admin-label">{editingId ? "რედაქტირება" : "ახალი ნამუშევარი"}</span><h2>{editingId ? "განაახლე დეტალები" : "დაამატე კოლექციას"}</h2></div>{editingId && <button type="button" className="admin-icon-button" onClick={resetForm} aria-label="რედაქტირების გაუქმება"><X size={18} /></button>}</div><label>დასახელება<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label><div className="admin-field-grid"><label>კატეგორია<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as ProductCategory })}>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label>ფასი<input value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="₾ 85-დან" required /></label></div><label>აღწერა<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={4} required /></label><label>ტეგები <span className="admin-hint">მძიმით გამოყავი</span><input value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} placeholder="მძივები, ხელნაკეთი" /></label><label>სურათის URL<input value={form.image} onChange={(event) => { const image = event.target.value; setForm({ ...form, image }); setPreviewUrl(image || null); }} placeholder="https://..." required /></label>{previewUrl && <div className="admin-image-preview"><SafeImage src={previewUrl} alt="ნამუშევრის წინასწარი ხედი" fill sizes="(max-width: 800px) 88vw, 400px" /></div>}<label className="admin-upload"><Upload size={16} /> სურათის ატვირთვა<input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file); }} /></label>{uploadProgress !== null && <div className="upload-progress" aria-live="polite"><div><span>ატვირთვა</span><strong>{uploadProgress}%</strong></div><progress max="100" value={uploadProgress} /></div>}<div className="admin-field-grid"><label>ტონი<input value={form.tone} onChange={(event) => setForm({ ...form, tone: event.target.value })} /></label><label>რიგი<input type="number" value={form.sort_order} onChange={(event) => setForm({ ...form, sort_order: Number(event.target.value) })} /></label></div><label className="admin-checkbox"><input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} /> საჯაროდ გამოქვეყნებული</label><button className="button button-dark" disabled={loading}>{editingId ? "შენახვა" : "დამატება"} <Plus size={16} /></button>{notice && <p className="admin-notice">{notice}</p>}</form><section className="admin-list"><div className="admin-list-heading"><div><span className="admin-label">{products.length} ნამუშევარი</span><h2>კოლექცია</h2></div><button type="button" className="button button-light" onClick={resetForm}><Plus size={16} /> ახალი</button></div>{products.length === 0 && <div className="admin-empty"><p>Supabase-ში ჯერ არ არის პროდუქტი.</p><span>შეავსე ფორმა ან ჩასვი ჩანაწერები SQL Editor-ით.</span></div>}{products.map((product) => <article className="admin-product" key={product.id}><div className="admin-product-image"><SafeImage src={product.image} alt={product.title} fill sizes="80px" /></div><div className="admin-product-copy"><span>{product.category_label}</span><h3>{product.title}</h3><p>{product.price} · {product.published ? "გამოქვეყნებული" : "დამალული"}</p></div><div className="admin-product-actions"><button className="admin-icon-button" onClick={() => editProduct(product)} aria-label={`${product.title} რედაქტირება`}><Save size={16} /></button><button className="admin-icon-button danger" onClick={() => void deleteProduct(product.id)} aria-label={`${product.title} წაშლა`}><Trash2 size={16} /></button></div></article>)}</section></div></div></AdminFrame>;
}

function AdminFrame({ children }: { children: React.ReactNode }) {
  return <main className="admin-shell"><Link className="admin-brand" href="/">niniasamani<span>_</span>art <small>/ admin</small></Link>{children}</main>;
}
