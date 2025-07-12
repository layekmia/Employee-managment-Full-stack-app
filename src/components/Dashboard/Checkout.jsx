export default function Checkout() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="max-w-sm bg-white p-5 rounded ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta maxime,
        consequuntur blanditiis ipsum temporibus placeat ullam eius repellendus
        mollitia reprehenderit beatae numquam illo quidem ipsam earum facere
        porro deserunt ipsa?
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
