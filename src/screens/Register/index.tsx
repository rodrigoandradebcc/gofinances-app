import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';
import { Button } from '../../components/Forms/Button/input';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import * as Styled from './styles';

interface FormData {
    name: string;
    amount: string;
}

export function Register(){
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const {
        control, handleSubmit
    } = useForm()

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    function handleCLoseSelectCategory() {
        setCategoryModalOpen(false)
    }

    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }

    function handleRegister(form: FormData){
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
        }

        console.log(data)
    }

    return (
        <Styled.Container>
            <Styled.Header>
                <Styled.Title>Cadastro</Styled.Title>
            </Styled.Header>
            <Styled.Form>
                <Styled.Fields>
                    <InputForm placeholder="Nome" name="name" control={control}/>

                    <InputForm placeholder="Preço" name="amount" control={control}/>

                    <Styled.TransactionTypes>
                        <TransactionTypeButton title="Income" type="up" onPress={() => handleTransactionsTypeSelect('up')} isActive={transactionType === 'up'} />
                        <TransactionTypeButton title="Outcome" type="down" onPress={() => handleTransactionsTypeSelect('down')} isActive={transactionType === 'down'} />
                    </Styled.TransactionTypes>

                    <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}/>
                </Styled.Fields>
                
                
                <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>

            </Styled.Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCLoseSelectCategory}/>
            </Modal>

        </Styled.Container>
    )
}