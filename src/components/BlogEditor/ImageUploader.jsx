import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

const ImageUploader = ({ onUpload, multiple = true }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const processFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const filesArray = Array.from(files);
      for (const file of filesArray) {
        if (!file.type.startsWith('image/')) continue;
        await onUpload(file);
      }
    } catch (err) {
      console.error('Failed to process image uploads:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await processFiles(e.target.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={triggerFileInput}
      className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
        isDragActive
          ? 'border-[#005A9E] bg-blue-50/50'
          : 'border-gray-300 hover:border-[#005A9E] bg-gray-50/50 hover:bg-white'
      } flex flex-col items-center justify-center gap-2 min-h-[120px]`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple={multiple}
        className="hidden"
      />
      {uploading ? (
        <>
          <Loader2 className="w-8 h-8 text-[#005A9E] animate-spin" />
          <p className="text-xs font-semibold text-[#005A9E]">Uploading images...</p>
        </>
      ) : (
        <>
          <div className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
            <Upload className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-gray-700">Drag & drop images here</p>
            <p className="text-[10px] text-gray-400 font-medium">Or click to select files (Supports multiple)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
