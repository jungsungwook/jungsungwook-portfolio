import * as React from 'react';
import Link from 'next/link';
import axios, { Method } from 'axios';
import Router from 'next/router';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

const SignIn = () => {
  const [state, setState] = React.useState({
    password: "",
    customId: "",
  });
  try {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const customId = data.get('customId');
      const password = data.get('password');
      if (!customId || !password) {
        alert('아이디와 비밀번호를 입력해주세요.');
        return;
      }

      try {
        const res = await axios({
          method: 'post' as Method,
          url: `/api/auth/signin`,
          data: {
            customId: customId,
            password: password,
          },
        });
        const result = res.data;
        console.log(result)
        localStorage.setItem('isLogin', 'true')
        setCookie('token', result.token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          // httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
        });
        Router.push('/home');
      } catch (e: any) {
        if (e.response.data.message == 'Id does not exists') {
          alert('존재하지 않는 아이디입니다.');
        }
        else if (e.response.data.message == 'Password does not match') {
          alert('비밀번호가 일치하지 않습니다.');
        }
        else {
          alert('알 수 없는 에러. ' + e.response.data.message);
        }
      }
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
          <form onSubmit={handleSubmit}>
            <div className="formFields">
              <div className="leftFields" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                rowGap: '20px',
              }}>
                <div className="formField">
                  <label className="formFieldLabel" htmlFor="customId"
                    style={{
                      fontSize: '30px',
                    }}
                  >
                    아이디
                  </label>
                  <input
                    type="customId"
                    id="customId"
                    className="formFieldInput"
                    placeholder="아이디를 입력하세요"
                    name="customId"
                    value={state.customId}
                    onChange={handleChange}
                    style={{
                      width: '200px',
                    }}
                  />
                </div>

                <div className="formField">
                  <label className="formFieldLabel" htmlFor="password"
                    style={{
                      fontSize: '30px',
                    }}
                  >
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="formFieldInput"
                    placeholder="암호를 입력하세요"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    style={{
                      width: '200px',
                    }}
                  />
                </div>
              </div>
              <div className="rightFields" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                rowGap: '20px',
              }}>
              </div>
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
              >로그인</button>{" "}
              <Link href="/auth/signup" className="formFieldLink" style={{
                color: '#d3d3d3',
              }}>
                계정이 없으신가요?
                <a className="formFieldLink" style={{
                  color: 'red',
                }}> 회원가입</a>
              </Link>
            </div>
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