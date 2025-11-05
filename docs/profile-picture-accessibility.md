# ProfilePicture Accessibility Documentation

## Overview

The ProfilePicture component has been enhanced with comprehensive accessibility features to ensure it works well for all users, including those using assistive technologies like screen readers, keyboard navigation, and other accessibility tools.

## Accessibility Features

### 1. Comprehensive Alt Text Generation

The component automatically generates descriptive alt text based on:
- Author name from site configuration
- Current loading state (loading, loaded, error)
- Size variant (small, medium, large)
- Custom alt text when provided

**Example alt text:**
- `"Profile picture of Ng Lih Sheng"`
- `"Loading profile picture of Ng Lih Sheng"`
- `"Profile picture of Ng Lih Sheng failed to load"`

### 2. ARIA Labels and Screen Reader Support

- **ARIA Labels**: Comprehensive aria-label attributes for containers and interactive elements
- **Role Attributes**: Proper role="img" for image containers and fallbacks
- **Screen Reader Text**: Hidden descriptive text providing context about the person
- **Loading States**: Proper role="status" and aria-label for loading indicators

### 3. Keyboard Navigation Support

- **Focusable Elements**: Optional keyboard focus support with proper focus indicators
- **Keyboard Handlers**: Enter and Space key support for interactive profile pictures
- **Focus Management**: Escape key support to remove focus
- **Visual Focus Indicators**: Clear focus rings with proper contrast

### 4. Error Handling and Boundaries

- **Error Boundary**: React error boundary to catch and handle component failures gracefully
- **Fallback UI**: Accessible fallback interface when errors occur
- **Error Announcements**: Screen reader announcements for loading failures
- **Graceful Degradation**: Multiple fallback levels (image → avatar → initials → error state)

### 5. Performance and Loading States

- **Loading Indicators**: Accessible loading spinners with proper ARIA attributes
- **Performance Monitoring**: Development-time performance logging
- **Optimized Loading**: Proper image sizing to prevent layout shift
- **Caching Strategies**: Browser caching for improved performance

## Usage Examples

### Basic Usage with Accessibility

```tsx
<ProfilePicture
  size="medium"
  priority={true}
  ariaLabel="Profile picture of John Doe, software developer"
  includeScreenReaderText={true}
  screenReaderText="This is John Doe's professional headshot, showing a friendly developer."
/>
```

### Interactive Profile Picture

```tsx
<ProfilePicture
  size="large"
  tabIndex={0}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // Handle activation (e.g., open modal)
      openProfileModal();
    }
  }}
  onFocus={() => console.log('Profile picture focused')}
  onBlur={() => console.log('Profile picture blurred')}
  ariaLabel="Profile picture of Jane Smith, click to view larger image"
/>
```

### With Error Boundary

```tsx
<ProfilePictureWithErrorBoundary
  size="medium"
  onError={(error) => {
    // Handle errors
    console.error('Profile picture error:', error);
    analytics.track('profile_picture_error', { error: error.message });
  }}
/>
```

## Accessibility Props Reference

### Core Accessibility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `role` | `string` | `"img"` | ARIA role for the container |
| `ariaLabel` | `string` | Auto-generated | Custom ARIA label |
| `ariaDescribedBy` | `string` | `undefined` | ID of element describing the image |
| `tabIndex` | `number` | `undefined` | Tab order (-1 for non-focusable, 0 for focusable) |

### Keyboard Navigation Props

| Prop | Type | Description |
|------|------|-------------|
| `onFocus` | `() => void` | Called when element receives focus |
| `onBlur` | `() => void` | Called when element loses focus |
| `onKeyDown` | `(event: KeyboardEvent) => void` | Keyboard event handler |

### Screen Reader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `includeScreenReaderText` | `boolean` | `true` | Include descriptive text for screen readers |
| `screenReaderText` | `string` | Auto-generated | Custom screen reader description |

## Screen Reader Experience

### What Screen Readers Announce

1. **Image Loading**: "Loading profile picture of [Name]"
2. **Image Loaded**: "[Size] Profile picture of [Name]" + descriptive text
3. **Image Failed**: "Profile picture of [Name] failed to load. Showing initials fallback: [Initials]"
4. **Fallback State**: "Fallback initials for [Name]. [Descriptive text]"

### Navigation Flow

1. User tabs to profile picture (if focusable)
2. Screen reader announces the aria-label
3. User can activate with Enter or Space
4. Additional context provided through hidden descriptive text

## Testing Accessibility

### Manual Testing

1. **Keyboard Navigation**:
   - Tab to the profile picture
   - Verify focus indicator is visible
   - Press Enter/Space to activate (if interactive)
   - Press Escape to remove focus

2. **Screen Reader Testing**:
   - Use NVDA, JAWS, or VoiceOver
   - Verify proper announcements
   - Check descriptive text is read
   - Test error states

3. **Visual Testing**:
   - Verify focus indicators have sufficient contrast
   - Test in high contrast mode
   - Check with different zoom levels

### Automated Testing

```tsx
// Example test with React Testing Library
import { render, screen } from '@testing-library/react';
import { ProfilePicture } from './ProfilePicture';

test('profile picture has proper accessibility attributes', () => {
  render(<ProfilePicture size="medium" />);
  
  const profilePicture = screen.getByRole('img');
  expect(profilePicture).toHaveAttribute('aria-label');
  expect(profilePicture).toBeInTheDocument();
});

test('profile picture is keyboard accessible when interactive', () => {
  const handleKeyDown = jest.fn();
  render(
    <ProfilePicture 
      size="medium" 
      tabIndex={0} 
      onKeyDown={handleKeyDown} 
    />
  );
  
  const profilePicture = screen.getByRole('img');
  expect(profilePicture).toHaveAttribute('tabindex', '0');
  
  fireEvent.keyDown(profilePicture, { key: 'Enter' });
  expect(handleKeyDown).toHaveBeenCalled();
});
```

## Best Practices

### Do's

- ✅ Always provide meaningful alt text
- ✅ Use proper ARIA labels for interactive elements
- ✅ Include descriptive screen reader text
- ✅ Handle keyboard navigation properly
- ✅ Provide clear focus indicators
- ✅ Test with actual screen readers
- ✅ Use error boundaries for graceful failures

### Don'ts

- ❌ Don't use generic alt text like "image" or "photo"
- ❌ Don't make non-interactive elements focusable
- ❌ Don't rely only on color for important information
- ❌ Don't ignore loading and error states
- ❌ Don't forget to test keyboard navigation
- ❌ Don't use placeholder text as the only description

## Browser Support

The accessibility features are supported in:
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

All features gracefully degrade in older browsers while maintaining basic functionality.

## WCAG 2.1 Compliance

This component meets WCAG 2.1 Level AA standards:

- **1.1.1 Non-text Content**: Proper alt text for all images
- **1.3.1 Info and Relationships**: Proper semantic structure
- **2.1.1 Keyboard**: Full keyboard accessibility
- **2.4.3 Focus Order**: Logical focus order
- **2.4.7 Focus Visible**: Clear focus indicators
- **3.2.1 On Focus**: No unexpected context changes
- **4.1.2 Name, Role, Value**: Proper ARIA implementation