
import { useState, useEffect } from 'react';
import api from '../api/axiosInstance.js';

export function useProducts() {

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchData() {

      try {
        setLoading(true);
        setError(null);

        const [productsRes, categoriesRes] = await Promise.all([

          api.get('/products'),

          api.get('/products/categories'),
        ]);

        setAllProducts(productsRes.data);

        setCategories(['All', ...categoriesRes.data]);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  const filteredProducts = allProducts
    .filter(product => {
      if (selectedCategory === 'All') return true;
      return product.category === selectedCategory;
    })
    .filter(product => {
      if (searchQuery.trim() === '') return true;
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return {
    filteredProducts,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    loading,
    error,
  };
}