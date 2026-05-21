import { useEffect, useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (inputValue.length === 0) {
      setResults(null);
    } else {
      fetch(`http://localhost:3333/products?search=${inputValue}`)
        .then((r) => r.json())
        .then((data) => {
          setResults(data);
        })
        .catch((error) => console.error(error));
    }
  }, [inputValue]);

  return (
    <>
      <div>
        <h2>Cerca: </h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div>
        {results && (
          <ul>
            {results.length === 0 ? (
              <li>Nessun risultato</li>
            ) : (
              results.map((r) => (
                <li key={r.id}>
                  {r.brand} - {r.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
