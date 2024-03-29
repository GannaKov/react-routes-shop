import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getById } from "../services/requests";
import styles from "../styles/SingleProduct.module.css";

const SingleProductPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [fetched, setFetched] = useState(false);

  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/products";

  useEffect(() => {
    setLoading(true);
    getById(id)
      .then((res) => {
        setProduct(res);
        setFetched(true);
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  const { title, images, price, description, rating, brand } = product;

  return (
    <div>
      <button>
        <Link to={backLinkHref}>Back to products</Link>
      </button>
      {loading && <Spinner />}
      {fetched && (
        <>
          {Object.keys(product).length > 0 ? (
            <div className={styles.cardWrp}>
              <h2 className={styles.cardTitle}>{title}</h2>
              <img className={styles.cardImg} src={images[0]} alt={title} />
              <p className={styles.cardBrandText}>Brand: {brand}</p>
              <p className={styles.cardPriceText}>Price: {price}</p>
              <p className={styles.cardDescrText}>{description}</p>
              <p className={styles.cardRateText}>Rating: {rating}</p>
            </div>
          ) : (
            <p>No Product</p>
          )}
        </>
      )}
    </div>
  );
};

export default SingleProductPage;
