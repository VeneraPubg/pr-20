import { Product, Supply, SupplyItem, Movement, Stock, ID } from './entities';

// ==========================================
// 2. АБСТРАКЦИИ (Interfaces)
// Принцип D: Зависимость от абстракций
// Принцип I: Разделение интерфейсов
// ==========================================

export interface IReadRepository<T> {
    findById(id: ID): Promise<T | null>;
    findAll(): Promise<T[]>;
}

export interface IWriteRepository<T> {
    create(item: T): Promise<void>;
    update(item: T): Promise<void>;
    delete(id: ID): Promise<void>;
}

export interface IProductRepository extends IReadRepository<Product>, IWriteRepository<Product> {
    findByCategory(categoryId: ID): Promise<Product[]>;
}

export interface ISupplyRepository extends IReadRepository<Supply>, IWriteRepository<Supply> {
    addItemToSupply(item: SupplyItem): Promise<void>;
}

export interface IMovementRepository extends IReadRepository<Movement>, IWriteRepository<Movement> {
    getMovementsByPeriod(start: Date, end: Date): Promise<Movement[]>;
}

export interface IStockRepository {
    getStock(productId: ID, zoneId: ID): Promise<Stock | null>;
    updateStock(stock: Stock): Promise<void>;
    transferStock(productId: ID, fromZoneId: ID, toZoneId: ID, qty: number): Promise<void>;
}
