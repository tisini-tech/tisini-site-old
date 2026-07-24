import "./styles.css";

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="loader-circle"></div>
      </div>
    </div>
  );
};

export default Loader;
