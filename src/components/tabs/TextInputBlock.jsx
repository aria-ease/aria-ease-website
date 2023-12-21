import { makeBlockAccessible } from 'aria-ease'
import { useEffect } from 'react'

const TextInputBlock = () => {
  useEffect(() => {
    makeBlockAccessible('text-input-block-div', 'text-input-block-interactive')
  })

  return (
    <div id="text-input-block-div">
        <div className='each-text-input-block-div'>
          <input type="text" placeholder='Name' className='text-input-block-interactive'></input>
        </div>
        <div className='each-text-input-block-div'>
          <input type="text" placeholder='Email' className='text-input-block-interactive'></input>
        </div>
        <div className='each-text-input-block-div'>
          <input type="text" placeholder='Phone' className='text-input-block-interactive'></input>
        </div>
    </div>
  )
}

export default TextInputBlock