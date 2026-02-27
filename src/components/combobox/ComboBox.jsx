import { useState, useEffect, useRef } from "react";
import * as Combobox from "aria-ease/combobox";
import "./combobox.css";

const ComboBox = () => {
    const[listShown, setListShown] = useState(false);
    const[inputValue, setInputValue] = useState("");
    const[optionsArray] = useState([
        {id: "apple", label: "Apple", hidden: false},
        {id: "mango", label: "Mango", hidden: false},
        {id: "orange", label: "Orange", hidden: false},
        {id: "banana", label: "Banana", hidden: false}
    ]);

    const comboboxInstanceRef = useRef(null);

    useEffect(() => {
        const accessibleCombobox = Combobox.makeComboboxAccessible({
            comboboxInputId: "fruit",
            comboboxButtonId: "show-list-button",
            listBoxId: "fruits-listbox",
            listBoxItemsClass: "list-options",
            callback: {
                onSelect: (option) => {
                    setInputValue(option.textContent);
                    setListShown(false);

                    // Reset all options to visible after selection
                    // Show all options again after selection
                    optionsArray.forEach(opt => {
                        const el = document.getElementById(opt.id);
                        if (el) el.hidden = false;
                    });
                },
                onOpenChange: (isOpen) => { 
                    setListShown(isOpen);
                    
                    // If opening via button (not via typing), show all options
                    if (isOpen && !inputValue) {
                        optionsArray.forEach(opt => {
                            const el = document.getElementById(opt.id);
                            if (el) el.hidden = false;
                        });
                        // Only refresh when button opens the list
                        if (comboboxInstanceRef.current) {
                            comboboxInstanceRef.current.refresh();
                        }
                    }
                },
                onActiveDescendantChange: (optId, item) => {
                    console.log("Active descendant changed to:", optId);
                    console.log("Active item element:", item);
                },
                onClear: () => {
                    console.log("Input was cleared via Escape key");
                }
            }
        });

        comboboxInstanceRef.current = accessibleCombobox;

        return () => accessibleCombobox.cleanup();
    }, []);

    const changeInput = (event) => {
        setInputValue(event.target.value);
        const query = event.target.value.toLowerCase();
        let hasMatch = false;
        
        optionsArray.forEach(opt => {
            const match = opt.label.toLowerCase().includes(query);
            const el = document.getElementById(opt.id);
            if (el) {
                el.hidden = !match;
                if (match) hasMatch = true;
            }
        });
        
        // Open listbox if there are matches and user is typing
        if (hasMatch && query.length > 0) {
            comboboxInstanceRef.current.openListbox();
        }
        
        // Refresh the library's cache after hiding/showing elements
        if (comboboxInstanceRef.current) {
            comboboxInstanceRef.current.refresh();
        }
    }
    
  return (
    <div id="combo-wrapper" className="max-w-[700px] m-auto pt-10">
        <div className="flex flex-col gap-2 inline-block min-w-[280px]">
            <label 
                htmlFor="fruit" 
                className="text-sm font-medium black-grey-text"
            >
                Select a fruit
            </label>
            <div className="relative">
                <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:border-gray-400 dark:hover:border-gray-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 dark:focus-within:ring-blue-400 dark:focus-within:border-blue-400 transition-all">
                    <input 
                        type="text"
                        id="fruit"
                        name="fruit"
                        value={inputValue}
                        onChange={changeInput}
                        placeholder="Search fruits..."
                        className="flex-1 px-3 py-2 bg-transparent outline-none rounded-l-lg text-sm"
                    />
                    <button 
                        id="show-list-button" 
                        data-test-id="combobox-button" 
                        tabIndex={-1} 
                        aria-label="Open fruits list"
                        className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                    >
                        <svg 
                            className={`w-4 h-4 transition-transform duration-200 ${listShown ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>   
        </div>
        <ul 
            id="fruits-listbox" 
            className="mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden min-w-[280px] inline-block"
            
        >
            {optionsArray.map(opt => (
                <li 
                    key={opt.id} 
                    id={opt.id} 
                    hidden={opt.hidden} 
                    className="list-options px-3 py-2.5 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 aria-[selected=true]:bg-blue-100 dark:aria-[selected=true]:bg-blue-900/50 aria-[selected=true]:text-blue-900 dark:aria-[selected=true]:text-blue-100 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                    {opt.label}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ComboBox