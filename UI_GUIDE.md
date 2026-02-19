# Invoice Module UI Guide

## Overview
This document provides a visual guide to the Invoice Module's user interface and navigation flow.

## Navigation Flow

```
Homepage
   │
   ├─> Services (existing)
   │
   └─> Invoices (NEW) ─────────────┐
              │                     │
              │                     │
              ▼                     ▼
       ┌─────────────┐      ┌──────────────┐
       │ Invoice List│      │   Invoice    │
       │    Page     │─────▶│   Details    │
       └─────────────┘      └──────────────┘
              │                     │
              │                     ├─> Add Payment Modal
              │                     ├─> Archive/Restore
              │                     └─> View Payments
              │
              └─> Filter: Active/Archived
```

## Page Layouts

### 1. Invoice List Page (`/invoices`)

```
┌────────────────────────────────────────────────────────┐
│  Navbar: Home | Services | Invoices                    │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  Invoices                    [ ] Show Archived         │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│
│  │ INV-2024-001 │  │ INV-2024-002 │  │ INV-2024-003 ││
│  │   [DRAFT]    │  │    [PAID]    │  │   [DRAFT]    ││
│  │              │  │              │  │              ││
│  │ John Smith   │  │ Sarah Johnson│  │ Michael Brown││
│  │              │  │              │  │              ││
│  │ Issued: Jan  │  │ Issued: Jan  │  │ Issued: Feb  ││
│  │ Due: Feb     │  │ Due: Feb     │  │ Due: Mar     ││
│  │              │  │              │  │              ││
│  │ Total: $850  │  │ Total: $1200 │  │ Total: $550  ││
│  │ Due: $500    │  │ Due: $0      │  │ Due: $550    ││
│  └──────────────┘  └──────────────┘  └──────────────┘│
│                                                         │
└────────────────────────────────────────────────────────┘
```

**Features:**
- Grid layout of invoice cards
- Click any card to view details
- Status badges (color-coded)
- Filter toggle for archived invoices
- Responsive design (stacks on mobile)

### 2. Invoice Details Page (`/invoices/:id`)

```
┌────────────────────────────────────────────────────────┐
│  Navbar: Home | Services | Invoices                    │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                                                         │
│  INV-2024-001               [DRAFT] [ARCHIVED]         │
│  John Smith                                             │
│                                                         │
│  Issue Date              Due Date                       │
│  January 15, 2024       February 15, 2024              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Line Items                                             │
├─────────────────────────────────────────────────────────┤
│  Description          Qty    Unit Price    Line Total  │
│  AC Repair Service     1      $350.00       $350.00    │
│  Electrical Wiring     2      $150.00       $300.00    │
│  Replacement Parts     1      $200.00       $200.00    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────────────────────────────────────────┐    │
│  │  Total                             $850.00    │    │
│  │  Amount Paid                       $350.00    │    │
│  │  Balance Due                       $500.00    │    │
│  └───────────────────────────────────────────────┘    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Payments                           [Add Payment]       │
├─────────────────────────────────────────────────────────┤
│  January 20, 2024                           $350.00    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                              [Archive Invoice]          │
└─────────────────────────────────────────────────────────┘
```

**Sections:**
1. **Header**: Invoice number, customer name, status badges
2. **Invoice Info**: Issue and due dates
3. **Line Items Table**: Description, quantity, unit price, line total
4. **Totals**: Total, amount paid, balance due (highlighted)
5. **Payments**: List with add button
6. **Actions**: Archive or restore button

### 3. Add Payment Modal

```
        ┌─────────────────────────────────┐
        │  Add Payment               [×]  │
        ├─────────────────────────────────┤
        │                                 │
        │  Payment Amount                 │
        │  (Balance Due: $500.00)         │
        │  ┌─────────────────────────┐   │
        │  │ 0.00                    │   │
        │  └─────────────────────────┘   │
        │                                 │
        │  Payment Date                   │
        │  ┌─────────────────────────┐   │
        │  │ 2024-02-19              │   │
        │  └─────────────────────────┘   │
        │                                 │
        ├─────────────────────────────────┤
        │            [Cancel] [Add Payment]│
        └─────────────────────────────────┘
```

**Features:**
- Amount input with validation
- Date picker
- Shows balance due
- Error messages for invalid input
- Prevents overpayment

## Color Scheme

```
Status Colors:
├─ DRAFT:    Yellow (#fdcb6e) with light background
├─ PAID:     Green (#00b894) with light background
└─ ARCHIVED: Gray (#636e72) with light background

UI Colors:
├─ Primary Action:  Blue (#3498db)
├─ Success:         Green (#00b894)
├─ Warning:         Yellow (#fdcb6e)
├─ Danger:          Red (#e74c3c)
├─ Text:            Dark Blue-Gray (#2c3e50)
└─ Background:      Light Gray (#f8f9fa)
```

## Responsive Design

### Desktop (> 768px)
- Invoice cards in 3-column grid
- Full table layout for line items
- Side-by-side layout for totals

### Mobile (< 768px)
- Invoice cards stack vertically
- Tables remain scrollable
- Totals stack vertically
- Full-width buttons

## Interactive Elements

### Hover Effects
- Invoice cards lift up with shadow
- Buttons change color and lift
- Table rows highlight on hover

### Transitions
- Smooth color changes (0.3s)
- Lift animations on hover
- Modal slide-in animation
- Toast slide-in from right

### Toast Notifications
```
                    ┌───────────────────────────┐
                    │ ✓ Payment added success!  │
                    └───────────────────────────┘
```
- Appears top-right
- Auto-dismisses after 3 seconds
- Can be manually closed
- Success (green) or error (red)

## User Interactions

### Invoice List Page
1. Click invoice card → Navigate to details
2. Toggle "Show Archived" → Filter list
3. Cards show status, customer, dates, amounts

### Invoice Details Page
1. View all invoice information
2. Click "Add Payment" → Open modal
3. Fill payment form → Submit → Updates totals
4. Click "Archive" → Archives invoice
5. If archived, click "Restore" → Restores invoice

### Add Payment Modal
1. Enter amount (validated)
2. Select date
3. Click "Add Payment" → Submits
4. Validation errors show in modal
5. Success → Modal closes, list updates

## Business Rules Displayed

1. **Line Total Calculation**
   - Shown in table: Quantity × Unit Price = Line Total

2. **Invoice Total**
   - Shown in totals section: Sum of all line totals

3. **Balance Due**
   - Highlighted in red box: Total - Amount Paid

4. **Payment Validation**
   - Modal shows balance due
   - Cannot exceed balance
   - Must be positive

5. **Status Updates**
   - DRAFT badge for unpaid
   - PAID badge when balance = 0
   - ARCHIVED badge for archived invoices

## Accessibility Features

- Semantic HTML elements
- Keyboard navigation support
- Clear focus indicators
- Descriptive labels
- Error messages
- Color contrast compliance

## Performance Optimizations

- React component memoization
- Lazy loading of modals
- Debounced API calls
- Optimized re-renders
- CSS animations (GPU accelerated)

---

## Screenshots

While actual screenshots require a running application with MongoDB, the UI follows these design principles:

**Invoice List:**
- Clean card-based layout
- Clear visual hierarchy
- Easy scanning of information
- Prominent status indicators

**Invoice Details:**
- Professional invoice layout
- Clear separation of sections
- Easy-to-read tables
- Prominent call-to-action buttons

**Add Payment Modal:**
- Simple, focused form
- Clear validation messages
- Intuitive date picker
- Visible cancel option

---

## Summary

The Invoice Module UI provides:
✅ Clean, professional design
✅ Intuitive navigation
✅ Clear information hierarchy
✅ Responsive across devices
✅ Smooth interactions
✅ User-friendly forms
✅ Clear feedback (toast notifications)
✅ Accessibility support

Inspired by modern invoice management systems like the Dribbble reference, but with custom implementation using React best practices.
