// Fragment = Remove the constraint that only one element can be returned
import React, { Fragment, useEffect } from 'react';
import { fetchRestaurants } from '../apis/restaurants';

const Restaurants = () => {
  useEffect(() => {
    fetchRestaurants()
    .then((data) =>
      console.log(data)
    )
  })

  return <Fragment>レストラン一覧</Fragment>;
};

export default Restaurants;

// useEffect = A function that is executed after the render result is reflected on the screen
