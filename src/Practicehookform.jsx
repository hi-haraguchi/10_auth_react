import { useForm } from 'react-hook-form';
import "./Practicehookform.css";

const Practicehookform = () => {

const {
    register,
    handleSubmit,
    watch,
    formState : {errors},
    } = useForm({mode:"onBlur"});

    const watchedTitle = watch("title");
    const watchedStart = watch("start");
    const watchedEnd = watch("end");
    const watchedImpressive = watch("impressive");
    const watchedPage = watch("page");
    const watchedTag = watch("tag");

    const onSubmit = (data) => {
        console.log(data);
    }

    const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
    };

    const todayDate = getTodayDateString();

    return (
    <div>
        <h4>読んだ本の記録</h4>

        <ul>
            <li>すべての項目を必須に（欠けていると送信できない）</li>
            <li>明日以降の日付の入力は ✕</li>
            <li>終了日が開始日より前は ✕</li>
            <li>「感じたこと」は25字以内で</li>
            <li>ページ数は１以上の数字で（最小値を１に設定）</li>
        </ul>

    
    <form onSubmit = {handleSubmit(onSubmit)}>
        <div>
            <p>読んだ本のタイトルを入力してください。</p>
            <input 
            type="text" 
            id="title" 
            {...register("title", {required:"この項目は必須です。"})} />
            <span className="error-message">{errors.title?.message}</span>
        </div>

        <div>
            <p>読み始めた日を入力してください。</p>
            <input 
            type="date" 
            id="start" 
            {...register("start", {
                required:"この項目は必須です。",
                validate: (value) => {
                    if (value > todayDate) { 
                return "明日以降の日付は入力できません。";
                }
                return true;
            }
            })}/>
            <span className="error-message">{errors.start?.message}</span>          
        </div>

        <div>
            <p>読み終わった日を入力してください。</p>
            <input 
            type="date" 
            id="end"  
            {...register("end", {
                required:"この項目は必須です。",
                validate: (value) => {
                    if (value > todayDate) { 
                return "明日以降の日付は入力できません。";
                }
                else if (value < watchedStart){
                return "開始日より前の日付は入力できません。";
                }              
            return true;
            }
            })}/>
            <span className="error-message">{errors.end?.message}</span>           
        </div>

        <div>
            <p>印象的だった部分や感じたことを１つだけ記録してください。</p>
            <input 
            type="text" 
            id="impressive"  
            {...register("impressive", {
                required:"この項目は必須です。",
                maxLength : {value:25, message:"25文字以内で入力してください"}
                })}/>
            <span className="error-message">{errors.impressive?.message}</span>  
        </div>

        <div>
            <p>その部分のページを入力してください。</p>
            <input 
            type="number" 
            id="page"
            step="1"  
            {...register("page", {
                required:"この項目は必須です。",
                min: {value: 1, message: "1以上の数字を入力してください。" }
                })}/>
            <span className="error-message">{errors.page?.message}</span>  
        </div>

        <div>
            <p>検索しやすいようにタグ付けしてください。</p>
            <input 
            type="text" 
            id="tag"  
            {...register("tag", {required:"この項目は必須です。"})}/>
            <span className="error-message">{errors.tag?.message}</span>  
        </div>

        <button type='submit'>送信</button>

    </form>


        <hr />
        <p> {watchedTitle} </p>
        <p>{watchedStart}~{watchedEnd}  </p>
        <p>{watchedImpressive}  </p>
        <p> p{watchedPage} </p>
        <p>#{watchedTag}  </p>
                        

    </div>
    )
}

export default Practicehookform