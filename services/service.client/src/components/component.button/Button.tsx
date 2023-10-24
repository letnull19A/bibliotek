type ButtonProps = {
    text: string,
    className: string
}

export const Button = (props: ButtonProps) => {
    return (
        <button className={props.className}>{props.text}</button>
    )
}