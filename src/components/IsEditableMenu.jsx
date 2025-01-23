const IsEditableMenu = ({ isEditable, editHandler }) => {
  return (
    <div className="control-group">
      <label>
        <input type="checkbox" checked={isEditable} onChange={editHandler} />
        Editable
      </label>
    </div>
  );
};

export default IsEditableMenu;
