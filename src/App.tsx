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

export default function App() {
  // state
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const onMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    return;
  }, []);

  // comportements

  // render
  return (
    <div className=" container flex flex-col justify-center items-center gap-2">
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

      <pre>{JSON.stringify(mousePosition)}</pre>
    </div>
  );
}

const Todo = ({ onDelete }) => {
  return (
    <div className="flex items-center gap-4">
      <p>Faire des courses</p>
      <button
        onClick={() => {
          console.log("Delete");
          onDelete?.();
        }}
        className="m-8 p-4 bg-[#c2548b] rounded-2xl font-bold"
      >
        Delete
      </button>
    </div>
  );
};
