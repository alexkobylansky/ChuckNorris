import React from "react";

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