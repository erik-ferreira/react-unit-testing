import { useState } from "react";

interface ListProps {
  initialNames: string[];
}

export function List({ initialNames }: ListProps) {
  const [newName, setNewName] = useState("");
  const [listNames, setListNames] = useState(initialNames);

  function addToList() {
    setTimeout(() => {
      setListNames((state) => [...state, newName]);
    }, 500);
  }

  function removeFromList(name: string) {
    setTimeout(() => {
      setListNames((state) => state.filter((nameList) => nameList !== name));
    }, 500);
  }

  return (
    <>
      <input
        placeholder="Novo nome"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {listNames.map((name) => (
          <li key={name}>
            {name}
            <button onClick={() => removeFromList(name)}>Remover</button>
          </li>
        ))}
      </ul>
    </>
  );
}
