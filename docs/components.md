# DDV Codex Component Library

## Overview

The DDV Codex component library is organized using mathematical principles, with components classified as Prime (atomic), Quasi-Prime (special properties), or Composite (complex combinations).

## Component Hierarchy

### 🔢 Prime Components (Atomic Elements)

These are the fundamental, indivisible building blocks of the system.

#### Button
The most fundamental interaction element.

```jsx
import { Button } from '@ddv-codex/react';

<Button variant="primary" agent="bigSis" size="md">
  Click Me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `agent`: 'bigSis' | 'bro' | 'lilSis' | 'cbo'
- `disabled`: boolean
- `loading`: boolean
- `fullWidth`: boolean

#### Input
Text input field with label and validation support.

```jsx
import { Input } from '@ddv-codex/react';

<Input
  label="Username"
  placeholder="Enter username"
  agent="bigSis"
  error={false}
  helperText="Must be unique"
/>
```

**Props:**
- `variant`: 'default' | 'filled' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `agent`: Agent type
- `label`: string
- `error`: boolean
- `helperText`: string
- `icon`: ReactNode
- `iconPosition`: 'left' | 'right'

#### Toggle
Binary state control.

```jsx
import { Toggle } from '@ddv-codex/react';

<Toggle
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
  agent="bro"
/>
```

#### Select
Dropdown selection component.

```jsx
import { Select } from '@ddv-codex/react';

<Select
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Choose option"
  agent="lilSis"
/>
```

### 🔷 Quasi-Prime Components (Special Properties)

Components with unique mathematical or functional properties.

#### Badge
Status indicators and labels.

```jsx
import { Badge } from '@ddv-codex/react';

<Badge variant="success" size="sm">
  Active
</Badge>
```

**Variants:**
- `default`: Neutral gray
- `success`: Green (#10B981)
- `warning`: Yellow (#F59E0B)
- `error`: Red (#EF4444)
- `info`: Blue (#3B82F6)

#### Tooltip
Contextual information on hover.

```jsx
import { Tooltip } from '@ddv-codex/react';

<Tooltip content="Additional information">
  <Button>Hover me</Button>
</Tooltip>
```

#### Progress
Visual progress indicators.

```jsx
import { Progress } from '@ddv-codex/react';

<Progress value={75} max={100} agent="cbo" />
```

#### Tabs
Organized content sections.

```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ddv-codex/react';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">General</TabsTrigger>
    <TabsTrigger value="tab2">Advanced</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">General content</TabsContent>
  <TabsContent value="tab2">Advanced content</TabsContent>
</Tabs>
```

### 🔶 Composite Components (Complex Containers)

Built from combinations of prime components.

#### Card
Content container with glassmorphism.

```jsx
import { Card, CardHeader, CardContent, CardFooter } from '@ddv-codex/react';

<Card agent="bigSis" variant="elevated">
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>
```

#### Modal
Overlay dialog component.

```jsx
import { Modal, ModalTrigger, ModalContent } from '@ddv-codex/react';

<Modal>
  <ModalTrigger>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalBody>Modal content</ModalBody>
    <ModalFooter>
      <Button>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

#### Accordion
Collapsible content sections.

```jsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@ddv-codex/react';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

### 🌟 Feature Components (Complete Experiences)

Complex, application-level components.

#### AgentCard
AI agent representation with personality.

```jsx
import { AgentCard } from '@ddv-codex/react';

<AgentCard
  agent="bigSis"
  title="Big Sis Analytics"
  description="I remember everything"
  stats={{
    level: 42,
    xp: 8500,
    streak: 7
  }}
/>
```

#### StreakCard
Gamification progress display.

```jsx
import { StreakCard } from '@ddv-codex/react';

<StreakCard
  currentStreak={7}
  bestStreak={14}
  nextMilestone={10}
  agent="bro"
/>
```

## Component Patterns

### Agent Theming

All components support agent theming through the `agent` prop:

```jsx
// Big Sis theme (cyan)
<Button agent="bigSis">Analytics</Button>

// Bro theme (orange)
<Button agent="bro">Action</Button>

// Lil Sis theme (purple)
<Button agent="lilSis">Create</Button>

// CBO theme (green)
<Button agent="cbo">Optimize</Button>
```

### Size Variants

Standard size scale across all components:

```jsx
// Small - 32px height
<Button size="sm">Small</Button>

// Medium - 40px height (default)
<Button size="md">Medium</Button>

// Large - 48px height
<Button size="lg">Large</Button>
```

### Glass Effects

Three levels of glassmorphism:

```jsx
// Level 1 - Ethereal
<Card className="glass-1">Subtle</Card>

// Level 2 - Conscious (default)
<Card className="glass-2">Standard</Card>

// Level 3 - Material
<Card className="glass-3">Strong</Card>
```

### Animation Classes

Consistent animation utilities:

```jsx
// Fade in
<div className="animate-in fade-in duration-base">
  Content
</div>

// Slide in
<div className="animate-in slide-in-from-bottom-2 duration-smooth">
  Content
</div>

// Scale on hover
<Button className="hover-scale">
  Hover me
</Button>
```

## Accessibility

All components follow WCAG 2.2 AA guidelines:

- **Touch Targets**: Minimum 40px, preferred 48px
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: Full support with visible focus indicators
- **Screen Readers**: Proper ARIA labels and roles
- **Motion**: Respects `prefers-reduced-motion`

## Best Practices

1. **Use Agent Themes Consistently**: Pick an agent theme that matches the feature area
2. **Maintain Spacing Harmony**: Use the 8px grid system
3. **Follow Animation Timing**: Use predefined durations (210ms, 280ms, 350ms)
4. **Layer Glass Effects**: Use appropriate glass levels for visual hierarchy
5. **Test Accessibility**: Always verify keyboard navigation and screen reader support

## Component Status

| Component | Status | Package |
|-----------|--------|---------|
| Button | ✅ Ready | @ddv-codex/react |
| Input | ✅ Ready | @ddv-codex/react |
| Card | ✅ Ready | @ddv-codex/react |
| Badge | ✅ Ready | @ddv-codex/react |
| Toggle | 🚧 In Progress | @ddv-codex/react |
| Select | 🚧 In Progress | @ddv-codex/react |
| Tooltip | 🚧 In Progress | @ddv-codex/react |
| Progress | 🚧 In Progress | @ddv-codex/react |
| Tabs | 🚧 In Progress | @ddv-codex/react |
| Modal | 📋 Planned | @ddv-codex/react |
| Accordion | 📋 Planned | @ddv-codex/react |
| Toast | 📋 Planned | @ddv-codex/react |
| Dropdown | 📋 Planned | @ddv-codex/react |
| Checkbox | 📋 Planned | @ddv-codex/react |
| Radio | 📋 Planned | @ddv-codex/react |
| Slider | 📋 Planned | @ddv-codex/react |
| Switch | 📋 Planned | @ddv-codex/react |
| Avatar | 📋 Planned | @ddv-codex/react |
| Breadcrumb | 📋 Planned | @ddv-codex/react |
| Pagination | 📋 Planned | @ddv-codex/react |

## Next Steps

- [View Live Examples](https://ddv-codex.design/components)
- [Browse Storybook](https://storybook.ddv-codex.design)
- [Component Playground](https://codepen.io/collection/ddvcodex)