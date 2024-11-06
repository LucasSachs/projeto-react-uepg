import clsx from "clsx";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
    label: string;
    value?: string;
    readonly?: boolean;
    placeholder?: string;
    name?: string;
    register?: UseFormRegister<any>;
    error?: string;
}

export function Input({ label, value, readonly, placeholder, name, register, error }: InputProps) {
    return (
        <>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-normal">{label}</span>
                </div>

                <input
                    type="text"
                    value={value}
                    className={clsx("input input-bordered w-full max-w-xs", readonly && "focus:outline-none")}
                    placeholder={placeholder}
                    readOnly={readonly}
                    {...(register && name && register(name))}
                />

                {error && <label className="text-sm text-error">{error}</label>}
            </label>
        </>
    )
}
