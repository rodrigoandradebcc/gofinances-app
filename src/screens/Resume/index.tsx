import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import * as S from './styles';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

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
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume(){
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    async function loadData(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter((expensive: TransactionData) => expensive.type === 'negative')
    
        const expensivesTotal = expensives.reduce((acumulator: number, expensive: TransactionData) => {
            return acumulator + Number(expensive.amount);
        }, 0)

        const totalByCategory: CategoryData[] = []

        categories.forEach(category => {
            let categorySum = 0;
            
            expensives.forEach((expensive: TransactionData) => {
                    if(expensive.category === category.key){
                        categorySum += Number(expensive.amount);
                    }
            });

            if(categorySum > 0){
                const totalFormatted = categorySum
                .toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                })
 
                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent
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
            <S.Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight(),
                }}
            >
                <S.MonthSelect>
                    <S.MonthSelectButton>
                        <S.MonthSelectIcon name="chevron-left" />
                    </S.MonthSelectButton>

                    <S.Month>Maio</S.Month>

                    <S.MonthSelectButton>
                        <S.MonthSelectIcon name="chevron-right" />
                    </S.MonthSelectButton>
                </S.MonthSelect>

                <S.ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        colorScale={totalByCategories.map(category => category.color)}
                        style={{ 
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape
                            }
                        }}
                        labelRadius={50}
                        x="percent"
                        y="total"
                    />
                </S.ChartContainer>
                
                {totalByCategories.map(item => (
                    <HistoryCard
                        key={item.key} 
                        title={item.name}
                        amount={item.totalFormatted}
                        color={item.color}
                    />
                ))}
            </S.Content>
        </S.Container>
    )
}                                                                                                                                              