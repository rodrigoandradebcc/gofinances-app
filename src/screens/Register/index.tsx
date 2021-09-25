import React,{useState} from 'react';
import { Button } from '../../components/Forms/Button/input';
import { Input } from '../../components/Forms/Input/input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import * as Styled from './styles'

export function Register(){
    const [transactionType, setTransactionType] = useState('')

    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }
    return (
        <Styled.Container>
            <Styled.Header>
                <Styled.Title>Cadastro</Styled.Title>
            </Styled.Header>
            <Styled.Form>
                <Styled.Fields>
                    <Input placeholder="Nome"/>

                    <Input placeholder="Preço"/>

                    <Styled.TransactionTypes>
                    <TransactionTypeButton title="Income" type="up" onPress={() => handleTransactionsTypeSelect('up')} isActive={transactionType === 'up'} />
                    <TransactionTypeButton title="Outcome" type="down" onPress={() => handleTransactionsTypeSelect('down')} isActive={transactionType === 'down'} />
                    </Styled.TransactionTypes>
                </Styled.Fields>
                
                
                <Button title="Enviar"/>

            </Styled.Form>

        </Styled.Container>
    )
}