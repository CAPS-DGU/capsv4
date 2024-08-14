import React from 'react';

const IdInput = ({ id, setId, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">아이디</label>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디"
        className="w-full h-10 text-base border-0 rounded-lg outline-none px-3 bg-gray-200"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default IdInput;
