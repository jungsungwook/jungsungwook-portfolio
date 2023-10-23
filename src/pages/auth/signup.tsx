import * as React from 'react';
import Link from 'next/link';
import axios, { Method } from 'axios';
import Router from 'next/router';
import { useEffect } from 'react';

const SignUp = () => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    customId: "",
    name: "",
  });

  const [stateCheck, setStateCheck] = React.useState({
    emailCheck: false,
    passwordCheck: true,
    customIdCheck: true,
    nameCheck: true,
  });

  useEffect(() => {
    if (state.email == "") {
      setStateCheck({
        ...stateCheck,
        emailCheck: false,
      });
      return;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (state.email && !emailRegex.test(state.email)) {
      const emailInput = document.getElementById('email');
      if (emailInput) {
        emailInput.style.border = '1px solid red';
        setStateCheck({
          ...stateCheck,
          emailCheck: false,
        });
      }
    }
    else {
      const emailInput = document.getElementById('email');
      if (emailInput) {
        emailInput.style.border = '1px solid #d3d3d3';
        setStateCheck({
          ...stateCheck,
          emailCheck: true,
        });
      }
    }
  }, [state.email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //stateCheck 모두 확인
    if (!stateCheck.emailCheck || !stateCheck.passwordCheck || !stateCheck.customIdCheck || !stateCheck.nameCheck) {
      alert('이메일을 확인해주세요.');
      return;
    }

    const data = new FormData(event.currentTarget);
    const customId = data.get('customId');
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');
    if (!customId || !name || !email || !password) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    try {
      const res = await axios({
        method: 'post' as Method,
        url: `/api/auth/signup`,
        data: {
          customId: customId,
          name: name,
          email: email,
          password: password,
        },
      });
      const result = res.data;
      alert('회원가입이 완료되었습니다.');

      Router.push('/auth/signin');
    } catch (e: any) {
      if(e.response.data.message == 'Id already exists') {
        alert('이미 존재하는 아이디입니다.');
      }
      else if(e.response.data.message == 'Email already exists') {
        alert('이미 존재하는 이메일입니다.');
      }
      else {
        alert('알 수 없는 에러. '+ e.response.data.message);
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
              <div className="formField">
                <label className="formFieldLabel" htmlFor="name"
                  style={{
                    fontSize: '30px',
                  }}
                >
                  이름
                </label>
                <input
                  type="name"
                  id="name"
                  className="formFieldInput"
                  placeholder="이름을 입력하세요"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="email"
                  style={{
                    fontSize: '30px',
                  }}
                >
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="이메일을 입력하세요"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>
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
            >회원가입</button>{" "}
            <Link href="/auth/signin" className="formFieldLink" style={{
              color: '#d3d3d3',
            }}>
              이미 계정이 있으신가요? <a className="formFieldLink" style={{
                color: 'red',
              }}>로그인</a>
            </Link>
          </div>
          <br />
          <a style={{ color: '#baffc0' }}>모든 정보는 암호화되어 저장되므로, 안심하셔도 됩니다.</a>
        </form>
      </div>
    </div>
  )
}


export default SignUp;