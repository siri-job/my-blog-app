import React, { useId } from "react";

function Select(
  { label, className = "", options = ["active", "inactive"], ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="inline-block my-3 bg-gray-100 px-2 rounded"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={`w-full p-2 rounded-lg ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
