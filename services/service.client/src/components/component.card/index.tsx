import { Children } from '../../types'
import style from './style.module.scss'

type CardProp = {
    children: Children
    className?: string
}

export const Card = (props: CardProp) => {
    return (
        <div className={props.className + ' ' +style.card}>
            {props.children}
        </div>
    )
}