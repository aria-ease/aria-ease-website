import React from 'react';
import * as Checkbox from 'aria-ease/checkbox';
import { useEffect } from 'react';
import './checkbox.css'

const CheckboxExample = () => {
    useEffect(() => {
        const checkboxInstance = Checkbox.makeCheckboxAccessible({
            checkboxGroupId: 'checkbox-div',
            checkboxesClass: 'checkbox'
        });

        // Clean up on unmount
        return () => checkboxInstance.cleanup();
    }, []);

    useEffect(() => {
        const checkboxInstance = Checkbox.makeCheckboxAccessible({
            checkboxGroupId: 'custom-checkbox-div',
            checkboxesClass: 'checkbox'
        });

        // Clean up on unmount
        return () => checkboxInstance.cleanup();
    }, []);

  return (
    <>
        <div id='checkbox-div'>
            <div>
                <label htmlFor='math'>Math:</label>
                <input type='checkbox' name='math' id='math' className='checkbox' aria-label='Add Math to list of courses' />
            </div>

            <div>
                <label htmlFor='biology'>Biology:</label>
                <input type='checkbox' name='biology' id='biology' className='checkbox' aria-label='Add Biology to list of courses' />
            </div>

            <div>
                <label htmlFor='philosophy'>Philosophy:</label>
                <input type='checkbox' name='philosophy' id='philosophy' className='checkbox' aria-label='Add Philosophy to list of courses' />
            </div>
        </div>
        
        <div>
            <h3 id="id-group-label">Sandwich Condiments</h3>
            <div aria-labelledby="id-group-label" id="custom-checkbox-div">
                <ul className="checkboxes">
                    <li><div className='checkbox'>Lettuce</div></li>
                    <li><div className='checkbox'>Tomato</div></li>
                    <li><div className='checkbox'>Mustard</div></li>
                    <li><div className='checkbox'>Sprouts</div></li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default CheckboxExample