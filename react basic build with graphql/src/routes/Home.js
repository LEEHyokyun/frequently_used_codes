import React from 'react';
import {gql, useQuery} from '@apollo/client';
import styled from 'styled-components';

const getAllUserInfor = gql`
{
    getAllUserInfor{
        id
        userID
        userPW
    }
}`

const Container = styled.div`
    background-color: yellow;
`
const Title = styled.h1`
    font-size: 50px;
`

const Subtitle = styled.h2`
    font-size: 30px;
`

function Home() {
    //console.log는 Mount 되기 전,후 두번 호출
    const {loading, error , data} = useQuery(getAllUserInfor);
    console.log(loading, error , data);
    return(
        <Container>
            <Title>HELLO REACT WORLD!</Title>
            <Subtitle>NICE TO MEET YOU</Subtitle>
        </Container>
    )
};

export default Home;