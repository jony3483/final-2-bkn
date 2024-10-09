import CartModel from "../models/cart.model.js";


class CartDAO {
    async crearCarrito() {
        const nuevoCarrito = new CartModel({ products: [] });
        return await nuevoCarrito.save();
    }

    async getCarritoById(cartId) {
        return await CartModel.findById(cartId).populate('products.product');
    }

    async obtenerCarritos() {
        return await CartModel.find();
    }

    async actualizarCarrito(cartId, productos) {
        return await CartModel.findByIdAndUpdate(cartId, { products: productos }, { new: true });
    }

    async eliminarTodosLosProductos(cartId) {
        return await CartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
    }
}


export default new CartDAO();