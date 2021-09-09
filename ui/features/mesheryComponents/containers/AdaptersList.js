import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adaptersSelector, fetchAvailableAdaptersThunk, loadingSelector } from "../mesheryComponentsSlice";
import { useEffect } from "react";
import { initServiceMeshEventsThunk, updateServiceMeshesData } from "@/features/serviceMeshes/serviceMeshesSlice";

/**
 * React component that fetches the available adapters and calls `render` method
 * with adapters list and loading state
 * @param {{render: () => import("react").ReactElement}} props
 * @returns {import("react").ReactElement}
 */

const AdaptersList = (props) => {
  const dispatch = useDispatch();

  /**
   * @type {true | false}
   */
  const loading = useSelector(loadingSelector);
  /**
   * @type {import("../mesheryComponentsSlice.js").AdaptersListType}
   */
  const adapters = useSelector(adaptersSelector);

  useEffect(() => {
    // dispatch(fetchAvailableAdaptersThunk());
    dispatch(
      initServiceMeshEventsThunk((controlPlane, dataPlane) =>
        dispatch(updateServiceMeshesData({ controlPlanesData: controlPlane, dataPlanesData: dataPlane }))
      )
    );
  }, []);

  // eslint-disable-next-line react/prop-types
  return <div>{props.render({ loading, adapters })}</div>;
};

export default AdaptersList;
