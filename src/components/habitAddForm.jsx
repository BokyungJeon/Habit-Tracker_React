import React, { memo } from 'react';

// memo라는 함수안에 function 컴포넌트를 전달하면 PureComponent처럼 작용
const HabitAddForm = memo((props) => {
  const formRef = React.createRef();
  const inputRef = React.createRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const name = inputRef.current.value;
    name && props.onAdd(name);
    formRef.current.reset();
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="add-input"
        placeholder="Please Add Your Habit"
      />
      <button className="add-button">Add</button>
    </form>
  );
});

export default HabitAddForm;

// // PureComponent는 최상위 데이터가 변하지 않으면 render함수가 호출되지 않음. 즉 re-rendering을 하지 않음.
// class HabitAddForm extends PureComponent {
//   // 리액트에서는 Dom요소를 직접적으로 쓰지 않기 때문에 리액트에서 다른 리액트 요소에 접근하고 싶다면 Ref를 쓴다.
//   formRef = React.createRef();
//   inputRef = React.createRef();

//   onSubmit = (event) => {
//     // 브라우저는 기본적으로 submit이 되면 refresh됨 이것을 막기 위해 event.preventDefault();
//     event.preventDefault();
//     // console.log(this.inputRef.current.value);
//     const name = this.inputRef.current.value;
//     name && this.props.onAdd(name);
//     this.formRef.current.reset();
//   };
//   render() {
//     console.log('habitAddForm');
//     return (
//       <form className="add-form" onSubmit={this.onSubmit}>
//         <input
//           ref={this.inputRef}
//           type="text"
//           className="add-input"
//           placeholder="Please Add Your Habit"
//         />
//         <button className="add-button">Add</button>
//       </form>
//     );
//   }
// }

// export default HabitAddForm;
