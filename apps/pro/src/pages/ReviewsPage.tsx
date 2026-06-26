import React, { useState } from "react";
import { Star } from "lucide-react";
import { MOCK_REVIEWS, REVIEWS_SUMMARY } from "@/services/mockReviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} fill={i <= rating ? "#FF6B35" : "none"} color={i <= rating ? "#FF6B35" : "#E5E7EB"} />
      ))}
    </div>
  );
}

export function ReviewsPage() {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [draftReply, setDraftReply] = useState("");

  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-nuit">Avis clients</h1>
        <p className="text-sm text-gris">Ce que vos clients pensent de vous</p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="col-span-1 rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <p className="font-heading text-4xl font-extrabold text-nuit">{REVIEWS_SUMMARY.average.toFixed(1)}</p>
          <Stars rating={Math.round(REVIEWS_SUMMARY.average)} />
          <p className="mt-1 text-sm text-gris">{REVIEWS_SUMMARY.total} avis</p>
        </div>

        <div className="col-span-2 rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = REVIEWS_SUMMARY.distribution[star] ?? 0;
            const pct = (count / REVIEWS_SUMMARY.total) * 100;
            return (
              <div key={star} className="mb-1.5 flex items-center gap-3">
                <span className="w-3 text-xs text-gris">{star}</span>
                <Star size={11} fill="#FF6B35" color="#FF6B35" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gris-light">
                  <div className="h-full rounded-full bg-corail" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-10 text-right text-xs text-gris">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {MOCK_REVIEWS.map((review) => (
          <div key={review.id} className="rounded bg-white p-5 shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gris-light text-sm font-bold text-nuit">
                  {review.clientName[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-nuit">{review.clientName}</p>
                  <p className="text-xs text-gris">
                    {review.orderNumber} · {review.dateLabel}
                  </p>
                </div>
              </div>
              <Stars rating={review.rating} />
            </div>

            <p className="mb-3 text-sm text-nuit">{review.comment}</p>

            {review.proReply ? (
              <div className="rounded-sm bg-gris-light p-3">
                <p className="mb-1 text-xs font-semibold text-golfe-green">Votre réponse</p>
                <p className="text-sm text-nuit">{review.proReply}</p>
              </div>
            ) : replyingTo === review.id ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={draftReply}
                  onChange={(e) => setDraftReply(e.target.value)}
                  placeholder="Répondre à cet avis..."
                  rows={2}
                  className="w-full rounded-sm border border-gris-light px-3 py-2 text-sm"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="rounded-sm border border-gris-light px-3 py-1.5 text-xs font-semibold text-gris"
                  >
                    Annuler
                  </button>
                  <button className="rounded-sm bg-golfe-green px-3 py-1.5 text-xs font-semibold text-white">
                    Envoyer
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setReplyingTo(review.id);
                  setDraftReply("");
                }}
                className="text-xs font-semibold text-golfe-green"
              >
                Répondre à cet avis
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
