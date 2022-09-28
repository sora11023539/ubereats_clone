import React, { Fragment, useEffect } from 'react';
import { fetchFoods } from '../apis/foods';
import { useParams } from 'react-router-dom';

const Foods = () => {
  let { restaurantsId } = useParams();
  useEffect(() => {
    fetchFoods(restaurantsId).then((data) => console.log(data));
  }, [restaurantsId]);

  return <Fragment>フード一覧</Fragment>;
};

export default Foods;
