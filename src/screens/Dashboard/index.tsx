import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import * as S from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}


export function Dashboard(){
    const [data, setData] = useState<DataListProps[]>([]);

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        
        const response = await AsyncStorage.getItem(dataKey);
        console.log('response',response)
        const transactions = response ? JSON.parse(response) : [];
        console.log('transactions',transactions)


        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
            const amount = Number(item.amount).toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR',{
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });
        setData(transactionsFormatted);
    }

    useEffect(() => {
        console.log('lalala',data)
        loadTransactions();
    },[])

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
                <S.LogoutButton onPress={()=>{}}>
                    <S.Icon name="power" />
                </S.LogoutButton>


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
                <S.TransactionsList 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item}/>} 
                />
            <S.Title>Listagem</S.Title>


            </S.Transactions> 
        </S.Container>
    )
}