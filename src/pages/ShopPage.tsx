import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';
import { getProducts, getCategories } from '../services/api';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'newest';
type UseCaseFilter = 'All' | 'Gift' | 'Pooja' | 'Decor';

export default function ShopPage() {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
    const [selectedUseCase, setSelectedUseCase] = useState<UseCaseFilter>('All');

    // Initialize price range from URL params
    const initialMin = Number(searchParams.get('minPrice')) || 0;
    const initialMax = Number(searchParams.get('maxPrice')) || 300000;
    const [priceRange, setPriceRange] = useState<[number, number]>([initialMin, initialMax]);

    const [sortBy, setSortBy] = useState<SortOption>('popular');
    const [showFilters, setShowFilters] = useState(false);

    // Update state if URL changes
    useEffect(() => {
        const min = Number(searchParams.get('minPrice')) || 0;
        const max = Number(searchParams.get('maxPrice')) || 300000;
        setPriceRange([min, max]);
    }, [searchParams]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching shop data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Filter products
    let filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'all' || product.category_id === selectedCategory;
        const useCaseMatch = selectedUseCase === 'All' || product.use_case === selectedUseCase || product.use_case === 'All';
        const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
        return categoryMatch && useCaseMatch && priceMatch;
    });

    // Sort products
    filteredProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return b.id - a.id;
            default:
                return b.is_featured ? 1 : -1;
        }
    });

    const FilterSection = () => (
        <div className="space-y-8">
            {/* Category Filter */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Category</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === 'all'}
                            onChange={() => setSelectedCategory('all')}
                            className="w-4 h-4 text-accent"
                        />
                        <span className="text-silver-700">All Products</span>
                    </label>
                    {categories.map(category => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === category.id}
                                onChange={() => setSelectedCategory(category.id)}
                                className="w-4 h-4 text-accent"
                            />
                            <span className="text-silver-700">{category.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Use Case Filter */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Use Case</h3>
                <div className="space-y-2">
                    {(['All', 'Gift', 'Pooja', 'Decor'] as UseCaseFilter[]).map(useCase => (
                        <label key={useCase} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="useCase"
                                checked={selectedUseCase === useCase}
                                onChange={() => setSelectedUseCase(useCase)}
                                className="w-4 h-4 text-accent"
                            />
                            <span className="text-silver-700">{useCase}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                    <input
                        type="range"
                        min="0"
                        max="300000"
                        step="5000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-silver-600">
                        <span>₹0</span>
                        <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>

            {/* Purity Filter */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Purity</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-accent" defaultChecked />
                        <span className="text-silver-700">99.9% Silver Plated</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-accent" defaultChecked />

                    </label>
                </div>
            </div>

            {/* Reset Filters */}
            <button
                onClick={() => {
                    setSelectedCategory('all');
                    setSelectedUseCase('All');
                    setPriceRange([0, 300000]);
                }}
                className="w-full btn-secondary"
            >
                Reset Filters
            </button>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                    <p className="text-silver-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header */}
            <div className="bg-silver-50 border-b border-silver-200">
                <div className="container-custom py-12">
                    <h1 className="mb-4">Our Collection</h1>
                    <p className="text-silver-600 text-lg">
                        Discover handcrafted silver pieces for every occasion
                    </p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <FilterSection />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <p className="text-silver-600">
                                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                            </p>

                            <div className="flex gap-4 w-full sm:w-auto">
                                {/* Mobile Filter Button */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden btn-secondary flex-1 sm:flex-none"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                        Filters
                                    </span>
                                </button>

                                {/* Sort Dropdown */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="input py-2 flex-1 sm:flex-none sm:w-48"
                                >
                                    <option value="popular">Popular</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Mobile Filter Panel */}
                        {showFilters && (
                            <div className="lg:hidden mb-8 p-6 bg-silver-50 border border-silver-200 rounded-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold">Filters</h3>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="text-silver-600 hover:text-accent"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <FilterSection />
                            </div>
                        )}

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <svg className="w-16 h-16 mx-auto text-silver-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <h3 className="text-xl mb-2">No products found</h3>
                                <p className="text-silver-600 mb-6">Try adjusting your filters</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSelectedUseCase('All');
                                        setPriceRange([0, 300000]);
                                    }}
                                    className="btn-primary"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
