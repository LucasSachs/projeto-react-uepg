import axios from "axios";
import { toastError } from "../helpers/toastHelper";
import { createNewProduct, productsInterface } from "../interface/products";

export async function getProducts() {
    const response = await axios.get("http://localhost:3000/product");
    return response.data as productsInterface[];
}

export async function createProduct(product: createNewProduct) {
    try {
        const response = await axios.post("http://localhost:3000/product", product);
        return response.data as productsInterface;
    } catch (error: any) {
        error.response.data.message.map((message: string) => {
            toastError(message);
        });
    }
}

export async function updateProduct(product: productsInterface) {
    try {
        const response = await axios.put(`http://localhost:3000/product/${product.id}`, product);
        return response.data as productsInterface;
    } catch (error: any) {
        error.response.data.message.map((message: string) => {
            toastError(message);
        });
    }
}

export async function deleteProduct(id: number) {
    try {
        const resopnse = await axios.delete(`http://localhost:3000/product/${id}`);
        return resopnse.data as productsInterface;
    } catch (error: any) {
        error.response.data.message.map((message: string) => {
            toastError(message);
        });
    }
}
