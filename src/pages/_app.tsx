import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ParallaxProvider } from 'react-scroll-parallax'
import dynamic from 'next/dynamic'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
