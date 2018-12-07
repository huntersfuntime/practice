import React from "react"
const Option = (_option, _index, _isSelected) => (
    <option key={`${_option}-${_index}`} value={_index} style={{ background: _isSelected ? "red" : "green" }}>
        {_option.name}
    </option>
)

export const Dropdown = (props) => {
    return props.options.length === 0 ? null : (
        <select defaultValue={props.default} onChange={(e) => props.onChange(props.options[e.target.value])}>
            {props.options.map((_option, _index) => Option(_option, _index, props.isSelected(_option.id)))}
        </select>
    )
}
