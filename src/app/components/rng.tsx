"use client";

import { useState, useEffect } from "react";

const buttonLabel = "Generate Team Sequence";

const Rng = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [numberOfPeople, setNumberOfPeople] = useState(13);
  const [netCount, setNetCount] = useState(2);
  /**
   * Shuffles the elements of an array and returns a new shuffled array.
   * This function does not modify the original array (it is immutable).
   * @param array The array to shuffle.
   * @returns A new array with the elements in a random order.
   */
  function shuffle<T>(array: T[]): T[] {
    // 1. Create a copy of the original array to avoid mutation.
    const newArray = [...array];

    // 2. Loop from the last element down to the second.
    for (let i = newArray.length - 1; i > 0; i--) {
      // 3. Pick a random index from 0 to i (inclusive).
      const j = Math.floor(Math.random() * (i + 1));

      // 4. Swap the element at the random index `j` with the current element `i`.
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }

  const generateSequence = () => {
    const peopleArray = [];
    for (let i = 0; i < numberOfPeople; i++) {
      peopleArray.push((i % netCount) + 1);
    }

    setSequence(shuffle(peopleArray));
  };

  useEffect(() => {
    generateSequence();
  }, []); // Empty dependency array ensures this runs only once on the client after initial render

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Random Team Generator
        </h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="number_of_people"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Number of People
            </label>
            <input
              id="number_of_people"
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(parseInt(e.target.value, 10))}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="net_count"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Net Count
            </label>
            <input
              id="net_count"
              type="number"
              value={netCount}
              onChange={(e) => setNetCount(parseInt(e.target.value, 10))}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <button
          onClick={generateSequence}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {buttonLabel}
        </button>

        {sequence.length > 0 && (
          <div className="pt-4">
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
              Team Sequences:
            </h2>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {sequence.map((num, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-lg font-mono"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rng;
