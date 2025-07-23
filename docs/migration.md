# Migration Guide

## Migrating from Other Design Systems

This guide helps you transition from popular design systems to DDV Codex.

## From Material-UI (MUI)

### Component Mapping

| MUI Component | DDV Codex Equivalent | Notes |
|---------------|---------------------|-------|
| `Button` | `Button` | Use `agent` prop instead of `color` |
| `TextField` | `Input` | `variant` prop values differ |
| `Card` | `Card` | Built-in glassmorphism |
| `Chip` | `Badge` | Different variant names |
| `LinearProgress` | `Progress` | Supports agent theming |
| `Tabs` | `Tabs` | Similar API |
| `Dialog` | `Modal` | Simpler API |
| `Accordion` | `Accordion` | Radix-based |

### Before (MUI)
```jsx
import { Button, TextField, Card } from '@mui/material';

<Card sx={{ p: 2, mb: 2 }}>
  <TextField 
    label="Username" 
    variant="outlined"
    fullWidth
    sx={{ mb: 2 }}
  />
  <Button 
    variant="contained" 
    color="primary"
    fullWidth
  >
    Submit
  </Button>
</Card>
```

### After (DDV Codex)
```jsx
import { Button, Input, Card } from '@ddv-codex/react';

<Card className="p-3 mb-3">
  <Input 
    label="Username" 
    variant="default"
    fullWidth
    className="mb-3"
  />
  <Button 
    variant="primary" 
    agent="bigSis"
    fullWidth
  >
    Submit
  </Button>
</Card>
```

## From Ant Design

### Component Mapping

| Ant Design | DDV Codex | Notes |
|------------|-----------|-------|
| `Button` | `Button` | `type` → `variant` |
| `Input` | `Input` | Simpler API |
| `Card` | `Card` | No `Meta` component |
| `Tag` | `Badge` | Different props |
| `Progress` | `Progress` | Linear only |
| `Tabs` | `Tabs` | Compound component |
| `Modal` | `Modal` | Trigger-based |

### Before (Ant Design)
```jsx
import { Button, Input, Card, Space } from 'antd';

<Card title="Login" style={{ width: 300 }}>
  <Space direction="vertical" style={{ width: '100%' }}>
    <Input placeholder="Username" />
    <Input.Password placeholder="Password" />
    <Button type="primary" block>
      Login
    </Button>
  </Space>
</Card>
```

### After (DDV Codex)
```jsx
import { Button, Input, Card } from '@ddv-codex/react';

<Card className="w-80">
  <CardHeader>
    <h3>Login</h3>
  </CardHeader>
  <CardContent className="space-y-3">
    <Input placeholder="Username" />
    <Input type="password" placeholder="Password" />
    <Button variant="primary" fullWidth>
      Login
    </Button>
  </CardContent>
</Card>
```

## From Chakra UI

### Component Mapping

| Chakra UI | DDV Codex | Notes |
|-----------|-----------|-------|
| `Button` | `Button` | `colorScheme` → `agent` |
| `Input` | `Input` | Similar API |
| `Card` | `Card` | Different structure |
| `Badge` | `Badge` | `colorScheme` → `variant` |
| `Progress` | `Progress` | Similar API |
| `Tabs` | `Tabs` | Different compound API |
| `Modal` | `Modal` | Trigger-based |

### Before (Chakra UI)
```jsx
import { Button, Input, Card, VStack } from '@chakra-ui/react';

<Card p={4}>
  <VStack spacing={4}>
    <Input placeholder="Enter email" />
    <Button colorScheme="blue" width="full">
      Subscribe
    </Button>
  </VStack>
</Card>
```

### After (DDV Codex)
```jsx
import { Button, Input, Card } from '@ddv-codex/react';

<Card className="p-4">
  <div className="space-y-4">
    <Input placeholder="Enter email" />
    <Button agent="bigSis" fullWidth>
      Subscribe
    </Button>
  </div>
</Card>
```

## From Tailwind UI

If you're using Tailwind UI components, DDV Codex provides pre-built components with our design system applied:

### Before (Tailwind UI)
```jsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Email
      </label>
      <input 
        type="email" 
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>
    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
      Sign in
    </button>
  </div>
</div>
```

### After (DDV Codex)
```jsx
<Card>
  <div className="space-y-4">
    <Input 
      type="email" 
      label="Email"
      fullWidth
    />
    <Button variant="primary" agent="bigSis" fullWidth>
      Sign in
    </Button>
  </div>
</Card>
```

## General Migration Tips

### 1. Install DDV Codex

```bash
npm install @ddv-codex/core @ddv-codex/react
# or with Tailwind
npm install @ddv-codex/core @ddv-codex/react @ddv-codex/tailwind
```

### 2. Update Your Theme Provider

Replace your existing theme provider with DDV Provider:

```jsx
// Before (MUI)
import { ThemeProvider, createTheme } from '@mui/material';
const theme = createTheme({ /* ... */ });

// After (DDV Codex)
import { DDVProvider } from '@ddv-codex/react';

function App() {
  return (
    <DDVProvider theme="dark" agent="bigSis">
      {/* Your app */}
    </DDVProvider>
  );
}
```

### 3. Update Spacing

DDV Codex uses an 8px base unit. Update your spacing:

```jsx
// Before
<Box sx={{ p: 2, m: 3 }}> // MUI (16px, 24px)
<div className="p-4 m-6"> // Tailwind (16px, 24px)

// After
<div className="p-2 m-3"> // DDV (16px, 24px)
```

### 4. Update Colors

Map your brand colors to agent themes:

```jsx
// Before
<Button color="primary">Action</Button>

// After
<Button agent="bigSis">Action</Button> // Cyan theme
<Button agent="bro">Action</Button>    // Orange theme
<Button agent="lilSis">Action</Button> // Purple theme
<Button agent="cbo">Action</Button>    // Green theme
```

### 5. Update Typography

DDV Codex uses golden ratio typography:

```jsx
// Before
<Typography variant="h1">Title</Typography> // MUI
<h1 className="text-4xl">Title</h1>        // Tailwind

// After
<h1 className="text-h1">Title</h1>         // DDV Codex
```

### 6. Update Icons

DDV Codex is icon library agnostic:

```jsx
// Use any icon library
import { Search } from 'lucide-react';

<Input 
  icon={<Search size={16} />}
  placeholder="Search..."
/>
```

## Common Patterns

### Forms

```jsx
// DDV Codex Form Pattern
<form className="space-y-4">
  <Input 
    label="Email"
    type="email"
    required
    error={errors.email}
    helperText={errors.email?.message}
  />
  
  <Input 
    label="Password"
    type="password"
    required
    error={errors.password}
    helperText={errors.password?.message}
  />
  
  <Button type="submit" variant="primary" fullWidth>
    Submit
  </Button>
</form>
```

### Layouts

```jsx
// DDV Codex Layout Pattern
<div className="container mx-auto px-3">
  <div className="grid grid-cols-24 gap-3">
    <aside className="col-span-6">
      {/* Sidebar */}
    </aside>
    <main className="col-span-18">
      {/* Main content */}
    </main>
  </div>
</div>
```

### Cards Grid

```jsx
// DDV Codex Card Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
  {items.map(item => (
    <Card key={item.id} agent="bigSis">
      <CardHeader>
        <h3>{item.title}</h3>
      </CardHeader>
      <CardContent>
        <p>{item.description}</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">View</Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

## Gradual Migration Strategy

1. **Phase 1**: Install DDV Codex alongside existing system
2. **Phase 2**: Migrate shared components (buttons, inputs)
3. **Phase 3**: Update layouts and spacing
4. **Phase 4**: Migrate complex components
5. **Phase 5**: Remove old design system

## Need Help?

- [Discord Community](https://discord.gg/ddvcodex)
- [GitHub Discussions](https://github.com/yourusername/ddv-codex-design-system/discussions)
- [Migration Examples](https://github.com/yourusername/ddv-codex-examples)