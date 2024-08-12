import React from 'react';

const PasswordInput = ({ label, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="password"
      placeholder={placeholder}
      className="w-full h-10 text-base border-0 rounded-lg outline-none px-3 bg-gray-200"
      required
    />
  </div>
);

export default PasswordInput;
