import React from 'react';

const PasswordInput = ({ label, password, setPassword, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={label}
        className="w-full h-10 text-base border-0 rounded-lg outline-none px-3 bg-gray-200"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PasswordInput;
