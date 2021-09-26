import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import * as S from "./styles";

interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
}

export function Button({title, onPress, ...rest}:Props){
    return (
        <S.Container {...rest} onPress={onPress}>
            <S.Title>{title}</S.Title>
        </S.Container>
    )
}