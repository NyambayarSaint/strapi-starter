import React from 'react';
import styled from 'styled-components';

const Root = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    );
};

export default Root;

const Container = styled.div `

`