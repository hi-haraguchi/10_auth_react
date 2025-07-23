import React,{useState} from 'react'

const Form = () => {

    const [name, setName] = useState("名前");
    const [email, setEmail] = useState("メールアドレス"); 

    const handleNameChange = (event) => {
        console.log(event,"中身チェック")
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        console.log(event,"中身チェック")
        setEmail(event.target.value);
    }

    return (
    <div>
    
        <div>
            <p>名前を入力してください</p>
            <input type="text" onChange={handleNameChange} value={name}/>
        </div>

        <div>
            <p>メールアドレスを入力してください</p>
            <input type="text" onChange={handleEmailChange} value={email}/>
        </div>

        <hr />
        <p>入力した名前：{name}  </p>
        <p>入力したメールアドレス：{email}  </p>

    </div>
    )
}

export default Form