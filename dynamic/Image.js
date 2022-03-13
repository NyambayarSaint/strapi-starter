import React from 'react';
import minimize from 'utils/minimize';
import styled from 'styled-components'

const Image = ({data}) => {
    return (
        <Container>
            <img src={minimize(data.image.data.attributes, 'thumbnail')} />
        </Container>
    );
};

export default Image;

const Container = styled.div `
    img{
        width:100%;
    }
`