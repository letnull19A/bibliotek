import style from './OneForm.module.scss'

type OneFormProps = {
    header: JSX.Element | null,
    content: JSX.Element | null,
    footer: JSX.Element | null
}

export const OneForm = (props: OneFormProps) => {
    return (
        <div className={style.one_form}>
            <div className={style.one_form_header}>
                {props.header}
            </div>
            <div className={style.one_form_content}>
                {props.content}
            </div>
            <div className={style.one_form_footer}>
                {props.footer}
            </div>
        </div>
    )
}