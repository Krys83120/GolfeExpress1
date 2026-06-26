import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useProMenuStore } from "@/store/useProMenuStore";
import { MOCK_MENU_CATEGORIES } from "@/services/mockMenu";
import { ProductFormModal } from "@/components/ProductFormModal";
import type { Product } from "@golfeexpress/types";

export function MenuPage() {
  const products = useProMenuStore((s) => s.products);
  const toggleAvailability = useProMenuStore((s) => s.toggleAvailability);
  const deleteProduct = useProMenuStore((s) => s.deleteProduct);
  const addProduct = useProMenuStore((s) => s.addProduct);
  const updateProduct = useProMenuStore((s) => s.updateProduct);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  function handleSave(data: Omit<Product, "id" | "proId">) {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      setEditingProduct(null);
    } else {
      addProduct(data);
      setCreating(false);
    }
  }

  return (
    <div className="flex-1 p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-nuit">Mon menu</h1>
          <p className="text-sm text-gris">{products.length} produits</p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-sm bg-golfe-green px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus size={16} />
          Nouveau produit
        </button>
      </div>

      {MOCK_MENU_CATEGORIES.map((category) => {
        const categoryProducts = products.filter((p) => p.category === category);
        if (categoryProducts.length === 0) return null;

        return (
          <div key={category} className="mb-6">
            <h3 className="mb-3 font-heading text-base font-bold text-nuit">{category}</h3>
            <div className="grid grid-cols-3 gap-4">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded bg-white p-4 shadow-sm"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)", opacity: product.isAvailable ? 1 : 0.5 }}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gris-light text-2xl">
                      {product.image}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="rounded-sm p-1.5 text-gris hover:bg-gris-light"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-sm p-1.5 text-red-400 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="mb-1 flex items-center gap-2">
                    <p className="font-semibold text-nuit">{product.name}</p>
                    {product.isFeatured && <span className="text-xs">⭐</span>}
                  </div>
                  <p className="mb-3 line-clamp-2 text-xs text-gris">{product.description}</p>

                  <div className="flex items-center justify-between border-t border-gris-light pt-3">
                    <p className="font-bold text-golfe-green">{product.price.toFixed(2)} €</p>
                    <label className="flex items-center gap-1.5 text-xs text-gris">
                      <input
                        type="checkbox"
                        checked={product.isAvailable}
                        onChange={() => toggleAvailability(product.id)}
                      />
                      Disponible
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {(creating || editingProduct) && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setCreating(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
