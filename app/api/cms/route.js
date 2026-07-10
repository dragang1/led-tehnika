import CmsApi from '@/lib/cms';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'categories': {
        const data = await CmsApi.getCategoryList();
        return Response.json({ data });
      }
      case 'products': {
        const category = searchParams.get('category');
        const exclude = searchParams.get('exclude');
        if (category && exclude) {
          const data = await CmsApi.getProductsByCategory(category, exclude);
          return Response.json({ data });
        }
        if (category) {
          const data = await CmsApi.getProductsByCategoryName(category);
          return Response.json({ data });
        }
        const data = await CmsApi.getAllProducts();
        return Response.json({ data });
      }
      case 'product': {
        const slug = searchParams.get('slug');
        const data = await CmsApi.getProductBySlug(slug);
        return Response.json({ data });
      }
      case 'sliders': {
        const data = await CmsApi.getSliders();
        return Response.json({ data });
      }
      case 'page': {
        const slug = searchParams.get('slug');
        const data = await CmsApi.getStranicaBySlug(slug);
        return Response.json({ data });
      }
      default:
        return Response.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('CMS API error:', error);
    return Response.json(
      { error: 'CMS read failed', message: error?.message || String(error) },
      { status: 500 }
    );
  }
}
