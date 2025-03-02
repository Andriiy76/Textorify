// backend/src/shared/entities.ts
import { Entity, Fields } from 'remult';

@Entity('products', {
    allowApiCrud: true,
})
export class Product {
    @Fields.uuid()
    id!: string;

    @Fields.string()
    name = '';

    @Fields.number()
    unitPrice = 0;
}