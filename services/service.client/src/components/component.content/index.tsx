import { Children } from '../../types'
import style from './style.module.scss'

type ContentProp = {
    children: Children
}

export const Content = (props: ContentProp) => {
    return (
        <div className={style.content}>
            {props.children}
        </div>
    )
}