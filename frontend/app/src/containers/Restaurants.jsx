// Fragment = Remove the constraint that only one element can be returned
import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';

// apis
import { fetchRestaurants } from '../apis/restaurants';

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';

// reducers
import { initialState, restaurantsActionTypes, restaurantsReducer } from '../reducers/restaurants';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

const Restaurants = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);
  // useEffect = A function that is executed after the render result is reflected on the screen
  useEffect(() => {
    // type = ActionType
    dispatch({ type: restaurantsActionTypes.FETCHING });
    fetchRestaurants().then((data) =>
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        // payload = Data included in communications
        payload: {
          restaurants: data.restaurant,
        },
      })
    );
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>

      {state.restaurantsList.map((restaurant) => (
        <div key={restaurant.id}>{restaurant.name}</div>
      ))}
    </Fragment>
  );
};

export default Restaurants;
