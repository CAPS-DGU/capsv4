import React from 'react';

const BatchSelect = () => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">기수</label>
    <select
      className="w-full h-10 text-base border-0 rounded-lg outline-none px-3 bg-gray-200"
      required
    >
      <option value="">비회원</option>
      {[...Array(38).keys()].reverse().map((_, index) => (
        <option key={index + 1} value={`${38 - index}기`}>
          {38 - index}기 {index === 0 && '(신입생)'}
        </option>
      ))}
    </select>
  </div>
);

export default BatchSelect;
