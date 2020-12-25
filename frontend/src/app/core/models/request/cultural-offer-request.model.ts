import { GeolocationRequest } from './geolocation-request.model';

export interface CulturalOfferRequest {
    name: string;
    category: number;
    geolocation: GeolocationRequest;
    description: string;
    admin: number;
}
