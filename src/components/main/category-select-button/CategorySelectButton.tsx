import React from "react";

interface CategorySelectButtonProps {
  name: string;
  value: string;
  active: boolean;
  setCategoryButton: React.Dispatch<React.SetStateAction<string>>;
}

export const CategorySelectButton : React.FC<CategorySelectButtonProps> = ({name, value, active, setCategoryButton}) => {
  return (
    <li>
      <button type="button"
              className={'category-select-button' + (active ? ' category-select-button__active' : '')}
              value={value}
              onClick={() => setCategoryButton(value)}
      >{name}
      </button>
    </li>
  )
}