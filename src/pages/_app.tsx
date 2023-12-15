import '@/styles/globals.scss'
import '@/styles/blogPostComponent.scss'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ParallaxProvider } from 'react-scroll-parallax'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const App = ({ Component, pageProps }: AppProps) => {
  const currentPath = window.location.pathname;
  const router = useRouter();
  return (
    <RecoilRoot>
      <div
        style={{
          position: "fixed",
          display: "flex",
          justifyContent: "space-between",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          flexDirection: "row",
        }}
      >
        <div className="main_header_contents2"
          style={{
            zIndex: 100,
            marginLeft: "2rem",
            marginTop: "2.5rem",
            display: "flex",
            gap: "2rem",
            // height은 안에 있는 것들의 높이에 따라서 결정됨
            height: "100%",
          }}
        >
          <a
            id='home'
            onClick={() => router.push("/home")}
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
            onClick={() => router.push("/blog")}
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
            onClick={() => router.push("/project")}
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
        <div className="main_header_contents"
          style={{
            zIndex: 100,
            marginRight: "2rem",
            marginTop: "2rem",
            gap: "1rem",
            display: "flex",
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
      </div>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
