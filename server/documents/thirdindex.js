import moment from 'moment'

const numberToWords = (num) => {
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (num === 0) return "Zero Rupees only";

    const convert = (n) => {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
        if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + convert(n % 100) : "");
        return "";
    };

    return convert(num) + " Rupees only";
};

export default function (
   { name,
      address,
      phone,
      email,
      dueDate,
      date,
      id,
      notes,
      subTotal,
      type,
      vat,
      total,
      items,
      status,
      totalAmountReceived,
      balanceDue,
      selectedCompany,
      client,
      invoiceNumber
   }) {
    debugger;

    let discountSum = 0, taxSum = 0, subtotalSum = 0;

return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quotation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
        }
        .header {
            background: red;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header img {
            height: 50px;
        }
        .header .contact {
            text-align: right;
        }
        .quotation {
            text-align: right;
            margin-top: 10px;
        }
        .table-container {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: left;
        }
        th {
            background: red;
            color: white;
        }
        .totals {
            text-align: right;
            margin-top: 20px;
        }
        .signature {
            margin-top: 30px;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <h2>${selectedCompany.value.company_name}</h2>
            <p>Description: ${selectedCompany.value.description}</p>
        </div>
        <div class="contact">
            <p>📞 +91-7909083806</p>
            <p>📧 anand@narmadamotors.in</p>
        </div>
    </div>

    <div class="quotation">
        <h2>Quotation</h2>
        <p><strong>Estimate No:</strong> ${invoiceNumber}</p>
        <p><strong>Date:</strong> ${moment(date).format('LL')}</p>
    </div>

    <h3>Estimate For: <strong>${name}</strong></h3>

    <table>
        <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>HSN/SAC</th>
            <th>Quantity</th>
            <th>Price/Unit</th>
            <th>Discount</th>
            <th>Tax</th>
            <th>Amount</th>
        </tr>
        ${items.map((item, index) => {
            let unitPrice = item.unitPrice ?? 0;
            let quantity = item.quantity ?? 0;
            let discountPer = item.discountPer ?? 0;
            let tax = item.tax ?? 0;

            let itemTotal = unitPrice * quantity;
            let itemDiscount = (itemTotal * discountPer) / 100;
            let itemTax = (itemTotal * tax) / 100;
            let itemSubtotal = itemTotal - itemDiscount + itemTax;

            // Accumulate totals
            discountSum += itemDiscount;
            taxSum += itemTax;
            subtotalSum += itemSubtotal;

            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.itemName}</td>
                    <td>8708</td>
                    <td>${item.quantity}</td>
                    <td>₹ ${item.unitPrice}</td>
                    <td>₹ ${((item.unitPrice ?? 0) * (item.quantity ?? 0) * (item.discountPer ?? 0) / 100).toFixed(2)} (${item.discountPer ?? 0}%)</td>
                    <td>₹ ${((item.unitPrice ?? 0) * (item.quantity ?? 0) * (item.tax ?? 0) / 100).toFixed(2)} (${item.tax ?? 0}%)</td>
                    <td>₹ ${(((item.unitPrice ?? 0) * (item.quantity ?? 0)) - 
                            ((item.unitPrice ?? 0) * (item.quantity ?? 0) * (item.discountPer ?? 0) / 100) + 
                            ((item.unitPrice ?? 0) * (item.quantity ?? 0) * (item.tax ?? 0) / 100)).toFixed(2)}</td>
                </tr>`;
        }).join('')}
        <tr>
            <td colspan="5"><strong>Total</strong></td>
            <td>₹ ${discountSum.toFixed(2)}</td>
            <td>₹ ${taxSum.toFixed(2)}</td>
            <td>₹ ${subtotalSum.toFixed(2)}</td>
        </tr>
    </table>

    <div class="totals">
        <p><strong>Sub Total:</strong> ${numberToWords(subtotalSum)}</p>
        <p><strong>Discount:</strong> ₹ 10.59</p>
        <p><strong>SGST @9%:</strong> ₹ 6.67</p>
        <p><strong>CGST @9%:</strong> ₹ 6.67</p>
        <p><strong>Round Off:</strong> ₹ 0.50</p>
        <p><strong>Total:</strong> ₹ 88.00</p>
    </div>

    <div class="signature">
        <p>For: ${name}</p>
        <img src="http://localhost:5000/uploads/${selectedCompany.value.image}" alt="${selectedCompany.value.company_name}" />
    </div>
</body>
</html>`

;
};