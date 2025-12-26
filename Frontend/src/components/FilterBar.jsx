const FilterBar = ({ activeFilter, onFilterChange }) => {
    const filters = [
        { label: "Tất cả", value: "all" },
        { label: "Đang học", value: "learning" },
        { label: "Đã hoàn thành", value: "completed" },
    ];
    return (
        <div className="flex gap-2">
            {filters.map((filter,index) => {
                return (
                    <button
                        key={index}
                        onClick={() => onFilterChange(filter.value)}
                        className={`ml-2 py-2 px-4 font-semibold rounded cursor-pointer ${activeFilter === filter.value ? 'bg-[#360185] text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        {filter.label}
                    </button>
                )
            })}
        </div>
    );
}

export default FilterBar;