interface InputFieldProps {
  inputFieldValue: string;
  handleInputField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  inputFieldValue,
  handleInputField,
  type = "text",
  placeholder = "",
}) => {
  return (
      <input
        type={type}
        value={inputFieldValue}
        onChange={handleInputField}
        placeholder={placeholder}
        className="p-2 border rounded w-full"
      />
  );
};

export default InputField;
