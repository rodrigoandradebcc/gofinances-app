import React from 'react';
import * as S from './styles';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';


export function SignIn(){
    return(
        <S.Container>
            <S.Header>
                <S.TitleWrapper>
                    <LogoSvg width={RFValue(120)} height={RFValue(68)}/>

                    <S.Title>
                        Controle suas{'\n'}
                        finanças de forma{'\n'}
                        muito simples
                    </S.Title>

                    <S.SignInTitle>
                        Faça seu login com{'\n'}
                        umas das contas abaixo
                    </S.SignInTitle>
                </S.TitleWrapper>
            </S.Header>
            <S.Footer />
        </S.Container>
    )
}