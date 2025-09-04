import React from 'react'

const getData = async (slug) => {
  const data = await fetch(`http://localhost:1337/api/articles?sort[0]=title:asc&filters[slug][$eq]=${slug}&status=published&locale[0]=en&populate=*`, {
    cache: "no-store",
  });
  const response = await data.json();
  return response.data[0];
};

const page = async ({ params }) => {
  const article = await getData(params.slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-300 mb-4">Article Not Found</h1>
          <p className="text-gray-500">The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          {/* Back button */}
          <div className="mb-8">
            <a 
              href="/blog" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </a>
          </div>

          {/* Article Meta */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 text-sm">
              <time className="text-gray-400 font-medium">{formattedDate}</time>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full text-xs">
                {article.slug}
              </span>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {article.title}
            </span>
          </h1>

          {/* Article Description */}
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
            {article.description}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article className="prose prose-lg prose-invert prose-gray max-w-none">
          {/* Content Area - You can replace this with your rich text content */}
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 mb-12">
            <div className="text-gray-300 leading-relaxed">
              {/* Placeholder content - replace with your actual content field */}
              <p className="mb-6">
                {article.description}
              </p>
              
              <p className="mb-6">
                The styling is set up to handle various content types with proper typography, spacing, and readability in the dark theme.
              </p>

              {/* If you have a content field, replace the above with: */}
              {/* <div dangerouslySetInnerHTML={{ __html: article.content }} /> */}
              {/* or */}
              {/* {article.content} */}
            </div>
          </div>

          {/* Article Footer */}
          <div className="border-t border-gray-800/50 pt-12">
            <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">About this article</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-gray-400">Published:</span>
                  <span className="text-gray-200 ml-2">{formattedDate}</span>
                </div>
                <div>
                  <span className="text-gray-400">Slug:</span>
                  <span className="text-gray-200 ml-2 font-mono">{article.slug}</span>
                </div>
                <div>
                  <span className="text-gray-400">Last updated:</span>
                  <span className="text-gray-200 ml-2">
                    {new Date(article.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Article ID:</span>
                  <span className="text-gray-200 ml-2 font-mono">{article.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation to other articles */}
          <div className="mt-16 pt-8 border-t border-gray-800/50">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <a 
                href="/blog" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Articles
              </a>
              
              <div className="flex space-x-4">
                <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/30 text-blue-300 hover:text-blue-200 rounded-xl transition-all duration-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Like
                </button>
                
                <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border border-green-500/30 text-green-300 hover:text-green-200 rounded-xl transition-all duration-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default page;