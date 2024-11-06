import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "../data/products";
import { toastSuccess } from "../helpers/toastHelper";
import { createNewProduct, productsInterface } from "../interface/products";
import { createNewProductSchema, CreateNewProductSchemaType } from "../Schemas/createNewProductSchema";
import { CurrencyInput } from "./CurrencyInput";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { TextArea } from "./TextArea";

interface ModalAddProductProps {
    setProducts: Dispatch<SetStateAction<productsInterface[]>>;
}

export function ModalAddProduct({ setProducts }: ModalAddProductProps) {
    const modalRef = useRef<HTMLDialogElement>(null);
    const { handleSubmit, register, reset, control, formState: { errors, isSubmitting } } = useForm<CreateNewProductSchemaType>({
        resolver: zodResolver(createNewProductSchema),
        defaultValues: {
            name: '',
            value: '',
            description: ''
        }
    });

    async function handleFormSubmit(data: CreateNewProductSchemaType) {
        const newProduct = await createProduct(data as createNewProduct);
        if(newProduct) {
            setProducts((prevProducts) => [ ...prevProducts, newProduct ]);

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
            loading={isSubmitting}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <Input
                                label="Produto"
                                placeholder="Nome do produto"
                                register={register}
                                name="name"
                                error={errors.name?.message}
                            />
                        </div>

                        <div className="w-1/2 text-success font-semibold">
                            <CurrencyInput 
                                label="Valor"
                                control={control}
                                name="value"
                                error={errors.value?.message}
                            />
                        </div>
                    </div>

                    <TextArea
                        label="Descrição"
                        placeholder="Descrição do produto"
                        register={register}
                        name="description"
                        error={errors.description?.message}
                    />

                    <div className="flex justify-end gap-4 pt-4">
                        <form method="dialog">
                            <button className="btn">Cancelar</button>
                        </form>

                        <button type="submit" className="btn btn-primary">Adicionar</button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}