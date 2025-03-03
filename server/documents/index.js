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
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

        body {
            font-family: 'Roboto', sans-serif;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        h2 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: 700;
        }

        .header-table {
            width: 100%;
            margin-bottom: 20px;
        }

        .header-table td {
            border: none;
            padding: 8px;
        }

        .header-table .align-right {
            text-align: right;
        }

        .header-table strong {
            color: #0073AA;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: #0073AA;
            color: #fff;
            font-weight: 500;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f1f1f1;
        }

        .align-right {
            text-align: right;
        }

        .no-border {
            border: none;
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 14px;
            color: #777;
        }

        .footer a {
            color: #2c3e50;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        .signature {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }

        .signature img {
            width: 100px;
            height: auto;
            margin-bottom: 10px;
        }

        .signature p {
            margin: 0;
            font-size: 14px;
            color: #555;
        }

        .notes {
            margin-top: 20px;
            font-size: 14px;
            color: #555;
        }

        .amount-in-words {
            margin-top: 20px;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
<h2 style="background-color: #0073AA; color: white; padding: 10px; text-align: center; width: 100%;">
    QUOTATION
</h2>

        <table class="header-table">
            <tr>
                <td>
                    <strong>${client.name}</strong><br>
                    ${address || "No Address"}<br>
                    Phone: ${phone || "N/A"}<br>
                    Email: ${email || "N/A"}<br>
                </td>
                <td class="align-right">
                    <strong>No:</strong> ${invoiceNumber}<br>
                    <strong>Date:</strong> ${moment(date).format('LL')}<br>
                </td>
            </tr>
        </table>

        <p><strong>Estimate For:</strong> ${name}</p>

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
            <tr style="background-color: #0073AA; color:white;">
                <td colspan="5"><strong>Total</strong></td>
                <td>₹ ${discountSum.toFixed(2)}</td>
                <td>₹ ${taxSum.toFixed(2)}</td>
                <td>₹ ${subtotalSum.toFixed(2)}</td>
            </tr>
        </table>

        <p class="amount-in-words"><strong>Estimate Amount in Words:</strong> ${numberToWords(subtotalSum)}</p>

        <div class="notes">
            <strong>Notes:</strong><br>
            ${notes || 'None.'}
        </div>

        <div class="signature">
            <div>
                <p>From: ${selectedCompany.value.company_name}</p>
                <img src="http://localhost:5000/uploads/${selectedCompany.value.image}" alt="${selectedCompany.value.company_name}" />
                <p><b>Authorized Signatory</b></p>
            </div>
        </div>

        <div class="footer">
            <p>Thank you for your business! For any inquiries, please contact us at <a href="mailto:${email}">${email}</a>.</p>
        </div>
    </div>
</body>
</html>`;
};
