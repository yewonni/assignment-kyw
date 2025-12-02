interface SearchFiltersProps {
  onSearch: () => void;
  onReset: () => void;
}

export default function SearchFilters({
  onSearch,
  onReset,
}: SearchFiltersProps) {
  const cellClass =
    "bg-gray-100 border-b border-gray-300 border-r p-4 flex items-center";
  const contentClass = "border-b border-gray-300 p-4 flex items-center";
  const inputClass =
    "p-1 pl-2 rounded-md border border-gray-300 max-w-xs w-full focus:outline-none";
  const selectClass =
    "p-2 rounded-md border border-gray-300 max-w-[140px] w-full";

  return (
    <section className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <h2 className="sr-only">검색 조건</h2>
      <div className="grid grid-cols-[150px_1fr] text-sm">
        {/* 검색어 */}
        <div className={cellClass}>검색어</div>
        <div className={contentClass}>
          <label htmlFor="search" className="sr-only">
            검색어
          </label>
          <input
            id="search"
            type="text"
            placeholder="검색어를 입력하세요"
            className={inputClass}
          />
        </div>

        {/* 필터 */}
        <div className={cellClass}>필터</div>
        <div className={`${contentClass} gap-4 flex flex-wrap p-4`}>
          <select className={selectClass}>
            <option>상태</option>
            <option>성공</option>
            <option>실패</option>
            <option>대기</option>
            <option>취소</option>
          </select>
          <select className={selectClass}>
            <option>가맹점</option>
            <option>GS25</option>
            <option>스타벅스</option>
          </select>
          <select className={selectClass}>
            <option>기간</option>
            <option>오늘</option>
            <option>이번주</option>
            <option>이번달</option>
          </select>
        </div>

        {/* 정렬 */}
        <div className={cellClass}>정렬</div>
        <div className={contentClass}>
          <select className={selectClass}>
            <option>최신순</option>
            <option>금액 높은순</option>
            <option>금액 낮은순</option>
          </select>
        </div>
      </div>
    </section>
  );
}
