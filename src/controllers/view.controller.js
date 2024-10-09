
import ProductService from "../services/product.service.js";
import CartService from "../services/cart.service.js"


class ViewController {
    async renderHome(req, res) {
        res.render('home', { title: 'Bienvenido a nuestra tienda Marolio' });
    }

    async renderProducts(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const products = await ProductService.getProducts({}, { page, limit });
            res.render('products', { 
                title: 'Nuestros Productos',
                products: products.docs,
                pagination: {
                    page: products.page,
                    totalPages: products.totalPages,
                    hasPrevPage: products.hasPrevPage,
                    hasNextPage: products.hasNextPage,
                    prevLink: products.hasPrevPage ? `/products?page=${products.prevPage}` : null,
                    nextLink: products.hasNextPage ? `/products?page=${products.nextPage}` : null
                }
            });
        } catch (error) {
            res.status(500).render('error', { message: error.message });
        }
    }

    async renderProductDetail(req, res) {
        try {
            const product = await ProductService.getProductById(req.params.id);
            res.render('productDetail', { title: product.title, product });
        } catch (error) {
            res.status(404).render('error', { message: error.message });
        }
    }

    async renderCart(req, res) {
        try {
            const cart = await CartService.getCartById(req.params.id);
            res.render('cart', { title: 'Tu Carrito', cart });
        } catch (error) {
            res.status(404).render('error', { message: error.message });
        }
    }
}

export default new ViewController();