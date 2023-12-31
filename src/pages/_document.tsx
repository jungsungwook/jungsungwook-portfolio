import Copyright from '@/copyright'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { RecoilRoot } from 'recoil'
import HeaderFrame from '@/components/header-frame';

class MyDocument extends Document {

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        {/* <Head /> */}
        <Head>
          <link rel="icon" href="/tap_icon.png" />
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
}

export default MyDocument