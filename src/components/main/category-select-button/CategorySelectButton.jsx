import React from "react";

export default function CategorySelectButton({name, value, active, onClick}) {
  return (
    <li>
      <button type="button" className={'category-select-button' + (active ? ' category-select-button__active' : '')} value={value} onClick={event => {onClick(event.target.value)}}>{name}
      </button>
    </li>
  )
}