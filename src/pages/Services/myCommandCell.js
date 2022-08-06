import * as React from "react";
import Button from "@mui/material/Button";

export const MyCommandCell = (props) => {
  const { dataItem, remove } = props;
  // console.log("SDSDcvcvcvxxcv",dataItem)
  const inEdit = dataItem[props.editField];

  return !inEdit ? (
    <td className="k-command-cell">
  
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
        onClick={() => props.clickEdit(dataItem)}
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
