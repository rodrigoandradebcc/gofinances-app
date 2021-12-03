import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import {ActivityIndicator} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import * as S from './styles';
import {useTheme} from 'styled-components';
export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string
}
interface HighlightData {
    entries: HighlightProps,
    expensive: HighlightProps
    total: HighlightProps
}


export function Dashboard(){
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    const [isLoading, setIsLoading] = useState(true);

    const theme = useTheme()


    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
            if(item.type === 'positive'){
                entriesTotal += Number(item.amount)
            } else {                
                expensiveTotal += Number(item.amount)
            }

            const amount = Number(item.amount).toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            })

            // const date = new Date(item.date);
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
        setTransactions(transactionsFormatted);

        const total = entriesTotal - expensiveTotal;
        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                })
            },
        });
        setIsLoading(false)
    }

    useEffect(() => {
        loadTransactions();
    },[])

    useFocusEffect(useCallback(()=>{
        loadTransactions();
    },[]));

    return (
        <S.Container>
            {
                isLoading ? 
                    <S.LoadContainer>
                        <ActivityIndicator color={theme.colors.primary} size="large"/>
                    </S.LoadContainer> 
                    : 
            <>
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
                
                {highlightData.entries.amount && (
                    <HighlightCard
                        type="up"
                        title="Entradas"
                        amount={highlightData.entries.amount}
                        lastTransaction="Última entrada dia 13 de abril"
                    />
                )}
                    {highlightData.expensive.amount && (
                        <HighlightCard
                            type="down"

                            title="Saídas"
                            amount={highlightData.expensive.amount}

                            lastTransaction="Última entrada dia 13 de abril"
                        />
                    )}
                    
                    {highlightData.total.amount && (
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
                            lastTransaction="Última entrada dia 13 de abril"
                        />
                    )}
                    

                </S.HighlightCards>

                <S.Transactions>
                    <S.Title>Listagem</S.Title>
                    <S.TransactionsList 
                        data={transactions}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <TransactionCard data={item}/>} 
                    />
                </S.Transactions> 
            </>
            }
        </S.Container>
    )
}