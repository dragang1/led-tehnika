const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api'
})

const getCategory = () => axiosClient.get('/kategorijes?populate=*');
const getSliders = () => axiosClient.get('/sliders?populate=*').then(res => {

    return res.data.data;
}
)

const getCategoryList = () => axiosClient.get('/kategorijes?populate=*').then(res => {
    return res.data.data;
})

const getAllProducts = () => axiosClient.get('/products?populate=*').then(res => {
    return res.data.data
})

const getProductsByCategory = (category) =>
    axiosClient.get(`/products?filters[kategorije][name][$eq]=${encodeURIComponent(category)}&populate=*`).then(res => {
        return res.data.data
    })





export default {
    getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductsByCategory
}