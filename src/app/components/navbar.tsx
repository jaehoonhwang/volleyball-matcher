"use client";

import { useState, useEffect } from "react";
import TeamRng from "./teamRng";

/**
 * HashContentRenderer Component
 * Renders different content based on the URL hash fragment (e.g., #home, #about).
 * It listens for hash changes and updates the displayed content accordingly.
 */
export default function NavBar() {
  // State to store the current hash fragment (e.g., 'home', 'about', or empty string)
  const [currentHash, setCurrentHash] = useState("");

  // useEffect hook to run on component mount and when the hash changes
  useEffect(() => {
    // Function to update the currentHash state based on window.location.hash
    const handleHashChange = () => {
      // Remove the '#' prefix from the hash
      setCurrentHash(window.location.hash.substring(1));
    };

    // Set the initial hash when the component mounts
    handleHashChange();

    // Add event listener for 'hashchange' event
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup function: remove event listener when the component unmounts
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []); // Empty dependency array means this effect runs only once on mount and cleanup on unmount

  // Function to render content based on the current hash
  const renderContent = () => {
    switch (currentHash) {
      case "team-generator":
        return <TeamRng />;
      case "tournament-generator":
        return (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">
              Tournament Generator Section
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Here you can manage and create your tournament brackets and
              schedules.
            </p>
            <img
              src="https://placehold.co/400x200/90EE90/000000?text=Tournament+Generator+Content"
              alt="Tournament Generator Placeholder"
              className="mt-4 rounded-md shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/400x200/90EE90/000000?text=Image+Load+Error";
              }}
            />
          </div>
        );
      case "misc":
        return (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-400 mb-4">
              Miscellaneous Section
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Any other tools or utilities can go here.
            </p>
            <img
              src="https://placehold.co/400x200/DDA0DD/000000?text=Misc+Content"
              alt="Misc Placeholder"
              className="mt-4 rounded-md shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/400x200/DDA0DD/000000?text=Image+Load+Error";
              }}
            />
          </div>
        );
      default:
        return <TeamRng />;
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
      {/* Navigation Links */}
      <nav className="mb-8 flex flex-wrap justify-center gap-4">
        <a
          href="#team-generator"
          className={`py-2 px-6 rounded-full text-lg font-medium transition duration-300 ease-in-out
                      ${
                        currentHash === "team-generator"
                          ? "bg-blue-600 text-white shadow-lg dark:bg-blue-500"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600"
                      }`}
        >
          Team Generator
        </a>
        <a
          href="#tournament-generator"
          className={`py-2 px-6 rounded-full text-lg font-medium transition duration-300 ease-in-out
                      ${
                        currentHash === "tournament-generator"
                          ? "bg-green-600 text-white shadow-lg dark:bg-green-500"
                          : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-gray-700 dark:text-green-300 dark:hover:bg-gray-600"
                      }`}
        >
          Tournament Generator
        </a>
        <a
          href="#misc"
          className={`py-2 px-6 rounded-full text-lg font-medium transition duration-300 ease-in-out
                      ${
                        currentHash === "misc"
                          ? "bg-purple-600 text-white shadow-lg dark:bg-purple-500"
                          : "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600"
                      }`}
        >
          Misc
        </a>
      </nav>

      {/* Content Area */}
      <div className="mt-8 p-4 border-t-2 border-gray-200 dark:border-gray-700">
        {renderContent()}
      </div>
    </div>
  );
}
