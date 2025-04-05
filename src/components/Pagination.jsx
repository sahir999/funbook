import "./Pagination.css";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
      >
        Previous
      </button>

      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`pagination-btn ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
