import { useState } from "react";

export default function Step({ index, step, updateStep, removeStep }) {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleTextChange = (e) => {
    updateStep(index, { ...step, description: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image URL
      };
      reader.readAsDataURL(file);
    }
  };


  const handleRemoveImage = () => {
    setImage(null); // Clear the image
  };


  const uploadPhoto = async () => {
    if (!image) {
      alert('No image selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', image);
    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
      onImageUpload(response.data.imageUrl); // Pass the uploaded image URL back to parent
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
  <div className="px-40 mt-8">
    <div className="flex justify-between px-1">
      <h4 className="text-xl">Step {index + 1}</h4>
      <button onClick={() => removeStep(index)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
    
    <div className="flex gap-2 mt-4">
      <textarea className="px-4 text-xl w-2/3 h-60" value={description} placeholder="Description of this step" onChange={ev => setDescription(ev.target.value)} />
      <div className="w-1/3 h-60">
        {!image ? (
          <label className="cursor-pointer w-full flex flex-col items-center gap-1 justify-center border border-gray-300 h-full bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="flex gap-1" onClick={() => document.querySelector('input[type="file"]').click()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
              </svg>
              Upload
            </div>
            <p className="text-base text-gray-400">Upload an image for this step</p>
          </label>
        ) : (
          <div className="relative w-full h-full bg-gray-100 rounded-2xl overflow-hidden">
            <img src={image} alt="Preview" className="w-full object-cover position-center rounded-2xl" />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
    
  </div>
  );
}