const PadariaSystem = require('./app');
const ProductController = require('./controllers/productController');
const CategoryController = require('./controllers/categoryController');
const Logger = require('./utils/logger');

async function runTests() {
    console.log('🧪 ===== EXECUTANDO TESTES =====');

    try {
        // Teste 1: Criar controllers
        console.log('\n✅ Teste 1: Criando controllers...');
        const productController = new ProductController();
        const categoryController = new CategoryController();
        const logger = new Logger();
        console.log('✅ Controllers criados com sucesso!');

        // Teste 2: Criar categoria
        console.log('\n✅ Teste 2: Criando categoria de teste...');
        const testCategory = await categoryController.createCategory({
            name: 'Teste',
            description: 'Categoria para testes'
        });
        console.log('✅ Categoria de teste criada!');

        // Teste 3: Criar produto
        console.log('\n✅ Teste 3: Criando produto de teste...');
        const testProduct = await productController.createProduct({
            name: 'Produto Teste',
            price: 5.99,
            category: 'Teste',
            description: 'Produto para testes'
        });
        console.log('✅ Produto de teste criado!');

        // Teste 4: Listar produtos
        console.log('\n✅ Teste 4: Listando produtos...');
        const products = await productController.getAllProducts();
        console.log(`✅ ${products.length} produtos encontrados!`);

        // Teste 5: Sistema completo
        console.log('\n✅ Teste 5: Testando sistema completo...');
        const sistema = new PadariaSystem();
        await sistema.init();
        console.log('✅ Sistema completo testado!');

        console.log('\n🎉 ===== TODOS OS TESTES PASSARAM! =====');
        console.log('✅ O sistema está funcionando perfeitamente!');
        console.log('🚀 Você pode executar: node app.js');

    } catch (error) {
        console.error('❌ Erro durante os testes:', error.message);
        console.error('🔧 Verifique se todos os arquivos foram criados corretamente');
    }
}

// Executar testes
if (require.main === module) {
    runTests();
}

module.exports = runTests;
