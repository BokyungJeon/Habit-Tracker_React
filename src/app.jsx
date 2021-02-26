import React, { Component } from 'react';
import './app.css';
import Habits from './components/habits';
import Navbar from './components/navbar';

class App extends Component {
  state = {
    habits: [
      { id: 1, name: 'Reading', count: 0 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 0 },
    ],
  };

  handleIncrement = (habit) => {
    const habits = this.state.habits.map((item) => {
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
      return item;
    });
    this.setState({ habits });
    // console.log(`handleIncrement ${habit.name}`);
    // 리액트에서는 state를 직접 수정하면 안된다.
    // 배열의 spread operator연산자 [...]을 통해 기존 state.habits의 항목들을 복사한다.
    // const habits = [...this.state.habits];
    // const index = habits.indexOf(habit);
    // habits[index].count++;
    // this.setState({ habits });
    // 이것도 state를 직접 변경하므로 옳지 않다. 추후에 설명.
    // habits: habits 키와 값으로 들어가는 로컬벨류의 이름이 같은 경우 하나로 생략 가능.
  };

  handleDecrement = (habit) => {
    const habits = this.state.habits.map((item) => {
      if (item.id === habit.id) {
        const count = habit - 1;
        return { ...habit, count: count < 0 ? 0 : count };
      }
      return item;
    });
    this.setState({ habits });
    // console.log(`handleDecrement ${habit.name}`);
    // const habits = [...this.state.habits];
    // const index = habits.indexOf(habit);
    // const count = habits[index].count - 1;
    // habits[index].count = count < 0 ? 0 : count;
    // this.setState({ habits });
  };

  handleDelete = (habit) => {
    console.log(`handleDelete ${habit.name}`);
    // filter: 특정한 것을 제외 또는 포함하여 새로운 배열을 만드는 배열의 API
    const habits = this.state.habits.filter((item) => item.id !== habit.id);
    this.setState({ habits });
  };

  handleAdd = (name) => {
    const habits = [...this.state.habits, { id: Date.now(), name, count: 0 }];
    this.setState({ habits });
  };

  handleReset = () => {
    const habits = this.state.habits.map((habit) => {
      if (habit.count !== 0) {
        return { ...habit, count: 0 };
      }
      return { ...habit };
    });
    this.setState({ habits });
    // const habits = this.state.habits.map((habit) => {
    //   habit.count = 0;
    //   return habit;
    // });
    // this.setState({ habits });
  };

  render() {
    return (
      <>
        <Navbar
          totalCount={this.state.habits.filter((item) => item.count > 0).length}
        />
        <Habits
          habits={this.state.habits}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
          onAdd={this.handleAdd}
          onReset={this.handleReset}
        />
      </>
    );
  }
}

export default App;
