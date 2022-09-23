import React, { Fragment } from 'react';

const Foods = ({ match }) => {
  return (
    <Fragment>
      フード一覧
      <p>restaurantIdは {match.params.restaurantId} です</p>
    </Fragment>
  );
};

export default Foods;
