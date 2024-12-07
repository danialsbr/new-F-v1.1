import { Download as DownloadIcon } from 'lucide-react';

export function Download() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Download Orders</h1>
        <p className="mt-2 text-sm text-gray-700">
          Download your updated order information
        </p>
      </header>

      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Export Orders
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Download the latest order information in Excel format.</p>
                </div>
              </div>
              <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <DownloadIcon className="-ml-1 mr-2 h-5 w-5" />
                  Download Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}