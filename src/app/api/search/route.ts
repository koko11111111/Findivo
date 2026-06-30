import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  if (!query) return NextResponse.json({ error: "Query is required" }, { status: 400 });
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) return NextResponse.json({ products: getMockProducts(query) });
  try {
    const res = await fetch(
      `https://real-time-product-search.p.rapidapi.com/search?q=${encodeURIComponent(query)}&country=us&language=en&limit=20`,
      { headers: { "x-rapidapi-host": "real-time-product-search.p.rapidapi.com", "x-rapidapi-key": apiKey } }
    );
    if (!res.ok) throw new Error("RapidAPI error");
    const data = await res.json();
    const products = (data.data ?? []).map((item: any, i: number) => {
      const price = parseFloat(item.typical_price_range?.[0]?.replace(/[^0-9.]/g, "") ?? "0") || parseFloat(item.extracted_price ?? "0");
      const originalPrice = parseFloat(item.typical_price_range?.[1]?.replace(/[^0-9.]/g, "") ?? "0") || null;
      const discount = originalPrice && price && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : null;
      return {
        id: item.product_id ?? String(i), title: item.product_title ?? "Unknown Product",
        brand: item.product_attributes?.Brand ?? "", price: price || 0,
        originalPrice: originalPrice && originalPrice > price ? originalPrice : null, discount,
        image: item.product_photos?.[0] ?? "", store: item.offer?.store_name ?? "Online Store",
        rating: item.product_rating ? parseFloat(item.product_rating) : null,
        reviews: item.product_num_reviews ? parseInt(item.product_num_reviews) : null,
        url: item.offer?.offer_page_url ?? item.product_page_url ?? "#", shipping: item.offer?.shipping ?? null,
      };
    });
    return NextResponse.json({ products });
  } catch { return NextResponse.json({ products: getMockProducts(query) }); }
}

function getMockProducts(query: string) {
  return [
    { id: "1", title: `${query} - Premium Edition`, brand: "TopBrand", price: 39.99, originalPrice: 79.99, discount: 50, image: "", store: "Amazon", rating: 4.5, reviews: 1243, url: "#", shipping: "Free shipping" },
    { id: "2", title: `${query} - Classic Fit`, brand: "StyleCo", price: 24.99, originalPrice: 49.99, discount: 50, image: "", store: "Nike", rating: 4.2, reviews: 856, url: "#", shipping: "Free over $50" },
    { id: "3", title: `${query} - Limited Edition`, brand: "LuxBrand", price: 89.99, originalPrice: null, discount: null, image: "", store: "Adidas", rating: 4.8, reviews: 2341, url: "#", shipping: "Free shipping" },
    { id: "4", title: `${query} - Essentials`, brand: "BasicWear", price: 19.99, originalPrice: 34.99, discount: 43, image: "", store: "H&M", rating: 3.9, reviews: 432, url: "#", shipping: "$5.99 shipping" },
    { id: "5", title: `${query} - Pro Series`, brand: "ProGear", price: 59.99, originalPrice: 99.99, discount: 40, image: "", store: "Zara", rating: 4.6, reviews: 678, url: "#", shipping: "Free shipping" },
    { id: "6", title: `${query} - Vintage Style`, brand: "RetroFit", price: 44.99, originalPrice: 59.99, discount: 25, image: "", store: "ASOS", rating: 4.1, reviews: 234, url: "#", shipping: "Free returns" },
    { id: "7", title: `${query} - Sport Edition`, brand: "ActiveWear", price: 34.99, originalPrice: 69.99, discount: 50, image: "", store: "Under Armour", rating: 4.4, reviews: 1567, url: "#", shipping: "Free shipping" },
    { id: "8", title: `${query} - Casual Comfort`, brand: "ComfortLine", price: 29.99, originalPrice: null, discount: null, image: "", store: "Gap", rating: 4.0, reviews: 891, url: "#", shipping: "Free over $35" },
  ];
}
