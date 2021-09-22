import React from "react";

export default function CategorySelectButton(props) {
  const {name, value, active, onClick} = props;

  return (
    <li>
      <button type="button" className={'category-select-button' + (active ? ' category-select-button__active' : '')} value={value} onClick={e => {onClick(e.target.value)}}>{name}
      </button>
    </li>
  )
}