import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <>
      <div>
        {label && (
          <label
            htmlFor={id}
            className="inline-block my-3 bg-gray-100 px-2  rounded"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          {...props}
          className={`w-full p-2 rounded-lg ${className}`}
        />
      </div>
    </>
  );
});

export default Input;
