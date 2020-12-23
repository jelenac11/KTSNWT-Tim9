import { Comment } from './comment.model';

export interface CommentPage {
    content?: Comment[];
    totalElements?: number;
}
