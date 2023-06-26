import Copyright from '@/copyright'
import { Html, Head, Main, NextScript } from 'next/document'
import { RecoilRoot } from 'recoil'

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <RecoilRoot>
          <Main />
          <Copyright sx={{ mt: 5 }} />
          <NextScript />
        </RecoilRoot>
      </body>
    </Html>
  )
}

export default Document