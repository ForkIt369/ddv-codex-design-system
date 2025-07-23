# Contributing to DDV Codex Design System

Thank you for your interest in contributing to DDV Codex! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Respect differing viewpoints and experiences

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/ddv-codex-design-system.git
   cd ddv-codex-design-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development:
   ```bash
   npm run dev
   ```

## Development Workflow

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our guidelines

3. Test your changes:
   ```bash
   npm test
   npm run lint
   ```

4. Commit using conventional commits:
   ```bash
   git commit -m "feat: add new component"
   ```

5. Push and create a pull request

## Contribution Guidelines

### Component Development

When creating new components:

1. **Follow the Mathematical Principles**
   - Use 8px base unit for spacing
   - Apply golden ratio for proportions
   - Respect the 24-point Icositetragon structure

2. **Component Structure**
   ```
   packages/react/src/components/ComponentName/
   ├── ComponentName.tsx
   ├── ComponentName.types.ts
   ├── ComponentName.test.tsx
   ├── ComponentName.stories.tsx
   └── index.ts
   ```

3. **TypeScript First**
   - Define comprehensive prop types
   - Avoid `any` types
   - Export types separately

4. **Accessibility**
   - WCAG 2.2 AA compliance minimum
   - Keyboard navigation support
   - Proper ARIA attributes
   - Screen reader testing

5. **Documentation**
   - JSDoc comments for props
   - Storybook stories for all variants
   - Usage examples in stories

### Code Style

We use ESLint and Prettier for code formatting:

```typescript
// ✅ Good
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

// ❌ Bad
export const Button = (props) => <button {...props} />
```

### Testing

All components must have:
- Unit tests (Jest + React Testing Library)
- Visual regression tests (Chromatic)
- Accessibility tests

Example test:
```typescript
describe('Button', () => {
  it('renders with correct agent theme', () => {
    render(<Button agent="bigSis">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('agent-bigsis');
  });
});
```

### Documentation

Update documentation for:
- New components
- API changes
- Design token updates
- Usage patterns

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build process/auxiliary changes

Examples:
```bash
feat: add Progress component
fix: correct Button focus state
docs: update Input component examples
```

## Pull Request Process

1. **PR Title**: Use conventional commit format
2. **Description**: Explain what, why, and how
3. **Screenshots**: Include for UI changes
4. **Tests**: Ensure all tests pass
5. **Review**: Address reviewer feedback

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Storybook stories added
- [ ] Accessibility verified
- [ ] Design tokens used correctly

## Screenshots
(if applicable)
```

## Design Token Updates

When updating design tokens:

1. Update in `packages/core/src/tokens.ts`
2. Document the change
3. Update affected components
4. Test all themes

## Release Process

We use Changesets for versioning:

1. Create a changeset:
   ```bash
   npm run changeset
   ```

2. Choose change type:
   - Patch: Bug fixes
   - Minor: New features
   - Major: Breaking changes

3. Write changeset description

## Questions?

- Open a [Discussion](https://github.com/yourusername/ddv-codex-design-system/discussions)
- Join our [Discord](https://discord.gg/ddvcodex)
- Check existing [Issues](https://github.com/yourusername/ddv-codex-design-system/issues)

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Annual contributor spotlight

Thank you for helping make DDV Codex better! 🚀