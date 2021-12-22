import React, {useContext} from 'react';
import * as S from './styles';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Footer } from '../../components/HighlightCard/styles';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';


export function SignIn(){
    const {user} = useAuth();
    console.log(user);
    
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
            <S.Footer>
                <S.FooterWrapper>
                    <SignInSocialButton title="Entrar com Google" svg={GoogleSvg}/>
                    <SignInSocialButton title="Entrar com Apple" svg={AppleSvg}/>
                </S.FooterWrapper>
            </S.Footer>
        </S.Container>
    )
}