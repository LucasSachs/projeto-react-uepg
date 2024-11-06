import { Control, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface CurrencyInputProps {
    label: string;
    control: Control<any>;
    name: string;
    error?: string;
}

export function CurrencyInput({ label, control, name, error }: CurrencyInputProps) {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text font-normal">{label}</span>
            </div>

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <NumericFormat
                        {...field}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix="R$ "
                        placeholder="R$ 0,00"
                        className="input input-bordered w-full max-w-xs"
                        value={field.value || ''}
                        onValueChange={(values) => {
                            if (values.floatValue !== null && values.floatValue !== undefined) {
                                field.onChange(values.floatValue);
                            }
                        }}
                    />
                )}
            />

            {error && <label className="text-sm text-error font-normal">{error}</label>}
        </label>
    )
}
