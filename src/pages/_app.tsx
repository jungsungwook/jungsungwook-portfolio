import '@/styles/globals.scss'
import '@/styles/blogPostComponent.scss'
import '@/styles/adminPage.scss'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import dynamic from 'next/dynamic'
import { getCookie } from 'cookies-next'
import HeaderFrame from '@/components/header-frame'
import { useRouter } from 'next/router'

const App = ({ Component, pageProps }: AppProps) => {
  const ctx = pageProps.ctx;
  const token = getCookie('token', ctx);
  
  return (
    <RecoilRoot>
      <HeaderFrame
        token={token}
      />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
