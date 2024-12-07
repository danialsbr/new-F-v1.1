import { Upload as UploadIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Upload() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Upload Orders</h1>
        <p className="mt-2 text-sm text-gray-700">
          Upload your Excel file containing order information
        </p>
      </header>

      <div
        className={cn(
          'max-w-2xl mx-auto mt-8 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12',
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadIcon className="h-12 w-12 text-gray-400" />
        <div className="mt-4 flex text-sm text-gray-600">
          <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
            <span>Upload a file</span>
            <input
              type="file"
              className="sr-only"
              accept=".xlsx,.xls"
              onChange={(e) => {
                // Handle file selection
              }}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">Excel files up to 10MB</p>
      </div>
    </div>
  );
}