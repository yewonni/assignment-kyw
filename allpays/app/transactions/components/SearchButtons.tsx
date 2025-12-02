interface SearchButtonsProps {
  onSearch: () => void;
  onReset: () => void;
}

export default function SearchButtons({
  onSearch,
  onReset,
}: SearchButtonsProps) {
  return (
    <div className="flex gap-4 mt-6 justify-center text-sm">
      <button
        onClick={onReset}
        className="w-18 py-1 rounded-sm bg-gray-200 hover:bg-gray-300"
      >
        초기화
      </button>
      <button
        onClick={onSearch}
        className="w-18 py-1 rounded-sm bg-accent text-white hover:bg-hover"
      >
        검색
      </button>
    </div>
  );
}
