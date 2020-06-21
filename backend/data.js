import { v4 as uuidv4 } from "uuid";

export default {
  products: [
    {
      _id: uuidv4(),
      title:
        "Acer Aspire 5 Slim Laptop, 15.6 inches Full HD IPS Display, AMD Ryzen 3 3200U, Vega 3 Graphics, 4GB DDR4, 128GB SSD, Backlit Keyboard, Windows 10 in S Mode, A515-43-R19L,Silver",
      image: "/img/acer_slim_A515-43-R19L.jpg",
      price: 349.99,
      brand: "Acer",
      rating: 4.4,
      numReviews: 5480,
      stockCount: Math.floor(Math.random()*21)
    },
    {
      _id: uuidv4(),
      title:
        "ASUS VivoBook 15 Thin and Light Laptop, 15.6” FHD Display, Intel i3-1005G1 CPU, 8GB RAM, 128GB SSD, Backlit Keyboard, Fingerprint, Windows 10 Home in S Mode, Slate Gray, F512JA-AS34",
      image: "/img/asus_F512JA-AS34.jpg",
      price: 399.99,
      brand: "Asus",
      rating: 4.3,
      numReviews: 453,
      stockCount: Math.floor(Math.random()*21)
    },
    {
      _id: uuidv4(),
      title:
        "2020 HP 14“ Laptop (AMD A9-9425 up to 3.7 GHz, 4GB DDR4 RAM, 128GB SSD, AMD Radeon R5 Graphic, Wi-Fi, Bluetooth, HDMI, Windows 10 Home)",
      image: "/img/hp_a9-9445-4-128.jpg",
      price: 394.99,
      brand: "HP",
      rating: 4.1,
      numReviews: 65,
      stockCount: Math.floor(Math.random()*21)
    },
    {
      _id: uuidv4(),
      title:
        'Lenovo IdeaPad 3 14" Laptop, 14.0" FHD (1920 x 1080) Display, AMD Ryzen 5 3500U Processor, 8GB DDR4 RAM, 256GB SSD, AMD Radeon Vega 8 Graphics, Narrow Bezel, Windows 10, 81W0003QUS, Abyss Blue',
      image: "/img/lenovo_81W0003QUS.jpg",
      price: 449.99,
      brand: "Lenovo",
      rating: 3.5,
      numReviews: 22,
      stockCount: Math.floor(Math.random()*21)
    },
    {
      _id: uuidv4(),
      title:
        "New Apple MacBook Air (13-inch, 8GB RAM, 256GB SSD Storage) - Gold",
      image: "/img/macbook_air-8-256-gold.jpg",
      price: 899.00,
      brand: "Apple",
      rating: 4.6,
      numReviews: 454,
      stockCount: Math.floor(Math.random()*21)
    },
    {
      _id: uuidv4(),
      title:
      'LG Gram Laptop - 14" Full HD IPS Display, Intel 10th Gen Core i7-1065G7 CPU, 16GB RAM, 512GB M.2 MVMe SSD, Thunderbolt 3, 18.5 Hour Battery Life - 14Z90N (2020)',
      image: "/img/lg_i7-1065g7-16-512.jpg",
      price: 1428.80,
      brand: "LG",
      rating: 4.2,
      numReviews: 18,
      stockCount: Math.floor(Math.random()*21)
    },
    {
      _id: uuidv4(),
      title:
        "Apple MacBook Pro MLH12LL/A 13-inch Laptop with Touch Bar, 2.9GHz dual-core Intel Core i5, 8GB Memory, 256GB, Retina Display, Space Gray",
      image: "/img/macbook-pro-MLH12LL-A.jpg",
      price: 1029.99,
      brand: "Apple",
      rating: 3.9,
      numReviews: 82,
      stockCount: 0,
      renewed: true
    },
  ],
};
