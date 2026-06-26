import React, { useState } from "react";
import { X } from "lucide-react";
import type { Product } from "@golfeexpress/types";
import { MOCK_MENU_CATEGORIES } from "@/services/mockMenu";

interface ProductFormModalProps {
  product: Product | null; // null = création
  onClose: () => void;
  onSave: (data: Omit<Product, "id" | "proId">) => void;
}

export function ProductFormModal({ product, onClose, onSave }: ProductFormModalProps) {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price.toString() ?? "");
  const [category, setCategory] = useState(product?.category ?? MOCK_MENU_CATEGORIES[0]);
  const [emoji, setEmoji] = useState(product?.image ?? "🍽️");
  const [isAvailable, setIsAvailable] = useState(product?.isAvailable ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedPrice = parseFloat(price.replace(",", "."));
    if (!name.trim() || isNaN(parsedPrice)) return;
    onSave({
      name: name.trim(),
      description: description.trim() || null,
      price: parsedPrice,
      image: emoji,
      category,
      isAvailable,
      isFeatured,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-nuit">
            {product ? "Modifier le produit" : "Nouveau produit"}
          </h2>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 hover:bg-gris-light">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="w-20">
              <label className="mb-1 block text-xs font-semibold text-gris">Emoji</label>
              <input
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                maxLength={2}
                className="w-full rounded-sm border border-gris-light px-3 py-2 text-center text-xl"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold text-gris">Nom du produit</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Poke Saumon"
                required
                className="w-full rounded-sm border border-gris-light px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gris">Description</label>
            <textarea
              value={description ?? ""}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingrédients, particularités..."
              rows={2}
              className="w-full rounded-sm border border-gris-light px-3 py-2 text-sm"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold text-gris">Prix (€)</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="14.90"
                required
                className="w-full rounded-sm border border-gris-light px-3 py-2 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold text-gris">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-sm border border-gris-light px-3 py-2 text-sm"
              >
                {MOCK_MENU_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-nuit">
              <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
              Disponible
            </label>
            <label className="flex items-center gap-2 text-sm text-nuit">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
              Mettre en avant
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm border border-gris-light px-4 py-2 text-sm font-semibold text-gris"
          >
            Annuler
          </button>
          <button type="submit" className="rounded-sm bg-golfe-green px-5 py-2 text-sm font-semibold text-white">
            {product ? "Enregistrer" : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}
