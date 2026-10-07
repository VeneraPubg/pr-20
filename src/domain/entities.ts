// ==========================================
// 1. ДОМЕННЫЕ СУЩНОСТИ (Entities)
// ==========================================

export type ID = string | number;
export type Status = 'new' | 'processed' | 'cancelled';

// --- Блок Категорий и Товаров (Синий) ---

export class Category {
    constructor(
        public readonly id: ID,
        public name: string,
        public parentId?: ID // FK на саму себя
    ) {}
}

export class Product {
    constructor(
        public readonly id: ID,
        public name: string,
        public unit: string, // ед. изм.
        public categoryId: ID // FK на Category
    ) {}
}

// --- Блок Поставок и Поставщиков (Зеленый) ---

export class Supplier {
    constructor(
        public readonly id: ID,
        public name: string,
        public inn: string, // ИНН
        public contact: string
    ) {}
}

export class Supply {
    constructor(
        public readonly id: ID,
        public supplierId: ID, // FK на Supplier
        public date: Date,
        public number: string, // Номер поставки
        public status: Status
    ) {}
}

export class SupplyItem {
    constructor(
        public readonly id: ID,
        public supplyId: ID, // FK на Supply
        public productId: ID, // FK на Product
        public qty: number,
        public price: number
    ) {}
}

// --- Блок Склада и Движений (Коричневый/Бордовый) ---

export class Zone {
    constructor(
        public readonly id: ID,
        public name: string,
        public type: string, // тип зоны
        public warehouseId: ID
    ) {}
}

export class Stock {
    constructor(
        public readonly productId: ID, // PK, FK на Product
        public readonly zoneId: ID,     // PK, FK на Zone
        public qty: number
    ) {}
}

export class Movement {
    constructor(
        public readonly id: ID,
        public date: Date,
        public fromZoneId: ID, // FK на Zone (Откуда)
        public toZoneId: ID,   // FK на Zone (Куда)
        public qty: number
    ) {}
}
