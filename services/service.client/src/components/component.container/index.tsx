import { Children } from '../../types'
import style from './style.module.scss'

type ContainerProp = {
    children: Children
}

export const Container = (props: ContainerProp) => {
    return (
        <div className={style.container}>
            {props.children}
        </div>
    )
}