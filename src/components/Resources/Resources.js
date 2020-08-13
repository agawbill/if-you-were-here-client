import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResources } from "../../store/actions";
import styles from "./Resources.module.css";

const Resources = (props) => {
  const resources = useSelector((state) => state.resources.resources);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResources());
  }, [dispatch]);

  const resourceList =
    resources.length > 0
      ? resources.map((resource) => (
          <li>
            <a href={resource.url}>{resource.title}</a>: {resource.description}
          </li>
        ))
      : "No resources have been added yet.";

  return (
    <>
      <h3>Resources</h3>
      <div className={styles.Resources}>
        <ul>{resourceList}</ul>
      </div>
    </>
  );
};

export default Resources;
