import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input/input";
import * as S from "./styles";

interface Props extends TextInputProps {
    control: Control
    name: string;
    error: string;
}

export function InputForm({control,name,error,...rest}:Props){
    return (
        <S.Container>
            <Controller control={control} name={name} render={({field: {onChange, value}}) => (
                <Input {...rest} onChangeText={onChange} value={value}/>
            )}/>
            {error && <S.Error>{error}</S.Error>}
        </S.Container>
    )
}