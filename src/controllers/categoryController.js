const Category = require('../models/category');
const FileHelper = require('../utils/fileHelper');
const path = require('path');

class CategoryController {
  constructor() {
    this.dataPath = path.join(__dirname, '..', 'data', 'categories.json');
    this.fileHelper = new FileHelper();
  }

  async createCategory(categoryData) {
    try {
      const categories = await this.getAllCategories();
      const existingCategory = categories.find(
        c => c.name.toLowerCase() === categoryData.name.toLowerCase()
      );

      if (existingCategory) {
        throw new Error(`Categoria "${categoryData.name}" já existe!`);
      }

      const newCategory = new Category(
        categoryData.name,
        categoryData.description
      );

      categories.push(newCategory);
      await this.fileHelper.writeJSON(this.dataPath, categories);

      console.log(`✅ Categoria "${newCategory.name}" criada com sucesso!`);
      return newCategory;
    } catch (error) {
      console.error('❌ Erro ao criar categoria:', error.message);
      throw error;
    }
  }

  async getAllCategories() {
    try {
      const categories = await this.fileHelper.readJSON(this.dataPath);
      return categories || [];
    } catch (error) {
      console.log('📂 Arquivo de categorias não encontrado, criando novo...');
      return [];
    }
  }

  async getCategoryById(id) {
    try {
      const categories = await this.getAllCategories();
      const category = categories.find(c => c.id === id);

      if (!category) {
        throw new Error(`Categoria com ID ${id} não encontrada`);
      }

      return category;
    } catch (error) {
      console.error('❌ Erro ao buscar categoria:', error.message);
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const categories = await this.getAllCategories();
      const categoryIndex = categories.findIndex(c => c.id === id);

      if (categoryIndex === -1) {
        throw new Error(`Categoria com ID ${id} não encontrada`);
      }

      const deletedCategory = categories.splice(categoryIndex, 1)[0];
      await this.fileHelper.writeJSON(this.dataPath, categories);

      console.log(`🗑 Categoria "${deletedCategory.name}" deletada!`);
      return deletedCategory;
    } catch (error) {
      console.error('❌ Erro ao deletar categoria:', error.message);
      throw error;
    }
  }
}

module.exports = CategoryController;
