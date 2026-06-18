import useSidebar from "../../hooks/useSidebar";
import Category from "./Category";

function CategorySidebar() {
  const { categories, currentCategory, handleSelection } = useSidebar();
  return (
    <>
      <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-green-900 font-semibold whitespace-nowrap">Categorias:</span>
        {categories.map((item) => {
          const selected = currentCategory === item.value;
          return (
            <button
              key={item.value}
              onClick={() => handleSelection(item.label)}
              className={`whitespace-nowrap font-semibold transition-colors ${
                selected
                  ? "text-green-900 underline underline-offset-4"
                  : "text-gray-400"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <nav className="md:block hidden p-3 h-fit min-h-[600px] max-h-[600px] bg-green-950 border border-green-900 main-shadow rounded-xl min-w-[220px] flex-col">
        <ul className="font-segoe flex flex-col gap-4 font-semibold">
          <h1 className="text-2xl text-gray-50">Categorias</h1>
          {categories.map((item) => {
            const selected = currentCategory === item.value;
            return (
              <Category
                handleSelection={handleSelection}
                key={item.value}
                selected={selected}
                label={item.label}
              />
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default CategorySidebar;
