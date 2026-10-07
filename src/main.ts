import { Product, Stock } from './domain/entities';
import { InMemoryProductRepository, InMemoryStockRepository } from './infrastructure/in-memory-repositories';
import { WarehouseService } from './services/warehouse-service';

// ==========================================
// 5. ПРИМЕР ИСПОЛЬЗОВАНИЯ (Dependency Injection)
// ==========================================

(async () => {
    const productRepo = new InMemoryProductRepository();
    const stockRepo = new InMemoryStockRepository();

    const warehouseService = new WarehouseService(productRepo, stockRepo);

    const categoryId = "cat-1";
    const product = new Product("prod-1", "Монитор", "шт", categoryId);
    await productRepo.create(product);

    const zoneA = "zone-A";
    const zoneB = "zone-B";

    await stockRepo.updateStock(new Stock(product.id, zoneA, 100));
    await stockRepo.updateStock(new Stock(product.id, zoneB, 0));

    try {
        await warehouseService.moveProduct(product.id, zoneA, zoneB, 10);

        const stockA = await stockRepo.getStock(product.id, zoneA);
        const stockB = await stockRepo.getStock(product.id, zoneB);

        console.log(`Остаток в Зоне А: ${stockA?.qty}`); // Должно быть 90
        console.log(`Остаток в Зоне Б: ${stockB?.qty}`); // Должно быть 10

    } catch (error) {
        console.error("Ошибка операции:", error);
    }
})();
