import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";

const endpoint = "http://localhost:3333"

export async function fetchData(path: string, method: string, body?: Object, useToken?: boolean) {
    try {
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        if(token !== 'undefined') {
            headers['Authorization'] = 'Bearer ' + token;
        }
        return fetch(endpoint + path, {
            method,
            headers,
            ...(body && method !== 'GET' ? {body: JSON.stringify(body)} : {}),
        })
        .then(response => {
            if(response.status === 401 || response.status === 403) {
                showMessage({
                    message: 'Session expirée',
                    type: 'danger',
                    icon: 'danger',
                });
                router.push({ pathname: '/login' });
            }
            return response.json()
        })
        .catch(error => {
            return showMessage({
                message: 'Erreur',
                description: error.message,
                type: 'danger',
                icon: 'danger',
            });
        });
    } catch (e: any) {
        console.error('FETCH ERROR', e)
        const error = JSON.parse(e);
        showMessage({
            message: 'Erreur',
            description: error.message,
            type: 'danger',
            icon: 'danger',
        });
        return error;
    }

}
