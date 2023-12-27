import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createPost, createUserAccount, signInAccount, signOutAccount } from '../appwrite/api'
import { INewPost, INewUser } from '@/types'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    });
}

export const useSignAccount = () => {
    return useMutation({
        mutationFn: (user: { 
            email: string; 
            password: string;
        }) => signInAccount(user),
    });
}
 export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    });
}

export const useCreatePost = () => {
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post)
    });
}