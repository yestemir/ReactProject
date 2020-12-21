import { User } from './User'; 

export interface Comment {
    author: User;
    text: string;
    productId: number;
}

export const comments: Comment[] = [
    {
        author: {
            id: 1,
            name: "Dino",
            email: "test@gmail.com",
            password: "aaa",
            basket: []
        },
        text: "Great!",
        productId: 1,
    },
    {
        author: {
            id: 2,
            name: "U.",
            email: "test2@gmail.com",
            password: "aaa",
            basket: []
        },
        text: "Perfect!",
        productId: 2,
    }
]