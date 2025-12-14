import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Category } from '../../types';

export default function AdminProductFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    // Form state
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [uploading, setUploading] = useState(false);

    // Product fields
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        category_id: '',
        image_url: '',
        gallery_images: [] as string[],
        is_active: true,
        is_featured: false,
        in_stock: true,
        purity: '',
        weight: '',
        hallmark: false,
        use_case: 'All' as 'Gift' | 'Pooja' | 'Decor' | 'All',
        meta_description: '',
        meta_keywords: '',
        note: '',
    });

    // Specifications (dynamic fields)
    const [specifications, setSpecifications] = useState<Array<{ label: string; value: string }>>([
        { label: '', value: '' }
    ]);

    // Dedicated Dimensions State
    const [dimensions, setDimensions] = useState({
        length: '',
        width: '',
        height: '',
        diameter: '',
        size: '',
        dimensions: '' // General dimensions field
    });

    // Care instructions (dynamic array)
    const [careInstructions, setCareInstructions] = useState<string[]>(['']);

    // Highlights (dynamic array)
    const [highlights, setHighlights] = useState<string[]>(['']);

    // Image files
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        fetchCategories();
        if (isEdit) {
            fetchProduct();
        }
    }, [id]);

    const fetchCategories = async () => {
        const { data } = await supabase
            .from('categories')
            .select('*')
            .order('name');
        setCategories(data || []);
    };

    const fetchProduct = async () => {
        if (!id) return;

        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            alert('Error loading product');
            navigate('/adminshreeshyamsilvernokha/products');
            return;
        }

        if (data) {
            setFormData({
                name: data.name || '',
                slug: data.slug || '',
                description: data.description || '',
                price: data.price?.toString() || '',
                category_id: data.category_id?.toString() || '',
                image_url: data.image_url || '',
                gallery_images: data.gallery_images || [],
                is_active: data.is_active ?? true,
                is_featured: data.is_featured ?? false,
                in_stock: data.in_stock ?? true,
                purity: data.purity || '',
                weight: data.weight || '',
                hallmark: data.hallmark ?? false,
                use_case: data.use_case || 'All',
                meta_description: data.meta_description || '',
                meta_keywords: data.meta_keywords || '',
                note: data.note || '',
            });

            if (data.specifications) {
                setSpecifications(data.specifications.length > 0 ? data.specifications : [{ label: '', value: '' }]);
            }

            // Load dimensions from columns
            setDimensions({
                length: data.length || '',
                width: data.width || '',
                height: data.height || '',
                diameter: data.diameter || '',
                size: data.size || '',
                dimensions: data.dimensions || ''
            });

            if (data.care_instructions) {
                setCareInstructions(data.care_instructions.length > 0 ? data.care_instructions : ['']);
            }

            if (data.highlights) {
                setHighlights(data.highlights.length > 0 ? data.highlights : ['']);
            }

            setImagePreview(data.image_url || '');
        }
        setLoading(false);
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleNameChange = (name: string) => {
        setFormData(prev => ({
            ...prev,
            name,
            slug: generateSlug(name)
        }));
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImageFiles(files);

        // Preview first image
        if (files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const uploadImages = async (): Promise<string[]> => {
        if (imageFiles.length === 0) return formData.gallery_images;

        setUploading(true);
        const uploadedUrls: string[] = [];

        try {
            for (const file of imageFiles) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `products/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(filePath);

                uploadedUrls.push(publicUrl);
            }

            return uploadedUrls;
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Failed to upload images. Please try again.');
            return [];
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Upload images if any
            let finalGallery = [...formData.gallery_images];
            if (imageFiles.length > 0) {
                const uploadedUrls = await uploadImages();
                if (uploadedUrls.length === 0) {
                    setLoading(false);
                    return;
                }
                finalGallery = [...finalGallery, ...uploadedUrls];
            }

            // Ensure we have a main image if gallery exists
            let mainImage = formData.image_url;
            if (!mainImage && finalGallery.length > 0) {
                mainImage = finalGallery[0];
            }
            // If main image was removed from gallery, reset it to first available
            if (mainImage && !finalGallery.includes(mainImage) && finalGallery.length > 0) {
                mainImage = finalGallery[0];
            }

            // Filter out empty specifications and care instructions
            const validSpecs = specifications.filter(s => s.label && s.value);
            const validCare = careInstructions.filter(c => c.trim());
            const validHighlights = highlights.filter(h => h.trim());

            const productData = {
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                price: parseFloat(formData.price),
                category_id: formData.category_id ? parseInt(formData.category_id) : null,
                image_url: mainImage,
                gallery_images: finalGallery,
                is_active: formData.is_active,
                is_featured: formData.is_featured,
                in_stock: formData.in_stock,
                purity: formData.purity,
                weight: formData.weight,
                hallmark: formData.hallmark,
                use_case: formData.use_case,

                // Save Dimensions to Columns
                size: dimensions.size || null,
                length: dimensions.length || null,
                width: dimensions.width || null,
                height: dimensions.height || null,
                diameter: dimensions.diameter || null,
                dimensions: dimensions.dimensions || null,

                specifications: validSpecs.length > 0 ? validSpecs : null,
                care_instructions: validCare.length > 0 ? validCare : null,
                highlights: validHighlights.length > 0 ? validHighlights : null,
                note: formData.note,
                meta_description: formData.meta_description,
                meta_keywords: formData.meta_keywords,
                updated_at: new Date().toISOString(),
            };

            if (isEdit) {
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', id);

                if (error) throw error;
                alert('Product updated successfully!');
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([{ ...productData, created_at: new Date().toISOString() }]);

                if (error) throw error;
                alert('Product created successfully!');
            }

            navigate('/adminshreeshyamsilvernokha/products');
        } catch (error: any) {
            console.error('Error saving product:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const addSpecification = () => {
        setSpecifications([...specifications, { label: '', value: '' }]);
    };

    const removeSpecification = (index: number) => {
        setSpecifications(specifications.filter((_, i) => i !== index));
    };

    const updateSpecification = (index: number, field: 'label' | 'value', value: string) => {
        const updated = [...specifications];
        updated[index][field] = value;
        setSpecifications(updated);
    };

    const addCareInstruction = () => {
        setCareInstructions([...careInstructions, '']);
    };

    const removeCareInstruction = (index: number) => {
        setCareInstructions(careInstructions.filter((_, i) => i !== index));
    };

    const updateCareInstruction = (index: number, value: string) => {
        const updated = [...careInstructions];
        updated[index] = value;
        setCareInstructions(updated);
    };

    const addHighlight = () => {
        setHighlights([...highlights, '']);
    };

    const removeHighlight = (index: number) => {
        setHighlights(highlights.filter((_, i) => i !== index));
    };

    const updateHighlight = (index: number, value: string) => {
        const updated = [...highlights];
        updated[index] = value;
        setHighlights(updated);
    };

    const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            action();
        }
    };

    if (loading && isEdit) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                    <p className="text-silver-600">Loading product...</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-silver-900">
                        {isEdit ? 'Edit Product' : 'Add New Product'}
                    </h1>
                    <p className="text-silver-600 mt-2">
                        {isEdit ? 'Update product information' : 'Create a new product for your store'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    // Prevent submit on enter for main fields too, just to be safe
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    className="input w-full"
                                    placeholder="e.g., 4-Piece Kamakshi Deepak Set"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Slug (URL) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    className="input w-full"
                                    placeholder="4-piece-kamakshi-deepak-set"
                                />
                                <p className="text-xs text-silver-500 mt-1">
                                    Auto-generated from product name. Can be edited.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={6}
                                    className="input w-full"
                                    placeholder="Detailed product description..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-silver-700 mb-2">
                                        Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                        className="input w-full"
                                        placeholder="12750"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-silver-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={formData.category_id}
                                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                        className="input w-full"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Images */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-6">Product Images</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Upload Images (Up to 10 images)
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    className="input w-full"
                                />
                                <p className="text-xs text-silver-500 mt-1">
                                    First image will be the main product image. Recommended size: 1200x1200px
                                </p>
                            </div>

                            {imagePreview && (
                                <div>
                                    <p className="text-sm font-medium text-silver-700 mb-2">Preview:</p>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-48 h-48 object-cover rounded border-2 border-silver-200"
                                    />
                                </div>
                            )}

                            {formData.gallery_images.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-silver-700 mb-2">Current Images:</p>
                                    <div className="grid grid-cols-4 gap-4">
                                        {formData.gallery_images.map((url, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={url}
                                                    alt={`Product ${index + 1}`}
                                                    className={`w-full h-24 object-cover rounded border-2 transition-all ${formData.image_url === url ? 'border-accent' : 'border-silver-200'
                                                        }`}
                                                />
                                                {/* Actions Overlay */}
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded">
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, image_url: url })}
                                                        title="Set as Main Image"
                                                        className={`p-1.5 rounded-full ${formData.image_url === url ? 'bg-accent text-white' : 'bg-white text-silver-700 hover:text-accent'}`}
                                                    >
                                                        <svg className="w-5 h-5" fill={formData.image_url === url ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newGallery = formData.gallery_images.filter(img => img !== url);
                                                            let newMain = formData.image_url;
                                                            if (newMain === url) {
                                                                newMain = newGallery.length > 0 ? newGallery[0] : '';
                                                            }
                                                            setFormData({ ...formData, gallery_images: newGallery, image_url: newMain });
                                                        }}
                                                        title="Delete Image"
                                                        className="p-1.5 bg-white text-red-600 rounded-full hover:bg-red-50"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {formData.image_url === url && (
                                                    <span className="absolute top-1 left-1 bg-accent text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">
                                                        Main
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-6">Product Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Material/Purity
                                </label>
                                <input
                                    type="text"
                                    value={formData.purity}
                                    onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    className="input w-full"
                                    placeholder="Premium Silver Plated"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Weight
                                </label>
                                <input
                                    type="text"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    className="input w-full"
                                    placeholder="240 gm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Use Case
                                </label>
                                <select
                                    value={formData.use_case}
                                    onChange={(e) => setFormData({ ...formData, use_case: e.target.value as any })}
                                    className="input w-full"
                                >
                                    <option value="All">All</option>
                                    <option value="Gift">Gift</option>
                                    <option value="Pooja">Pooja</option>
                                    <option value="Decor">Decor</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.hallmark}
                                        onChange={(e) => setFormData({ ...formData, hallmark: e.target.checked })}
                                        className="w-4 h-4 text-accent"
                                    />
                                    <span className="text-sm font-medium text-silver-700">BIS Hallmark</span>
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.in_stock}
                                        onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                                        className="w-4 h-4 text-accent"
                                    />
                                    <span className="text-sm font-medium text-silver-700">In Stock</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Dimensions & Sizing */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-6">Dimensions & Sizing</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    value={dimensions.size}
                                    onChange={(e) => setDimensions({ ...dimensions, size: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    className="input w-full"
                                    placeholder="e.g., 14.5 inch"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Dimensions (General)
                                </label>
                                <input
                                    type="text"
                                    value={dimensions.dimensions}
                                    onChange={(e) => setDimensions({ ...dimensions, dimensions: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    className="input w-full"
                                    placeholder="e.g., 10x10x5 inches"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Height
                                </label>
                                <input
                                    type="text"
                                    value={dimensions.height}
                                    onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    className="input w-full"
                                    placeholder="e.g., 14.5 inches"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Width
                                </label>
                                <input
                                    type="text"
                                    value={dimensions.width}
                                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    className="input w-full"
                                    placeholder="e.g., 8 inches"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Length
                                </label>
                                <input
                                    type="text"
                                    value={dimensions.length}
                                    onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    className="input w-full"
                                    placeholder="e.g., 12 inches"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Diameter
                                </label>
                                <input
                                    type="text"
                                    value={dimensions.diameter}
                                    onChange={(e) => setDimensions({ ...dimensions, diameter: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                    className="input w-full"
                                    placeholder="e.g., 8.5 inches"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Specifications</h2>
                            <button
                                type="button"
                                onClick={addSpecification}
                                className="text-sm text-accent hover:text-accent-dark font-medium"
                            >
                                + Add Specification
                            </button>
                        </div>

                        <div className="space-y-3">
                            {specifications.map((spec, index) => (
                                <div key={index} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={spec.label}
                                        onChange={(e) => updateSpecification(index, 'label', e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, addSpecification)}
                                        placeholder="Label (e.g., Material)"
                                        className="input flex-1"
                                    />
                                    <input
                                        type="text"
                                        value={spec.value}
                                        onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, addSpecification)}
                                        placeholder="Value (e.g., 99.9% Silver Plated)"
                                        className="input flex-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSpecification(index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Product Highlights</h2>
                            <button
                                type="button"
                                onClick={addHighlight}
                                className="text-sm text-accent hover:text-accent-dark font-medium"
                            >
                                + Add Highlight
                            </button>
                        </div>

                        <div className="space-y-3">
                            {highlights.map((highlight, index) => (
                                <div key={index} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={highlight}
                                        onChange={(e) => updateHighlight(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, addHighlight)}
                                        placeholder="Highlight (e.g., Inspired by traditional design)"
                                        className="input flex-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeHighlight(index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-6">Product Note</h2>
                        <div>
                            <label className="block text-sm font-medium text-silver-700 mb-2">
                                Important Usage/Price Note
                            </label>
                            <textarea
                                value={formData.note}
                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                rows={4}
                                className="input w-full"
                                placeholder="e.g., This is a UCP (Uniform Consumer Price) product..."
                            />
                        </div>
                    </div>

                    {/* Care Instructions (Renamed to Silver Care) */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Silver Care</h2>
                            <button
                                type="button"
                                onClick={addCareInstruction}
                                className="text-sm text-accent hover:text-accent-dark font-medium"
                            >
                                + Add Instruction
                            </button>
                        </div>

                        <div className="space-y-3">
                            {careInstructions.map((instruction, index) => (
                                <div key={index} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={instruction}
                                        onChange={(e) => updateCareInstruction(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, addCareInstruction)}
                                        placeholder="Care instruction..."
                                        className="input flex-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeCareInstruction(index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SEO & Status */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-6">SEO & Status</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Meta Description
                                </label>
                                <textarea
                                    value={formData.meta_description}
                                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                    rows={3}
                                    className="input w-full"
                                    placeholder="SEO description for search engines..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-silver-700 mb-2">
                                    Meta Keywords
                                </label>
                                <input
                                    type="text"
                                    value={formData.meta_keywords}
                                    onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                                    className="input w-full"
                                    placeholder="silver, pooja, deepak, kamakshi"
                                />
                            </div>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="w-4 h-4 text-accent"
                                    />
                                    <span className="text-sm font-medium text-silver-700">Active (Visible on website)</span>
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_featured}
                                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                        className="w-4 h-4 text-accent"
                                    />
                                    <span className="text-sm font-medium text-silver-700">Featured Product</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/adminshreeshyamsilvernokha/products')}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading || uploading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {uploading ? 'Uploading Images...' : 'Saving...'}
                                </span>
                            ) : (
                                isEdit ? 'Update Product' : 'Create Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
