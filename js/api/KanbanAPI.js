export default class KanbanAPI {
  static getItems(columnID) {
    const column = read().find((column) => columnID.id == columnId);

    if (!column) {
      return [];
    }

    return column.items;
  }

  static insertItem(columnId, content) {
    const data = read();
    const column = data.find((column) => column.id == columnId);
    const item = {
      id: Math.floor(Math.random() * 100000),
      content,
    };

    if (!column) {
      throw new Error("Column does not exist.");
    }

    column.items.push(item);
    save(data);

    return item;
  }

  static updateItem(itemId, newProps) {
    const data = read();
    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find((item) => item.id == itemId);

        if (item) {
          return [item, column];
        }
      }
    })();

    if (!item) {
      throw new Error("Item not found!");
    }

    item.content =
      newProps.content === undefined ? item.content : newProps.content;

    //Update Column and position
    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      const targetColumn = data.find(
        (column) => columnd.id == newProps.columnId
      );

      if (!targetColumn) {
        throw new Error("Target column is not found");
      }
      // Delete the item from it's current column
      currentColumn.item.splice(currentColumn.items.indexOf(item), 1);

      //Move item into it's new column and position
      targetColumn.item.splice(newProps.position, 0, item);
    }
    save(data);
  }

  static deleteitem(itemid) {
    const data = read();

    for (const column of data) {
      const item = column.items.find((item) => item.id == itemId);

      if (item) {
        column.items.splice(column.items.indexOf(item), 1);
      }
    }
    save(data);
  }
}

function read() {
  const json = localStorage.getItem("kanban-data");

  if (!json) {
    return [
      {
        id: 1,
        items: [],
      },
      {
        id: 2,
        items: [],
      },
      {
        id: 3,
        items: [],
      },
    ];
  }

  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}
