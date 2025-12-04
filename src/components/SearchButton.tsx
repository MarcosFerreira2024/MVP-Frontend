import useSearch from "../hooks/useSearch";

function Search() {
  const {
    handleChange,
    handleKeyPressed,
    handleSearch,
    resetSearch,
    searchValue,
  } = useSearch();

  return (
    <div className="h-[50px]  bg-green-950 border-green-900 border gap-2 rounded-xl w-full max-w-[650px] flex justify-between px-3 items-center">
      <div className="flex gap-2 items-center w-full select-none">
        <label htmlFor="search">
          <img onClick={handleSearch} src="search.svg" alt="" />
        </label>
        <input
          id="search"
          name="search"
          value={searchValue}
          onKeyDown={handleKeyPressed}
          onChange={handleChange}
          placeholder="Eventos para ir, parques para explorar ... "
          className="bg-none outline-none select-none placeholder:text-gray-100 text-gray-100 font-segoe font-semibold w-full"
        />
        {searchValue && (
          <>
            <button
              onClick={resetSearch}
              className="font-segoe font-semibold text-gray-100"
            >
              X
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
