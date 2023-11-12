import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({items}) {
  const [itemList, setItems] = useState(items); // Add this line to define the state

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  function handleSearchChange(event) {
    setSearchText(event.target.value)
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleItemFormSubmit(newItem) {
    // Update the state with the new item
    setItems((prevItems) => [...prevItems, newItem]);
  }
  
  const itemsToDisplay = itemList.filter((item) => {
    // Check both category filter and search text
    return (
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  });
    
  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter search={searchText} onSearchChange={handleSearchChange} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
        }
export default ShoppingList;