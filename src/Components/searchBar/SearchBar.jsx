import { useContext, useState, useEffect, useRef } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";


const SearchBar = () => {
    const context = useContext(myContext);
    const { getAllProduct } = context
    // Search State 
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);

    // Filter Search Data
    const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase())).slice(0, 8)

    const navigate = useNavigate();

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!search || filterSearchData.length === 0) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev < filterSearchData.length - 1 ? prev + 1 : 0
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev > 0 ? prev - 1 : filterSearchData.length - 1
                    );
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (selectedIndex >= 0) {
                        navigate(`/productinfo/${filterSearchData[selectedIndex].id}`);
                        setSearch("");
                        setSelectedIndex(-1);
                    }
                    break;
                case 'Escape':
                    setSearch("");
                    setSelectedIndex(-1);
                    inputRef.current?.blur();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [search, selectedIndex, filterSearchData, navigate]);

    // Click outside handler to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setSearch("");
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Reset selected index when search changes
    useEffect(() => {
        setSelectedIndex(-1);
    }, [search]);

    return (
        <div className="" role="search">
            {/* search input  */}
            <div className="input flex justify-center">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Search here'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className=' bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-96 lg:w-96 md:w-96 outline-none text-black focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200'
                    aria-label="Search products"
                    role="combobox"
                    aria-expanded={search && filterSearchData.length > 0}
                    aria-autocomplete="list"
                    aria-controls="search-results"
                    aria-activedescendant={selectedIndex >= 0 ? `search-option-${selectedIndex}` : undefined}
                />
            </div>

            {/* search drop-down  */}
            <div className=" flex justify-center">
                {search && <div
                    id="search-results"
                    className="block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2"
                    role="listbox"
                    aria-label="Search results"
                >
                    {filterSearchData.length > 0 ?
                        <>
                            {filterSearchData.map((item, index) => {
                                return (
                                    <div
                                        key={item.id}
                                        id={`search-option-${index}`}
                                        className={`py-2 px-2 cursor-pointer ${selectedIndex === index ? 'bg-gray-300' : ''}`}
                                        onClick={() => navigate(`/productinfo/${item.id}`)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        role="option"
                                        aria-selected={selectedIndex === index}
                                        tabIndex={-1}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img className="w-10" src={item.productImageUrl} alt={`Product image for ${item.title}`} role="presentation" />
                                            {item.title}
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                        :
                        <>
                            <div className="flex justify-center items-center py-4 text-gray-600" role="status" aria-live="polite">
                                <div className="text-center">
                                    <div className="text-sm">No products found for "{search}"</div>
                                    <div className="text-xs mt-1">Try different keywords</div>
                                    <div className="text-xs mt-2 text-gray-500">Use ↑↓ to navigate, Enter to select, Escape to close</div>
                                </div>
                            </div>
                        </>}
                </div>
                }
            </div>
        </div>
    );
}

export default SearchBar;