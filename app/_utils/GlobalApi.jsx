const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'https://led-backend-62tj.onrender.com/api'
});

const getCategory = () => axiosClient.get('/kategorije?populate=*');

const getSliders = async () => {
    try {
        const res = await axiosClient.get('/sliders?populate=*');
        return res.data.data;
    } catch (error) {
        throw error; 
    }
};

const getCategoryList = () => axiosClient.get('/kategorije?populate=*').then(res => res.data.data);

const getAllProducts = () => axiosClient.get('/proizvodi?populate=*').then(res => res.data.data);

const getProductById = (documentId) =>
    axiosClient.get(`/proizvodi/${documentId}?populate=*`)
        .then(res => res.data.data)
        .catch(error => {
            throw error; 
        });

const getProductBySlug = async (slug) => {
  try {
    const res = await axiosClient.get(`/proizvodi?filters[slug][$eq]=${slug}&populate=*`);
    const product = res.data.data?.[0];
    if (!product) return null;
    return product;
  } catch (error) {
    return null; 
  }
};

const getProductsByCategory = (category, productDocumentId) =>
    axiosClient
        .get(`/proizvodi?filters[kategorije][name][$eq]=${encodeURIComponent(category)}&filters[documentId][$ne]=${encodeURIComponent(productDocumentId)}&populate=*`)
        .then(res => res.data.data)
        .catch(() => {
           
            return [];
        });

const addToCart = (data) => axiosClient.post('/user-carts', data, {
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductsByCategory,
    addToCart,
    getProductById,
    getProductBySlug
};
