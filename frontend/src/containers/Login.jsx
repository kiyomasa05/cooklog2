import React, { Fragment,useState } from 'react';
import styled from 'styled-components';
import '../App.css';
import { useForm } from 'react-hook-form'

import { Header } from '../component/Header/Header'
import { Container } from '../component/wrapper/Login_Wrapper'

const Title = styled.h2`
  margin:20px auto;
  font-size:28px;
  font-weight:700;
  letter-spacing:3px;
`

export const Login = () => {
  const { register, handleSubmit, watch, reset, errors} = useForm()
  // useFormを呼び出して使いたいメソッドを書く
  // const onSubmitData = () => console.log(handleSubmit)
  //submitボタンを押した時、入力内容確認画面を表示させる

  const Name = watch('name')
  const Email = watch('email')
  //watchに各フォーム部品のnameの値を引数で渡すとでタイムリーで入力状態を監視してる

  return(
    <>
      <Fragment>
      <Header />
        <Container>
          <Title>ログイン</Title>
          {/* <form onSubmit={handleSubmit(onSubmitData)}> */}
          <form>
          {/* onSubmit(入力フォームの送信ボタンがクリックされた時に発生するイベント)で入力された値をhandleSubmitで取り出す  */}
            <label htmlFor='name'>Name
              <span className={`requiredIcon ${Name ? 'is-ok' : 'is-required'}`}>{/*nameが入力されてたらtrue*/}
                {Name ? 'OK' :'必須'}
              </span>
            </label>
            <input
              name='name'
              placeholder='nameを入力'
              ref={register({required: true})} />
              {errors.name && <p className='formError'>名字を入力して下さい</p>}
            <label htmlFor='email'>メールアドレス
              <span className={`requiredIcon ${Email && !errors.email ? 'is-ok': 'is-required'}`}>
                {Email && !errors.email ? 'OK' :'必須' }
              </span>
            </label>
            <input
              type='email'
              name='email'
              placeholder='メールアドレスを入力'
              ref={register({
              required: true,
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
              })}
            />
            {errors.email && <p className='formError'>メールアドレスを正しく入力して下さい</p>}
              <div className='btnBox'>
                <input
                  type='button'
                  onClick={reset}//入力内容もstateもクリア
                  value='クリア'
                  className='button'/>
                <input
                  type='submit'
                  value='ログイン'
                  className='button'/>
              </div>
            </form>
      </Container>
      </Fragment>
   </>   
  )
}
