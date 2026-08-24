import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Eye, Edit3 } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { productService } from '../../services/productService';
import { formatCurrency } from '../../utils/formatters';

export const CategoryDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category';

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await productService.getProducts({ category: categoryName });
        if (res.success) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${categoryName} Collection`}
        subtitle={`Viewing assigned live marketplace products in ${categoryName}`}
        breadcrumbs={[
          { label: 'Categories', path: '/categories' },
          { label: categoryName },
        ]}
      >
        <Button variant="secondary" icon={ArrowLeft} onClick={() => navigate('/categories')}>
          Back
        </Button>
        <Button variant="primary" icon={Plus} onClick={() => navigate('/products/add')}>
          Add {categoryName} Product
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/products/${p._id}`)}
            className="commerce-card p-4 rounded-2xl cursor-pointer group"
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-surface-muted">
              <img src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <p className="text-[10px] font-bold text-brand-600 uppercase">{p.brand}</p>
            <h4 className="text-sm font-bold text-slateText-main truncate mt-0.5">{p.name}</h4>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-surface-border">
              <span className="text-sm font-black text-slateText-main">{formatCurrency(p.price)}</span>
              <span className="text-xs text-slateText-muted font-bold">Stock: {p.stock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
