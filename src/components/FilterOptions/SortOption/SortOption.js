import React, { useState, useEffect } from "react";
import styles from "./SortOption.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addSort, removeSort } from "../../../store/actions";

const SortOption = (props) => {
  const [selected, setSelected] = useState(false);
  const sort = useSelector((state) => state.messages.sort);
  const { who, identity } = useSelector((state) => state.messages.filters);
  const dispatch = useDispatch();
  const { filter, sortHandler, sortSelected } = props;

  const selectHandler = (filter) => {
    setSelected((prevState) => !prevState);
    sortHandler(filter);
  };

  useEffect(() => {
    //we need to check to see if the content is filtered-- to determine which array of messages to sort
    //(the filtered ones, or unfiltered)
    const filtered = who !== null || identity !== null;
    if (!selected && sort === filter) {
      dispatch(removeSort(filter, filtered));
    } else if (selected) {
      dispatch(addSort(filter, filtered));
    }
  }, [selected]);

  useEffect(() => {
    if (sortSelected !== filter) {
      setSelected(false);
    }
  }, [sortSelected]);

  return (
    <div
      className={selected ? styles.SortOptionSelected : styles.SortOption}
      onClick={() => selectHandler(filter)}
    >
      {props.filter}
    </div>
  );
};

export default SortOption;
