import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../data/products";
import { formatCurrencyBRL } from "../helpers/currencyHelper";
import { toastError } from "../helpers/toastHelper";
import { productsInterface } from "../interface/products";
import { ModalAddProduct } from "./ModalAddProduct";
import { ModalEditProduct } from "./ModalEditProduct";
import { ModalExcludeProduct } from "./ModalExcludeProduct";
import { ModalViewProduct } from "./ModalViewProduct";

export function ProductList() {
    const [products, setProducts] = useState<productsInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        getProducts().then((productsData) => {
            setProducts(productsData);
        }).catch(() => {
            toastError('Houve um erro ao buscar os produtos, tente novamente mais tarde');
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center flex-grow items-center">
                <span className="loading loading-dots loading-md"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 flex-grow overflow-hidden">
            {products.length === 0 ? (
                <div className="flex flex-grow text-center">Nenhum produto disponível no momento, tente adicionar um novo usando o botão "Adicionar novo produto"</div>
            ) : (
                <div className="flex flex-col gap-2 overflow-y-auto flex-grow">            
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-md border-neutral p-2 flex justify-between items-center hover:bg-neutral transition-colors duration-300"
                        >
                            <div className="w-1/2 text-wrap truncate overflow-hidden text-ellipsis whitespace-nowrap flex">
                                <Dot />
                                {product.name}
                            </div>

                            <div className="text-success flex gap-1 font-semibold items-center">
                                {formatCurrencyBRL(product.value)}
                            </div>
                            
                            <div className="flex gap-3 items-center">
                                <ModalViewProduct product={product} />
                                <ModalEditProduct product={product} setProducts={setProducts} />
                                <ModalExcludeProduct
                                    product={product}
                                    setProducts={setProducts}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end">
                <ModalAddProduct setProducts={setProducts} />
            </div>
        </div>
    )
}
