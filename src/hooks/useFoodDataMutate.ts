import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8081";

// Criar Data
const postData = async (data: FoodData): AxiosPromise<unknown> => {
    const response = await axios.post(API_URL + '/food', data);
    return response;
}

// Editar Data
const putData = async (data: FoodData): AxiosPromise<unknown> => {
    const response = await axios.put(`${API_URL}/food/${data.id}`, data);
    return response;
}

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:['food-data']})
        }
    });

    const editMutation = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['food-data']});
        }
    });

    return { createMutation, editMutation };
}


    
