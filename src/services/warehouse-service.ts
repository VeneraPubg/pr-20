import { ID } from '../domain/entities';
import { IProductRepository, IStockRepository } from '../domain/repositories';

// ==========================================
// 4. БИЗНЕС-ЛОГИКА (Services)
// Принцип D: Сервис зависит от интерфейсов, а не от классов БД
// Принцип S: Сервис занимается только логикой склада
// ==========================================

export class WarehouseService {
    constructor(
        private readonly productRepo: IProductRepository,
        private readonly stockRepo: IStockRepository
    ) {}

    async moveProduct(productId: ID, fromZoneId: ID, toZoneId: ID, quantity: number): Promise<void> {
        const product = await this.productRepo.findById(productId);
        if (!product) {
            throw new Error(`Товар с ID ${productId} не найден`);
        }

        console.log(`Начинаем перемещение ${quantity} ${product.unit} товара "${product.name}"`);

        await this.stockRepo.transferStock(productId, fromZoneId, toZoneId, quantity);

        console.log("Перемещение успешно завершено.");
    }

    async getProductStockInfo(productId: ID): Promise<void> {
        const product = await this.productRepo.findById(productId);
        if (!product) return;

        console.log(`Остатки для ${product.name}: запрос к БД...`);
    }
}
