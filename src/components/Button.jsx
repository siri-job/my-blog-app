import React from "react";

function Button({
  type = "button",
  buttonText = "Submit",
  className = "",
  ...props
}) {
  return (
    <div>
      <button
        className={`w-full bg-blue-500 mt-4 text-white p-2  rounded-lg ${className}`}
        {...props}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Button;
