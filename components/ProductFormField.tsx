import styles from "./ProductFormField.module.css";

type ProductFormFieldProps = {
  name: string;
  label: string;
  defaultValue: string;
  pending: boolean;
  error?: string;
  placeholder?: string;
  type?: "text" | "number";
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
};

export default function ProductFormField({
  name,
  label,
  defaultValue,
  pending,
  error,
  placeholder,
  type = "text",
  min,
  max,
  step,
  helpText,
}: ProductFormFieldProps) {
  const errorId = `${name}-error`;
  const helpId = `${name}-help`;

  const describedBy =
    [helpText ? helpId : undefined, error ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        placeholder={placeholder}
        readOnly={pending}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        required
      />
      {helpText && <small id={helpId}>{helpText}</small>}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
