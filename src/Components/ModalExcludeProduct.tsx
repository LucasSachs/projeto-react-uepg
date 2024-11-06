import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { deleteProduct } from "../data/products";
import { formatCurrencyBRL } from "../helpers/currencyHelper";
import { toastSuccess } from "../helpers/toastHelper";
import { productsInterface } from "../interface/products";
import { Modal } from "./Modal";

interface ModalExcludeProductProps {
    product: productsInterface;
    setProducts: Dispatch<SetStateAction<productsInterface[]>>
}

export function ModalExcludeProduct({ product, setProducts }: ModalExcludeProductProps) {
    async function handleExcludeProduct() {
        const response = await deleteProduct(product.id);
        if(response) {
            setProducts((prevState) => prevState.filter((p) => p.id !== product.id));
            toastSuccess('Produto removido com sucesso!')
        }
    }

    return (
        <Modal
            id={`modalExcluir_${product.id}`}
            trigger={<Trash2 className="cursor-pointer hover:text-error" />}
            width={600}
        >   
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg">Remover produto</h3>
                <span>Deseja mesmo remover o produto <span className="font-semibold text-primary">{product.name}</span>, no valor de <span className="font-semibold text-success">{formatCurrencyBRL(product.value)}</span>? Essa ação não poderá ser desfeita.</span>

                <div className="flex gap-4 pt-2 justify-center">
                    <form method="dialog">
                        <button className="btn">Cancelar</button>
                    </form>

                    <button
                        className="btn btn-error"
                        onClick={handleExcludeProduct}
                    >
                        Remover
                    </button>
                </div>
            </div>
        </Modal>
    );
}