import React, { useEffect, useState } from "react";
import { Image } from "../types";
import { Upload, X } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

// Mock initial images
const initialImages: Image[] = [];

export function ImageGallery() {
  const [images, setImages] = useState<Image[]>(initialImages);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    getAllImages();
  }, []);

  const getAllImages = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/upload`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.images) {
      setImages(response.data.images);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload the file to a server
      // Here we're just creating a local URL
      const formData = new FormData();
      formData.append("image", file);
      const response: any = await axios.post(
        `${API_BASE_URL}/api/upload/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.image) {
        // const newImage: Image = {
        //   id: Math.random().toString(),
        //   url: URL.createObjectURL(file),
        //   title: file.name,
        //   uploadedAt: new Date().toISOString().split("T")[0],
        //   uploadedBy: "demo@example.com",
        // };
        getAllImages();
        // setImages([newImage, ...images]);
        setShowUpload(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Photos</h2>
        <button
          onClick={() => setShowUpload(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Photo
        </button>
      </div>

      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Upload Photo</h3>
              <button onClick={() => setShowUpload(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`${API_BASE_URL}${image.url}`}
              alt={image.id}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">
                {image.url.split("/")[-1]}
              </h3>
              <p className="text-sm text-gray-600">
                Uploaded on {image.createdAt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
