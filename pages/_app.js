import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React, {useEffect} from 'react';


function MyApp({ Component, pageProps }) {
  // material-ui の SSR 対策
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  return (
    <>
      <Head>
        <title>next-js-demo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
