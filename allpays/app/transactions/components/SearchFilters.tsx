interface SearchFiltersProps {
  keyword: string;
  filterStatus: string;
  filterStore: string;
  sortOrder: string;

  setKeyword: (value: string) => void;
  setFilterStatus: (value: string) => void;
  setFilterStore: (value: string) => void;
  setSortOrder: (value: string) => void;

  stores: { mchtCode: string; mchtName: string }[];
  onSearch: () => void;
  onReset: () => void;
}

export default function SearchFilters({
  keyword,
  filterStatus,
  filterStore,
  sortOrder,
  setKeyword,
  setFilterStatus,
  setFilterStore,
  setSortOrder,
  stores,
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
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* 필터 */}
        <div className={cellClass}>필터</div>
        <div className={`${contentClass} gap-4 flex flex-wrap`}>
          <select
            className={selectClass}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">상태</option>
            <option value="성공">성공</option>
            <option value="실패">실패</option>
            <option value="대기">대기</option>
            <option value="취소">취소</option>
          </select>

          <select
            className={selectClass}
            value={filterStore}
            onChange={(e) => setFilterStore(e.target.value)}
          >
            <option value="">가맹점</option>
            {stores.map((s) => (
              <option key={s.mchtCode} value={s.mchtName}>
                {s.mchtName}
              </option>
            ))}
          </select>
        </div>

        {/* 정렬 */}
        <div className={cellClass}>정렬</div>
        <div className={contentClass}>
          <select
            className={selectClass}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="최신순">최신순</option>
            <option value="금액 높은순">금액 높은순</option>
            <option value="금액 낮은순">금액 낮은순</option>
          </select>
        </div>
      </div>
    </section>
  );
}
