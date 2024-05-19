import React, { useEffect, useState } from "react";

const ContributorList = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/Harshu467/ChatBox/contributors"
    )
      .then((response) => response.json())
      .then((data) => setContributors(data))
      .catch((error) => console.error("Error fetching contributors:", error));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-indigo-600 text-white p-6 text-center shadow-lg">
        <h1 className="text-4xl font-bold">Contributors</h1>
      </header>
      <main className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {contributors.map((contributor) => (
              <div
                key={contributor.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
              >
                <div className="bg-indigo-100 p-4">
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-32 h-32 rounded-full mx-auto"
                  />
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-xl font-semibold">{contributor.login}</h2>
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:text-indigo-700 mt-4 block"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContributorList;
