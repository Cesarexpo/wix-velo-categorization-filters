# wix-velo-categorization-filters
Wix Velo - Categorization Systems → Category (Dependent Checkbox)

Problem: You need the first checkbox group, Categorization Systems (#checkboxGroup3), to control which options are visible in the second checkbox group, Category (#checkboxGroup2). You also want clean labels in the UI while keeping sort-prefixed values for stable ordering, and you want all categories visible when no system is selected.

Solution: Use clean labels for users and sort-prefixed values for logic. Maintain one master-ordered list for categories and a mapping of systems to category values. On change, rebuild the Category options from that master list. When nothing is selected in Categorization Systems, show all categories.

What this repo contains
  A small Velo snippet that:
  Filters Category options based on selected Categorization Systems
  Preserves a global visual order for Category
  Shows all categories when no system is selected
  Keeps labels clean while values remain sort-prefixed for reliability

Elements and fields
  Elements
    Controller: #checkboxGroup3 - Categorization Systems
    Dependent: #checkboxGroup2 - Category
  Data fields
    categorizationSystemSort examples: 0. Pre BIE, 1. First Categorization System, 2. Second Categorization System, 3. Third Categorization System
    categorySort examples: 0.1 Pre BIE, 1.1 General, First Category, 1.2 General, Second Category, 1.3 Special, 2.1 Universal, 2.2 Specialized, 3.1 Registered, 3.2 Recognized

Quick start
  Open your page’s Velo code panel.
  Ensure your element IDs match exactly:
    #checkboxGroup3 for Categorization Systems
    #checkboxGroup2 for Category
  Make sure neither checkbox group is connected to a dataset in the Editor.

Paste the code below.

Publish and test.

Why this design works
  Single source of truth for Category order avoids drifting labels and values.
  Clean labels keep the UI readable. Prefixed values keep logic predictable.
  Set-based filtering guarantees deduplication and stable ordering.

Common pitfalls
  Element IDs do not match. Double-check #checkboxGroup3 and #checkboxGroup2.
  Checkbox groups connected to a dataset. Remove connections when controlling options via code.
  Value mismatches. Labels can be anything, but values must match the sort-prefixed strings exactly.

Extending this snippet
  Persist selections with wixStorage to remember state across navigation.
  Filter a dataset or repeater by categorizationSystemSort and categorySort using wixData.query() or dataset filters.
  Add numeric badges in labels if you want to hint at the hierarchy without exposing the full prefixes.

License
  MIT
