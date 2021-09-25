import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Container = styled(TouchableOpacity)<ContainerProps>`
    width: 48%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    /* border: 1.5px solid ${({ theme }) => theme.colors.text}; */

    border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text};

    border-radius: 5px;

    padding: 16px;
    

    ${({isActive, type}) => isActive && type === 'down' && css`
        background: ${({ theme }) => theme.colors.attention_light};
    `};

    ${({isActive, type}) => isActive && type === 'up' && css`
        background: ${({ theme }) => theme.colors.success_light};
    `};
`

interface IconsProps {
    type: 'up' | 'down'
}

interface ContainerProps {
    isActive: boolean
    type: 'up' | 'down'
}

export const Icons = styled(Feather)<IconsProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${({ theme, type }) =>
        type === 'up' ? theme.colors.success : theme.colors.attention
    }
`

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular}
`