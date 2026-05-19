import React from "react";
import Item from "./items";
function List() {
  return (
    <>
      <div className="flex flex-row items-center h-9 justify-center gap-8">
        {Item.map((item) => (
          <div key={item.id}>
            <div className="flex flex-row items-center justify-center text-center gap-3 cursor-pointer">
              <span className="text-2xl text-black">{item.icon}</span>
              <h1 className="capitalize text-2xl text-black relative after:bg-black after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                {item.text}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default List;
