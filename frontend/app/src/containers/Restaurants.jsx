// Fragment = Remove the constraint that only one element can be returned
import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

// components
import Skelton from '@material-ui/lab/Skeleton';

// apis
import { fetchRestaurants } from '../apis/restaurants';

// constants
import { REQUEST_STATE } from '../constants';

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';
import RestaurantImage from '../images/restaurant-image.jpg';

// reducers
import { initialState, restaurantsActionTypes, restaurantsReducer } from '../reducers/restaurants';

// styled
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

const RestaurantsContentList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

// function
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

      <RestaurantsContentList>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            <Skelton variant="rect" width={450} height={300} />
            <Skelton variant="rect" width={450} height={300} />
            <Skelton variant="rect" width={450} height={300} />
          </Fragment>
        ) : (
          state.restaurantsList.map((item, index) => (
            <Link to={`/restaurants/${item.id}/foods`} key={index} style={{ textDecoration: 'none' }}>
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantImage} />
                <MainText>{item.name}</MainText>
                <SubText>{`配送料:${item.fee}円 ${item.time_required}分`}</SubText>
              </RestaurantsContentWrapper>
            </Link>
          ))
        )}
      </RestaurantsContentList>
    </Fragment>
  );
};

export default Restaurants;
