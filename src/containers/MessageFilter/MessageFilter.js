import React, { useState } from "react";
import styles from "./MessageFilter.module.css";
import FilterOptions from "../../components/FilterOptions/FilterOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const MessageFilter = () => {
  const [expand, setExpand] = useState(false);
  const [selected, setSelected] = useState(false);

  const filterHandler = () => {
    expandHandler();
    selectHanlder();
  };

  const expandHandler = () => setExpand(prevState => !prevState);
  const selectHanlder = () => setSelected(prevState => !prevState);

  const filterOptions = (
    <FilterOptions openHandler={filterHandler} expand={expand} />
  );

  return (
    <>
      <div onClick={() => filterHandler()}>
        <span className={selected ? styles.ButtonSelected : styles.Button}>
          {" "}
          <FontAwesomeIcon
            icon={faFilter}
            size="lg"
            style={{ color: "orange" }}
          />{" "}
          Filter
        </span>
      </div>
      {filterOptions}
    </>
  );
};

export default MessageFilter;
