import React, { Fragment, useReducer, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import '../App.css';
import axios from 'axios';
import { post } from '../urls/index'
// components
import Skeleton from '@material-ui/lab/Skeleton';

//api
import { fetchIndex } from '../apis/index'
//部品
import { Header } from '../component/Header/Header'
//画像
import NoImage from '../images/no-image.png'

// reducers
import {
  initialState,
  ActionTypes,
  recipeReducer,
} from '../reducer/recipes';

import { REQUEST_STATE } from '../constants';

import moment from 'moment'

const Title = styled.h2`
  margin:100px auto;
  font-size:28px;
  font-weight:700;
  letter-spacing:3px;
`
const RecipeList = styled.div`
  margin:10px;
  display:grid;
  grid-auto-rows: 250px;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 1em;
`
const RecipesContentWrapper = styled.div`
  cursor:pointer;
  background:pink;
  width:100%;
  height:100%;
  text-align:center;
`
const RecipeTitle = styled.h4`
  margin:3px;
  font-size:20px;
  color:#666666	;
`
const RecipeImageNode = styled.img`
  width:60%;
  height:60%;
  display:block;
  margin:0 auto;
`

const Food = styled.div`
  
`


export default function Index(props) {

  const [state, dispatch] = useReducer(recipeReducer, initialState);

  useEffect(() => {
    dispatch({ type: ActionTypes.FETCHING });
    fetchIndex()
      .then((data) =>
        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: {
            recipes: data.recipes,
            // image_url: data.methods,
          }
        })
      )
  }, [])
  // const onSubmit = (data) => fetchSignup(data);
  // 後でapiを叩く場所を固定したい


  return (
    <>
      <Header />
      <Title>index</Title>
      <h2>ログイン状態: {props.loggedInStatus}</h2>
      <h2>ユーザー: {props.user.name}さん</h2>
      <RecipeList>
        {
          state.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
            </Fragment>
            :
            state.recipeList.map((item, index) =>
              <Link to={`/recipe/${item.id}`} key={index} style={{ textDecoration: 'none' }}>
                <RecipesContentWrapper>
                  <RecipeTitle>{item.title}</RecipeTitle>
                  <RecipeImageNode src={"image_url" ? "image_url" : NoImage} />
                  {/* imageがレスポンスとしてまだ返ってきてない。
                  どうやって返すのか */}
                  <time>{`${item.time_required}分`}</time>
                  <Food>{`食材：${item.food}`}</Food>
                  <time>{`レシピ作成日${moment(item.created_at).format('YYYY-MM-DD')}`}</time>
                </RecipesContentWrapper>
              </Link>
            )
        }
      </RecipeList>

    </>
  );
}
