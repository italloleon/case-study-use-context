import React, { useState, useMemo } from "react";

// Hook for statistics (returns the number of filtered results)
function useStats(filteredItems) {
  return { nbHits: filteredItems.length };
}

// Generic filtered list component
export function FilterComponent({ items, filterAttributes }) {
  // State to hold filter values for each attribute
  // Example: { color: "red", category: "Food" }
  const [filters, setFilters] = useState(
    filterAttributes.reduce((acc, attr) => {
      acc[attr] = "";
      return acc;
    }, {})
  );

  // Handle filter changes
  const handleFilterChange = (attr, value) => {
    setFilters((prev) => ({
      ...prev,
      [attr]: value,
    }));
  };

  // Compute filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return filterAttributes.every((attr) => {
        const filterValue = filters[attr];
        // If no filter is selected for this attribute, it's a match
        if (!filterValue) return true;
        // Otherwise, item attribute must match the filter value
        return item[attr] === filterValue;
      });
    });
  }, [items, filters, filterAttributes]);

  const { nbHits } = useStats(filteredItems);

  // For each filter attribute, determine unique values for dropdown
  const uniqueValuesForFilters = useMemo(() => {
    const valuesMap = {};
    filterAttributes.forEach((attr) => {
      valuesMap[attr] = Array.from(new Set(items.map((item) => item[attr])));
    });
    return valuesMap;
  }, [items, filterAttributes]);

  return (
    <div className="container grid grid-cols-3 mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-4">Item Filtering</h1>
        <div className="mb-6 space-y-4">
          {filterAttributes.map((attr) => (
            <div key={attr}>
              <label className="block mb-1 font-medium capitalize">
                Filter by {attr}:
              </label>
              <select
                value={filters[attr]}
                onChange={(e) => handleFilterChange(attr, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="">All</option>
                {uniqueValuesForFilters[attr].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2">
        <h2 className="text-xl font-semibold mb-3">Results ({nbHits})</h2>
        <ul className="grid grid-cols-4 gap-4 space-y-2">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className="flex flex-col p-4 gap-4 rounded-xl hover:drop-shadow-xl drop-shadow-md bg-white"
            >
              {item.emojis && (
                <span className="text-4xl text-center">{item.emojis}</span>
              )}
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-gray-600">
                {filterAttributes.map((attr) => (
                  <span key={attr}> - {item[attr]}</span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
