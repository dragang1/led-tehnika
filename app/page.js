import GlobalApi from './_utils/GlobalApi';
import HomeContent from './_components/HomeContent';

export default async function Home() {
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();

  return (
    <HomeContent categoryList={categoryList} productList={productList} />
  );
}
