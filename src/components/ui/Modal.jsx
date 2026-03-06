'use client';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-bg-primary flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-lg shadow-xl">
        {title && (
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-text-accent hover:text-text-primary text-xl leading-none duration-100"
            >
              ×
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
