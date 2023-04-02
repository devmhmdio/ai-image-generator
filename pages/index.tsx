import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [imageSize, setImageSize] = useState('512x512');
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-image', {
        prompt,
        numImages,
        imageSize,
      });
      console.log(response.data);
      setImageUrls(response.data.data);
    } catch (error) {
      console.log(error);
      alert('Error generating image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-lightBlue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">AI Image Generator</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">
                    Enter image description
                  </label>
                  <input
                    type="text"
                    className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">Number of images</label>
                    <input
                      type="number"
                      className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                      min="1"
                      value={numImages}
                      onChange={(e) => setNumImages(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Image size</label>
                    <select
                      className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value)}
                    >
                      <option value="256x256">256x256</option>
                      <option value="512x512">512x512</option>
                      <option value="1024x1024">1024x1024</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    onClick={generateImage}
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  >
                    Generate Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center mt-4">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C4.326 0 0 4.326 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 1.3.258 2.53.724 3.617l1.718-1.326zM1.718 5.709C2.566 4.377 3.743 3.26 5.145 2.451L6.864 4.175A6.983 6.983 0 004 12h4a8.002 8.002 0 00-6.282-6.291z"
            ></path>
          </svg>
          <span>Loading...</span>
        </div>
      )}
      {imageUrls.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center">
          {imageUrls.map((data:any, index) => {
            return (
            <div key={index} className="m-4">
              <img
                src={data.url}
                alt={`Generated ${index + 1}`}
                className="border border-gray-300 shadow-lg rounded-md"
              />
            </div>
          )})}
        </div>
      )}
    </div>
  );
}
