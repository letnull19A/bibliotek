import { Header } from '..'
import { OneForm } from '../../layouts'
import style from './App.module.scss'

function App() {

  return (
    <div className={style.app}>
      <OneForm 
        header={<Header className=''/>} 
        menu={null} 
        content={null} 
        footer={null}/>
    </div>
  )
}

export default App
