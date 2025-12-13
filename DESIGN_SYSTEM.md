# Design System Reference

## Typography

### Fonts
- **Headings**: Playfair Display (serif) - Elegant, premium
- **Body**: Inter (sans-serif) - Highly readable, modern

### Heading Sizes
- `h1`: 4xl/5xl/6xl (responsive)
- `h2`: 3xl/4xl/5xl (responsive)
- `h3`: 2xl/3xl
- `h4`: xl/2xl
- `p`: base/lg

## Colors

### Silver Palette
```
silver-50:  #f8f9fa  (lightest - backgrounds)
silver-100: #f1f3f5
silver-200: #e9ecef  (borders)
silver-300: #dee2e6
silver-400: #ced4da
silver-500: #adb5bd
silver-600: #868e96  (secondary text)
silver-700: #495057  (body text)
silver-800: #343a40
silver-900: #212529  (headings)
```

### Accent Colors
```
accent:       #2c3e50  (primary CTA, links)
accent-light: #34495e
accent-dark:  #1a252f  (hover states)
```

## Component Classes

### Buttons
```css
.btn                 - Base button
.btn-primary         - Primary action (accent bg, white text)
.btn-secondary       - Secondary action (white bg, accent border)
.btn-lg              - Large button (px-10 py-4)
```

### Cards
```css
.card                - Base card (white bg, border)
.card-hover          - Card with hover effects
.product-card        - Product card with image overlay
```

### Layout
```css
.container-custom    - Max-width container with padding
.section-padding     - Vertical section spacing (py-16/24/32)
```

### Product
```css
.product-image       - Product image with hover zoom
.badge-hallmark      - BIS hallmark badge
```

### Forms
```css
.input               - Text input styling
```

## Spacing Scale

- `4`: 1rem (16px)
- `6`: 1.5rem (24px)
- `8`: 2rem (32px)
- `12`: 3rem (48px)
- `16`: 4rem (64px)
- `18`: 4.5rem (72px) - custom
- `24`: 6rem (96px)
- `32`: 8rem (128px)
- `88`: 22rem (352px) - custom
- `128`: 32rem (512px) - custom

## Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Usage Guidelines

### Trust Indicators
Always include near CTAs:
- BIS Hallmark badge
- Free delivery
- Secure checkout
- Return policy

### Product Cards
Must have:
- High-quality image
- Category label
- Product name
- Purity & weight
- Price
- Hallmark badge (if applicable)

### CTAs
- Primary: Use for main actions (Add to Cart, Checkout)
- Secondary: Use for alternative actions (Continue Shopping, Learn More)
- Always visible on mobile (sticky if needed)

### Images
- Use aspect-square for products
- Lazy load all images
- Include meaningful alt text
- Optimize for web

### Hover Effects
- Scale images slightly (scale-105)
- Transition duration: 300-500ms
- Subtle shadow increases
- Color transitions for links

## Best Practices

1. **Whitespace**: Be generous, let content breathe
2. **Hierarchy**: Clear visual hierarchy with size and weight
3. **Consistency**: Use design system classes, not ad-hoc styles
4. **Mobile**: Test all interactions on mobile
5. **Performance**: Lazy load, optimize images
6. **Trust**: Always show certification and security indicators
7. **Clarity**: Clear product info, no hidden costs
8. **Accessibility**: Semantic HTML, proper contrast ratios
