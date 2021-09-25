import React from "react";
import * as S from "./styles";

interface Props {
    title: string;
}

export function CategorySelect({title}:Props){
    return (
        <S.Container>
            <S.Category>{title}</S.Category>
            <S.Icon name="chevron-down"/>
           
        </S.Container>
    )
}