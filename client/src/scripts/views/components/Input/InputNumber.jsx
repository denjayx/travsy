import React, { useEffect } from 'react';

const InputNumber = ({ id, value, onValueChange, placeholder }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onValueChange(inputValue);
  };

  // Gunakan useEffect untuk mengatur ulang nilai input saat komponen di-mount
  useEffect(() => {
    onValueChange('');
  }, []);

  return (
    <div className="relative">
      <input
        type="number"
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-white rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 w-full h-10" // Hapus padding kiri (pl-8)
      />
      {value && (
        <label
          className="block text-sm font-bold absolute top-2 left-2 text-gray-500"
          htmlFor={id}
        >
          {value}
        </label>
      )}
    </div>
  );
};

export default InputNumber;
