import React, { useState, useEffect } from "react";
import styles from "./FilterOption.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../../store/actions";

const FilterOption = (props) => {
  const [selected, setSelected] = useState(false);
  const { who, identity } = useSelector((state) => state.messages.filters);
  const sort = useSelector((state) => state.messages.sort);
  const dispatch = useDispatch();
  const { filter, filterHandler, filterSelected, name } = props;
  const selectHandler = (filter, name) => {
    setSelected((prevState) => !prevState);
    filterHandler(filter, name);
  };

  useEffect(() => {
    if (filter !== filterSelected) {
      setSelected(false);
    }
  }, [filterSelected]);

  useEffect(() => {
    const filtered = who !== null && identity !== null;
    // because 1 of the 2 values = the filter that's being passed... it removes the value
    // when it's 2 different values, and you change the value, NEITHER value equals the filter being passed thus it adds
    // for instance. if who = husband and identity = other, and you click wife for identity... then the filter doesn't
    // equal the who value or the identity value, thus it adds a new value to the identity value
    if (!selected && name === "who" && who === filter) {
      dispatch(removeFilter(filter, name, filtered, sort));
    } else if (!selected && name === "identity" && identity === filter) {
      dispatch(removeFilter(filter, name, filtered, sort));
    } else if (selected) {
      dispatch(addFilter(filter, name, true, sort));
    }
  }, [selected]);

  return (
    <div
      className={selected ? styles.FilterOptionSelected : styles.FilterOption}
      onClick={() => selectHandler(filter, name)}
    >
      {props.filter}
    </div>
  );
};

export default FilterOption;
