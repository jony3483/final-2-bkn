import ProductDAO from "../dao/product.dao.js";
import ProductDTO from "../dto/product.dto.js";
import ProductModel from "../models/product.model.js";

class ProductRepository {
    async addProduct(productData) {
        const product = await ProductDAO.create(productData);
        return new ProductDTO(product);
    }

    async getProducts(filter = {}, options = {}) {
        const result = await ProductDAO.getAll(filter, options);
        result.docs = result.docs.map(doc => new ProductDTO(doc));
        return result;
    }

    async getProductById(id) {
        const product = await ProductDAO.getById(id);
        return product ? new ProductDTO(product) : null;
    }

    async updateProduct(id, updatedFields) {
        const product = await ProductDAO.update(id, updatedFields);
        return product ? new ProductDTO(product) : null;
    }

    async deleteProduct(id) {
        const product = await ProductDAO.delete(id);
        return product ? new ProductDTO(product) : null;
    }

    async getProductById(productId) {
        return await ProductModel.findById(productId);
    }

    async updateProduct(productId, updateData) {
        return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    }
}

export default new ProductRepository();