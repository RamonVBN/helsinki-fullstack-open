const Filter = ({ filterByName, onChange }) => {
  return (
    <div>
      filter shown with
      <input value={filterByName} onChange={onChange} type="text" />
    </div>
  )
}

export default Filter
