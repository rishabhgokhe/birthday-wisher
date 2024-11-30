export default function Gallery() {
    const images = [
      '/image1.jpg',
      '/image2.jpg',
      '/image3.jpg',
    ];
  
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-6">Memorable Moments</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Memory ${index + 1}`}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    );
  }