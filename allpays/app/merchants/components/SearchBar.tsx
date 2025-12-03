"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  onReset: () => void;
}

export default function SearchBar({ onSearch, onReset }: SearchBarProps) {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    onSearch(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleReset = () => {
    setInput("");
    onReset();
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="merchant-search" className="sr-only">
        가맹점 코드 검색
      </label>
      <input
        id="merchant-search"
        type="text"
        placeholder="가맹점 코드 입력"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-accent"
      />
      <button
        onClick={handleSearch}
        className="text-sm px-3 py-1 bg-accent text-white rounded-sm hover:bg-hover"
      >
        검색
      </button>
      <button
        onClick={handleReset}
        className="text-sm px-3 py-1 bg-gray-200 rounded-sm hover:bg-gray-300"
      >
        초기화
      </button>
    </div>
  );
}
