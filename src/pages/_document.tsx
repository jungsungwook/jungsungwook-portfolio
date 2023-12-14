import Copyright from '@/copyright'
import { Html, Head, Main, NextScript } from 'next/document'
import { RecoilRoot } from 'recoil'
import { useState, useEffect } from "react";

const Document = (props: any) => {
  const currentPath = props.__NEXT_DATA__.page
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
          <div className="main_header_contents"
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: 100,
              marginRight: "2rem",
              marginTop: "2rem",
              gap: "1rem",
            }}
          >
            <a
              href="https://github.com/jungsungwook"
              style={{
                fontSize: "2rem",
                color: "black",
              }}
            >
              <img
                src="/github-mark.png"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
            </a>
            <a
              href="https://www.notion.so/jungsungwook/56a2ef1b6f71416196545592fec7440f"
              style={{
                fontSize: "2rem",
                color: "black",
              }}
            >
              <img
                src="/notion_logo.png"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
            </a>
          </div>
          <div className="main_header_contents2"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: 100,
              marginLeft: "2rem",
              marginTop: "2rem",
              display: "flex",
              gap: "2rem",
            }}
          >
            <a
              id='home'
              href="/home"
              style={{
                fontWeight: currentPath == "/home" ? "bold" : "normal",
                fontSize: "2rem",
                color: "black",
                position: "relative",
              }}
            >
              HOME
            </a>
            <a
              id='blog'
              href="/blog"
              style={{
                fontWeight: currentPath == "/blog" ? "bold" : "normal",
                fontSize: "2rem",
                color: "black",
                position: "relative",
              }}
            >
              BLOG
            </a>
            <a
              id='project'
              href="/project"
              style={{
                fontWeight: currentPath == "/project" ? "bold" : "normal",
                fontSize: "2rem",
                color: "black",
                position: "relative",
              }}
            >
              PROJECT
            </a>
          </div>
          <Main />
          <Copyright sx={{ mt: 5 }} />
          <NextScript />
        </RecoilRoot>
      </body>
    </Html>
  )
}

export default Document