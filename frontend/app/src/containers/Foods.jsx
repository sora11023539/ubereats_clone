import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';

// reducers
// A as B = Can be reference A as B
import { initialState as foodsInitialState, foodsActionTypes, foodsReducer } from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';

// images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

// constants
import { REQUEST_STATE } from '../constants';

// style
import { COLORS } from '../style_constants';
import { LocalMallIcon } from '../components/icons';
import { FoodWrapper } from '../components/FoodWrapper';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

const Foods = () => {
  let { restaurantsId } = useParams();
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(restaurantsId).then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data.foods,
        },
      });
    });
  }, [restaurantsId]);

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/orders">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ?
          <Fragment>
            {[...Array(12).keys()].map(i =>
              <ItemWrapper key={i}>
                <Skeleton key={i} variant="rect" width={450} height={180} />
              </ItemWrapper>
            )}
          </Fragment>
        :
          foodsState.foodsList.map(food =>
            <ItemWrapper key={food.id}>
              <FoodWrapper food={food} onClickFoodWrapper={(food) => console.log(food)} imageUrl={FoodImage} />
            </ItemWrapper>
          )
        }
      </FoodsList>
    </Fragment>
  );
};

export default Foods;
