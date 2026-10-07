import { Product, Stock, Movement, ID } from '../domain/entities';
import { IProductRepository, IStockRepository } from '../domain/repositories';

// ==========================================
// 3. РЕАЛИЗАЦИЯ (Infrastructure Layer)
// Принцип L: Взаимозаменяемость реализаций
// ==========================================

export class InMemoryProductRepository implements IProductRepository {
    private products: Product[] = [];

    async findById(id: ID): Promise<Product | null> {
        return this.products.find(p => p.id === id) || null;
    }
    async findAll(): Promise<Product[]> {
        return this.products;
    }
    async create(item: Product): Promise<void> {
        this.products.push(item);
    }
    async update(item: Product): Promise<void> {
        const index = this.products.findIndex(p => p.id === item.id);
        if (index > -1) this.products[index] = item;
    }
    async delete(id: ID): Promise<void> {
        this.products = this.products.filter(p => p.id !== id);
    }
    async findByCategory(categoryId: ID): Promise<Product[]> {
        return this.products.filter(p => p.categoryId === categoryId);
    }
}

export class InMemoryStockRepository implements IStockRepository {
    private stocks: Stock[] = [];
    private movements: Movement[] = [];

    async transferStock(productId: ID, fromZoneId: ID, toZoneId: ID, qty: number): Promise<void> {
        const fromStock = this.stocks.find(s => s.productId === productId && s.zoneId === fromZoneId);

        if (!fromStock || fromStock.qty < qty) {
            throw new Error("Недостаточно товара на складе-источнике");
        }

        fromStock.qty -= qty;

        let toStock = this.stocks.find(s => s.productId === productId && s.zoneId === toZoneId);
        if (!toStock) {
            toStock = new Stock(productId, toZoneId, 0);
            this.stocks.push(toStock);
        }
        toStock.qty += qty;

        const movement = new Movement(
            Date.now().toString(),
            new Date(),
            fromZoneId,
            toZoneId,
            qty
        );
        this.movements.push(movement);
    }

    async getStock(productId: ID, zoneId: ID): Promise<Stock | null> {
        return this.stocks.find(s => s.productId === productId && s.zoneId === zoneId) || null;
    }

    async updateStock(stock: Stock): Promise<void> {
        const index = this.stocks.findIndex(s => s.productId === stock.productId && s.zoneId === stock.zoneId);
        if (index > -1) {
            this.stocks[index] = stock;
        } else {
            this.stocks.push(stock);
        }
    }
}
