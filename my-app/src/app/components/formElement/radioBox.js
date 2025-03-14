import { useState, useEffect } from 'react'
import './formElement.scss'
export const RadioBox = ({ config, keyName, value, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(value);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    /* wtest *
    useEffect(() => {
        setSelectedOption(value);
    }, [value]);
    /* /wtest */
    useEffect(() => {
        console.log('selectedOption changed', selectedOption)
        onChange(selectedOption)
    }, [selectedOption])
    return (
        <>
            {/* <p>{JSON.stringify(config)}</p> */}
            {/* 标题输入框 */}
            <label className="block">
                <span className="text-lg font-medium">{config.title}:</span>
                {/* <p>{value}, {selectedOption}</p> */}
                <div className="area-options">
                    {
                        config.options.map(item => (
                            <label key={item.lvl} >
                                {/* for={item.lvl} */}
                                <input
                                    type="radio"
                                    id={item.lvl}
                                    name={keyName}
                                    value={item.name}
                                    checked={selectedOption === item.name}
                                    onChange={handleOptionChange} />{item.name}
                            </label>
                        ))
                    }
                </div>
                
            </label>
        </>
    )
}


// {/* <input
//                     type="text"
//                     id={keyName}
//                     // {...register("title", { required: true })}
//                     {...register(keyName)}
//                     className="mt-1 p-2 w-full border rounded"
//                     placeholder="Enter title..."
//                 /> */}

// import React, { useState } from 'react';

// export const RadioBox = () => {
//     const [selectedOption, setSelectedOption] = useState('');

//     const handleOptionChange = (event) => {
//         setSelectedOption(event.target.value);
//     };
    

//     return (
//         <div>
//             <input
//                 type="radio"
//                 id="option1"
//                 name="option"
//                 value="value1"
//                 checked={selectedOption === 'value1'}
//                 onChange={handleOptionChange}
//             />
//             <label for="option1">选项 1</label><br />
//             <input
//                 type="radio"
//                 id="option2"
//                 name="option"
//                 value="value2"
//                 checked={selectedOption === 'value2'}
//                 onChange={handleOptionChange}
//             />
//             <label for="option2">选项 2</label><br />
//             <input
//                 type="radio"
//                 id="option3"
//                 name="option"
//                 value="value3"
//                 checked={selectedOption === 'value3'}
//                 onChange={handleOptionChange}
//             />
//             <label for="option3">选项 3</label>
//             <p>选中的值是：{selectedOption}</p>
//         </div>
//     );
// };
