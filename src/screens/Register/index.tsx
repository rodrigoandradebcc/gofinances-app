import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useNavigation} from '@react-navigation/native';

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

export type NavigationProps = {
    navigate: (screen:string, data?: any) => void;
}
  

export function Register(){
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })

    const dataKey = '@gofinances:transactions';

    const navigation = useNavigation<NavigationProps>();

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

    async function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo de transação');

            
        if(category.key === 'category')
            return Alert.alert('Selecione a categoria')

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = '@gofinances:transactions';

            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTransaction
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset()
            setTransactionType('')
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Listagem')

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível cadastrar")
        }
    }

    useEffect(() => {
        async function loadData(){
            const data = await AsyncStorage.getItem(dataKey);
            console.log(JSON.parse(data!));
        }
        loadData();

        // async function removeAll() {
        //     await AsyncStorage.removeItem(dataKey)
        // }

        // removeAll()
    }, [])

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