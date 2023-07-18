import * as React from 'react';
import Link from 'next/link';
import axios, { Method } from 'axios';
import Router from 'next/router';

const SignUp = () => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    customId: "",
    name: "",
  });
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

  const handleChange = (event: any) => {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    setState({
      ...state,
      [name]: value
    });
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      backgroundColor: '#a7a7a7',
    }}>
      <div className="formCenter">
        <form className="formFields" onSubmit={handleSubmit}
        >
          <div className="formField">
            <label className="formFieldLabel" htmlFor="customId"
              style={{
                fontSize: '30px',
              }}
            >
              Id
            </label>
            <input
              type="customId"
              id="customId"
              className="formFieldInput"
              placeholder="Enter your Id"
              name="customId"
              value={state.customId}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password"
              style={{
                fontSize: '30px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton"
              style={{
                backgroundColor: '#a7a7a7',
                color: 'white',
                fontSize: '30px',
                border: 'none',
                cursor: 'pointer',
              }}
            >Sign In</button>{" "}
            <Link href="/" className="formFieldLink">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}


export default SignUp;