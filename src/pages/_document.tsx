import Copyright from '@/copyright'
import { Html, Head, Main, NextScript } from 'next/document'
import { RecoilRoot } from 'recoil'

const Document = () => {
  return (
    <Html lang="en">
      {/* <Head /> */}
      <Head>
        <meta property="og:url" content="https://sungwook.net/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/20926860?v=4" />
        <meta property="og:description" content="SungWook's Portfolio Page." />
        <title>정성욱의 포트폴리오 웹사이트</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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