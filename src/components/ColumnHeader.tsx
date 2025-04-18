import { SortBy } from "../types/FileTypes";

const sortByValues = Object.values(SortBy);

export default function ColumnHeader({
  header,
  sortBy,
  onSortByChange,
}: {
  header: string;
  sortBy: SortBy;
  onSortByChange: (sb: SortBy) => void;
}) {
  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value as SortBy;
    onSortByChange(newValue);
  }

  return (
    <div
      className="border-b-[1px] border-b-blue-400/25 w-72 p-2 flex justify-between"
      onClick={(e) => e.stopPropagation()}
    >
      <p>{header}</p>
      <select
        className="bg-gray-700"
        value={sortBy}
        onChange={handleSelectChange}
      >
        {sortByValues.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
