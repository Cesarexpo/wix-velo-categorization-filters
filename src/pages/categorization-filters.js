// /public/pages/categorization-filters.js
import wixData from 'wix-data';

$w.onReady(function () {
  // Visible labels are clean; values keep the sort prefixes.
  const systemsOrdered = [
    { label: 'Pre BIE', value: '0. Pre BIE' },
    { label: 'First Categorization System', value: '1. First Categorization System' },
    { label: 'Second Categorization System', value: '2. Second Categorization System' },
    { label: 'Third Categorization System', value: '3. Third Categorization System' }
  ];
  $w('#checkboxGroup3').options = systemsOrdered;

  // Master order for categories: clean labels, prefixed values.
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

  // Map systems → categorySort values (prefixed).
  const systemToCategoryValues = {
    '0. Pre BIE': ['0.1 Pre BIE'],
    '1. First Categorization System': [
      '1.1 General, First Category',
      '1.2 General, Second Category',
      '1.3 Special'
    ],
    '2. Second Categorization System': [
      '2.1 Universal',
      '2.2 Specialized'
    ],
    '3. Third Categorization System': [
      '3.1 Registered',
      '3.2 Recognized'
    ]
  };

  // Start empty.
  $w('#checkboxGroup2').options = [];
  $w('#checkboxGroup2').value = [];

  function rebuildCategoryGroup() {
    const selectedSystems = $w('#checkboxGroup3').value || [];
    if (selectedSystems.length === 0) {
      // Why: avoids Wix restoring defaults and keeps UX consistent
      $w('#checkboxGroup2').options = [];
      $w('#checkboxGroup2').value = [];
      return;
    }

    const allowed = new Set();
    for (const sys of selectedSystems) {
      const vals = systemToCategoryValues[sys] || [];
      for (const v of vals) allowed.add(v);
    }

    const filtered = categoriesMasterOrdered.filter(opt => allowed.has(opt.value));
    $w('#checkboxGroup2').options = filtered;
    $w('#checkboxGroup2').value = [];
  }

  $w('#checkboxGroup3').onChange(rebuildCategoryGroup);

  // Optional default selection demo; remove if not needed.
  // $w('#checkboxGroup3').value = ['1. First Categorization System'];
  // rebuildCategoryGroup();
});
