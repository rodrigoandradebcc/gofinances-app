import React from 'react'

import * as S from './styles'

interface Category {
    name: string;
    icon: string;
}

export interface TransactionCardProps {
    type: 'positive' | 'negative'
    name: string;
    amount: string;
    category: Category;
    date: string;
}

interface Props {
    data: TransactionCardProps;
}

export function TransactionCard({data}: Props){
    return (
        <S.Container>
            <S.Title>
            {data.name}
            </S.Title>
            <S.Amount type={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </S.Amount>

            <S.Footer>
                <S.Category>
                    <S.Icon name={data.category.icon} />

                    <S.CategoryName>{data.category.name}</S.CategoryName>                
                </S.Category>
                <S.Date>{data.date}</S.Date>
            </S.Footer>
        </S.Container>
    )
}