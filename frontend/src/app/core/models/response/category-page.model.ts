import { Category } from './category.model';

export interface CategoryPage {
    content?: Category[];
    totalElements?: number;
}
