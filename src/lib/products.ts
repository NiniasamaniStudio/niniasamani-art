import { products as fallbackProducts, type Product, type ProductCategory } from "@/data/products";
import { supabase } from "@/lib/supabase";

export type ProductRow = {
  id: string;
  title: string;
  category: ProductCategory;
  category_label: string;
  description: string;
  price: string;
  image: string;
  tone: string;
  tags: string[];
  published: boolean;
  sort_order: number;
};

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    categoryLabel: row.category_label,
    description: row.description,
    price: row.price,
    image: row.image,
    tone: row.tone,
    tags: row.tags ?? [],
  };
}

export async function getPublicProducts(): Promise<Product[]> {
  if (!supabase) return fallbackProducts;

  const { data, error } = await supabase
    .from("products")
    .select("id, title, category, category_label, description, price, image, tone, tags, published, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return fallbackProducts;
  return (data as ProductRow[]).map(mapProduct);
}

export function getFallbackProducts() {
  return fallbackProducts;
}

export { mapProduct };
