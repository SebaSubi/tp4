"use client"
import { Suspense, useEffect, useState } from "react";
import { deleteNumber, getAllNumbers, postNumber, putNumber } from "./server/counter";
import Counter from "./components/Counter";

const bgColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500'
]; //We define an array of colour for the menu, so the user can select which colour they want their counter to be. You can add more if you wish

export default function Home() {
  const [counterArray, setCounterArray] = useState<any[]>([]) //This useState updates the array with all the created counters, 
  const [colorMenu, setColorMenu] = useState(false) //useState used to make the color menu appear or disappear
  const [maxCounters, setMaxCounter] = useState(false) //This is to see if we hace reached the max counters, which is 10

  useEffect(() => {
    const fetchNumber = async () => {
      const array = await getAllNumbers(); //Get the array of already created counters
      setCounterArray(array) //We initialize the value of counterArray with any counters that have already been created
      
    };
    fetchNumber(); //Call the function
  }, []);

  useEffect(() => {
    // This effect will run whenever counterArray changes to meake sure the limit of 10 hastn been reached
    if (counterArray.length >= 10) { 
      setMaxCounter(true);
    }
  }, [counterArray]);  

  async function addCounter(colour: string) { //This is the function that is called when the user adds a counter and selects a colour
    const id = await postNumber(0, colour); //We post in the DB the new counter with the initial value of 0, and the colour selected by the user
    setCounterArray(prevCounterArray => [...prevCounterArray, id]) //Properly update the counterArray with the new value that has just been added
    if(counterArray.length >= 9) {
      setMaxCounter(true)
    } 
  }

  async function deleteCounter(id: string) {
    deleteNumber(id) // Delete the number from the db
    setCounterArray(prevCounterArray => prevCounterArray.filter(counter => counter._id !== id)); //Delete the number from the array
    setMaxCounter(false)
  }



  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
    {counterArray.length ? ( //We make sure the counterArray isnt empty
        <div className="flex flex-col items-center justify-center bg-black rounded-sm">
          {counterArray.map((counter, index) => (
            <i key={index} onClick={() => { 
              if(maxCounters) {
                deleteCounter(counter._id)
              }
            }}>
              <Counter id={counter._id} key={index} colour={counter.colour} /> {/* For each of the counters inside the array, we create a component Counter with the id of the counter, and the color selected by the user*/}
            </i>
          ))}
        </div>
    ) : null}
    {maxCounters?
      <>
        <p className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Max counters reached, click on the counter you wish to remove</p>
        {/* <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none" onClick={() => {setColorMenu(!colorMenu)}}>
          Remove Counter
        </button>  */}
      </>
      :
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none" onClick={() => {setColorMenu(!colorMenu)}}>
        Add Counter
      </button> 
    }
    
    {colorMenu? // Verifies if the user clicked the Add Counter
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center h-1/6 w-40 bg-white rounded-md shadow-lg">
      <h2 className="text-black text-xl font-semibold mb-4">Which color would you like?</h2>
      <div className="flex flex-wrap justify-center w-full">
        {bgColors.map((colour, index) => ( // List all the colours inside the array, and create a button with each
          <button
            className={`p-2 w-8 h-8 rounded-full ${colour}`}
            onClick={() => {
              addCounter(colour) // When the user clicks, a new counter is created with the color selected 
              setColorMenu(false)
            }}
            key={index}
            title={colour.replace('bg-', '')} // Decoration to make it look better
          />
        ))}
      </div>
    </div>
    : 
    null}
  </main>
  );
}


