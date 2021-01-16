import { News } from './news.model';

export interface NewsPage {
    content?: News[];
    totalElements?: number;
}
