import * as React from 'react';
import Link from 'next/link';
import axios, { Method } from 'axios';
import Router from 'next/router';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

const SignIn = () => {
  try {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const res = await axios({
        method: 'post' as Method,
        url: `/api/auth/signin`,
        data: {
          customId: data.get('customId'),
          password: data.get('password'),
        },
      });
      const result = res.data;
      localStorage.setItem('accessToken', result.contents);
      if (result.statusCode != 200 || result.statusCode != '200') {
        alert(result.contents);
        return;
      }
      localStorage.setItem('isLogin', 'true')
      Router.push('/home');
    };
    return (
      <div className='login'>
        <div className='login__container'>
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <input type='text' placeholder='Id' name='customId' required />
            <input type='password' placeholder='Password' name='password' required />
            <button type='submit'>Sign In</button>
            <h4>
              <span className='login__gray'>New to Netflix? </span>
              <Link href='/auth/signup'>
                <span className='login__link'>Sign up now.</span>
              </Link>
            </h4>
          </form>
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
    return <div>error</div>
  }
}

export default SignIn;