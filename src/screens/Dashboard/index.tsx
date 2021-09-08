import React from 'react';
import * as S from './styles';


export function Dashboard(){
    return (
        <S.Container>
            <S.Header>
                <S.UserWrapper>
                <S.UserInfo>
                    <S.Photo source={{uri: 'https://avatars.githubusercontent.com/u/3511851?v=4'}}/>
                    <S.User>
                        <S.UserGreeting>Olá, </S.UserGreeting>
                        <S.UserName>Rodrigo</S.UserName>
                    </S.User>
                </S.UserInfo>
                </S.UserWrapper>
            </S.Header>
        </S.Container>
    )
}