export async function fetchProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/proizvodi?populate=category,images`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Ne mogu dohvatiti proizvode");
  }

  const data = await res.json();
  return data.data; // array proizvoda
}
