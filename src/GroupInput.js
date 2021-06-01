import React from "react";

export const GroupInput = ({ dispatch }) => {
  const [newGroup, setNewGroup] = React.useState("");

  return (
    <div className="create-group-field">
      <label htmlFor="new-group">Group Name</label>
      <input
        type="text"
        name="new-group"
        onChange={(e) => setNewGroup(e.target.value)}
      />
      <button onClick={() => dispatch({ type: "ADD_GROUP", data: newGroup })}>
        Add
      </button>
    </div>
  );
};
