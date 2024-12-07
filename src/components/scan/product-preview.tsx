interface ProductPreviewProps {
  imageUrl?: string;
  title?: string;
  sku?: string;
  quantityScanned?: number;
  quantityRequested?: number;
}

export function ProductPreview({
  imageUrl,
  title,
  sku,
  quantityScanned = 0,
  quantityRequested = 0,
}: ProductPreviewProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Product Preview</h2>
      
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-center object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}
      </div>

      <div className="space-y-2">
        {title && (
          <p className="text-sm font-medium text-gray-900">
            Product: {title}
          </p>
        )}
        {sku && (
          <p className="text-sm text-gray-500">
            SKU: {sku}
          </p>
        )}
        <p className="text-sm text-gray-500">
          Scanned: {quantityScanned} / {quantityRequested}
        </p>
      </div>
    </div>
  );
}