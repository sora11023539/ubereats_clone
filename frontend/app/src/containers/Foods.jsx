import React, { Fragment, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

// reducers
// A as B = Can be reference A as B
import { initialState as foodsInitialState, foodsActionTypes, foodsReducer } from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';

// images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

// constants
import { COLORS } from '../style_constants';
import { REQUEST_STATE } from '../constants';
import Skeleton from '@material-ui/lab/Skeleton';
import { FoodOrderDialog } from "../components/FoodOrderDialog";

// components
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

  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
  }
  const [state, setState] = useState(initialState);

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
              <FoodWrapper
                food={food}
                onClickFoodWrapper={(food) => setState({
                    ...state,
                    isOpenOrderDialog: true,
                    selectedFood: food,
                  })
                }
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          )
        }
      </FoodsList>
      {
        // && = Run if true
        state.isOpenOrderDialog &&
          <FoodOrderDialog
            food={state.selectedFood}
            isOpen={state.isOpenOrderDialog}
            onClose={() => setState({
              ...state,
              isOpenOrderDialog: false,
            })}
          />
      }
    </Fragment>
  );
};

export default Foods;
