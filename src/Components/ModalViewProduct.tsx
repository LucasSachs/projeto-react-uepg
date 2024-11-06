import { Eye } from "lucide-react";
import { formatCurrencyBRL } from "../helpers/currencyHelper";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { productsInterface } from "./ProductList";
import { TextArea } from "./TextArea";

interface ModalViewProductProps {
    product: productsInterface
}

export function ModalViewProduct({ product }: ModalViewProductProps) {
    return (
        <Modal
            id={`modalProduto_${product.id}`}
            trigger={<Eye className="hover:text-primary" />}
            width={672}
        >
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <div className="w-1/2">
                            <Input 
                                label="Produto"
                                value={product.name}
                                readonly
                            />
                        </div>

                        <div className="w-1/2 text-success font-semibold">
                            <Input
                                label="Valor"
                                value={formatCurrencyBRL(product.value)}
                                readonly
                            />
                    </div>
                </div>

                <TextArea
                    label="Descrição"
                    value={product.description}
                    readonly
                />
            </div>

            <div className="modal-action">
                <form method="dialog">
                    <button className="btn">Fechar</button>
                </form>
            </div>
        </Modal>
    );
}