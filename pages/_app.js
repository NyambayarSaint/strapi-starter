import React from "react";
import App from "next/app";
import { AnimatePresence } from "framer-motion";
import { MenuProvider } from "contexts/ContextMenuProvider";
import { ThemeProvider } from "styled-components";
import * as theme from "utils/theme";
import { EcommerceProvider } from "contexts/ContextEcommerceProvider";
import 'react-notifications-component/dist/theme.css'
import { parseCookies } from "nookies";
import Axios from "axios";
import NProgress from 'nprogress';
import Router from 'next/router';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());


class MyApp extends App {
  state = {
    menu: [],
    config: {},
    general: {},
    completelyLoaded: false,
    name: "Sample website",
    description: 'To be continued',
  };
  async componentDidMount() {
    // const res = await Axios(process.env.serverUrl + '/config')
    const config = { width: window.innerWidth, height: window.innerHeight };
    this.setState({ completelyLoaded: true, config});
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <MenuProvider value={this.state}>
          <EcommerceProvider initialAuth={this.props.initialAuth}>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </EcommerceProvider>
        </MenuProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;

// MyApp.getInitialProps = async ({ ctx }) => {

//   const { jwt } = parseCookies(ctx)

//   if (jwt) {
//     try {
//       let res = await Axios(process.env.serverUrl + '/users/me', { headers: { 'Authorization': 'Bearer ' + jwt } });
//       let response = await Axios.post(process.env.serverUrl + '/orders/myinvoice?id=' + '61c1a8d7011afa36f1905a37', {id: '61c2ed15ecde703f0031a6a1'}, { headers: { 'Authorization': 'Bearer ' + jwt } })
//       return { initialAuth: res.data, tester: response.data };
//     }
//     catch (e) { return {} }
//   }
//   return {};
// }