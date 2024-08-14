import React from 'react';

const EmailInput = ({ email, setEmail, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">이메일</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="w-full h-10 text-base border-0 rounded-lg outline-none px-3 bg-gray-200"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default EmailInput;
