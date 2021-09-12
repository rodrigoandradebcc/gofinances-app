import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

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
                <S.Icon name="power" />

                </S.UserWrapper>
            </S.Header>
            
            <S.HighlightCards>
            
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"

                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="total"

                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />

            </S.HighlightCards>

            <S.Transactions>
                <S.Title>Listagem</S.Title>
                <TransactionCard />
            </S.Transactions> 
        </S.Container>
    )
}