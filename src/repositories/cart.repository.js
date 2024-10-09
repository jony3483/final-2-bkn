
import CartDAO from "../dao/cart.dao.js";
import CartDTO from "../dto/cart.dto.js";
import CartModel from "../models/cart.model.js";

class CartRepository {
    async crearCarrito() {
        const newCart = new CartModel({ products: [] });
        return await newCart.save();
    }

    async getCarritoById(cartId) {
        const cart = await CartDAO.getCarritoById(cartId);
        return new CartDTO(cart);
    }

    async updateCarrito(cartId, updateData) {
        return await CartModel.findByIdAndUpdate(cartId, updateData, { new: true });
    }

    async obtenerCarritos() {
        const carts = await CartDAO.obtenerCarritos();
        return carts.map(cart => new CartDTO(cart));
    }

    async actualizarCarrito(cartId, productos) {
        const cart = await CartDAO.actualizarCarrito(cartId, productos);
        return new CartDTO(cart);
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        const cart = await this.getCarritoById(cartId);
        const existeProducto = cart.products.find(item => item.productId === productId);

        if (existeProducto) {
            existeProducto.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        return await this.actualizarCarrito(cartId, cart.products);
    }

    async eliminarProductoDelCarrito(cartId, productId) {
        const cart = await this.getCarritoById(cartId);
        cart.products = cart.products.filter(item => item.productId !== productId);
        return await this.actualizarCarrito(cartId, cart.products);
    }
}


export default new CartRepository();