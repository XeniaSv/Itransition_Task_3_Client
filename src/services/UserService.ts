import $api from '../http';
import {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }

    static async blockUser(id: string): Promise<AxiosResponse<string>> {
        return $api.post('/users/block', {id});
    }

    static async unblockUser(id: string): Promise<AxiosResponse<string>> {
        return $api.post('/users/unblock', {id});
    }

    static async deleteUser(id: string): Promise<AxiosResponse<string>> {
        return $api.post('/users/delete', {id});
    }
}
