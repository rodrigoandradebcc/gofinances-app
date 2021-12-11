import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import * as S from './styles';

interface TransactionData {
    type: 'positive' | 'negative'
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: string;
    color: string;
}

export function Resume(){
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    async function loadData(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter((expensive: TransactionData) => expensive.type === 'negative')
    
        const totalByCategory: CategoryData[] = []

        categories.forEach(category => {
            let categorySum = 0;
            
            expensives.forEach((expensive: TransactionData) => {
                    if(expensive.category === category.key){
                        categorySum += Number(expensive.amount);
                    }
            });

            if(categorySum > 0){
                const total = categorySum
                .toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                })
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: total
                }); 
            }
        });

        setTotalByCategories(totalByCategory);
    }

    useEffect(()=>{
        loadData();
    },[])

    return (
        <S.Container>
            <S.Header>
                <S.Title>Resumo por categoria</S.Title>
            </S.Header>
            <S.Content>
                {totalByCategories.map(item => (
                    <HistoryCard
                        key={item.key} 
                        title={item.name}
                        amount={item.total}
                        color={item.color}
                    />
                ))}
            </S.Content>
        </S.Container>
    )
}