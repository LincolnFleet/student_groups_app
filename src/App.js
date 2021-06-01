import "./styles.css";
import React from "react";
import { studentList } from "./list";
import { Groups } from "./Groups";
import { GroupInput } from "./GroupInput";

const reducer = (state, action) => {
  const acts = {
    ADD_GROUP: (data) => {
      if (data) {
        return { groupTitles: [...new Set(state.groupTitles).add(data)] };
      }
    },
    DELETE_GROUP: (data) => {
      return {
        groupTitles: state.groupTitles.filter((group) => group !== data),
        studentList: state.studentList.map((student) => {
          if (student?.groupTitle === data) {
            student.groupTitle = null;
          }
          return student;
        })
      };
    },
    SET_STUDENT_GROUP: (data) => {
      return {
        studentList: state.studentList.map((student) => {
          if (student.id === data.studentId) {
            student.groupTitle = data.groupTitle;
          }
          return student;
        })
      };
    },
    UNSET_STUDENT_GROUP: (data) => {
      return {
        studentList: state.studentList.map((student) => {
          if (student.id === data.studentId) {
            student.groupTitle = "unassigned";
          }
          return student;
        })
      };
    }
  };

  return Object.assign({}, state, acts[action.type](action.data));
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    studentList,
    groupTitles: []
  });

  const postReq = () =>
    console.log(
      state.studentList.reduce((acc, student) => {
        acc[student.groupTitle]
          ? acc[student.groupTitle].push(student)
          : (acc[student.groupTitle] = [student]);
        return acc;
      }, {})
    );

  return (
    <div className="App">
      <div className="panel">
        <div className="title">Students</div>
        <div className="unassigned-students">
          {state.studentList.map((student) => {
            return (
              <div key={student.id} className="student-card">
                {student.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="panel">
        <Groups groupTitles={state.groupTitles} dispatch={dispatch} />
        <GroupInput dispatch={dispatch} />
        <div className="groups-grid">
          {state.groupTitles.map((group, i) => {
            return (
              <div key={i} className="group-card">
                {group}
                {state.studentList.map((student) => {
                  if (student.groupTitle === group) {
                    return (
                      <div key={student.id} className="student-card">
                        {student.name}
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
        <button onClick={() => postReq()}>Submit</button>
      </div>
    </div>
  );
}
