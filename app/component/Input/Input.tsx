const inputTypes = ["text", "password", "email", "number", "file"];

interface InputProps {
  type?: (typeof inputTypes)[number];
  placeholder?: string;
  title: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  accept?: string;
  id?: string;
}

export const Input = ({
  className,
  type,
  placeholder,
  title,
  accept,
  disabled,
  id,
  onChange,
  value,
}: InputProps) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-primary focus-within:ring-1 focus-within:ring-blue-primary h-12"
      >
        <input
          type={type || "text"}
          id={id}
          className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full h-12 pl-2"
          placeholder={placeholder || ""}
          value={value}
          onChange={onChange}
          disabled={disabled}
          accept={accept}
        />

        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          {title}
        </span>
      </label>
    </div>
  );
};
