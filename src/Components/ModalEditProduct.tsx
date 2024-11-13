import { Pen } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { updateProduct } from "../data/products";
import { toastSuccess } from "../helpers/toastHelper";
import { productsInterface } from "../interface/products";
import { CreateNewProductSchemaType } from "../Schemas/createNewProductSchema";
import { Modal } from "./Modal";
import { ProductForm } from "./ProductForm";

interface ModalEditProductProps {
    product: productsInterface;
    setProducts: Dispatch<SetStateAction<productsInterface[]>>;
}

export function ModalEditProduct({ product, setProducts }: ModalEditProductProps) {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleFormSubmit(data: CreateNewProductSchemaType) {
        const newProduct = await updateProduct({
            id: product.id,
            ...data
        } as productsInterface);

        if(newProduct) {
            setProducts((prevProducts) => prevProducts.map((p) => (p.id === newProduct.id ? newProduct : p)));

            modalRef.current?.close();
            toastSuccess('Produto atualizado com sucesso!');
        }
    }

    return (
        <Modal
            id={`modalAlterarProduto_${product.id}`}
            trigger={<Pen className="hover:text-warning" />}
            width={672}
            ref={modalRef}
            loading={loading}
        >
            <ProductForm
                handleFormSubmit={handleFormSubmit}
                setLoading={setLoading}
                defaultValues={{
                    name: product.name,
                    value: String(product.value),
                    description: product.description
                }}
            />
        </Modal>
    )
}