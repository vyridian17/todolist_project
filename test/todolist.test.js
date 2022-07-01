const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3])
  });

  test('calling first() returns the first todo item on todo list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last() return the last item on todo list', () => {
    expect(list.last()).toEqual(todo3);
  });

  describe('shift()', () => {
    test('removes the first item in the list', () => {
      list.shift();
      expect(list.toArray()).toEqual([todo2, todo3]);
    });
    test('and returns the first item', () => {
      let todo = list.shift();
      expect(todo).toEqual(todo1);
    })
  });

  describe('pop()', () => {
    test('removes the last item in the list', () => {
      list.pop();
      expect(list.toArray()).toEqual([todo1, todo2]);
    });

    test('and returns the last item', () => {
      let todo = list.pop();
      expect(todo).toEqual(todo3);
    })
  });

  describe('isDone()', () => {
    test('returns true when all items are complete', () => {
      list.toArray().forEach((_, idx) => list.markDoneAt(idx));
      expect(list.isDone()).toBe(true);
    });

    test('returns false when any items is not complete', () => {
      expect(list.isDone()).toBe(false);
    })
  });

  test('passing a non-Todo item into add() throws a TypeError', () => {
    expect(() => list.add('cat')).toThrow(TypeError);
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add(new TodoList()).toThrow(TypeError));
  });

  describe('itemAt()', () => {
    test('returns the todo item at a specified index', () => {
      let todo = list.itemAt(1);
      expect(todo).toEqual(todo2);
    });
    test('throws a ReferenceError at an invalid index', () => {
      expect(() => list.itemAt(-1)).toThrow(ReferenceError);
    })
  });

  describe('markDoneAt()', () => {
    test('sets an item as done at a specified index', () => {
      list.markDoneAt(1);
      expect(todo2.isDone()).toBe(true);
    });
    test('throws a ReferenceError at an invalid index', () => {
      expect(() => list.markDoneAt(-1)).toThrow(ReferenceError);
    })
  });

  describe('markUndoneAt()', () => {
    test('sets an item as undone at a specified index', () => {
      todo2.markDone();
      expect(todo2.isDone()).toBe(true);
      list.markUndoneAt(1);
      expect(todo2.isDone()).toBe(false);
    });
    test('throws a ReferenceError at an invalid index', () => {
      expect(() => list.markUndoneAt(-1)).toThrow(ReferenceError);
    })
  });

  test('markAllDone marks all todos in list done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  describe('removeAt()', () => {
    test('removes a todo item at the specified index', () => {
      list.removeAt(1);
      expect(list.toArray()).toEqual([todo1, todo3]);
    });
    test('throws a ReferenceError at an invalid index', () => {
      expect(() => list.removeAt(-1)).toThrow(ReferenceError);
    })
  });

  describe('toString()', () => {
    test('returns string representation of the list', () => {
      let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
  
      expect(list.toString()).toBe(string);
    }); 

    test('and is correct for completed todos', () => {
      list.markDoneAt(0);
      let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
  
      expect(list.toString()).toBe(string);
    }); 

    test('and is correct when all todos are done', () => {
      list.markAllDone();
      let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
  
      expect(list.toString()).toBe(string);
    }); 
  })
  
  test('forEach() iterates over all elements in the list', () => {
    let listCopy = [];
    list.forEach(todo => listCopy.push(todo));
    expect(listCopy).toEqual([todo1, todo2, todo3])
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });
})
