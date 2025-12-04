# Usage Examples - MAGIC UI Components

## Grid/List View Toggle

### Basic Usage
```jsx
import ViewToggle from './components/ViewToggle';

function MyComponent() {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <ViewToggle 
      view={viewMode} 
      onViewChange={setViewMode} 
    />
  );
}
```

### With Conditional Rendering
```jsx
{viewMode === 'grid' ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {/* Grid content */}
  </div>
) : (
  <div className="space-y-4">
    {/* List content */}
  </div>
)}
```

## Startup Grid Card

### Basic Usage
```jsx
import StartupGridCard from './components/StartupGridCard';

<StartupGridCard
  startup={startupData}
  onUpdate={handleUpdate}
  onDelete={handleDelete}
  onClick={() => setSelectedStartup(startupData)}
/>
```

### In a Grid Layout
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <AnimatePresence>
    {startups.map(startup => (
      <StartupGridCard
        key={startup.id}
        startup={startup}
        onUpdate={handleUpdateStartup}
        onDelete={handleDeleteStartup}
        onClick={() => setSelectedStartup(startup)}
      />
    ))}
  </AnimatePresence>
</div>
```

## Startup Detail Modal

### Basic Usage
```jsx
import StartupDetailModal from './components/StartupDetailModal';

const [selectedStartup, setSelectedStartup] = useState(null);

<AnimatePresence>
  {selectedStartup && (
    <StartupDetailModal
      startup={selectedStartup}
      onClose={() => setSelectedStartup(null)}
      onUpdate={handleUpdateStartup}
    />
  )}
</AnimatePresence>
```

### With Action Handlers
```jsx
const handleUpdateStartup = (updatedStartup) => {
  const allStartups = storage.get('startups', []);
  const updated = allStartups.map(s => 
    s.id === updatedStartup.id ? updatedStartup : s
  );
  storage.set('startups', updated);
  loadStartups();
};

<StartupDetailModal
  startup={selectedStartup}
  onClose={() => setSelectedStartup(null)}
  onUpdate={handleUpdateStartup}
/>
```

## Search and Filter

### Search Implementation
```jsx
const [searchTerm, setSearchTerm] = useState('');
const [filteredStartups, setFilteredStartups] = useState([]);

useEffect(() => {
  let filtered = startups;
  if (searchTerm) {
    filtered = filtered.filter(s =>
      s.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.founderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.magicCode?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  setFilteredStartups(filtered);
}, [startups, searchTerm]);

<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by name, founder, or magic code..."
    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl"
  />
</div>
```

### Filter Implementation
```jsx
const [filterStage, setFilterStage] = useState('all');

useEffect(() => {
  let filtered = startups;
  if (filterStage !== 'all') {
    filtered = filtered.filter(s => s.stage === filterStage);
  }
  setFilteredStartups(filtered);
}, [startups, filterStage]);

<select
  value={filterStage}
  onChange={(e) => setFilterStage(e.target.value)}
  className="px-4 py-3 border-2 border-gray-200 rounded-xl"
>
  <option value="all">All Stages</option>
  <option value="S0">S0 - Registered</option>
  <option value="S1">S1 - Stage 1</option>
  <option value="S2">S2 - Stage 2</option>
  <option value="S3">S3 - Stage 3</option>
  <option value="One-on-One">One-on-One</option>
</select>
```

## Responsive Sidebar

### Mobile Menu Toggle
```jsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Mobile Menu Button
<motion.button
  whileTap={{ scale: 0.95 }}
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className="lg:hidden fixed top-4 left-4 z-50 p-3 magic-gradient text-white rounded-xl"
>
  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</motion.button>

// Mobile Sidebar
<AnimatePresence>
  {isMobileMenuOpen && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsMobileMenuOpen(false)}
        className="lg:hidden fixed inset-0 bg-black/50 z-40"
      />
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        className="lg:hidden fixed left-0 top-0 bottom-0 w-72 magic-gradient z-40"
      >
        {/* Sidebar content */}
      </motion.aside>
    </>
  )}
</AnimatePresence>
```

## Custom Animations

### Card Entrance Animation
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  whileHover={{ y: -5 }}
  className="bg-white rounded-2xl shadow-lg"
>
  {/* Card content */}
</motion.div>
```

### Button Interaction
```jsx
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="magic-gradient text-white px-6 py-3 rounded-xl"
>
  Click Me
</motion.button>
```

### Modal Animation
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
>
  <motion.div
    initial={{ scale: 0.9, y: 20 }}
    animate={{ scale: 1, y: 0 }}
    exit={{ scale: 0.9, y: 20 }}
    className="bg-white rounded-2xl"
  >
    {/* Modal content */}
  </motion.div>
</motion.div>
```

## Utility Classes

### MAGIC Gradient
```jsx
// Background gradient
<div className="magic-gradient">
  {/* Content */}
</div>

// Text gradient
<h1 className="magic-text-gradient">
  MAGIC Title
</h1>

// Hover gradient
<button className="magic-gradient hover:magic-gradient-hover">
  Button
</button>
```

### Custom Shadows
```jsx
// Magic shadow
<div className="shadow-magic">
  {/* Content */}
</div>

// Large magic shadow
<div className="shadow-magic-lg">
  {/* Content */}
</div>
```

### Custom Scrollbar
```jsx
<div className="overflow-y-auto scrollbar-thin">
  {/* Scrollable content */}
</div>
```

## Responsive Patterns

### Responsive Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
  {items.map(item => (
    <div key={item.id}>{/* Item */}</div>
  ))}
</div>
```

### Responsive Text
```jsx
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>

<p className="text-sm sm:text-base">
  Responsive paragraph
</p>
```

### Responsive Spacing
```jsx
<div className="p-4 sm:p-6 lg:p-8">
  {/* Content with responsive padding */}
</div>

<div className="space-y-4 sm:space-y-6">
  {/* Items with responsive spacing */}
</div>
```

### Responsive Flex
```jsx
<div className="flex flex-col sm:flex-row gap-4">
  <div className="flex-1">{/* Item 1 */}</div>
  <div className="flex-1">{/* Item 2 */}</div>
</div>
```

## Dark Mode

### Toggle Implementation
```jsx
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);

<button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? <Sun /> : <Moon />}
  {darkMode ? 'Light Mode' : 'Dark Mode'}
</button>
```

### Dark Mode Styles
```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  {/* Content that adapts to dark mode */}
</div>

<input className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
```

## Data Management

### Export Data
```jsx
const exportToCSV = () => {
  const headers = ['Company Name', 'Founder', 'Email', 'Mobile'];
  const rows = startups.map(s => [
    s.companyName, s.founderName, s.email, s.mobile
  ]);
  
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `startups-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
```

### Import Data
```jsx
const handleImport = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        storage.set('startups', data);
        loadStartups();
        alert('Data imported successfully!');
      } catch (error) {
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  }
};

<input
  type="file"
  accept=".json"
  onChange={handleImport}
  className="hidden"
/>
```

## Form Handling

### Collapsible Form Sections
```jsx
const [expanded, setExpanded] = useState({
  section1: true,
  section2: false,
  section3: false
});

const toggleSection = (section) => {
  setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
};

<div className="border rounded-xl overflow-hidden">
  <button
    onClick={() => toggleSection('section1')}
    className="w-full flex items-center justify-between p-4 bg-gray-50"
  >
    <span>Section Title</span>
    {expanded.section1 ? <ChevronUp /> : <ChevronDown />}
  </button>
  {expanded.section1 && (
    <div className="p-4">
      {/* Section content */}
    </div>
  )}
</div>
```

### Form Validation
```jsx
const [formData, setFormData] = useState({
  companyName: '',
  founderName: '',
  email: ''
});

const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  
  if (!formData.companyName) {
    newErrors.companyName = 'Company name is required';
  }
  
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Valid email is required';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    // Submit form
  }
};
```

## Performance Tips

### Memoization
```jsx
import { useMemo } from 'react';

const filteredStartups = useMemo(() => {
  return startups.filter(s => 
    s.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [startups, searchTerm]);
```

### Lazy Loading
```jsx
import { lazy, Suspense } from 'react';

const StartupDetailModal = lazy(() => import('./StartupDetailModal'));

<Suspense fallback={<div>Loading...</div>}>
  <StartupDetailModal {...props} />
</Suspense>
```

### Debounced Search
```jsx
import { useEffect, useState } from 'react';

const [searchTerm, setSearchTerm] = useState('');
const [debouncedTerm, setDebouncedTerm] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedTerm(searchTerm);
  }, 300);

  return () => clearTimeout(timer);
}, [searchTerm]);

// Use debouncedTerm for filtering
```

## Testing Examples

### Component Testing
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ViewToggle from './ViewToggle';

test('switches between grid and list view', () => {
  const handleViewChange = jest.fn();
  render(<ViewToggle view="grid" onViewChange={handleViewChange} />);
  
  const listButton = screen.getByText('List');
  fireEvent.click(listButton);
  
  expect(handleViewChange).toHaveBeenCalledWith('list');
});
```

### Integration Testing
```jsx
test('filters startups by search term', () => {
  render(<AllStartups />);
  
  const searchInput = screen.getByPlaceholderText(/search/i);
  fireEvent.change(searchInput, { target: { value: 'Tech' } });
  
  const cards = screen.getAllByRole('article');
  expect(cards.length).toBeGreaterThan(0);
});
```

## Common Patterns

### Loading State
```jsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadData().then(() => setLoading(false));
}, []);

if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-magic-500" />
    </div>
  );
}
```

### Empty State
```jsx
{filteredStartups.length === 0 && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl"
  >
    <Rocket className="w-16 h-16 mx-auto text-gray-400 mb-4" />
    <p className="text-gray-500 dark:text-gray-400 text-lg">
      No startups found
    </p>
    <button className="mt-4 magic-gradient text-white px-6 py-3 rounded-xl">
      Register First Startup
    </button>
  </motion.div>
)}
```

### Error Handling
```jsx
const [error, setError] = useState(null);

try {
  // Operation
} catch (err) {
  setError(err.message);
}

{error && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
  >
    {error}
  </motion.div>
)}
```
