import React,{useState} from 'react';
import {Modal} from 'react-native';
import {CategorySelect} from '../CategorySelect'
import { Button } from '../../components/Forms/Button/input';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Input } from '../../components/Forms/Input/input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import * as Styled from './styles'

export function Register(){
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    function handleCLoseSelectCategory() {
        setCategoryModalOpen(false)
    }

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

                    <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}/>
                </Styled.Fields>
                
                
                <Button title="Enviar"/>

            </Styled.Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCLoseSelectCategory}/>
            </Modal>

        </Styled.Container>
    )
}