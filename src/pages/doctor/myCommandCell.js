import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export const MyCommandCell = (props) => {
  const { dataItem, Viewinfo, remove, doctors } = props;
  // console.log(dataItem)
  const inEdit = dataItem[props.editField];
  const navigate = useNavigate();

  return !inEdit ? (
    <td className="k-command-cell">
      <Button
        className="BTNEdit"
            onClick={() => navigate("/schedule")}
      >
        more info
      </Button>
      <Button
        className="BTNremove"
        onClick={() => {
          remove(dataItem);
        }}
      // onClick={() => remove(dataItem._id)}
      >
        Remove
      </Button>

      <Button
        className="BTNEdit"
        onClick={() => props.edit(dataItem)}
      >
        Edit
      </Button>

    </td>
  ) : (
    // <td className="k-command-cell">
    {/* <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() => props.update(dataItem)}
      >
        {"Update"}
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() => props.cancel(dataItem)}
      >
        {"Cancel"}
      </button> */}
    // {/* </td> */}
  );
};
