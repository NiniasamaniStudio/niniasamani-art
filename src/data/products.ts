export type ProductCategory = "jewelry" | "textiles" | "epoxy";

export type Product = {
  id: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  price: string;
  image: string;
  tone: string;
  tags: string[];
};

export const products: Product[] = [
  {
    id: "beaded-necklace",
    title: "მძივების ყელსაბამი",
    category: "jewelry",
    categoryLabel: "სამკაულები",
    description: "ხელით აწყობილი ყელსაბამი ფერადი მძივებითა და მსუბუქი ფორმით.",
    price: "₾ 180-დან",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
    tone: "pearl",
    tags: ["მძივები", "ხელნაკეთი"],
  },
  {
    id: "colorful-beaded-bracelet",
    title: "ფერადი მძივების სამაჯური",
    category: "jewelry",
    categoryLabel: "სამკაულები",
    description: "ხელით დაწნული სამაჯური მკვეთრი ფერებითა და ყოველდღიური სილუეტით.",
    price: "₾ 120-დან",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85",
    tone: "blush",
    tags: ["მძივები", "ფერადი"],
  },
  {
    id: "linen-bow",
    title: "თეთრეულის ბაფთა",
    category: "textiles",
    categoryLabel: "ტექსტილი, ჩანთები & ყაბალახი",
    description: "ბუნებრივი ტექსტურა განსაკუთრებული დღის პატარა დეტალისთვის.",
    price: "₾ 65-დან",
    image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?auto=format&fit=crop&w=1200&q=85",
    tone: "linen",
    tags: ["თეთრეული", "უნიკალური"],
  },
  {
    id: "silk-pouch",
    title: "აბრეშუმის ჩანთა",
    category: "textiles",
    categoryLabel: "ტექსტილი, ჩანთები & ყაბალახი",
    description: "მცირე ფორმა, რომელიც ყოველდღიურ რიტმს მშვიდად მიჰყვება.",
    price: "₾ 90-დან",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85",
    tone: "ink",
    tags: ["აბრეშუმი", "ხელნაკეთი"],
  },
  {
    id: "woven-object",
    title: "მოქსოვილი ფორმა",
    category: "textiles",
    categoryLabel: "ტექსტილი, ჩანთები & ყაბალახი",
    description: "საგანი ინტერიერისთვის, შექმნილი ნელი და ყურადღებიანი ხელით.",
    price: "₾ 240-დან",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85",
    tone: "clay",
    tags: ["ბამბა", "ობიექტი"],
  },
  {
    id: "beaded-earrings",
    title: "მძივების საყურეები",
    category: "jewelry",
    categoryLabel: "სამკაულები",
    description: "მძივებით შექმნილი მსუბუქი გეომეტრია, რომელიც სახეს ანათებს.",
    price: "₾ 145-დან",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
    tone: "gold",
    tags: ["მძივები", "ოქროსფერი"],
  },
  {
    id: "pressed-flower-pendant",
    title: "ყვავილის მედალიონი",
    category: "epoxy",
    categoryLabel: "ეპოქსიდის სამკაულები",
    description: "გამჭვირვალე ეპოქსიდში შემონახული პატარა ველური ყვავილები.",
    price: "₾ 85-დან",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85",
    tone: "lilac",
    tags: ["ეპოქსიდი", "ყვავილები"],
  },
  {
    id: "pigment-resin-rings",
    title: "პიგმენტის რგოლები",
    category: "epoxy",
    categoryLabel: "ეპოქსიდის სამკაულები",
    description: "ხელით ჩამოსხმული ბეჭდები ფერადი პიგმენტების მოძრავი შრეებით.",
    price: "₾ 55-დან",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
    tone: "violet",
    tags: ["ეპოქსიდი", "პიგმენტი"],
  },
  {
    id: "resin-coaster-set",
    title: "მზის ჩასვლის სადგამები",
    category: "epoxy",
    categoryLabel: "ეპოქსიდის დეკორი",
    description: "ოთხი უნიკალური სადგამი მეტალის ფოლგითა და თბილი ფერის შრეებით.",
    price: "₾ 110-დან",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85",
    tone: "gold",
    tags: ["დეკორი", "ფოლგა"],
  },
  {
    id: "resin-tray",
    title: "ლავანდის ლანგარი",
    category: "epoxy",
    categoryLabel: "ეპოქსიდის დეკორი",
    description: "უნიკალური ლანგარი რბილი იასამნისფერი პიგმენტით სახლისთვის.",
    price: "₾ 160-დან",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85",
    tone: "lilac",
    tags: ["ლანგარი", "ხელნაკეთი"],
  },
];

export const categoryFilters = [
  { id: "all", label: "ყველა" },
  { id: "jewelry", label: "სამკაულები" },
  { id: "textiles", label: "ტექსტილი, ჩანთები & ყაბალახი" },
  { id: "epoxy", label: "ეპოქსიდის ნაკეთობები" },
] as const;
