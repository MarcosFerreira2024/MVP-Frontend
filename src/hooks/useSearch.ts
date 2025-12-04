import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function useSearch() {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim() !== "")
      navigate(
        "/search?title=" +
          searchValue +
          "&category=all&take=12&page=1&sortBy=title&orderBy=desc"
      );
    return;
  };

  const resetSearch = () => {
    setSearchValue("");
  };

  const handleKeyPressed = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      return handleSearch();
    }
    return;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  return {
    handleSearch,
    resetSearch,
    handleKeyPressed,
    handleChange,
    searchValue,
    setSearchValue,
  };
}

export default useSearch;
