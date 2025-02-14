import { useLoaderData } from "react-router";
import { useState } from "react";
import { getreviews, validReview } from "../../functions";
import AdminReview from "../../components/AdminReview";

export async function loader() {
  const data = await getreviews('nvalid');
  return data;
}

export function Reviews() {
  const reviewsInitial = useLoaderData();
  const [reviews, setReviews] = useState(reviewsInitial);

  async function handleCLick(id, action) {
    try {
     await validReview(id,action);
     const newData = await getreviews('nvalid');
      setReviews(newData);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  const reviewsElements = reviews?.map((review) => (
    <AdminReview
      key={review.id}
      id={review.id}
      username={review.username}
      avis={review.avis}
      handleCLick={handleCLick}
    />
  ));

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-green-900 text-center mb-8">
          Gestion des Avis
        </h1>
        <div className="space-y-4">
          {reviewsElements.length > 0 ? (
            reviewsElements
          ) : (
            <p className="text-center text-gray-700">Aucun avis à valider pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;