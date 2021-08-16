import { useRef } from "react";

function FormInput({ label, name, ...rest }) {
  const amountInputRef = useRef();

  const doSelectAmount = () => amountInputRef.current.select();

  return (
    <div className={`FormInput`}>
      <label htmlFor={name} className={"FormInput__label"}>
        {label}
      </label>
      <input
        id={name}
        className={"FormInput__control"}
        ref={amountInputRef}
        onFocus={doSelectAmount}
        {...rest}
      />
    </div>
  );
}

FormInput.defaultProps = {};

export default FormInput;
