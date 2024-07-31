import { Ghost, Rabbit } from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";

const Button = ({ className, children, isVisible, ...rest }) => {
  return (
    <button className={"m-8 p-4 bg-[olive] rounded-2xl" + className} {...rest}>
      {isVisible ? <Ghost /> : null}
      {children}
    </button>
  );
};

const Todo = ({ onDelete }) => {
  return (
    <div className="flex items-center gap-4">
      <p>Faire des courses</p>
      <button
        onClick={() => {
          console.log("Delete");
          onDelete?.();
        }}
        className="m-8 p-2 bg-[#c2548b] rounded-2xl font-bold"
      >
        Delete
      </button>
    </div>
  );
};

export default function App() {
  // state
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [fetchTodo, setFetchTodo] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prix, setPrix] = useState(1);

  useEffect(() => {
    const onMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((json) => setFetchTodo(json))
      .catch((error) => console.log("Fetch Failed: ", error))
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  // comportements

  // render
  return (
    <div className=" container mx-auto flex flex-col justify-center items-center gap-2">
      <Button
        isVisible={false}
        className="hover:border-solid hover:border-4 hover:bg-white inline-flex"
      >
        <Rabbit size={20} className="mr-2" />
        <span className="font-bold">Rabbit Click</span>
      </Button>

      <Todo
        onDelete={() => {
          console.log("App delete");
        }}
      />

      <pre>{JSON.stringify(mousePosition, null, 2)}</pre>

      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <pre>{JSON.stringify(fetchTodo, null, 2)}</pre>
      )}

      <div className="card bg-base-100 w-96 shadow-xl my-8">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => console.log("KAMDEM/44")}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col justify-center items-center gap-2 mb-8">
        <input
          type="text"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <h1>{prix * 2}</h1>
      </div>
    </div>
  );
}
