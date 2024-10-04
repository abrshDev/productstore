import { json } from "react-router-dom";
import { create } from "zustand";

export const useproductstore = create((set) => ({
  products: [],
  setproducts: (products) => set({ products }),
  createproduct: async (newproduct) => {
    if (!newproduct.name || !newproduct.price || !newproduct.image) {
      return { success: false, message: "please provide all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newproduct),
    });
    const data = await res.json();

    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "product created succesfully" };
  },
  fetchproducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    set({ products: data.data });
  },
  deleteproducts: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));

    return { success: true, message: data.message };
  },
  updateproducts: async (id, updateproduct) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateproduct),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Failed to update product",
        };
      }

      // Safely update the state with the new product data
      set((state) => {
        console.log("Current products state:", state.products);
        return {
          products: state.products.map((product) =>
            product._id === id ? data.data : product
          ),
        };
      });

      return { success: true, message: "Product updated successfully!" };
    } catch (error) {
      console.error("Update product error:", error);
      return {
        success: false,
        message: "An error occurred while updating the product",
      };
    }
  },
}));
