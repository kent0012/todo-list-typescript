import { ReactNode, FormEvent } from "react";

interface FormBoxProps {
  submitForm: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const FormBox = ({ submitForm, children }: FormBoxProps) => {
  return (
    <form onSubmit={submitForm}>
      {children}
    </form>
  );
};

export default FormBox;