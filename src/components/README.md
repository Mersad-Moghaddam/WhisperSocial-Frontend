# Wisper Components Library

This directory contains reusable UI components for the Wisper frontend application. All components follow the Wisper design system with sky-blue aesthetics and cloud-inspired styling.

## 📚 Component Index

- [Button](#button) - Primary UI button component
- [Input](#input) - Form input component
- [Navbar](#navbar) - Navigation bar with Wisper branding

---

## Button

Reusable button component with Wisper styling and multiple variants.

### Usage

```jsx
import Button from '../components/Button';

function MyComponent() {
  return (
    <Button 
      variant="primary" 
      onClick={handleClick}
    >
      Click Me
    </Button>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | node | required | Button text or content |
| `variant` | string | `'primary'` | Button style variant |
| `type` | string | `'button'` | HTML button type |
| `onClick` | function | - | Click handler |
| `disabled` | boolean | `false` | Disabled state |
| `className` | string | - | Additional CSS classes |

### Variants

- **primary**: Gradient cyan button (default)
  - Background: `from-[#06b6d4] to-[#0891b2]`
  - Text: White
  - Hover: Shadow and scale effect

- **secondary**: White button with border
  - Background: White
  - Border: `#cffafe`
  - Text: `#0F172A`
  - Hover: Sky blue background

- **danger**: Red button for destructive actions
  - Background: Red gradient
  - Text: White
  - Hover: Darker red

### Examples

```jsx
// Primary button
<Button variant="primary" onClick={handleSubmit}>
  Submit
</Button>

// Secondary button
<Button variant="secondary" onClick={handleCancel}>
  Cancel
</Button>

// Disabled button
<Button disabled>
  Loading...
</Button>

// With custom classes
<Button className="w-full mt-4">
  Full Width Button
</Button>
```

---

## Input

Form input component with Wisper styling and validation states.

### Usage

```jsx
import Input from '../components/Input';

function MyForm() {
  const [email, setEmail] = useState('');
  
  return (
    <Input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `'text'` | Input type (text, email, password, etc.) |
| `placeholder` | string | - | Placeholder text |
| `value` | string | - | Input value (controlled) |
| `onChange` | function | - | Change handler |
| `className` | string | - | Additional CSS classes |
| `error` | string | - | Error message to display |
| `label` | string | - | Input label |
| `required` | boolean | `false` | Required field indicator |
| ...rest | object | - | All other HTML input props |

### Styling

- **Default state**: White background, cyan border on focus
- **Error state**: Red border and error message
- **Focus state**: Cyan ring shadow
- **Disabled state**: Grayed out with reduced opacity

### Examples

```jsx
// Basic input
<Input
  type="text"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// With label
<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

// With error
<Input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error="Password must be at least 8 characters"
/>

// Disabled input
<Input
  type="text"
  value="Read only"
  disabled
/>
```

---

## Navbar

Navigation bar component with Wisper branding, user actions, and responsive mobile menu.

### Usage

```jsx
import Navbar from '../components/Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page content */}
      </main>
    </>
  );
}
```

### Features

- **Wisper Logo**: Cloud icon with Wisper wordmark
- **Navigation Links**: 
  - Timeline
  - Create Wisper
  - Profile
- **User Actions**: Logout button
- **Responsive**: Mobile hamburger menu
- **Sticky Header**: Fixed to top of viewport
- **Backdrop Blur**: Glass-morphism effect

### Props

The Navbar component doesn't accept props directly. It uses the `useAuth` hook to access authentication state and navigation context.

### Styling

- Background: `bg-white/80` with `backdrop-blur-md`
- Border: `border-b border-[#cffafe]`
- Height: `h-16`
- Max Width: `max-w-7xl`
- Position: `fixed top-0 left-0 right-0 z-50`

### Navigation Items

```jsx
// Desktop nav items
const navItems = [
  { to: '/timeline', label: 'Timeline', icon: HomeIcon },
  { to: '/timeline/create-post', label: 'Create Wisper', icon: PlusIcon },
  { to: '/timeline/profile', label: 'Profile', icon: UserIcon },
];
```

### Mobile Responsiveness

- **Desktop** (lg+): Full horizontal navigation
- **Mobile** (<lg): Hamburger menu with slide-out drawer

---

## Design System Guidelines

### Color Usage

All components should use Wisper's color palette:

```jsx
// Primary actions
className="bg-[#06b6d4] text-white"

// Secondary actions
className="bg-white border border-[#cffafe] text-[#0F172A]"

// Text
className="text-[#0F172A]"        // Primary text
className="text-[#475569]"        // Secondary text
className="text-[#94A3B8]"        // Muted text

// Borders
className="border-[#cffafe]"      // Light cyan border

// Hover states
className="hover:bg-[#e0f2fe]"    // Light blue hover
className="hover:text-[#06b6d4]"  // Cyan text hover
```

### Border Radius

Use consistent rounding:

```jsx
className="rounded-full"    // Pills, buttons, avatars
className="rounded-3xl"     // Cards, containers
className="rounded-2xl"     // Small cards, badges
className="rounded-xl"      // Inputs, smaller elements
```

### Shadows

Subtle shadows with hover effects:

```jsx
className="shadow-lg"                    // Default shadow
className="hover:shadow-xl"              // Hover shadow
className="shadow-lg hover:scale-105"    // Shadow + scale
```

### Transitions

Smooth transitions for all interactive elements:

```jsx
className="transition-all duration-200"
className="transition-colors duration-150"
className="transition-transform duration-300"
```

### Backdrop Effects

Use backdrop blur for modern glass-morphism:

```jsx
className="bg-white/80 backdrop-blur-sm"
className="bg-white/60 backdrop-blur-md"
```

---

## Creating New Components

When adding new components to this library:

### 1. Component Structure

```jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function ComponentName({ 
  prop1, 
  prop2, 
  ...props 
}) {
  return (
    <div className="wisper-component-styling">
      {/* Component content */}
    </div>
  );
}

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.bool,
};

ComponentName.defaultProps = {
  prop2: false,
};
```

### 2. Styling Checklist

- [ ] Use Wisper color palette
- [ ] Add smooth transitions
- [ ] Include hover states
- [ ] Ensure responsive design
- [ ] Add backdrop blur where appropriate
- [ ] Use consistent border radius
- [ ] Test dark backgrounds
- [ ] Verify accessibility (contrast, focus states)

### 3. Documentation

Add component documentation to this README:
- Usage example
- Props table
- Variants (if applicable)
- Multiple examples showing different use cases

### 4. Testing

Test your component:
- [ ] Desktop view (1920px, 1440px, 1024px)
- [ ] Tablet view (768px)
- [ ] Mobile view (375px, 414px)
- [ ] Different states (hover, focus, disabled, error)
- [ ] With/without optional props
- [ ] Long text content
- [ ] Empty/null values

---

## Component Patterns

### Conditional Rendering

```jsx
// Show/hide based on prop
{showIcon && <IconComponent />}

// Conditional classes
className={`base-classes ${isActive ? 'active-classes' : 'inactive-classes'}`}

// Multiple conditions
className={clsx(
  'base-classes',
  isActive && 'active-classes',
  hasError && 'error-classes',
  isDisabled && 'disabled-classes'
)}
```

### Event Handlers

```jsx
// Basic handler
const handleClick = () => {
  console.log('Clicked');
};

// Handler with parameters
const handleChange = (e) => {
  setValue(e.target.value);
};

// Prevent default
const handleSubmit = (e) => {
  e.preventDefault();
  // Submit logic
};
```

### State Management

```jsx
// Local state
const [value, setValue] = useState('');

// Effect for side effects
useEffect(() => {
  // Side effect logic
  return () => {
    // Cleanup
  };
}, [dependency]);

// Context for shared state
const { user, token } = useAuth();
```

---

## Accessibility

All components should follow accessibility best practices:

### ARIA Labels

```jsx
<button aria-label="Close menu">
  <XIcon />
</button>

<input aria-describedby="error-message" />
<p id="error-message" role="alert">{error}</p>
```

### Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Use proper semantic HTML (`<button>`, not `<div onClick>`)
- Add visible focus states
- Support Tab, Enter, Escape keys

### Screen Readers

```jsx
// Hide decorative elements
<svg aria-hidden="true">...</svg>

// Announce dynamic content
<div role="status" aria-live="polite">
  {successMessage}
</div>

// Label form fields
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### Color Contrast

Ensure WCAG AA compliance:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- Use contrast checker tools during development

---

## Performance Tips

### Memoization

```jsx
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// Memoize components
const MemoizedComponent = React.memo(Component);
```

### Lazy Loading

```jsx
// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

---

## Future Components

Planned components to add:

- [ ] **Avatar** - User profile picture with fallback
- [ ] **Modal** - Dialog/popup overlay
- [ ] **Toast** - Notification messages
- [ ] **Dropdown** - Select menu
- [ ] **Tooltip** - Hover information
- [ ] **Card** - Content container
- [ ] **Badge** - Status indicator
- [ ] **Spinner** - Loading indicator
- [ ] **Tabs** - Tabbed navigation
- [ ] **Toggle** - Switch/checkbox
- [ ] **Textarea** - Multi-line text input
- [ ] **Select** - Dropdown selection
- [ ] **Checkbox** - Checkbox input
- [ ] **Radio** - Radio button group
- [ ] **DatePicker** - Date selection
- [ ] **SearchInput** - Search with icon
- [ ] **IconButton** - Button with icon only
- [ ] **Skeleton** - Loading placeholder

---

**Built with 🌤️ for Wisper**

For questions or suggestions about components, please refer to the [Frontend README](../README.md) or open an issue.