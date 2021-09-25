import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Button } from '../../components/Forms/Button/input';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import * as Styled from './styles';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe o valor númerico').
    positive('O valor não pode ser negativo').
    required('O valor é obrigatório')
}).required();

export function Register(){
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

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
        if(!transactionType)
            return Alert.alert('Selecione o tipo de transação');

            
        if(category.key === 'category')
            return Alert.alert('Selecione a categoria')

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
        }

        console.log(data)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <Styled.Container>
            <Styled.Header>
                <Styled.Title>Cadastro</Styled.Title>
            </Styled.Header>
            <Styled.Form>
                <Styled.Fields>
                <InputForm
                    name="name"
                    control={control}
                    placeholder="Nome"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.name && errors.name.message}
                    />

                <InputForm
                    name="amount"
                    control={control}
                    placeholder="Valor"
                    keyboardType="numeric"
                    error={errors.amount && errors.amount.message}
                />

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
        </TouchableWithoutFeedback>

    )
}