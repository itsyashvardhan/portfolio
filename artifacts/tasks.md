# End-to-End Testing Tasks

## Phase 1: Environment Setup
- [x] Create artifacts directory
- [x] Create testing plan
- [ ] Start development server
- [ ] Verify server is running on localhost:3000

## Phase 2: Public Pages Testing

### 2.1 Landing Page (`/`)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Navigation is visible and styled
- [ ] CTA buttons are functional
- [ ] Footer displays correctly
- [ ] Mobile responsive (dock navigation)
- [ ] Dark/light mode works

### 2.2 Works Page (`/works`)
- [ ] Page loads without errors
- [ ] Project cards display correctly
- [ ] Project cards have proper styling
- [ ] Click through to individual project works
- [ ] Mobile responsive layout
- [ ] Empty state handling (if no projects)

### 2.3 Works Detail (`/works/[slug]`)
- [ ] Dynamic route resolves correctly
- [ ] Project content displays
- [ ] Images/media load correctly
- [ ] Back navigation works
- [ ] 404 for invalid slugs

### 2.4 Writing Page (`/writing`)
- [ ] Page loads without errors
- [ ] Blog post cards display correctly
- [ ] Tags display properly
- [ ] Click through to individual posts
- [ ] Mobile responsive layout

### 2.5 Blog Detail (`/blog/[slug]`)
- [ ] Dynamic route resolves correctly
- [ ] Blog content renders (Markdown)
- [ ] Code blocks styled correctly
- [ ] Back navigation works
- [ ] 404 for invalid slugs

### 2.6 About Page (`/about`)
- [ ] Page loads without errors
- [ ] Profile/hero section displays
- [ ] Skills section displays (GitHub tag style)
- [ ] Experience timeline displays
- [ ] Education section displays
- [ ] Achievements section displays
- [ ] Social links work
- [ ] Mobile responsive layout

## Phase 3: Navigation & UX
- [ ] Header navigation links work on all pages
- [ ] Mobile navigation (dock on landing, standard elsewhere)
- [ ] Active state shows current page
- [ ] Logo/brand links to home
- [ ] No broken links detected

## Phase 4: Admin Panel Testing

### 4.1 Access Control
- [ ] `/ssh` redirects to login when unauthenticated
- [ ] `/ssh/login` page loads correctly
- [ ] Google OAuth button displayed
- [ ] Unauthorized users redirected after auth

### 4.2 Admin Dashboard (`/ssh` - if authenticated)
- [ ] Dashboard loads with quick stats
- [ ] Sidebar navigation works
- [ ] All admin sections accessible

### 4.3 Content Management
- [ ] Works CRUD functionality (visual inspection)
- [ ] Writing CRUD functionality (visual inspection)
- [ ] Experience editing works
- [ ] Settings save correctly

## Phase 5: Error Handling & Edge Cases
- [ ] 404 page at `/nonexistent`
- [ ] Error boundary catches runtime errors
- [ ] Loading states display during data fetch
- [ ] Empty states for sections with no content

## Phase 6: SEO & Performance
- [ ] Title tags present on all pages
- [ ] Meta descriptions present
- [ ] OG tags for social sharing
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible
- [ ] No CLS (cumulative layout shift) issues

## Phase 7: Final Documentation
- [ ] Document all findings in verification_log.md
- [ ] Note any bugs or issues found
- [ ] Capture screenshots of key states
- [ ] Summary of test results
