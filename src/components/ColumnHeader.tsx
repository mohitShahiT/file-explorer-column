export default function ColumnHeader({ header }: { header: string }) {
    return (
      <div className="border-b-[1px] border-b-blue-400/25 w-72 p-2 flex justify-between">
        <p>{header}</p>
        <select className="bg-gray-700">
          <option value={"name"}>Name</option>
          <option value={"size"}>Size</option>
          <option value={"created"}>Created</option>
        </select>
      </div>
    );
  }