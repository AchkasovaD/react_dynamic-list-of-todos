/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos().then(todos => {
      setOriginalTodos(todos);
      setDisplayedTodos(todos);
    });
  }, []);

  function getTodoById(id: number): Todo | undefined {
    return originalTodos.find(todo => todo.id === id);
  }

  const handleCloseModal = () => {
    setSelectedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={originalTodos}
                setDisplayedTodos={setDisplayedTodos}
              />
            </div>

            <div className="block">
              {originalTodos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={displayedTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== null && (
        <TodoModal
          todo={getTodoById(selectedTodoId)!}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
