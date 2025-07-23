# Getting Started with DDV Codex

## Installation

### Package Manager

```bash
# npm
npm install @ddv-codex/core @ddv-codex/react

# yarn
yarn add @ddv-codex/core @ddv-codex/react

# pnpm
pnpm add @ddv-codex/core @ddv-codex/react
```

### CDN

```html
<!-- Core CSS -->
<link rel="stylesheet" href="https://unpkg.com/@ddv-codex/css@latest/dist/ddv-codex.min.css">

<!-- Core JS -->
<script src="https://unpkg.com/@ddv-codex/core@latest/dist/ddv-codex.min.js"></script>
```

## Setup

### React

```jsx
// 1. Import the CSS (in your root component or index.js)
import '@ddv-codex/css/dist/ddv-codex.css';

// 2. Wrap your app with the DDVProvider
import { DDVProvider } from '@ddv-codex/react';

function App() {
  return (
    <DDVProvider theme="dark" agent="bigSis">
      {/* Your app content */}
    </DDVProvider>
  );
}

// 3. Use components
import { Button, Input, Card } from '@ddv-codex/react';

function MyComponent() {
  return (
    <Card>
      <Input label="Username" />
      <Button>Submit</Button>
    </Card>
  );
}
```

### Tailwind CSS

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('@ddv-codex/tailwind')
  ]
}
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@ddv-codex/css@latest/dist/ddv-codex.min.css">
</head>
<body>
  <button class="ddv-button ddv-button--primary ddv-button--bigsis">
    Click Me
  </button>
  
  <script src="https://unpkg.com/@ddv-codex/core@latest/dist/ddv-codex.min.js"></script>
  <script>
    // Initialize DDV Codex
    DDVCodex.init({
      theme: 'dark',
      agent: 'bigSis'
    });
  </script>
</body>
</html>
```

## Your First Component

### React Example

```jsx
import { useState } from 'react';
import { Card, Button, Input, Badge } from '@ddv-codex/react';

function UserProfile() {
  const [name, setName] = useState('');
  
  return (
    <Card agent="bigSis" className="max-w-md">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-h3">User Profile</h2>
          <Badge variant="success">Active</Badge>
        </div>
        
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          helperText="This will be displayed publicly"
        />
        
        <div className="flex gap-2">
          <Button variant="primary" agent="bigSis">
            Save Changes
          </Button>
          <Button variant="ghost">
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
}
```

### HTML/CSS Example

```html
<div class="ddv-card ddv-card--bigsis">
  <div class="ddv-stack ddv-stack--4">
    <div class="ddv-cluster ddv-cluster--3">
      <h2 class="ddv-text-h3">User Profile</h2>
      <span class="ddv-badge ddv-badge--success">Active</span>
    </div>
    
    <div class="ddv-input-group">
      <label class="ddv-label" for="name">Full Name</label>
      <input 
        type="text" 
        id="name"
        class="ddv-input ddv-input--bigsis" 
        placeholder="Enter your name"
      />
      <span class="ddv-helper-text">This will be displayed publicly</span>
    </div>
    
    <div class="ddv-cluster ddv-cluster--2">
      <button class="ddv-button ddv-button--primary ddv-button--bigsis">
        Save Changes
      </button>
      <button class="ddv-button ddv-button--ghost">
        Cancel
      </button>
    </div>
  </div>
</div>
```

## Design Tokens

### Using Tokens in JavaScript

```js
import { tokens } from '@ddv-codex/core';

// Colors
const primaryColor = tokens.colors.bigSis.primary; // #00D4FF

// Spacing
const baseSpace = tokens.spacing[2]; // 16px

// Typography
const bodySize = tokens.typography.body.fontSize; // 16px

// Animation
const baseDuration = tokens.animation.duration.base; // 280ms
```

### Using Tokens in CSS

```css
/* With CSS Variables */
.my-component {
  color: var(--ddv-color-bigsis-primary);
  padding: var(--ddv-space-2);
  font-size: var(--ddv-font-size-body);
  transition: all var(--ddv-duration-base) var(--ddv-ease-out);
}

/* With Tailwind */
<div class="text-bigsis-primary p-2 text-body transition-base">
  Content
</div>
```

## TypeScript Support

DDV Codex is written in TypeScript and provides full type definitions:

```tsx
import { Button, ButtonProps } from '@ddv-codex/react';
import { Agent, Size, Variant } from '@ddv-codex/core/types';

interface MyButtonProps extends ButtonProps {
  customProp?: string;
}

const MyButton: React.FC<MyButtonProps> = ({ 
  children, 
  agent = 'bigSis',
  size = 'md',
  ...props 
}) => {
  return (
    <Button agent={agent} size={size} {...props}>
      {children}
    </Button>
  );
};
```

## Next Steps

- [Explore Components](./components.md)
- [Learn Design Principles](./principles.md)
- [View Live Examples](https://ddv-codex.design/examples)
- [Join the Community](https://discord.gg/ddvcodex)