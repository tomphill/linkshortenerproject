# UI Components Guidelines

## Core Rules

**All UI elements MUST use shadcn/ui components.**  
Do not create custom UI components from scratch. Always leverage the existing shadcn/ui component library.

## Component Usage

### Available Components
- Components are located in `components/ui/`
- Currently available: Button, Card
- To add more components, use the shadcn/ui CLI (see installation section)

### Installation Command
```bash
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add form
```

## Implementation Patterns

### Using Existing Components
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### DO NOT Create Custom Components
❌ **Wrong:**
```tsx
// Don't do this
export function CustomButton({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-500...">{children}</button>;
}
```

✅ **Correct:**
```tsx
// Use shadcn/ui instead
import { Button } from '@/components/ui/button';

export function MyFeature() {
  return <Button>Click me</Button>;
}
```

## Styling Components

### Customization
- Use Tailwind CSS classes to customize shadcn/ui components
- Leverage component variants provided by shadcn/ui
- Use the `cn()` utility from `lib/utils.ts` for conditional classes

```tsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CustomizedButton({ isActive }: { isActive: boolean }) {
  return (
    <Button 
      variant="outline"
      className={cn("w-full", isActive && "bg-accent")}
    >
      Toggle
    </Button>
  );
}
```

## Component Library

### When You Need a New Component
1. Check if shadcn/ui provides it: [shadcn/ui Components](https://ui.shadcn.com/docs/components)
2. Install it using the CLI command
3. Import and use it in your code
4. Never build a custom alternative

### Icons
- Use Lucide React for all icons
- Icons are included with shadcn/ui components

```tsx
import { Link as LinkIcon, Copy, Trash } from 'lucide-react';

export function IconExample() {
  return (
    <Button>
      <LinkIcon className="mr-2 h-4 w-4" />
      Create Link
    </Button>
  );
}
```

## Best Practices

1. **Consistency**: Using shadcn/ui ensures a consistent look and feel
2. **Accessibility**: shadcn/ui components are built with accessibility in mind
3. **Maintainability**: Updates to the design system are easier to manage
4. **Do Not Modify**: Never edit files in `components/ui/` directly - these are managed by shadcn/ui
5. **Composition**: Build features by composing shadcn/ui components, not by creating new primitives

---

*For the complete list of available components and their documentation, visit [ui.shadcn.com](https://ui.shadcn.com)*
