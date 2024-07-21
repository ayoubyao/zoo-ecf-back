import { environment } from "@/environnement/environnement";
import { User } from "@/models/user";
import axios from "axios";

export class UserServices {
    static GetHeader() {
        const token = JSON.parse(localStorage.getItem('token') ?? '');
        const headers: any = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        return headers;
    }

    static async getUsers(): Promise<User[]> {
        let headers = UserServices.GetHeader();
        try {

            return await axios.get(`${environment.apiUrl}/utilisateur`,
                {
                    headers: headers,
                }).then((response) => {
                    const result: User[] = response.data;

                    const arrayEmpty: User[] = [];
                    if (result) {
                        return result
                    } else {
                        return arrayEmpty;
                    }

                });

        } catch (error) {
            console.error('Error while fetching utilisateurs:', error);
            throw error;
        }
    }

    static async getUser(id: number): Promise<User> {
        let headers = UserServices.GetHeader();
        try {

            return await axios.get(`${environment.apiUrl}/utilisateur/${id}`,
                {
                    headers: headers,
                }).then((response) => {
                    const result: User = response.data.user;

                    if (result) {
                        return result
                    } else {
                        return {} as User;
                    }

                });

        } catch (error) {
            console.error('Error while fetching utilisateur:', error);
            throw error;
        }
    }

    static async createUser(user: User): Promise<User> {
        let headers = UserServices.GetHeader();
        try {

            return await axios.post(`${environment.apiUrl}/utilisateur`, user,
                {
                    headers: headers,
                }).then((response) => {
                    const result: User = response.data;

                    if (result) {
                        return result
                    } else {
                        return {} as User;
                    }

                });

        } catch (error) {
            console.error('Error while creating utilisateur:', error);
            throw error;
        }
    }

    static async updateUser(user: User): Promise<User> {
        let headers = UserServices.GetHeader();
        try {

            return await axios.put(`${environment.apiUrl}/utilisateur`, user,
                {
                    headers: headers,
                }).then((response) => {
                    const result: User = response.data;

                    if (result) {
                        return result
                    } else {
                        return {} as User;
                    }

                });

        } catch (error) {
            console.error('Error while creating utilisateur:', error);
            throw error;
        }
    }

}