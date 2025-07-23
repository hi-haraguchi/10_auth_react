import React from 'react'

const RecordForm = () => {
  return (
    <div>

  <form action="feelings_create.php" method="POST">
    <fieldset>
      <legend>ヴィンランド・サガに関する感想入力画面</legend>
      <div>
        話数: <input type="number" name="episode_number" />
      </div>
      <div>
        タイトル: <input type="text" name="episode_title" />
      </div>
      <div>
        感想: <input type="text" name="comments" />
      </div>            
      <div>
        <button>送信します</button>
      </div>
    </fieldset>
  </form>


    </div>
  )
}

export default RecordForm