import * as React from 'react';

const Copyright = (props: any) => {
  return (
    // 가운데로 오게. 현재 날짜 가져오기
    <div className='footer__center'>
      <span>Copyright </span>
      <span>© {new Date().getFullYear()}, JungSungWook Portfolio. All rights reserved.</span>
    </div>
  );
}

export default Copyright;