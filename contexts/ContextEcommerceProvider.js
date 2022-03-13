import React, { createContext } from 'react';

export const Ecommerce = createContext();

export class EcommerceProvider extends React.Component {

    state = {
        user: this.props.initialAuth,
        items: [],
        cart: [],
        pageInfo: {}
    }
    handleSet = (data) => this.setState(data);

    render() {
        return (
            <Ecommerce.Provider value={{
                ...this.state,
                set: this.handleSet,
            }}>
                {this.props.children}
            </Ecommerce.Provider>
        )
    }
}