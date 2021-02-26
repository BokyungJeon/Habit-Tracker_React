import React, { useCallback, useEffect, useRef, useState } from 'react';

// 리액트 훅 - 기존의 함수형 컴포넌트에서 state와 lifecycle메소드를 활용할 수 있게 만듦
const SimpleHabit = () => {
  // state = {
  //     count: 0,
  //   };
  const [count, setCount] = useState(0);
  const spanRef = useRef();
  // React.createRef(); 사용하면 state가 변경될때마다 코드블럭이 반복실행되고 createRef는 계속 호출되면서 새로운 레퍼런스를 만들어 새로이 할당
  // 리액트 훅에 useRef를 사용해 한번만 만들어 메모리에 저장해놓고 그 것을 재사용함
  // handleIncrement같은 콜백함수도 메모리에 저장하여 재사용 가능
  // 함수가 호출될 때마다 handleIncrement함수가 새로 만들어지니까 onClick에 계속 새로운 함수가 할당됨
  // 만약 자식 컴포넌트에 onClick의 prop에 새로운 콜백이 전달되면 memo라는 캐시컴포넌트를 써도 prop함수 자체가 변경되기 때문에 계속 업데이트되는 부작용이 있음
  // 이를 방지하기 위해 useCallback을 사용하면 자동으로 리액트가 캐시해서 반복해서 호출해도 동일한 함수를 전달함.
  // 리액트 훅을 사용하면서 조심해야할 점은 나중에 프로젝트 하면서 강의.
  const handleIncrement = useCallback(() => {
    setCount(count + 1);
  });

  // useEffect()는 컴포넌트가 마운트되었을 때 한 번, 그 후 업데이트가 될 때마다(state나 props 변경) 호출됨. 둘 다의 경우에 필요할 때 따로 안쓰고 useEffect안에 콜백함수를 한 번만 적어 사용할 수 있음
  // , [변경값1, 변경값2]를 사용해 컴포넌트가 처음 마운트되었을 때만 데이터를 받아오고 그 후 두번째 인자[]에 해당하는 값이 변경되었을 때만 호출되도록 만들 수 있다.
  // , []로 빈 배열을 전달하면 처음마운트 될 때만 호출된다.
  useEffect(() => {
    console.log(`mounted & updated!: ${count}`);
  }, [count]);

  return (
    <li className="habit">
      <span ref={spanRef} className="habit-name">
        Reading
      </span>
      <span className="habit-count">{count}</span>
      <button className="habit-button habit-increase" onClick={handleIncrement}>
        <i className="fas fa-plus-square"></i>
      </button>
    </li>
  );
};

export default SimpleHabit;

// class가 한 번 만들어지면 클래스안의 멤버변수들은 클래스가 만들어질 때 딱 한 번만 만들어진다(할당된다).
// 대신에 stete가 변경되거나 props이 업데이트 되면 render함수만 반복해서 호출이 된다.
// 함수형 컴포넌트는 함수이기 때문에 컴포넌트가 변경되면 코드블락{}안의 내용 전체가 반복해서 호출이된다.
// 때문에 함수 내부에 지역변수도 무한 반복해 업데이트 된다.
// useState는 리액트 훅에서 제공하는 API 중 하나로 컴포넌트에 연결된 state는 따로 저장이 되어있어 동일한 값을 받아옴.
