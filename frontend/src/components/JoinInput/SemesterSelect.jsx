import React from 'react';

const SemesterSelect = ({ semester, setSemester, error }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium">기수</label>
      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
        required
      >
        <option value="">비회원</option>
        {[...Array(38).keys()].reverse().map((_, index) => (
          <option key={index + 1} value={`${38 - index}`}>
            {38 - index}기 {index === 0 ? '(신입생)' : ''}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SemesterSelect;
