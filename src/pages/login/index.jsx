import React from 'react'
import { useForm } from 'react-hook-form';

const Login = () => {

  const {
    register,
    handleSubmit,
    formState : {errors},
    } = useForm({mode:"onBlur"});

  const onSubmit = (data) => {
        console.log(data);
    }


  return (
    <>
    
    <form onSubmit = {handleSubmit(onSubmit)}>
        <div>
            <p>巻数を入力してください。</p>
            <input 
            type="number" 
            id="volume"
            step="1"  
            {...register("volume", {
                required:"この項目は必須です。",
                min: {value: 1, message: "1以上の数字を入力してください。" },
                pattern:{value: /^[0-9]+$/,message: "整数を入力してください。"}
                })}/>
            <span className="error-message">{errors.volume?.message}</span>  
        </div>




        <div>
            <p>その巻の最初の話のタイトルを入力してください。</p>
            <input 
            type="text" 
            id="title"  
            {...register("title", {
                required:"この項目は必須です。",
                maxLength : {value:12, message:"25文字以内で入力してください"}
                })}/>
            <span className="error-message">{errors.title?.message}</span>  
        </div>

        <button type='submit'>送信</button>

    </form>

    </>
  )
}

export default Login