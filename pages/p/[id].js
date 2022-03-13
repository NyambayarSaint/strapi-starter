import React from "react";
import { motion } from "framer-motion";
import Root from "@/core/Root";
import ResolveComponent from "@/core/ResolveComponent"
import {MenuContext} from 'contexts/ContextMenuProvider'
import Axios from "axios";
import { Ecommerce } from "contexts/ContextEcommerceProvider";

const Index = ({data}) => {
    const { attributes: { Layout: Layout } } = data
    const {completelyLoaded} = React.useContext(MenuContext);

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root>
                {completelyLoaded && <ResolveComponent data={Layout ? Layout.length ? Layout : [] : []}/>}
            </Root>
        </motion.div>
    );
};

export default Index;

export async function getServerSideProps({params, req}){
    const res = await Axios(process.env.serverUrl+'/api/pages?slug='+params.id)
    return {props: {data: res.data.data[0]}}
}