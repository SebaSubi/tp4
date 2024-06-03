import { useEffect, useRef, useState } from "react";
import { getNumberById, putNumber } from "../server/counter";


export default function Counter(
  { id,
    colour
   }:
  { id: string,
    colour: string
   }
) { //We pass as atributes the id of the counter and the color selected by the user
  const [number, setNumber] = useState<any>() // useState that will keep the value of the number and update it

  useEffect(() => { //We make sure every time number is changes, it updates the value in the DB
    getAndUpdate()
  }, [number]);

  async function getAndUpdate() {

    const number = await getNumberById(id); //We get the current number of the counter
    setNumber(number.number); // Set the counters number as the number shown on screen

  } 

  async function handleAdd() {
    await getAndUpdate() //You do it before to make sure if anyone has updated it, it shows in your screen
    await putNumber(number + 1, id) //Update the value of number in the db
    await getAndUpdate() //Get the new value of the number, you could do this localy, i do another get to make sure, again, nobody has updated it
  }

  async function handleSubtract() { //Same as on top but substracting
    await getAndUpdate() 
    await putNumber(number - 1, id)
    await getAndUpdate()
  }

  return (
    <main className="p-1 rounded-sm">
      <div className={`flex justify-center items-center p-1 ${colour} rounded-md`}>
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleSubtract}
          >
            -
          </button>
          <span className="text-2xl font-bold min-w-[50px] text-center">{number}</span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
      </div>
    </main>
  );
}