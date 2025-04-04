const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'https://led-backend-62tj.onrender.com/api'
})

const getCategory = () => axiosClient.get('/kategorije?populate=*');
const getSliders = async () => {
    try {
        const res = await axiosClient.get('/sliders?populate=*');
        return res.data.data; // Make sure to return the correct data
    } catch (error) {
        console.error('Error fetching sliders:', error);
        throw error; // Re-throw to handle it in the calling function
    }
};


const getCategoryList = () => axiosClient.get('/kategorije?populate=*').then(res => {
    return res.data.data;
})

const getAllProducts = () => axiosClient.get('/proizvodi?populate=*').then(res => {
    return res.data.data
})

const getProductById = (documentId) =>
    axiosClient.get(`/proizvodi/${documentId}?populate=*`)
        .then(res => {
            return res.data.data;
        })
        .catch(error => {
            console.error("Error fetching product:", error);
            throw error; // You can throw the error here or handle it in another way
        });







const getProductsByCategory = (category, productDocumentId) =>
    axiosClient
        .get(`/proizvodi?filters[kategorije][name][$eq]=${encodeURIComponent(category)}&filters[documentId][$ne]=${encodeURIComponent(productDocumentId)}&populate=*`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            console.error("Error fetching products by category:", error);
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
    getProductById
}