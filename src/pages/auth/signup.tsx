import * as React from 'react';
import Link from 'next/link';
import axios, { Method } from 'axios';
import Router from 'next/router';

const SignUp = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const res = await axios({
      method: 'post' as Method,
      url: `/api/auth/signup`,
      data: {
        customId: data.get('customId'),
        name: data.get('userName'),
        email: data.get('email'),
        password: data.get('password'),
      },
    });
    const result = res.data;
    if (result.statusCode != 200 || result.statusCode != '200') {
      if (result.contents == 'Id already exists') {
        alert('이미 존재하는 아이디입니다.');
      } else if (result.contents == 'Email already exists') {
        alert('이미 존재하는 이메일입니다.');
      } else {
        alert(result.contents);
      }
      return;
    }
    alert('회원가입이 완료되었습니다.');

    Router.push('/auth/signin');
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customId">아이디</label>
            <input type="text" className="form-control" id="customId" name="customId" />
          </div>
          <div className="form-group">
            <label htmlFor="userName">이름</label>
            <input type="text" className="form-control" id="userName" name="userName" />
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input type="email" className="form-control" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" className="form-control" id="password" name="password" />
          </div>
          <button type="submit" className="btn btn-primary">회원가입</button>
        </form>
        <br />
        <Link href="/auth/signin">
          <a>로그인</a>
        </Link>
      </div>
    </div>
  )
}

export default SignUp;