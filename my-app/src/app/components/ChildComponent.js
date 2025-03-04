// import React, { useContext } from 'react';
// import MyContext from '@/app/contexts/MyContext';

// export const ChildComponent = () => {
//   const { sharedState, sharedFunction } = useContext(MyContext);

//   return (
//     <div>
//       <p>{sharedState}</p>
//       <button onClick={sharedFunction}>Click me</button>
//     </div>
//   );
// };

import React, { useContext } from 'react';
import MyContext from '@/app/contexts/MyContext';

export const ChildComponent = () => {
  // const { sharedState, sharedFunction } = useContext(MyContext);

  return (
    <div>
      <p>ChildComponent</p>
      {/* <p>{sharedState}</p>
      <button onClick={sharedFunction}>Click me</button> */}
    </div>
  );
};