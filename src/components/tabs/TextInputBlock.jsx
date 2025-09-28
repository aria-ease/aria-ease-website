import * as Block from 'aria-ease/block';
import { useEffect } from 'react';

const TextInputBlock = () => {
  useEffect(() => {
    Block.makeBlockAccessible('text-input-block-div', 'text-input-block-interactive')
  })

  return (
    <div id="text-input-block-div">
        <div className='each-text-input-block-div'>
          <input type="text" placeholder='Name' className='text-input-block-interactive' aria-label='Enter your name'></input>
        </div>
        <div className='each-text-input-block-div'>
          <input name='email' autoComplete='email' type="text" placeholder='Email' className='text-input-block-interactive' aria-label='Enter your email'></input>
        </div>
        <div className='each-text-input-block-div'>
          <input type="tel" placeholder='Phone' className='text-input-block-interactive' aria-label='Enter your phone number'></input>
        </div>
    </div>
  )
}

export default TextInputBlock