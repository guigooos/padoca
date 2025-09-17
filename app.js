const ProductController = require('./controllers/productController');
const CategoryController = require('./controllers/categoryController');
const Logger = require('./utils/logger');

class PadariaSystem {
    constructor() {
        this.productController = new ProductController();
        this.categoryController = new CategoryController();
        this.logger = new Logger();
    }

    // Inicializar sistema
    async init() {
        try {
            console.log('\n🍞 ===== SISTEMA DA PADARIA =====');
            console.log('💻 Inicializando sistema...');

            await this.logger.info('Sistema da Padaria iniciado');

            // Criar categorias padrão
            await this.createDefaultCategories();

            // Criar produtos de exemplo
            await this.createSampleProducts();

            // Demonstrar funcionalidades
            await this.demonstrateFeatures();

            console.log('\n✅ Sistema inicializado com sucesso!');
        } catch (error) {
            await this.logger.error('Erro ao inicializar sistema', { error: error.message });
            console.error('❌ Erro ao inicializar:', error.message);
        }
    }

    // Criar categorias padrão
    async createDefaultCategories() {
        console.log('\n📂 Criando categorias padrão...');

        const defaultCategories = [
            { name: 'Pães', description: 'Pães frescos e artesanais' },
            { name: 'Doces', description: 'Doces e sobremesas deliciosas' },
            { name: 'Salgados', description: 'Salgados assados e fritos' },
            { name: 'Bebidas', description: 'Bebidas quentes e frias' }
        ];

        for (const categoryData of defaultCategories) {
            try {
                await this.categoryController.createCategory(categoryData);
                await this.logger.success(`Categoria criada: ${categoryData.name}`);
            } catch (error) {
                if (error.message.includes('já existe')) {
                    console.log(`⚠️ Categoria "${categoryData.name}" já existe`);
                } else {
                    await this.logger.error(`Erro ao criar categoria ${categoryData.name}`, { error: error.message });
                }
            }
        }
    }

    // Criar produtos de exemplo
    async createSampleProducts() {
        console.log('\n🍪 Criando produtos de exemplo...');

        const sampleProducts = [
            { name: 'Pão Francês', price: 0.50, category: 'Pães', description: 'Pão francês fresquinho' },
            { name: 'Pão de Açúcar', price: 4.50, category: 'Pães', description: 'Pão doce macio' },
            { name: 'Brigadeiro', price: 2.00, category: 'Doces', description: 'Brigadeiro tradicional' },
            { name: 'Coxinha', price: 3.50, category: 'Salgados', description: 'Coxinha de frango' },
            { name: 'Café Expresso', price: 2.50, category: 'Bebidas', description: 'Café expresso forte' }
        ];

        for (const productData of sampleProducts) {
            try {
                await this.productController.createProduct(productData);
                await this.logger.success(`Produto criado: ${productData.name}`);
            } catch (error) {
                await this.logger.error(`Erro ao criar produto ${productData.name}`, { error: error.message });
            }
        }
    }

    // Demonstrar funcionalidades
    async demonstrateFeatures() {
        console.log('\n🛠️ Demonstrando funcionalidades...');

        try {
            // Listar todos os produtos
            console.log('\n📦 Todos os produtos:');
            const allProducts = await this.productController.getAllProducts();
            allProducts.forEach(product => {
                console.log(` • ${product.name} – R$ ${product.price.toFixed(2)} (${product.category})`);
            });

            // Listar todas as categorias
            console.log('\n📂 Todas as categorias:');
            const allCategories = await this.categoryController.getAllCategories();
            allCategories.forEach(category => {
                console.log(` • ${category.name}: ${category.description}`);
            });

            // Buscar produtos por categoria
            console.log('\n🥖 Produtos da categoria "Pães":');
            const paes = await this.productController.getProductsByCategory('Pães');
            paes.forEach(product => {
                console.log(` • ${product.name} – R$ ${product.price.toFixed(2)}`);
            });

            // Demonstrar atualização de produto
            if (allProducts.length > 0) {
                const firstProduct = allProducts[0];
                console.log(`\n🔄 Atualizando produto "${firstProduct.name}"...`);
                await this.productController.updateProduct(firstProduct.id, {
                    price: firstProduct.price + 0.10
                });
            }

            await this.logger.success('Demonstração concluída com sucesso');
        } catch (error) {
            await this.logger.error('Erro durante demonstração', { error: error.message });
            console.error('❌ Erro durante demonstração:', error.message);
        }
    }

    // Exibir menu interativo
    async showMenu() {
        console.log('\n📋 ===== MENU DO SISTEMA =====');
        console.log('1. Listar todos os produtos');
        console.log('2. Listar todas as categorias');
        console.log('3. Buscar produtos por categoria');
        console.log('4. Criar novo produto');
        console.log('5. Criar nova categoria');
        console.log('6. Ver logs do sistema');
        console.log('0. Sair');
        console.log('==============================');
    }
}

// Função principal
async function main() {
    const sistema = new PadariaSystem();
    await sistema.init();

    // Exibir menu
    await sistema.showMenu();

    console.log('\n🙏 Obrigado por usar o Sistema da Padaria!');
    console.log('ℹ️ Para interação completa, implemente readline para menu interativo');
}

// Executar apenas se for o arquivo principal
if (require.main === module) {
    main().catch(error => {
        console.error('❌ Erro fatal:', error.message);
        process.exit(1);
    });
}

module.exports = PadariaSystem;
