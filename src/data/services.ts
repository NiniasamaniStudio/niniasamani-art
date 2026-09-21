export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  price: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "clothes",
    number: "01",
    title: "ტანსაცმლის გადაკეთება",
    description: "სილუეტის მორგება, შეკეთება და ახალი დეტალების დამატება.",
    price: "₾ 45-დან",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "bags",
    number: "02",
    title: "ჩანთის შეკეთება",
    description: "ფორმის აღდგენა, დეტალების ჩანაცვლება და პერსონალიზებული აქცენტები.",
    price: "₾ 60-დან",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "jewelry",
    number: "03",
    title: "სამკაულის გადაკეთება",
    description: "ძველი ნივთის ახალი ისტორია, საყვარელი დეტალების ან ფორმის შენარჩუნებით.",
    price: "₾ 35-დან",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85",
  },
];
