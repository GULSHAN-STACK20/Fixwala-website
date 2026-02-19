#!/bin/bash

# Invoice Module API Testing Script
# This script tests all Invoice API endpoints

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:5000/api/invoices"

echo "================================================"
echo "Invoice Module API Testing"
echo "================================================"
echo ""

# Function to print test results
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASSED${NC}: $2"
    else
        echo -e "${RED}✗ FAILED${NC}: $2"
    fi
}

# Test 1: Health Check
echo -e "${YELLOW}Test 1: Health Check${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health)
if [ "$response" = "200" ]; then
    print_result 0 "Server is running"
else
    print_result 1 "Server health check failed"
fi
echo ""

# Test 2: Get All Invoices
echo -e "${YELLOW}Test 2: Get All Invoices${NC}"
response=$(curl -s -w "\n%{http_code}" $BASE_URL)
http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "200" ]; then
    print_result 0 "Retrieved all invoices"
    echo "Response preview:"
    echo "$response" | head -n-1 | jq '. | length' 2>/dev/null || echo "JSON parsing not available"
else
    print_result 1 "Failed to retrieve invoices"
fi
echo ""

# Test 3: Get Archived Invoices
echo -e "${YELLOW}Test 3: Get Archived Invoices${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL?archived=true")
if [ "$response" = "200" ]; then
    print_result 0 "Retrieved archived invoices"
else
    print_result 1 "Failed to retrieve archived invoices"
fi
echo ""

# Test 4: Get Invoice Details
echo -e "${YELLOW}Test 4: Get Invoice Details${NC}"
echo "First, get an invoice ID from the list..."
INVOICE_ID=$(curl -s $BASE_URL | jq -r '.[0]._id' 2>/dev/null)
if [ ! -z "$INVOICE_ID" ] && [ "$INVOICE_ID" != "null" ]; then
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$INVOICE_ID")
    if [ "$response" = "200" ]; then
        print_result 0 "Retrieved invoice details for ID: $INVOICE_ID"
    else
        print_result 1 "Failed to retrieve invoice details"
    fi
else
    echo -e "${YELLOW}⚠ SKIPPED${NC}: No invoices found (seed data may not be loaded)"
fi
echo ""

# Test 5: Create New Invoice
echo -e "${YELLOW}Test 5: Create New Invoice${NC}"
NEW_INVOICE=$(cat <<EOF
{
  "invoiceNumber": "TEST-INV-$(date +%s)",
  "customerName": "Test Customer",
  "issueDate": "2024-02-01",
  "dueDate": "2024-03-01",
  "lineItems": [
    {
      "description": "Test Service",
      "quantity": 2,
      "unitPrice": 100.00
    }
  ]
}
EOF
)
response=$(curl -s -w "\n%{http_code}" -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d "$NEW_INVOICE")
http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "201" ]; then
    print_result 0 "Created new invoice"
    NEW_INVOICE_ID=$(echo "$response" | head -n-1 | jq -r '._id' 2>/dev/null)
    echo "Created invoice ID: $NEW_INVOICE_ID"
else
    print_result 1 "Failed to create invoice"
fi
echo ""

# Test 6: Add Payment (if we have an invoice ID)
if [ ! -z "$NEW_INVOICE_ID" ] && [ "$NEW_INVOICE_ID" != "null" ]; then
    echo -e "${YELLOW}Test 6: Add Payment to Invoice${NC}"
    PAYMENT=$(cat <<EOF
{
  "amount": 50.00,
  "paymentDate": "2024-02-15"
}
EOF
)
    response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/$NEW_INVOICE_ID/payments" \
      -H "Content-Type: application/json" \
      -d "$PAYMENT")
    if [ "$response" = "201" ]; then
        print_result 0 "Added payment to invoice"
    else
        print_result 1 "Failed to add payment"
    fi
    echo ""

    # Test 7: Archive Invoice
    echo -e "${YELLOW}Test 7: Archive Invoice${NC}"
    response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/$NEW_INVOICE_ID/archive")
    if [ "$response" = "200" ]; then
        print_result 0 "Archived invoice"
    else
        print_result 1 "Failed to archive invoice"
    fi
    echo ""

    # Test 8: Restore Invoice
    echo -e "${YELLOW}Test 8: Restore Invoice${NC}"
    response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/$NEW_INVOICE_ID/restore")
    if [ "$response" = "200" ]; then
        print_result 0 "Restored invoice"
    else
        print_result 1 "Failed to restore invoice"
    fi
    echo ""
else
    echo -e "${YELLOW}⚠ SKIPPED${NC}: Tests 6-8 (requires invoice creation to succeed)"
    echo ""
fi

# Test 9: Invalid Payment (amount exceeds balance)
if [ ! -z "$NEW_INVOICE_ID" ] && [ "$NEW_INVOICE_ID" != "null" ]; then
    echo -e "${YELLOW}Test 9: Invalid Payment (Should Fail)${NC}"
    INVALID_PAYMENT=$(cat <<EOF
{
  "amount": 999999.00,
  "paymentDate": "2024-02-15"
}
EOF
)
    response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/$NEW_INVOICE_ID/payments" \
      -H "Content-Type: application/json" \
      -d "$INVALID_PAYMENT")
    if [ "$response" = "400" ]; then
        print_result 0 "Correctly rejected overpayment"
    else
        print_result 1 "Should have rejected overpayment"
    fi
    echo ""
fi

# Test 10: Invalid Payment (negative amount)
if [ ! -z "$NEW_INVOICE_ID" ] && [ "$NEW_INVOICE_ID" != "null" ]; then
    echo -e "${YELLOW}Test 10: Invalid Payment (Negative Amount - Should Fail)${NC}"
    INVALID_PAYMENT=$(cat <<EOF
{
  "amount": -100.00,
  "paymentDate": "2024-02-15"
}
EOF
)
    response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/$NEW_INVOICE_ID/payments" \
      -H "Content-Type: application/json" \
      -d "$INVALID_PAYMENT")
    if [ "$response" = "400" ]; then
        print_result 0 "Correctly rejected negative payment"
    else
        print_result 1 "Should have rejected negative payment"
    fi
    echo ""
fi

echo "================================================"
echo "Testing Complete!"
echo "================================================"
echo ""
echo "Note: Some tests may be skipped if:"
echo "  - MongoDB is not running"
echo "  - Sample data has not been seeded"
echo "  - Server is not running on port 5000"
echo ""
echo "To seed data, run: cd server && node seedInvoices.js"
