import { Category } from './category.model';
import { Geolocation } from './geolocation.model';

export interface CulturalOffer {
    id?: number;
    name?: string;
    category?: Category;
    geolocation?: Geolocation;
    description?: string;
    image?: string;
    averageMark?: number;
}
