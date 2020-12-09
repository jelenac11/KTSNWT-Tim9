import { CategoryRequest } from './category-request.model';
import { GeolocationRequest } from './geolocation-request.model';

export interface CulturalOfferRequest {
    name: string,
    category: number,
    geolocation: GeolocationRequest,
    description: string,
    averageMark: number,
    admin: number
}