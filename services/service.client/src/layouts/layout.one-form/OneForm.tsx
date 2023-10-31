import { isValidElement } from 'react'
import { Children } from '../../types'
import style from './OneForm.module.scss'
import { Content, Footer, Header } from '../../components'

type OneFormProps = {
    children: Array<Children>
}

export const OneForm = (props: OneFormProps) => {

    let headerElement: Children = <></>
    let contentElement: Children = <></>
    let footerElement: Children = <></>

    props.children.forEach((child) => {
        if (isValidElement(child) && typeof child?.type === 'function') {
          switch (child.type.name) {
            case Header.name:
              headerElement = child
              break
            case Content.name:
              contentElement = child
              break
            case Footer.name:
              footerElement = child
              break
            default:
              break
          }
        }
      })

    return (
        <div className={style.one_form}>
            <div className={style.one_form_header}>
                {headerElement}
            </div>
            <div className={style.one_form_content}>
                {contentElement}
            </div>
            <div className={style.one_form_footer}>
                {footerElement}
            </div>
        </div>
    )
}