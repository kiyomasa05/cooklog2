import React, { Fragment, useReducer, useEffect, memo } from 'react';
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem,
  Skeleton
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { post } from '../urls/index'
// components
//api
import { useGetRecipe } from '../hooks/useGetRecipe'
import { Header } from '../organism/Header/Header'
//画像
import NoImage from '../images/no-image.png'


import { RecipeCard } from "../organism/RecipeCard";
// import { useAllUsers } from "../../../hooks/useAllUsers";
// // import { UserDetailModal } from "../../organisms/modal/UserDetailModal";
// import { useSelectUser } from "../../../hooks/useSelectUser";
// import { useLoginUser } from "../../../hooks/providers/useLoginUserProvider";

// reducers
import {
  initialState,
  ActionTypes,
  recipeReducer,
} from '../reducer/recipes';

import { REQUEST_STATE } from '../constants';


const Title = styled.h2`
  margin:100px auto;
  font-size:28px;
  font-weight:700;
  letter-spacing:3px;
`

export const Index = memo(() => {

  const { getRecipe } = useGetRecipe();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { getUsers, loading, users } = useAllUsers();
  // const { onSelectUser, selectedUser } = useSelectUser();
  // const { loginUser } = useLoginUser();

  // useEffect(() => getUsers(), [getUsers]);

  // const onClickUser = useCallback(
  //   (id) => {
  //     onSelectUser({ id, users, onOpen });
  //   },
  //   [users, onSelectUser, onOpen]
  // );

  const [state, dispatch] = useReducer(recipeReducer, initialState);

  useEffect(() => {
    dispatch({ type: ActionTypes.FETCHING });
    getRecipe()
      .then((data) =>
        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: {
            recipeList: data.recipes,
            // image_url: data.methods,
          }
        })
      )
  }, [])


  return (
    <>
      <Header />
      <Title>index</Title>

      {
        state.fetchState === REQUEST_STATE.LOADING ?
          <Fragment>
            <Skeleton width="450" height="300" />
            <Skeleton width="450" height="300" />
            <Skeleton width="450" height="300" />
          </Fragment>
          :
          <Wrap p={{ base: 4, md: 10 }}>
            {state.recipeList.map((item, index) =>
              <WrapItem key={index.id} mx="auto">
                <RecipeCard
                  id={item.id}
                  imageUrl={"image_url" ? "image_url" : NoImage}
                  title={item.title}
                  time_required={item.time_required}
                  food={item.food}
                  created_at={item.created_at}
                />
              </WrapItem>
            )}
          </Wrap>
      }

    </>
  );
})
