import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { UseFormReset } from "react-hook-form";
import { createProduct } from "../data/products";
import { toastSuccess } from "../helpers/toastHelper";
import { createNewProduct, productsInterface } from "../interface/products";
import { CreateNewProductSchemaType } from "../Schemas/createNewProductSchema";
import { Modal } from "./Modal";
import { ProductForm } from "./ProductForm";

interface ModalAddProductProps {
    setProducts: Dispatch<SetStateAction<productsInterface[]>>;
}

export function ModalAddProduct({ setProducts }: ModalAddProductProps) {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleFormSubmit(data: CreateNewProductSchemaType, reset: UseFormReset<CreateNewProductSchemaType>) {
        const newProduct = await createProduct(data as createNewProduct);
        if(newProduct) {
            setProducts((prevProducts) => [...prevProducts, newProduct]);

            modalRef.current?.close();
            toastSuccess('Produto adicionado com sucesso!');

            reset();
        }
    }

    return (
        <Modal
            id='modalAdicionarProduto'
            trigger={<button className="btn btn-primary"><Plus />Adicionar novo produto</button>}
            width={672}
            ref={modalRef}
            loading={loading}
        >
            <ProductForm
                handleFormSubmit={handleFormSubmit}
                setLoading={setLoading}
            />
        </Modal>
    );
}