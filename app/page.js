
import CategoryList from "./_components/CategoryList";
import Hero from "./_components/Hero";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";


export default async function Home() {

  // const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  return (
    <div className='px-4 md:px-10 lg:px-16 py-5 max-w-screen-xl mx-auto'>
      <Hero categoryList={categoryList} />
      <CategoryList categoryList={categoryList} />
      <div>
        <h2 className='text-primary font-bold text-2xl mt-5 mx-2'>Popularni Proizvodi</h2>
        <ProductList productList={productList} />
      </div>
      {/* <Slider sliderList={sliderList} /> */}
    </div>

  );
}
