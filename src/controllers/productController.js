const Product = require('../models/Product');
const FileHelper = require('../utils/fileHelper');
const path = require('path');

class ProductController {
  constructor() {
    this.dataPath = path.join(__dirname, '..', 'data', 'products.json');
    this.fileHelper = new FileHelper();
  }

  async createProduct(productData) {
    try {
      const products = await this.getAllProducts();
      const newProduct = new Product(
        productData.name,
        productData.price,
        productData.category,
        productData.description
      );

      products.push(newProduct);
      await this.fileHelper.writeJSON(this.dataPath, products);

      console.log(`✅ Produto "${newProduct.name}" criado com sucesso!`);
      return newProduct;
    } catch (error) {
      console.error('❌ Erro ao criar produto:', error.message);
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await this.fileHelper.readJSON(this.dataPath);
      return products || [];
    } catch (error) {
      console.log('📂 Arquivo de produtos não encontrado, criando novo...');
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getAllProducts();
      const product = products.find(p => p.id === id);

      if (!product) {
        throw new Error(`Produto com ID ${id} não encontrado`);
      }

      return product;
    } catch (error) {
      console.error('❌ Erro ao buscar produto:', error.message);
      throw error;
    }
  }

  async updateProduct(id, updateData) {
    try {
      const products = await this.getAllProducts();
      const productIndex = products.findIndex(p => p.id === id);

      if (productIndex === -1) {
        throw new Error(`Produto com ID ${id} não encontrado`);
      }

      products[productIndex] = { ...products[productIndex], ...updateData };
      await this.fileHelper.writeJSON(this.dataPath, products);

      console.log(`✅ Produto "${products[productIndex].name}" atualizado!`);
      return products[productIndex];
    } catch (error) {
      console.error('❌ Erro ao atualizar produto:', error.message);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getAllProducts();
      const productIndex = products.findIndex(p => p.id === id);

      if (productIndex === -1) {
        throw new Error(`Produto com ID ${id} não encontrado`);
      }

      const deletedProduct = products.splice(productIndex, 1)[0];
      await this.fileHelper.writeJSON(this.dataPath, products);

      console.log(`🗑 Produto "${deletedProduct.name}" deletado!`);
      return deletedProduct;
    } catch (error) {
      console.error('❌ Erro ao deletar produto:', error.message);
      throw error;
    }
  }

  async getProductsByCategory(categoryName) {
    try {
      const products = await this.getAllProducts();
      return products.filter(
        p => p.category.toLowerCase() === categoryName.toLowerCase()
      );
    } catch (error) {
      console.error('❌ Erro ao buscar produtos por categoria:', error.message);
      throw error;
    }
  }
}

module.exports = ProductController;
