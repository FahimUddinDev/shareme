import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { searchQuery, feedQuery } from "../utils/data";
import { connect } from "react-redux";
const Feed = (props) => {
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        props.setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        props.setPins(data);
        setLoading(false);
      });
    }
  }, [props.currentCategory]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed !" />;
  if (!props.pins?.length) return <h2>No pins available</h2>;
  return <div>{props.pins && <MasonryLayout pins={props.pins} />}</div>;
};

const mapStateToProps = (state) => {
  return {
    currentCategory: state.currentCategory,
    pins: state.pins,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategory: (category) =>
      dispatch({ type: "setCategory", payload: category }),
    setPins: (pins) => dispatch({ type: "setPins", payload: pins }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
