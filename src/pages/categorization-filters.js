// /public/pages/categorization-filters.js
import wixData from 'wix-data';

$w.onReady(function () {
  // Categorization Systems: value === label
  const systemsOrdered = [
    { label: '(1851-1933) Pre BIE', value: '(1851-1933) Pre BIE' },
    { label: '(1935-1975) First Categorization System', value: '(1935-1975) First Categorization System' },
    { label: '(1981-2005) Second Categorization System', value: '(1981-2005) Second Categorization System' },
    { label: '(2008-) Third Categorization System', value: '(2008-) Third Categorization System' }
  ];
  $w('#checkboxGroup3').options = systemsOrdered;

  // Categories: keep prefixed values; labels can be clean
  const categoriesMasterOrdered = [
    { label: 'Pre BIE', value: '0.1 Pre BIE' },
    { label: 'General, First Category', value: '1.1 General, First Category' },
    { label: 'General, Second Category', value: '1.2 General, Second Category' },
    { label: 'Special', value: '1.3 Special' },
    { label: 'Universal', value: '2.1 Universal' },
    { label: 'Specialized', value: '2.2 Specialized' },
    { label: 'Registered', value: '3.1 Registered' },
    { label: 'Recognized', value: '3.2 Recognized' }
  ];

  // Map system value (exact label string) -> category values
  const systemToCategoryValues = {
    '(1851-1933) Pre BIE': ['0.1 Pre BIE'],
    '(1935-1975) First Categorization System': [
      '1.1 General, First Category',
      '1.2 General, Second Category',
      '1.3 Special'
    ],
    '(1981-2005) Second Categorization System': [
      '2.1 Universal',
      '2.2 Specialized'
    ],
    '(2008-) Third Categorization System': [
      '3.1 Registered',
      '3.2 Recognized'
    ]
  };

  // Show all categories by default
  $w('#checkboxGroup2').options = categoriesMasterOrdered;
  $w('#checkboxGroup2').value = [];

  function rebuildCategoryGroup() {
    const selectedSystems = $w('#checkboxGroup3').value || [];

    if (selectedSystems.length === 0) {
      $w('#checkboxGroup2').options = categoriesMasterOrdered;
      $w('#checkboxGroup2').value = [];
      return;
    }

    // Collect allowed category values based on selected system labels
    const allowed = new Set();
    for (const sys of selectedSystems) {
      const vals = systemToCategoryValues[sys] || [];
      for (const v of vals) allowed.add(v);
    }

    // Preserve global order
    const filtered = categoriesMasterOrdered.filter(opt => allowed.has(opt.value));
    $w('#checkboxGroup2').options = filtered;
    $w('#checkboxGroup2').value = [];
  }

  $w('#checkboxGroup3').onChange(rebuildCategoryGroup);
});
feat(filters): add year-range labels and value=label mapping; show all categories by default
