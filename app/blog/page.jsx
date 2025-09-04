import Link from "next/link";
import React from "react";

const data = await fetch("http://localhost:1337/api/articles?populate=*", {
  cache: "no-store",
});

const response = await data.json();

console.log(response);

const page = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header Section */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-gray-400 mt-3 text-lg">
            Latest articles and insights
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:gap-10">
          {response.data &&
            response.data.map((article) => {
              return (
                <article
                  key={article.id}
                  className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:bg-gray-900/60 hover:border-gray-700/60 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-950/50"
                >
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    {/* Article Title */}
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 group-hover:text-gray-100 transition-colors duration-300">
                      {article.title}
                    </h2>
                    
                    {/* Article Description */}
                    <p className="text-gray-400 text-lg leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                      {article.description}
                    </p>
                    
                    {/* Article Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                          <Link href={`/blogpost/${article.slug}`}>{article.slug}</Link>
                        </span>
                      </div>
                      
                      <time className="text-sm text-gray-500 font-medium">
                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                  
                  {/* Hover effect indicator */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </article>
              );
            })}
        </div>
        
        {/* Empty state */}
        {(!response.data || response.data.length === 0) && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No articles yet</h3>
            <p className="text-gray-500">Check back later for new content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;