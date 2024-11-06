import clsx from "clsx";
import { UseFormRegister } from "react-hook-form";

interface TextAreaProps {
    label: string;
    register?: UseFormRegister<any>;
    name?: string;
    value?: string;
    readonly?: boolean;
    placeholder?: string;
    error?: string;
}

export function TextArea({ label, value, readonly, placeholder, name, register, error }: TextAreaProps) {
    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>

            <textarea
                className={clsx("textarea textarea-bordered h-24 resize-none", readonly && "focus:outline-none")}
                placeholder={placeholder}
                readOnly={readonly}
                {...(register && name && register(name))}
            >
                {value}
            </textarea>

            {error && <label className="text-sm text-error">{error}</label>}
        </label>
    );
}