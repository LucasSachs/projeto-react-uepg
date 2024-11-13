import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm, UseFormReset } from "react-hook-form";
import { createNewProductSchema, CreateNewProductSchemaType } from "../Schemas/createNewProductSchema";
import { CurrencyInput } from "./CurrencyInput";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

interface ProductFormProps {
    handleFormSubmit(data: CreateNewProductSchemaType, reset?: UseFormReset<CreateNewProductSchemaType>): Promise<void>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    defaultValues?: CreateNewProductSchemaType;
}

export function ProductForm({ handleFormSubmit, setLoading, defaultValues }: ProductFormProps) {
    const { handleSubmit, register, reset, control, formState: { errors, isSubmitting } } = useForm<CreateNewProductSchemaType>({
        resolver: zodResolver(createNewProductSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            value: defaultValues?.value || '',
            description: defaultValues?.description || '',
        }
    });

    setLoading(isSubmitting);
    async function onSubmit(data: CreateNewProductSchemaType) {
        await handleFormSubmit(data, reset);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
    );
}