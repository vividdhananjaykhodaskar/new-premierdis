# Frontend CMS Integration Summary

## Overview
All frontend components have been updated to fetch data from the Payload CMS backend following the same pattern as the Hero section.

## Updated Components

### 1. **Features.jsx** ✅
- **Endpoint**: `GET /api/collections/features?where[active][equals]=true&sort=order&limit=50`
- **Data Fetched**: Active features with order sorting
- **Fallback**: Renders default hardcoded features if no CMS data available
- **Fields Used**: `title`, `description`, `image` (relationship to media)
- **Rendering**: Conditional render - CMS data if available, else fallback to static

### 2. **Header.jsx (NavBar)** ✅
- **Endpoint**: `GET /api/collections/nav-items?where[visible][equals]=true&sort=order`
- **Data Fetched**: Visible navigation items sorted by order
- **Fallback**: Default nav items (Home, What We DO, Contact Us, Login)
- **Fields Used**: `label`, `url`, `visible`
- **Special Handling**: "Free Trial" items rendered as buttons

### 3. **Footer.jsx** ✅
- **Endpoint**: `GET /api/collections/footer?limit=50&depth=1`
- **Data Fetched**: Footer sections with links
- **Fallback**: Default footer layout if no CMS data
- **Fields Used**: `sections` (array of links), `copyrightMessage`, `copyrightYear`
- **Rendering**: Maps footer sections and links from CMS

### 4. **WhatWeDoPage.jsx** ✅
- **Endpoint**: `GET /api/collections/what-we-do?where[active][equals]=true&sort=order`
- **Data Fetched**: Active "what we do" services
- **Fallback**: Default services (Version Control, Data Security, Collaboration)
- **Fields Used**: `title`, `subtitle`, `mainTitle`, `description`
- **Icon Assignment**: Cycles through default icons if not provided by CMS

### 5. **ContactUsForm.jsx** ✅
- **Endpoint**: `POST /api/collections/contact-us`
- **Method**: Form submission via POST
- **Payload**: `{ name, email, message, ... }`
- **Success**: Clears form and shows success message
- **Error Handling**: Displays error messages from API

## Fetch Pattern Used

All components follow this consistent pattern:

```javascript
useEffect(() => {
  async function fetchData() {
    try {
      const base = API_BASE.replace(/\/+$/, '');
      const url = `${base}/api/collections/<slug>?<filters>&sort=<field>`;
      const res = await fetch(url);
      const json = await res.json();
      
      const docs = json?.docs || json;
      const data = Array.isArray(docs) ? docs : [];
      
      if (data.length > 0) {
        setData(data);
      } else {
        setData(defaultData);
      }
    } catch (err) {
      console.error('Failed to fetch:', err);
      setData(defaultData);
    }
  }
  
  fetchData();
}, []);
```

## Query Parameters

### Active Filters
```
?where[active][equals]=true
```
Used by: Features, WhatWeDo

### Visibility Filters
```
?where[visible][equals]=true
```
Used by: NavBar (nav-items)

### Sorting
```
?sort=order
```
Applied to: Features, NavBar, WhatWeDo

### Pagination
```
?limit=50
```
Set on all endpoints

### Relationships
```
?depth=1
```
Fetches related data (media for features)

## Error Handling

All components implement:
1. **Try-Catch Blocks**: Network and JSON parsing errors
2. **Fallback Data**: Hardcoded defaults shown if fetch fails
3. **Console Logging**: Errors logged for debugging
4. **User Feedback**: Success/error messages displayed

## Testing Checklist

- [ ] Features component displays CMS features when available
- [ ] Navigation items load from CMS (if populated)
- [ ] Footer renders CMS sections or defaults
- [ ] WhatWeDo services display from CMS
- [ ] Contact form submits to `/api/collections/contact-us`
- [ ] All components show fallback data if backend is down
- [ ] No console errors on component mount
- [ ] Query parameters encode correctly (e.g., `where[active][equals]`)

## Backend API Routes Required

All routes must exist at:
- `/api/collections/hero`
- `/api/collections/features`
- `/api/collections/footer`
- `/api/collections/nav-items`
- `/api/collections/what-we-do`
- `/api/collections/contact-us` (POST support)

Routes were created in [Backend Setup](./BACKEND_SETUP.md).

## Configuration

### Frontend
- `API_BASE`: Must be set in `.env` or config
- Example: `https://new-premierdis.martyn-benjamin.workers.dev`

### Backend
- CORS enabled for frontend origins
- serverURL configured
- All collections accessible via Local API

## Deployment Steps

1. **Update environment variables** if API_BASE changed
2. **Build frontend**: `npm run build` or `pnpm build`
3. **Deploy frontend**: `npm run deploy` or Cloudflare Pages auto-deploy
4. **Verify API routes**: Check backend is responding with 200 OK
5. **Test components**: Load frontend and verify data displays

## Notes

- All components are backward compatible with fallback data
- No hardcoded values removed - defaults preserved
- Fetch occurs on component mount (useEffect with empty deps)
- Response normalization handles both array and `{docs: [...]}` formats
- CORS headers included on all API routes for cross-domain requests
