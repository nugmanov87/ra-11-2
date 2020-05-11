import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeService, fetchService } from "../actions/actionCreators.js";
import ServiceAdd from "./ServiceAdd.js";

export default function ServiceList(props) {
  const { match, history } = props;
  const { items, loading, error } = useSelector((state) => state.serviceList);
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isError } = useSelector((state) => state.serviceIsLoadng);
  const dispatch = useDispatch();

  useEffect(() => {
    // fetchService(dispatch);
    dispatch(fetchService());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeService(id));
  };

  const handleChange = (id) => {
    history.push(`${match.url}/${id}`);
  };

  const handleRefresh = () => {
    dispatch(fetchService());
  };

  if (loading) {
    return <div className="ui active slow green double loader"></div>;
  }

  if (error) {
    return (
      <React.Fragment>
        <div className="error-msg">Произошла ошибка!</div>
        <button class="ui red basic button" onClick={handleRefresh}>
          Refresh
        </button>
      </React.Fragment>
    );
  }

  console.log(match.url);

  return (
    <React.Fragment>
      <ServiceAdd />
      <ul>
        {items &&
          items.map((o) => (
            <li key={o.id}>
              {o.name} {o.price}
              <button className="button btn" onClick={() => handleChange(o.id)}>
                <i class="edit icon"></i>
              </button>
              <button onClick={() => handleRemove(o.id)} disabled={isLoading}>
                <i class="trash icon"></i>
              </button>
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
}
