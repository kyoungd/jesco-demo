# JESCO Analytics - Phase 1 UI Specification

**Banking Analytics & Call Management System**

## Color Scheme & Design Foundation

### Brand Color Palette
```css
:root {
  --color-primary: #0A327F;        /* Primary blue */
  --color-primary-hover: #052B6C;  /* Darker blue for hover */
  --color-accent: #314E8D;         /* Accent blue */
  --color-bg-light: #F1F6FB;       /* Light background */
  --color-text: #1A1A1A;          /* Dark text */
}
```

### Typography System
- **Font Family**: Inter (400, 500, 600, 700, 800)
- **Fallbacks**: Helvetica, Arial, sans-serif
- **Headings**: Primary color with font-weight 800
- **Body**: Dark text color with line-height 1.5

### Core Component Styles
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: #fff;
  background-color: var(--color-primary);
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  transition: background-color .25s ease;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.bg-light {
  background: var(--color-bg-light);
}

.text-accent {
  color: var(--color-accent);
}
```

---

## 1. Authentication Interface

### Login Page
**Route**: `/login`

**Layout Structure**:
```html
<body class="bg-light min-h-screen">
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <!-- Login Form -->
    </div>
  </div>
</body>
```

**Form Components**:
- **Header**: "JESCO Analytics" with primary color
- **Subtitle**: "Banking Call Management System" in accent color
- **Email Field**: Full-width input with focus states
- **Password Field**: With show/hide toggle icon
- **Remember Me**: Checkbox with accent color
- **Login Button**: Primary button full-width
- **Forgot Password**: Link in primary color

**Visual Elements**:
- Card shadow: `box-shadow: 0 4px 16px rgba(0,0,0,0.08)`
- Input focus: Border color changes to primary
- Loading state: Button shows spinner with "Signing In..."
- Error states: Red border and message below inputs

### Logout Process
- Header dropdown with "Sign Out" option
- Confirmation modal with primary color buttons
- Success message: "Signed out successfully"
- Automatic redirect to login page

---

## 2. Main Dashboard

### Navigation Header
**Fixed top navigation with brand colors**

```html
<header class="bg-white shadow-sm border-b">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Brand -->
      <h1 class="text-xl font-extrabold" style="color: var(--color-primary)">
        JESCO Analytics
      </h1>
      
      <!-- Navigation -->
      <nav class="hidden md:flex space-x-8">
        <a href="/dashboard" class="text-primary">Dashboard</a>
        <a href="/calls" class="text-gray-600 hover:text-primary">Call Analytics</a>
        <a href="/reports" class="text-gray-600 hover:text-primary">Reports</a>
        <a href="/leads" class="text-gray-600 hover:text-primary">Lead Management</a>
      </nav>
      
      <!-- User Menu -->
      <div class="relative">
        <!-- Dropdown trigger -->
      </div>
    </div>
  </div>
</header>
```

### Dashboard Overview
**Route**: `/dashboard`

**Key Metrics Cards** (Top Row):
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <!-- Missed Calls Today -->
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">Missed Calls Today</p>
        <p class="text-3xl font-bold text-primary">24</p>
      </div>
      <div class="text-accent">
        <!-- Phone icon -->
      </div>
    </div>
    <div class="mt-4 flex items-center text-sm">
      <span class="text-green-600">+12%</span>
      <span class="text-gray-500 ml-1">from yesterday</span>
    </div>
  </div>
  
  <!-- SMS Response Rate -->
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">SMS Response Rate</p>
        <p class="text-3xl font-bold text-primary">78%</p>
      </div>
      <div class="text-accent">
        <!-- Message icon -->
      </div>
    </div>
    <div class="mt-4">
      <div class="w-full bg-bg-light rounded-full h-2">
        <div class="bg-primary h-2 rounded-full" style="width: 78%"></div>
      </div>
    </div>
  </div>
  
  <!-- Active Leads -->
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">Active Leads</p>
        <p class="text-3xl font-bold text-primary">16</p>
      </div>
      <div class="text-accent">
        <!-- Users icon -->
      </div>
    </div>
    <div class="mt-4 flex items-center text-sm">
      <span class="text-green-600">+3 new</span>
      <span class="text-gray-500 ml-1">this hour</span>
    </div>
  </div>
  
  <!-- Revenue Pipeline -->
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">Revenue Pipeline</p>
        <p class="text-3xl font-bold text-primary">$12,450</p>
      </div>
      <div class="text-accent">
        <!-- Dollar sign icon -->
      </div>
    </div>
    <div class="mt-4 flex items-center text-sm">
      <span class="text-green-600">$2,100</span>
      <span class="text-gray-500 ml-1">added today</span>
    </div>
  </div>
</div>
```

### Real-Time Activity Feed
**Left column (2/3 width)**:

```html
<div class="bg-white rounded-xl shadow-sm p-6">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-bold text-primary">Live Activity</h2>
    <div class="flex items-center space-x-2">
      <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span class="text-sm text-gray-500">Live</span>
    </div>
  </div>
  
  <div class="space-y-4 max-h-96 overflow-y-auto">
    <!-- Activity Item -->
    <div class="flex items-start space-x-3 p-3 bg-bg-light rounded-lg">
      <div class="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <!-- Icon -->
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900">
          Missed call from (555) XXX-1234
        </p>
        <p class="text-sm text-gray-500">
          SMS sent automatically • 2 minutes ago
        </p>
      </div>
      <button class="btn-primary text-xs px-3 py-1">
        View
      </button>
    </div>
    
    <!-- More activity items -->
  </div>
</div>
```

### Conversation Management Panel
**Right column (1/3 width)**:

```html
<div class="bg-white rounded-xl shadow-sm p-6">
  <h3 class="text-lg font-semibold text-primary mb-4">
    Needs Attention
  </h3>
  
  <div class="space-y-3">
    <!-- Conversation Item -->
    <div class="border border-gray-200 rounded-lg p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium">(555) XXX-5678</span>
        <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
          Pending
        </span>
      </div>
      <p class="text-sm text-gray-600 mb-3">
        "Looking for plumbing services..."
      </p>
      <button class="btn-primary w-full text-sm">
        Take Over
      </button>
    </div>
    
    <!-- More conversation items -->
  </div>
</div>
```

---

## 3. Call Analytics Interface

### Analytics Dashboard
**Route**: `/analytics`

**Page Header**:
```html
<div class="flex items-center justify-between mb-8">
  <div>
    <h1 class="text-3xl font-bold text-primary">Call Analytics</h1>
    <p class="text-gray-600">Track call patterns and SMS conversion performance</p>
  </div>
  
  <!-- Date Range Selector -->
  <div class="flex items-center space-x-3">
    <select class="border border-gray-300 rounded-lg px-3 py-2">
      <option>Last 7 days</option>
      <option>Last 30 days</option>
      <option>Last 90 days</option>
    </select>
    <button class="btn-primary">Export</button>
  </div>
</div>
```

**Analytics Charts**:
```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
  <!-- Call Volume Chart -->
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <h3 class="text-lg font-semibold text-primary mb-4">
      Daily Call Volume
    </h3>
    <div class="h-64 bg-bg-light rounded-lg flex items-center justify-center">
      <!-- Chart component goes here -->
      <span class="text-accent">Call Volume Chart</span>
    </div>
  </div>
  
  <!-- Response Rate Chart -->
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <h3 class="text-lg font-semibold text-primary mb-4">
      SMS Response Rates
    </h3>
    <div class="h-64 bg-bg-light rounded-lg flex items-center justify-center">
      <!-- Chart component goes here -->
      <span class="text-accent">Response Rate Chart</span>
    </div>
  </div>
</div>
```

### Performance Metrics Table
```html
<div class="bg-white rounded-xl shadow-sm overflow-hidden">
  <div class="p-6 border-b border-gray-200">
    <h3 class="text-lg font-semibold text-primary">Performance Breakdown</h3>
  </div>
  
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-bg-light">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Time Period
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Total Calls
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Missed Calls
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            SMS Sent
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Response Rate
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- Table rows -->
      </tbody>
    </table>
  </div>
</div>
```

---

## 4. Reports Interface

### Reports Dashboard
**Route**: `/reports`

**Report Categories**:
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <!-- Executive Summary -->
  <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-primary">
    <h3 class="text-lg font-semibold text-primary mb-2">
      Executive Summary
    </h3>
    <p class="text-gray-600 mb-4">
      High-level performance overview and KPIs
    </p>
    <button class="btn-primary w-full">Generate Report</button>
  </div>
  
  <!-- Revenue Analysis -->
  <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-accent">
    <h3 class="text-lg font-semibold text-primary mb-2">
      Revenue Analysis
    </h3>
    <p class="text-gray-600 mb-4">
      Detailed revenue attribution and ROI metrics
    </p>
    <button class="btn-primary w-full">Generate Report</button>
  </div>
  
  <!-- Customer Insights -->
  <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
    <h3 class="text-lg font-semibold text-primary mb-2">
      Customer Insights
    </h3>
    <p class="text-gray-600 mb-4">
      Customer behavior and engagement patterns
    </p>
    <button class="btn-primary w-full">Generate Report</button>
  </div>
</div>
```

### Recent Reports
```html
<div class="bg-white rounded-xl shadow-sm">
  <div class="p-6 border-b border-gray-200">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-primary">Recent Reports</h3>
      <button class="text-primary hover:text-primary-hover">View All</button>
    </div>
  </div>
  
  <div class="divide-y divide-gray-200">
    <!-- Report Item -->
    <div class="p-6 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="w-10 h-10 bg-bg-light rounded-lg flex items-center justify-center">
          <!-- Document icon -->
        </div>
        <div>
          <h4 class="font-medium text-gray-900">Weekly Performance Report</h4>
          <p class="text-sm text-gray-500">Generated 2 hours ago</p>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <button class="text-primary hover:text-primary-hover">Download</button>
        <button class="text-accent hover:text-gray-600">Share</button>
      </div>
    </div>
    
    <!-- More report items -->
  </div>
</div>
```

---

## 5. Lead Management Interface

### Lead Pipeline
**Route**: `/leads`

**Pipeline Board**:
```html
<div class="flex space-x-6 overflow-x-auto pb-6">
  <!-- New Inquiries Column -->
  <div class="flex-shrink-0 w-80">
    <div class="bg-gray-50 rounded-lg p-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-gray-900">New Inquiries</h3>
        <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">8</span>
      </div>
      
      <div class="space-y-3">
        <!-- Lead Card -->
        <div class="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <div class="flex items-center justify-between mb-2">
            <span class="font-medium">(555) XXX-1234</span>
            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              New
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-2">
            "Need plumbing repair ASAP"
          </p>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>5 minutes ago</span>
            <span>Est. $450</span>
          </div>
        </div>
        
        <!-- More lead cards -->
      </div>
    </div>
  </div>
  
  <!-- SMS Contact Made Column -->
  <div class="flex-shrink-0 w-80">
    <div class="bg-yellow-50 rounded-lg p-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-gray-900">SMS Contact Made</h3>
        <span class="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full text-sm">5</span>
      </div>
      <!-- Lead cards -->
    </div>
  </div>
  
  <!-- More pipeline columns -->
</div>
```

---

## 6. Settings Interface

### Settings Navigation
**Route**: `/settings`

**Sidebar Navigation**:
```html
<div class="flex min-h-screen bg-bg-light">
  <!-- Sidebar -->
  <div class="w-64 bg-white shadow-sm">
    <div class="p-6">
      <h2 class="text-lg font-semibold text-primary">Settings</h2>
    </div>
    
    <nav class="mt-6">
      <div class="px-3">
        <ul class="space-y-1">
          <li>
            <a href="/settings/general" class="bg-primary text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              General
            </a>
          </li>
          <li>
            <a href="/settings/phone" class="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              Phone Setup
            </a>
          </li>
          <li>
            <a href="/settings/sms" class="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              SMS Templates
            </a>
          </li>
          <li>
            <a href="/settings/users" class="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              Users
            </a>
          </li>
          <li>
            <a href="/settings/billing" class="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              Billing
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  
  <!-- Main Content -->
  <div class="flex-1 p-8">
    <!-- Settings content -->
  </div>
</div>
```

### General Settings Form
```html
<div class="bg-white rounded-xl shadow-sm p-6">
  <h3 class="text-lg font-semibold text-primary mb-6">Business Information</h3>
  
  <form class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Business Name
        </label>
        <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Primary Phone
        </label>
        <input type="tel" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary">
      </div>
    </div>
    
    <!-- More form fields -->
    
    <div class="flex justify-end">
      <button type="submit" class="btn-primary">
        Save Changes
      </button>
    </div>
  </form>
</div>
```

---

## 7. Mobile Responsive Design

### Mobile Navigation
```html
<!-- Mobile menu button -->
<div class="md:hidden">
  <button class="text-gray-500 hover:text-primary focus:text-primary">
    <svg class="h-6 w-6" fill="none" stroke="currentColor">
      <!-- Hamburger icon -->
    </svg>
  </button>
</div>

<!-- Mobile navigation menu -->
<div class="md:hidden bg-white shadow-lg">
  <div class="px-4 pt-2 pb-3 space-y-1">
    <a href="/dashboard" class="bg-primary text-white block px-3 py-2 rounded-md text-base font-medium">
      Dashboard
    </a>
    <!-- More nav items -->
  </div>
</div>
```

### Mobile Dashboard Cards
```html
<!-- Stack cards vertically on mobile -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Metric cards with responsive text sizes -->
  <div class="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
    <p class="text-xs sm:text-sm font-medium text-gray-600">Missed Calls</p>
    <p class="text-2xl sm:text-3xl font-bold text-primary">24</p>
  </div>
</div>
```

---

## 8. Loading States & Feedback

### Loading Indicators
```html
<!-- Button loading state -->
<button disabled class="btn-primary opacity-75">
  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
    <!-- Spinner icon -->
  </svg>
  Processing...
</button>

<!-- Card loading skeleton -->
<div class="bg-white rounded-xl p-6 shadow-sm">
  <div class="animate-pulse">
    <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
    <div class="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div class="h-2 bg-gray-200 rounded w-3/4"></div>
  </div>
</div>
```

### Success Messages
```html
<!-- Toast notification -->
<div class="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg">
  <div class="flex items-center">
    <svg class="w-5 h-5 mr-2">
      <!-- Checkmark icon -->
    </svg>
    <span>Settings saved successfully!</span>
  </div>
</div>
```

---

## Implementation Notes

### CSS Framework
- **Primary**: Tailwind CSS with custom color configuration
- **Components**: Custom components using design tokens
- **Responsive**: Mobile-first approach with breakpoints

### JavaScript Framework
- **Frontend**: Next.js with TypeScript
- **State**: React Context or Zustand for global state
- **Forms**: React Hook Form with validation
- **Charts**: Recharts for analytics visualizations

### Performance Optimization
- Component lazy loading
- Image optimization
- CSS purging for production
- Service worker for offline functionality

This UI specification provides a complete foundation for building the JESCO Analytics application with consistent styling, professional appearance, and optimal user experience across all devices.