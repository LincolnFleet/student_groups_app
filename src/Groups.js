import React from "react";
const deleteIcon = "ⓧ";

export const Groups = ({ groupTitles, dispatch }) => {
  return (
    <div className="groups">
      {"Group Titles"}
      <div className="titles">
        {groupTitles.map((title, i) => {
          return (
            <button
              key={i}
              className="item"
              onClick={() => dispatch({ type: "DELETE_GROUP", data: title })}
            >
              {`${title} ${deleteIcon}`}
            </button>
          );
        })}
      </div>
    </div>
  );
};
